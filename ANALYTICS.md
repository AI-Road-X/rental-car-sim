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
2. `build_start`
3. `trip_built`
4. `play_trip`
5. `copy_fix_prompt`
6. `share_trip`
7. `share_visit`
8. `remix_trip`
9. `affiliate_click`

Supporting interaction events:
- `optimize_route`
- `manual_reorder`
- `remove_stop`
- `recent_route_open`

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
- fix-prompt copy rate = copied_ai_fix / built_trip
- optimize/reorder/remove interaction rate

### Distribution
- share rate = shared / built_trip
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
