# RouteRiff

**Live:** https://routeriff.vercel.app

**Positioning:** **AI planned it. RouteRiff pushes back.**

RouteRiff is a free second-pass critic for travel itineraries you already have. Paste or import the major stops, see the route on a map, catch geographic problems, fix the order, then send a correction prompt back to ChatGPT, Claude, Gemini or another AI.

## Core loop

**Bring itinerary → Map → Critique → Fix → Play → Share → Remix → Verify → Book**

RouteRiff intentionally does **not** try to replace a full travel planner, live navigation engine or OTA.

## What works today

### Input
- AI-style day labels, bullets, arrows and stop lists
- Optional trip-day count for pacing context
- Local TXT / Markdown import
- Local common CSV import
- Full Google Maps directions URLs
- Safe Google Maps short-link expansion
- Apple Maps start/destination URLs
- Cleanup prompt for long AI answers

### Critique
- Straight-line trip distance
- Rough travel-load heuristic
- Very long-leg warnings
- Backtracking detection
- Largest-detour-stop explanation
- Day-count pacing warning
- Multi-country hop warning
- Route sanity score + plain-language verdict

### Fix
- Manual reorder / remove
- Start/end-preserving nearest-neighbor optimizer
- Local 2-opt improvement pass
- Before/after distance comparison
- Revert optimization
- Copyable AI correction prompt

### Share / reuse
- Animated trip playback
- Shareable URLs with embedded coordinates
- Country/day context preserved in shares
- Social share-card export
- Copyable audit summary for forums and group chats
- Share → Remix flow
- Local recent-route history
- One-click local RouteRiff data clearing

### Commercial handoff
- Affiliate exits for Trip.com, Klook, GetYourGuide, Expedia, Hotels.com and Aviasales
- Booking options are gated behind review when the route still has warnings
- Affiliate economics do not affect the route-sanity score

## Important limitation

RouteRiff is a **planning heuristic**.

It does **not** currently verify:
- exact road routing;
- live train or flight schedules;
- visa / border requirements;
- attraction opening hours;
- weather or closures;
- live prices or inventory.

Those details still need official sources before booking.

## Public agent / GEO interface

RouteRiff exposes the same bounded read-only route-audit task through public machine-readable resources:

- API: https://routeriff.vercel.app/api/audit
- OpenAPI: https://routeriff.vercel.app/openapi.json
- API catalog: https://routeriff.vercel.app/.well-known/api-catalog
- AI resource manifest: https://routeriff.vercel.app/.well-known/ai-catalog.json
- Agent Skills index: https://routeriff.vercel.app/.well-known/agent-skills/index.json
- Route-audit skill: https://routeriff.vercel.app/ai/skills/route-audit/SKILL.md
- I-Lang instructions: https://routeriff.vercel.app/ai/index.ilang
- Human docs: https://routeriff.vercel.app/ai/

The homepage also feature-detects WebMCP and registers:
- `routeriff.get_current_audit`
- `routeriff.load_route`

No fake auth, fake MCP server or fake commerce protocol is claimed.

## Privacy

The MVP is browser-first.

- itinerary text is not stored in analytics;
- imported TXT/MD/CSV files are read locally in the browser;
- recent routes and geocoding cache are local browser data;
- coarse product events are stored in Supabase;
- the user can clear RouteRiff local data from the footer.

## Validation gates

Stage-0 target before major architecture expansion:

- **≥500 targeted visits**
- **≥15%** start building a trip
- **≥40%** of builders complete a route
- **≥15%** of completed routes are shared
- **≥5%** of shared-route visitors remix
- direct audit usefulness signal
- first attributable booking-intent / affiliate clicks

Primary product events include:
`trip_built`, `audit_helpful`, `copy_fix_prompt`, `copy_audit_summary`, `share_trip`, `share_card`, `remix_trip`, `booking_unlock`, `affiliate_click`.

## Acquisition already live

Utility / landing pages include:
- https://routeriff.vercel.app/ai-itinerary-critic/
- https://routeriff.vercel.app/japan-itinerary-checker/
- https://routeriff.vercel.app/china-itinerary-checker/
- https://routeriff.vercel.app/is-my-itinerary-too-rushed/
- https://routeriff.vercel.app/google-maps-route-to-itinerary/
- https://routeriff.vercel.app/examples/ai-itinerary-fails/

External acquisition content is live on speedrun24.com and mattchinaguide.com.

## Build next only after evidence

Do not add accounts, native apps, OTA checkout, subscriptions, heavy live-data contracts or a full post-trip movie pipeline until the Stage-0 funnel shows real pull.

If the audit → fix → share/remix loop works, the next meaningful product layer is live factual verification around the route rather than another itinerary generator.

> The repository name is legacy/temporary. The product brand is **RouteRiff**.
