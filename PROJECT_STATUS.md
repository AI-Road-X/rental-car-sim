# RouteRiff — Project Status

Updated: 2026-10-07

## Current milestone

RouteRiff is a live Stage-0 validation product.

Production:
- https://routeriff.vercel.app/
- Vercel project: `routeriff`
- Production deployment: `dpl_HkbffPwxHwksvDjgh5yhwt2W4Kqq`
- Production Git commit: `b2aa303eb868a9303931f2c446fdf060ccd51120`
- Deployment state: READY

The legacy `tripremix.vercel.app` domain remains attached and is redirected by project configuration to the RouteRiff canonical host.

## Positioning

**AI planned it. RouteRiff pushes back.**

RouteRiff is not another general AI trip planner. It is a second-pass critic for an itinerary the traveler already has.

Core loop:

Paste / import → See → Critique → Fix → Play → Share → Remix → Verify → Book

## Product currently available

### Inputs
- One stop per line
- Arrow / bullet / common AI itinerary lines
- Optional trip-day count
- Local TXT / Markdown import
- Common CSV city/place-column import
- Full Google Maps directions URLs
- Google Maps short-link expansion through a Google-host-only resolver
- Apple Maps start/destination URLs
- Model-agnostic cleanup prompt for long AI answers

### Audit
- Straight-line route distance
- Rough travel-load heuristic
- Long-jump warnings
- Backtracking detection
- Largest-detour-stop explanation
- Day-count pacing signal
- Multi-country hop warning
- Route sanity score + plain-language verdict

### Fix
- Manual stop reorder
- Remove stop
- Start/end-preserving nearest-neighbor optimizer
- Local 2-opt improvement pass
- Before/after distance comparison
- Revert optimization
- Copyable correction prompt for ChatGPT, Claude, Gemini or another AI

### Distribution / reuse
- Animated journey playback
- Shareable route URLs with embedded coordinates
- Country and day context preserved in shares
- Social share-card export
- Dynamic social share unfurl
- Remix flow
- Recent routes stored locally
- One-click local RouteRiff data clearing

### Commercial handoff
- Affiliate exits: Trip.com, Klook, GetYourGuide, Expedia, Hotels.com, Aviasales
- Booking choices are gated behind review when the route still has warnings
- Affiliate clicks carry coarse route-quality context but not itinerary text
- Affiliate economics do not affect the audit score

## Analytics

Supabase project: `gpbfyrwbxozahqwgbzie`

Privacy-safe event funnel includes:
- page_view
- builder_engaged
- build_start
- trip_built
- copy_normalize_prompt
- file_import
- play_trip
- optimize_route
- manual_reorder
- remove_stop
- copy_fix_prompt
- audit_helpful / audit_not_helpful
- share_trip / share_card / share_visit
- copy_audit_summary
- remix_trip
- booking_unlock
- affiliate_click

Owner-only aggregate views include:
- `routeriff_session_funnel`
- `routeriff_stage0_gate`
- `routeriff_source_daily`
- `routeriff_affiliate_context_daily`
- `routeriff_audit_quality_daily`
- `routeriff_validation_baseline`
- `routeriff_validation_sessions`
- `routeriff_validation_stage0`
- `routeriff_validation_source_funnel`

Stage-0 validation target remains **500 targeted visits** before any major architecture expansion.

## Acquisition already running

Published external articles:
- https://speedrun24.com/ai-travel-itinerary-sanity-check-routeriff/
- https://speedrun24.com/ai-japan-itinerary-backtracking-check/
- https://speedrun24.com/google-maps-route-itinerary-sanity-check/
- https://speedrun24.com/is-my-travel-itinerary-too-rushed/
- https://speedrun24.com/check-ai-travel-itinerary-backtracking/
- https://mattchinaguide.com/check-ai-china-itinerary-route/
- https://mattchinaguide.com/beijing-xian-chengdu-shanghai-best-route-order/

RouteRiff acquisition / utility pages include:
- /ai-itinerary-critic/
- /ai-itinerary-checker/
- /chatgpt-itinerary-to-map/
- /japan-itinerary-checker/
- /china-itinerary-checker/
- /google-maps-route-to-itinerary/
- /is-my-itinerary-too-rushed/
- /optimize-travel-itinerary-route/
- /travel-route-visualizer/
- /itinerary-map-maker/
- /trip-distance-calculator/
- /examples/ai-itinerary-fails/
- starter trip pages

