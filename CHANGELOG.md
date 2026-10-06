# Changelog

## Stage 0 — RouteRiff

### 2026-10-06
- Rebranded the MVP from TripRemix to RouteRiff to avoid confusion with an existing travel company.
- Sharpened positioning from "visual itinerary map" to **AI itinerary critic / second-pass route sanity checker**.
- Added AI-style itinerary parsing, map visualization, rough distance/travel-load estimates and a transparent route-sanity score.
- Added long-jump, backtracking and pace warnings.
- Added manual stop reorder/removal and simple middle-stop optimization.
- Added a copyable correction prompt for ChatGPT, Claude, Gemini or another AI.
- Added animated route playback.
- Added shareable/remixable URLs with embedded coordinates to reduce repeat geocoding.
- Added dynamic share-unfurl endpoint and social share-card generation.
- Added recent-route local retention.
- Added direct audit usefulness feedback (`audit_helpful` / `audit_not_helpful`).
- Added affiliate booking exits through a measured first-party redirect router.
- Added privacy-safe persistent event storage in Supabase with owner-only aggregate views.
- Added Stage-0 funnel/gate dashboard SQL views.
- Added SEO/GEO utility pages, starter routes, sitemap, structured data and llms.txt.
- Published the first acquisition article on speedrun24.com.
- Added competitor research, launch pack and short-video distribution pack.
- Added GitHub Actions smoke checks for the frontend and serverless endpoints.
- Added legacy-host redirect from tripremix.vercel.app to routeriff.vercel.app.
- Production remains on the last successful Vercel deploy while the Hobby daily deployment quota is exhausted; queued GitHub commits are covered by passing smoke checks and will deploy after quota reset.
