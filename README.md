# Web Portfolio

A multi-site workspace: every website in `websites/` is published under its own URL path on **one Vercel deployment**, with **Supabase** as the shared backend.

## Live URLs

**https://web-portfolio-three-xi.vercel.app**

| Path | What |
|------|------|
| `/` | Portfolio hub — lists all sites |
| `/example-site/` | Individual site (one folder = one path) |
| `/your-site/` | Any new site you add |

All sites share: `your-project.vercel.app`

## Structure

```
websites/
  _template/     Copy to start a new site (not deployed)
  example-site/  Sample site
shared/          Hub styles, Supabase client helpers
api/             Vercel serverless (Supabase config endpoint)
supabase/        Database migrations
scripts/         Build script — packages all sites for one Vercel deploy
```

## Adding a new website

1. Copy `websites/_template` → `websites/your-site-name`
2. Edit the HTML/CSS/JS in that folder
3. Register the site in Supabase (`portfolio_sites` table) or add to `sites.json`
4. Push to GitHub — Vercel rebuilds automatically (`node scripts/vercel-build.mjs` runs on deploy)

No manual routing edits. The build discovers every folder in `websites/` (except `_template`) and publishes each at `/{folder-name}/`.

## Supabase

Project: **web-portfolio** (`bryqxejppsixzfglokio`) — org: **HyjinnxDev's Org**

- Table: `portfolio_sites` — slug, title, description, published flag
- Public read via RLS for published sites
- Hub page loads the site list from Supabase (falls back to `sites.json`)

Dashboard: https://supabase.com/dashboard/project/bryqxejppsixzfglokio

## Vercel environment variables

Set these in the Vercel project → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `SUPABASE_URL` | `https://bryqxejppsixzfglokio.supabase.co` |
| `SUPABASE_ANON_KEY` | Your anon or publishable key from Supabase → Settings → API |

## Local development

```bash
npm run build    # package sites for Vercel
npm run dev      # preview static output locally
```

For Supabase locally, copy `.env.example` to `.env` and run `npx vercel dev` (loads env + API routes).

## GitHub & Cursor Mobile

https://github.com/HyjinnxDev/Web-Portfolio

Clone on Cursor Mobile, add a site folder, push — Vercel deploys all sites together.
