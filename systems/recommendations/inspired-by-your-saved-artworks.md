---
title: Inspired By Your Saved Artworks
description: A mobile-only surface showing artworks similar to the user's saved artworks using OpenSearch MLT.
---

"Inspired By Your Saved Artworks"&mdash;internally known as Based On User Saves&mdash; is a mobile-only recommendations surface for artworks similar to the user's recently saved ones. It uses real-time OpenSearch [More Like This](https://opensearch.org/docs/latest/query-dsl/specialized/more-like-this/) queries&mdash;the same MLT model described in [Discover Daily](./discover-daily.md#mlt-more-like-this-model)&mdash;but with different fields and parameters as shown below.

| MLT Parameter        | Similar To Works You've Viewed | Discover Daily                 |
| -------------------- | ------------------------------ | ------------------------------ |
| fields               | genes_vectors, tags_vectors    | genes, materials, tags, medium |
| min_term_freq        | 1                              | 1                              |
| max_query_terms      | 18                             | 25                             |
| min_doc_freq         | 200                            | 1                              |
| minimum_should_match | 30%                            | 30%                            |
| $k_1$                | 1.2                            | 1.2                            |
| $b$                  | 0.75                           | 0.75                           |

The sequence diagram of Inspired By Your Saved Artworks is shown below.

```mermaid
sequenceDiagram
    participant E as Eigen (Mobile)
    participant MP as Metaphysics
    participant G as Gravity
    participant OpenSearch@{ "type" : "database" }

    Note over E: User opens Home View
    E->>MP: basedOnUserSaves
    MP->>G: GET /collection/saved-artwork/artworks (3 most recent saves)
    G-->>MP: Saved artwork IDs
    alt no saved artworks
        MP-->>E: emptyConnection
    else has saved artworks
        MP->>G: GET /related/artworks?artwork_id[]=...&for_sale=true
    G->>OpenSearch: MLT query on genes_vectors, tags_vectors
    Note over OpenSearch: Aggregate by artist<br/>(1 work per artist)
    OpenSearch-->>G: 10 Similar Artworks
    G-->>MP: Artwork details
        MP-->>E: artworkConnection
    end
```

## Algorithm

1. _Saved Artworks_ := User's 3 most recent saved artworks.
2. _Career Stage_ := Career Stage Gene value (0–100) of the most recent saved artwork.
3. _Career Stage Range_ := $[0.7 \times \text{Career Stage}, 70]$ if $\text{Career Stage} \le 70$, else $[0.7 \times \text{Career Stage}, 100]$.
4. [if _Saved Artworks_ = 0] _Final Recommendations_ := Empty set.
5. [if _Saved Artworks_ > 0] _MLT Recommendations By Artist_ := Artworks available for sale, not in _Saved Artworks_, with at least 6 genes, with Career Stage gene in _Career Stage Range_, grouped by artists and sorted in descending order by BM25 score.
6. [if _Saved Artworks_ > 0] _Final Recommendations_ := Top artwork from each of the top-10 _MLT Recommendations By Artist_.

> ⓘ The Career Stage logic prevents showing blue-chip works to users that might be interested in emerging artists, but allows established artist browsers to see the full range above mid-career.
