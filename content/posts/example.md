---
title: "Example post"
date: 2026-11-02
draft: true
---

This draft shows what posts support. It only appears with `hugo server -D` and is never published.

## Code

Fenced blocks with a language name are highlighted:

```cpp
// find with path halving
int find(std::vector<int>& p, int x) {
    while (p[x] != x) x = p[x] = p[p[x]];
    return x;
}
```

## Math

Inline math goes between single dollar signs: $O(n \log n)$. Display math goes between double dollar signs:

$$
\sum_{i=1}^{n} \frac{1}{i} = \ln n + O(1)
$$

Write `\$` for a literal dollar sign.
