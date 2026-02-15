---
title: Discover Daily
description: A mobile-only swiping experience of recommended artworks based on OpenSearch specialized queries (MLT + k-NN).
---

"Discover Daily" (DD)&mdash;internally known as Infinite Discovery&mdash;is a mobile-only swiping experience that surfaces personalized artwork recommendations. The feature uses a hybrid scoring model combining BM25 lexicographic search with KNN vector similarity, and implements both intra-session (client-side) and inter-session (server-side via Redis) deduplication to ensure users never see the same artwork twice.

The sequence diagram of Infinite Discovery is shown below.

```mermaid
sequenceDiagram
    participant E as Mobile Client
    participant MP as GraphQL
    participant G as Core API
    participant Redis@{ "type" : "database" }
    participant OpenSearch@{ "type" : "database" }
    participant Z as Python Jobs

    par background job
        Z-->>OpenSearch: Index artworks with vector embeddings
    end

    Note over E: User opens Discover Daily

    E->>MP: discoverArtworks(excludeArtworkIds)
    MP->>G: GET /artworks_discovery?exclude_artwork_ids[]=...

    G->>Redis: UserSeenArtworksService.all_seen
    Redis-->>G: Previously seen artwork IDs

    Note over G: Merge seen IDs with<br/>exclude_artwork_ids

    alt user.saved_artworks < S
        G->>OpenSearch: CuratedArtworks query
    else user.saved_artworks >= S
        G->>OpenSearch: SimilarArtworks hybrid query (MLT + KNN)
        Note over OpenSearch: score = α×MLT + (1-α)×KNN
    end

    OpenSearch-->>G: Recommended Artworks
    G-->>MP: Artwork details
    MP-->>E: artworkConnection

    Note over E: User swipes through cards

    loop On each card display
        E->>MP: createUserSeenArtwork(artworkId)
        MP->>G: POST /artworks_discovery/artworks/seen
        G->>Redis: UserSeenArtworksService.add(artwork_id)
        Redis-->>G: OK
        G-->>MP: OK
        MP-->>E: OK
    end

    Note over E: When a few cards remaining

    E->>MP: discoverArtworks(unswipedCardIds)
    Note over E,MP: Cycle repeats with updated exclusions
```

Before describing the Discover Daily algorithm, we need to introduce the two scoring models that power it.

## MLT (More Like This) Model

The MLT model leverages OpenSearch's [More Like This](https://opensearch.org/docs/latest/query-dsl/specialized/more-like-this/) query to find artworks that are topically similar based on term distribution to the user's saved artworks. It operates on textual fields that describe artwork characteristics.

The model's logic can be broken down as follows:

1. Get the user's saved artworks and create set $S_u$ by extracting all terms appearing across the following fields:

   - **Genes** (e.g., ["Western Europe", "Spain", "Spain and Portugal", "1970s", "Contemporary Art", "Galleries Based Outside of Europe"])
   - **Materials** (e.g., "Lithograph on Guarro paper")
   - **Tags** (e.g., ["Art", "Doodle", "Drawing", "Modern Art"])
   - **Medium** (e.g., "Print")

2. Remove terms where \$`\text{tf}(t, S_u) < \text{min\_term\_freq}`$ where $`\text{min\_term\_freq}`$ is a tuning parameter and $\text{tf}(t, S_u)$ returns the number of occurrences of the term $t$ in $S_u\$.

3. Remove terms where \$`\text{df}(t, \mathcal{D}) < \text{min\_doc\_freq}`$ where $`\text{min\_doc\_freq}`$ is a tuning parameter and $\text{df}(t, \mathcal{D})$ returns the number of documents in $\mathcal{D}$&mdash;the corpus of all indexed documents&mdash;containing the term $t\$.

4. Terms are scored by [TF-IDF](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) and the top $`\text{max\_query\_terms}`$ constitutes the query set $R_u$.

