# portfolio

Personal site, built with [Hugo](https://gohugo.io).

## Run locally

```
hugo server -D
```

Open http://localhost:1313. `-D` also shows drafts. The page reloads on save. Needs Hugo 0.169 or newer (on Windows: `winget install Hugo.Hugo.Extended`; in WSL, install the `.deb` from the Hugo releases page and add `--poll 700ms` when the project is on the Windows drive).

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

Hosted on GitHub Pages. Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site with Hugo and publishes it to https://hiroc.dev/.

One-time setup: in the GitHub repo, Settings → Pages → Source → "GitHub Actions", and Custom domain → `hiroc.dev`. DNS for hiroc.dev is on Porkbun: four A and four AAAA records for GitHub Pages, plus a `www` CNAME to `legalunicorn.github.io`.
