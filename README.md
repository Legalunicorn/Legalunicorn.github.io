# portfolio

Personal site, built with [Hugo](https://gohugo.io).

## Run locally

```
winget install Hugo.Hugo
hugo server -D
```

Open http://localhost:1313. `-D` also shows drafts. The page reloads on save.

## Where things are

| What | File |
| --- | --- |
| About text | `content/_index.md` |
| Links, email, avatar, typing words | `hugo.toml` (`[params]`) |
| Avatar image | `assets/images/avatar.png` |
| Icons | `assets/icons/*.svg` |
| Projects | `data/projects.toml` |
| Tools section | `data/skills.toml` (logos in `static/icons/tools/`) |
| Styles | `assets/css/style.css` |
| Page templates | `layouts/` |

## Writing a blog post

```
hugo new content posts/my-post.md
```

Posts start as drafts. Set `draft: false` to publish. Use fenced code blocks with a language (` ```cpp `) for highlighting, `$...$` for inline math and `$$...$$` for display math. `content/posts/example.md` shows the syntax.

## Deploy

Hosted on Cloudflare Pages (free plan), which rebuilds the site on every push to `main`.

One-time setup in the Cloudflare dashboard (Workers & Pages → Create → Pages → Connect to Git):

| Setting | Value |
| --- | --- |
| Framework preset | Hugo |
| Build command | `hugo --gc --minify` |
| Build output directory | `public` |
| Environment variable | `HUGO_VERSION` = `0.169.0` |

Then add `hiroc.vip` under the project's Custom domains.