5. For each indexed document, extract all terms appearing across the same fields and calculate [BM25](https://en.wikipedia.org/wiki/Okapi_BM25) as:

$$
\text{BM25}(R_u, D_a) = \sum_{t \in T_{R_u, D_a}}\text{IDF}(t) \cdot \frac{\text{tf}(t, D_a) \cdot (k_1 + 1)}{\text{tf}(t, D_a) + k_1 \cdot \left(1 - b + b \cdot \frac{|D_a|}{\text{avgdl}}\right)}
$$

Where:

- $T_{R_u, D_a}$ is the set of terms shared between an indexed document $D_a$ and the reference set $R_u$.
- $|D_a|$ is the length of document $D_a$.
- $\text{avgdl}$ is the average document length of documents in $\mathcal{D}$.
- $k_1$ and $b$ are tuning parameters.
- $\text{IDF}(t)$ is the inverse document frequency, computed as:

$$
\text{IDF}(t) = \ln\left(1 + \frac{|\mathcal{D}| - \text{df}(t) + 0.5}{\text{df}(t) + 0.5}\right)
$$

Below we summarize the key parameters of the model we tuned compared to OpenSearch's defaults.

| MLT Parameter | Description                                                             | Discover Daily                     |
|---------------|-------------------------------------------------------------------------|------------------------------------|
| fields        | Indexed fields which terms $R_u$ and $D_a$ are extracted from           | genes, materials, tags, medium     |
| min_term_freq | Terms appearing less than this value are removed from $R_u$             | Low to match on more terms         |
| min_doc_freq  | Terms appearing in fewer documents than this are are removed from $R_u$ | Low to match on more terms         |

## KNN (K-Nearest Neighbors) Model

The KNN model uses OpenSearch's [KNN search](https://opensearch.org/docs/latest/search-plugins/knn/index/) with vector embeddings to find artworks that are geometrically similar to the user's preferences in a high-dimensional space.

The model's logic can be broken down as follows:

1. Get the user's artworks $S_u$ and pluck the pre-calculated embeddings using a pre-trained [vision transformer](https://en.wikipedia.org/wiki/Vision_transformer) model that encodes images into a dense vector $\mathbf{v}_a \in \mathbb{R}^d$.

2. Compute a centroid vector representing the user's preferences by averaging the embeddings of their saved artworks:

$$
\mathbf{v}_u = \frac{1}{|S_u|} \sum_{i \in S_u} \mathbf{v}_i
$$

3. For each indexed document, compute cosine similarity:

$$
\text{similarity}(\mathbf{v}_u, \mathbf{v}_a) = \frac{\mathbf{v}_u \cdot \mathbf{v}_a}{\|\mathbf{v}_u\| \|\mathbf{v}_a\|}
$$

## Algorithm

1. _Eligible User_ := Any.
2. _Saved Artworks_ := _Eligible User_'s most recent saved artworks (still public).
3. _Excluded Artists_ := Artists _Eligible User_ wants to see fewer artworks by.
4. _Excluded Artworks_ := Unswiped artworks in current batch and most recent $A$ artworks seen in previous batches over the last $D$ days.
5. _Recent Artists_ := Artists of last $E$ _Excluded Artworks_ or artists featured in saved artworks.
6. [if _Saved Artworks_ < $S$] _Final Recommendations_ := Top-$`N`$ random curated artwork recommendations not by _Excluded Artists_ or in _Excluded Artworks_.
7. [if _Saved Artworks_ >= $S$] _Curated picks_ := Random curated artwork recommendations not by _Excluded Artists_ or in _Excluded Artworks_.
8. [if _Saved Artworks_ >= $S$] _Query_ := Top-$S$ _Saved Artworks_.
9. [if _Saved Artworks_ >= $S$] _MLT recommendations_ := Artworks published in the last $M$ months, available for sale, not by _Excluded Artists_ or _Recent Artists_ or in _Excluded Artworks_, with BM25 scores based on _Query_.
10. [if _Saved Artworks_ >= $S$] _KNN recommendations_ := Artworks published in the last $M$ months, available for sale, not by _Excluded Artists_ or _Recent Artists_ or in _Excluded Artworks_, with KNN scores based on _Query_.
11. [if _Saved Artworks_ >= $S$] _Hybrid recommendations_ := Artworks after combining scores of _MLT recommendations_ and _KNN recommendations_ using the weighted mean $\alpha \times \widehat{\text{BM25}}(R_u, D_a) + (1-\alpha) \times \widehat{\text{similarity}}(\mathbf{v}_u, \mathbf{v}_a)$, where $\hat{f}(\cdot)$ are min-max normalized scores $\in [0, 1]$.
12. [if _Saved Artworks_ >= $S$] _Final Recommendations_ := top-$\left\lceil\frac{N}{2}\right\rceil$ _Hybrid recommendations_ and top-$\left(N-\left\lceil\frac{N}{2}\right\rceil\right)$ _Curated picks_.
