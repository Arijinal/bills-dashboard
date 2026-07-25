# Deploy Checklist — road to public launch

Target: live before **Sun Sept 13, 2026** (season opener at Houston);
ideal: live before **Thu Sept 17** (first game at the new Highmark
Stadium — peak traffic moment for Bills content).

## State (as of Saga v3.26, 2026-07-24)

- Static Vite SPA, no backend, no env vars. `vite build` → `dist/`, clean.
- `vercel.json` in repo: build config, SPA rewrite, immutable caching for
  hashed assets, 1-day caching for media.
- `index.html` carries full meta/OG/Twitter tags + favicon; `og-image.jpg`
  (1200×630) generated from the hero art.
- Tests: `npm test` (30 green). Install needs `--legacy-peer-deps`
  (documented @react-three/fiber peer-dep quirk).

## Operator steps (in order)

1. **Pick the name** — docs/BRAND.md shortlist. (~30 min)
2. **Buy the domain.** (~10 min)
3. **Deploy**: `vercel` from repo root (framework auto-detects Vite), or
   import the GitHub repo in the Vercel dashboard. Attach the domain.
4. **Absolute OG URLs**: swap `og:image`/`twitter:image` in `index.html`
   to `https://<domain>/og-image.jpg` and redeploy (scrapers need
   absolute URLs; relative works in-browser only).
5. **Tip jar**: create the Stripe Payment Link, paste into
   `DispatchScene.jsx` `TIP_URL` (loud comment marks the spot). The CTA
   stays hidden until a real URL is present.
6. **Push** main + tags to origin.
7. **Soft launch**: post Uncle Jr.'s dispatch to r/buffalobills on a
   Sunday morning per the standing punch list.

## Engineering rounds still recommended before launch

| Round | What | Why |
|-------|------|-----|
| Image optimization | `public/` holds ~55 MB of PNG (chapter-franchise-allen.png alone is 15 MB) + 6.8 MB hero mp4. Convert to WebP/AVIF with per-chapter visual-parity checks, add `loading="lazy"` below the fold, consider poster-frame fallback for the video. | Mobile first-load is unacceptable at 55 MB; this is the single biggest launch-quality item left. |
| Prod smoke on Vercel preview | Chapter jumps, SeasonPulse tick, Trial of the Ten, PropheticWall localStorage on the deployed preview URL. | Dev-server behavior ≠ CDN behavior. |
| Analytics decision | None wired today. If wanted: Vercel Analytics (zero-config, privacy-light). | Know whether the soft launch actually landed. |

## Deliberately deferred (audience-signal gated)

- PropheticWall real backend (Supabase) — fan tags are localStorage-only;
  build only if the soft launch shows engagement.
- Live data feeds (schedule/news/injuries) — the SeasonPulse clock is the
  honest live layer for now; feeds are a season-time decision.
