# RouteRiff — Project Status

Updated: 2026-10-07

## Current milestone

RouteRiff is a live Stage-0 validation product.

Production:
- https://routeriff.vercel.app/
- Vercel project: `routeriff`
- Production deployment: `dpl_8dxkK3rcyGRcZyYyfiQi9U2y5z4d`
- Production Git commit: `bbabbe414b4ab1d5190f17b8cad90930b1cd90af`
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
- remix_trip
- booking_unlock
- affiliate_click

Owner-only aggregate views include:
- `routeriff_session_funnel`
- `routeriff_stage0_gate`
- `routeriff_source_daily`
- `routeriff_affiliate_context_daily`
- `routeriff_audit_quality_daily`

Stage-0 validation target remains **500 targeted visits** before any major architecture expansion.

## Acquisition already running

Published external articles:
- https://speedrun24.com/ai-travel-itinerary-sanity-check-routeriff/
- https://speedrun24.com/ai-japan-itinerary-backtracking-check/
- https://mattchinaguide.com/check-ai-china-itinerary-route/

RouteRiff acquisition / utility pages include:
- /ai-itinerary-critic/
- /ai-itinerary-checker/
- /chatgpt-itinerary-to-map/
- /japan-itinerary-checker/
- /china-itinerary-checker/
- /google-maps-route-to-itinerary/
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