IndexNow submission runs through GitHub Actions.

## Reliability

GitHub Actions smoke tests cover:
- homepage JS syntax
- serverless endpoint syntax
- required DOM ids
- canonical URL / sitemap consistency
- legacy-brand leakage
- route parsing
- CSV parsing
- Google Maps URL parsing
- optimizer behavior
- agent discovery artifact validity
- Agent Skill SHA256 digest
- public audit API behavior

Daily production health workflow checks the public homepage, health endpoint and sitemap.

## Agent / GEO interface

Public read-only route-audit interface:
- `/api/audit`
- `/openapi.json`
- `/.well-known/api-catalog`
- `/.well-known/ai-catalog.json`
- `/.well-known/agent-skills/index.json`
- `/ai/skills/route-audit/SKILL.md`
- `/ai/index.ilang`
- `/ai/`

The public API exposes the same type of geographic heuristic as the product. It does not expose accounts, payments, admin access, arbitrary URL fetching or live travel facts.

## Explicit Stage-0 non-goals

Do not add yet:
- user accounts
- native mobile apps
- OTA checkout
- paid AI generation
- social feed
- large photo/video storage
- subscriptions
- heavy live-data contracts
- full post-trip movie pipeline

Those require behavioral evidence first.

## Stage-0 gate

Primary questions:
1. Do visitors build a route?
2. Do they accept the critique as useful?
3. Do they fix/reorder the route?
4. Do they copy the correction prompt?
5. Do they share the audit?
6. Do shared visitors remix it?
7. Do corrected/reviewed routes create booking intent?

If those signals stay weak after meaningful targeted traffic, change the wedge before building a larger travel platform.


## Deployment hygiene — 2026-10-07

The Vercel Hobby project hit its daily API deployment limit after many small validation commits. Production has since caught up and is healthy. The mitigation remains in place so future documentation-only commits do not waste the deployment budget.

Mitigations now in place:
- Preview deployments disabled for this project.
- Vercel Ignored Build Step points to `.vercel-ignore.sh`.
- Documentation / research-only commits are skipped by Vercel.
- Product/runtime/discovery changes still trigger production builds.
- A one-time deploy nudge remains scheduled as a fallback, but should do nothing useful if production remains current.
- Production health is blocking for the homepage, sitemap, route-audit API, direct Markdown agent document and agent discovery resources.
- Homepage Accept-header Markdown negotiation was removed after live verification showed Vercel continued serving static HTML; RouteRiff exposes a dedicated Markdown endpoint instead.

Do not manually spam deployments. Preserve the daily deployment budget for real product changes.


## External content SEO cleanup — 2026-10-07

Speedrun24:
- RouteRiff acquisition posts are grouped under **AI Travel Planning**.
- Shared tags: **RouteRiff** and **AI itinerary**.
- Latest checked RouteRiff article scores 100/100 on the WordPress SEO audit.

Matt China Guide:
- RouteRiff China articles are grouped under **Before You Go** + **Getting Around**.
- Shared tags: **China itinerary** + **Route planning**.
- Custom robots output was cleaned so it uses standard robots directives; AI resource discovery remains available elsewhere on the site.
- Fresh mobile SEO audit after the robots cleanup: 100/100.
- Yoast meta descriptions were explicitly set on the two RouteRiff acquisition articles.

The acquisition strategy remains problem-specific content rather than generic AI-tool list traffic.


## Clean Stage-0 baseline — 2026-10-07

The first 16 stored page-view sessions were collected before bot/prefetch filtering and before there was a builder-engagement diagnostic. They are preserved for auditability, not deleted.

A clean validation cohort now starts at **2026-10-07 07:22:00 UTC**, immediately after production deployment `dpl_HkbffPwxHwksvDjgh5yhwt2W4Kqq` made commit `b2aa303eb868a9303931f2c446fdf060ccd51120` live.

From this point:
- obvious crawler / preview / prefetch traffic is dropped server-side;
- `builder_engaged` distinguishes visitors who touch the product from passive page views;
- `routeriff_validation_stage0` is the authoritative 500-visit validation gate;
- historical views are retained for debugging only.

Baseline counts began at zero. Do not interpret the earlier 16 page views as evidence of product-market behavior.
