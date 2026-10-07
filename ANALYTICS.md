# RouteRiff analytics runbook

RouteRiff's validation analytics live in the shared Supabase project under objects prefixed with `routeriff_`.

## Privacy boundary
The event stream stores:
- event name
- anonymous session ID
- source label / campaign source
- page path
- small non-sensitive metadata such as stop count, score, partner name, or saved-percent

It does **not** store the itinerary text in the event table.

## Source objects
- `public.routeriff_events` — raw event stream, RLS enabled
- `public.routeriff_funnel_daily` — daily events and distinct sessions
- `public.routeriff_source_daily` — acquisition source rollup
- `public.routeriff_session_funnel` — one row per anonymous session with funnel flags

Anonymous users can insert events through the public application flow but cannot select the raw table or the aggregate views.

## Core funnel
1. `page_view`
2. `builder_engaged` — first focus/click on the route builder in a session
3. `build_start`
4. `trip_built`
5. `play_trip`
6. `copy_fix_prompt`
7. `copy_audit_summary`
8. `share_trip`
9. `share_visit`
10. `remix_trip`
11. `affiliate_click`

Supporting interaction events:
- `file_import`
- `copy_normalize_prompt`
- `booking_unlock`
- `audit_helpful`
- `audit_not_helpful`
- `optimize_route`
- `manual_reorder`
- `remove_stop`
- `recent_route_open`
- `share_card`

## CEO metrics
For a selected period:

### Acquisition
- unique sessions
- sessions by source
- share-generated sessions
- SEO landing-page sessions

### Activation
- build-start rate = sessions with build_start / sessions with page_view
- build completion = sessions with trip_built / sessions with build_start
- play rate = sessions with play_trip / sessions with trip_built

### Utility
- normalize prompt rate = copied_normalize_prompt / viewed
- fix-prompt copy rate = copied_ai_fix / built_trip
- audit helpful rate = audit_helpful / (audit_helpful + audit_not_helpful)
- optimize/reorder/remove interaction rate

### Distribution
- share rate = shared / built_trip
- share-card rate = shared_card / built_trip
- share→remix rate = remixed sessions among sessions that arrived via share

### Commercial
- affiliate CTR = affiliate_clicked / built_trip
- clicks by partner and acquisition source
- eventual partner-reported booking conversions

## 30-day gates
- ≥500 targeted visits
- ≥15% build-start rate
- ≥40% build completion
- ≥15% share rate
- ≥5% share→remix
- first attributable affiliate clicks
- first attributable affiliate bookings

## Decision rules
- Low build start → improve positioning/onboarding before adding features.
- High build, low play/fix interactions → the checker is not useful enough.
- High play/fix, low share → output is useful privately but weak as distribution.
- High share, low remix → the Remix growth thesis is weak.
- High remix, low affiliate click → booking layer is too early, irrelevant, or poorly framed.
- High clicks, low bookings → partner fit, attribution, price, inventory, or trust issue.
- Strong share/remix → invest in public trip pages and remix graph.
- Strong repeated sessions → consider accounts and cloud-saved trips.
- Weak metrics across the funnel after sufficient targeted traffic → pivot the wedge rather than expanding features.

## Partner attribution
All booking cards point to the first-party `/api/go?partner=...` endpoint. The endpoint logs the affiliate click and then redirects only to a hard-coded approved partner URL. It does not accept arbitrary redirect destinations.


## Analytics quality and validation baseline

The public event endpoint filters obvious crawler, preview, prefetch, Lighthouse/PageSpeed and headless user-agent traffic before writing analytics. This is intentionally conservative and does not claim perfect bot detection.

`builder_engaged` is emitted once per browser session when the visitor first focuses or clicks into the route-building workflow. It separates a weak landing-page view from a visitor who actually touches the product.

Early pre-filter traffic is preserved rather than deleted. The clean Stage-0 validation cohort starts at:

- UTC: **2026-10-07 07:22:00**
- product commit: `b2aa303eb868a9303931f2c446fdf060ccd51120`
- production deployment: `dpl_HkbffPwxHwksvDjgh5yhwt2W4Kqq`

Use these owner-only views for go/no-go decisions:
- `routeriff_validation_baseline`
- `routeriff_validation_sessions`
- `routeriff_validation_stage0`
- `routeriff_validation_source_funnel`

The older aggregate views remain useful for diagnostics and historical comparison, but the validation views are the authoritative Stage-0 cohort.

### Activation diagnostic

In addition to build-start rate, track:
- builder engagement rate = `engaged_sessions / viewed_sessions`
- engaged → build rate = `build_sessions / engaged_sessions`

Interpretation:
- low engagement → landing-page promise / CTA / audience mismatch;
- healthy engagement but low build start → input UX or example/default-route problem;
- healthy build start but low completion → geocoding/parser/product reliability problem.
