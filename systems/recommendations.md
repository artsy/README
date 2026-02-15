---
title: Algorithmic Recommendations @ Artsy
description: Documentation about algorithmic recommendations of entities such as artworks and artists to users.
---

Algorithmic recommendations surfaces (henceforth, just recommendations surfaces) are UI components featuring a list of entities (e.g., artworks, artists) produced by algorithms that transform user signals (e.g., views, follows, saves, purchases etc) into scores for selecting and ranking such entities&mdash;rather than _exclusively_ reflecting user inputs (e.g., filters, budget preferences) or contextual metadata (e.g., location). The scores produced by these algorithms typically represent the user's preference for each entity.

An overview of the recommendations surfaces by channel at Artsy is shown below.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="recommendations/images/recs_surf_dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="recommendations/images/recs_surf_light.svg">
  <img alt="recommendations surfaces by channel" src="recommendations/images/recs_surf_light.svg">
</picture>

In the field of Information Retrieval, recommender systems are sometimes referred to as active filtering (i.e., push content), whereas traditional search engines are passive filtering (i.e., pull content), but the key distinctive principle is the <ins>transformation of user signals into scores</ins>. Recommendations infer preferences by processing behavioural, transactional, or engagement signals through scoring models (including simple heuristics). This contrasts with components that directly surface entities based on explicit user actions or contextual metadata.

For example, "Shows For You" are not recommendations because they exclusively utilize the user's location to return nearby shows. Although less obvious, "Galleries for You" is also not a recommendations surface. While it shows galleries that have published artworks by artists the user follows sorted by proximity, it utilizes _follows_ as a constrained search without transforming this signal into a score. More formally, $\text{distance}(\text{user}, \text{gallery})$ is the scoring function powering "Galleries for You" which&mdash;arguably&mdash;does not reflect the user's preferences. For it to be recommendations it would need a function such as $\text{affinity}(\text{user}, \text{gallery})$.

An even more striking counter-example is "Sort By: Recommended"&mdash;the default artwork sorting option that utilize a function akin to $\text{merchandisability}(\text{artwork})$. Despite its displayed text, this is not a recommendations system. The [🔒 merchandisability heuristic](https://github.com/artsy/gravity/blob/5524122/app/models/search/queries/filtered_query.rb#L30-L45) combines several metrics including a Machine Learning (ML) generated base score and an exponential decay as a function of time since publication. However, all these factors are properties of the artwork itself&mdash;not transformations of a single user signals into preference scores. This example illustrates that algorithmic complexity does not determine whether something is a recommendations system.

One final note on the scope of this documentation. Curated recommendations&mdash;such as those surfaced in "Curators’ Picks"&mdash;are obviously excluded. While not algorithmic, they serve an important role as a backfill or contingency, for example to mitigate the new-user case of the [cold-start problem](<https://en.wikipedia.org/wiki/Cold_start_(recommender_systems)>).

Before discussing the algorithms, we need to clarify what constitutes a recommendation algorithm. We mentioned it at the beginning, but now it's time to be more precise. A recommendation algorithm is typically composed of three distinct phases:

1. **Candidate Generation**: Filtering the item space to a manageable set of candidates (e.g., artworks published in the last 30 days, excluding already-seen items).
2. **Scoring**: Assigning a relevance score to each candidate based on user signals and item properties.
3. **Re-ranking**: Applying business rules, diversity constraints, or presentation logic to the scored candidates (e.g., interleaving artists, injecting curated picks).

The workhorse of any algorithm is undoubtedly its **scoring function**&mdash;the component that transforms user signals into preference scores. However, what happens before and after scoring is also important, even if technically optional. In principle, you could score all available items, rank them accordingly, and call it a day. In practice, candidate generation keeps computation tractable, and re-ranking ensures the final list meets product requirements.

These components are loosely coupled, so it's common to reuse the same scoring function across different algorithms. The diagram below illustrates these relationships.

```mermaid
graph LR
    subgraph Models [Scoring Models]
        M1[User Artist Affinity]
        M2[Genomic-based Filtering]
        M3[OpenSearch More Like This]
        M4[OpenSearch k-NN]
        M5[Collaborative Filtering]
        M6[Hybrid Filtering]
    end

    subgraph Algos [Algorithms]
        A1[New Works For You]
        A2[Discover Daily]
        A4[Similar To Works You've Viewed]
        A5[Inspired By Your Saved Artworks]
        A3[Recommended Artists]
        A6[We Think You'll Love]
    end

    M1 --> A1
    M2 -.->|backfill| A1
    M3 --- M3+M4((＋))
    M4 --- M3+M4
    M3+M4 --> A2
    M2 --> A4
    M2 --> A5
    M5 --> A3
    M5 -.->|backfill| A6
    M6 --> A6

```

To read more about each algorithm and its scoring models, head over to their dedicated pages.

- [New Works For You (and Lots For You)](recommendations/new-works-for-you.md)
- [Discover Daily](recommendations/discover-daily.md)
- [Recommended Artists](recommendations/recommended-artists.md)
- [Similar To Works You've Viewed](recommendations/similar-to-works-youve-viewed.md)
- [Inspired By Your Saved Artworks](recommendations/inspired-by-your-saved-artworks.md)
- [We Think You'll Love](recommendations/we-think-youll-love.md)

> ⓘ We'll introduce each scoring model in the context of the algorithm that uses it. To avoid repetitions, we'll discuss it once in one of the algorithms and then reference it in the others.
