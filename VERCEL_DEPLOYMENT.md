# Vercel Deployment

This project is configured for Vercel from GitHub.

## Vercel settings

- Framework Preset: **Other**
- Install Command: `bun install --frozen-lockfile`
- Build Command: `bun run build`
- Output Directory: leave empty / default
- Node.js Version: **22.x**

## Required environment variables

Add these in Vercel Project Settings → Environment Variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`

Use the same backend values from your local `.env` file. Do not commit `.env` to GitHub.

## Important

Do not set a base path like `/kingeyewearfashion/`. The app must run from `/` on Vercel, otherwise pages and assets can show 404 errors.