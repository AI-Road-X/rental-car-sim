# TripRemix Lab

**Live MVP:** https://tripremix-lab.vercel.app

TripRemix turns a rough itinerary into a visual, playable and shareable trip.

## Core loop
**Paste → See → Fix → Play → Share → Remix → Book**

The first release intentionally does **not** try to be a full OTA or all-in-one travel planner. It validates the highest-risk behavior: whether a visual trip becomes useful enough to share and remix.

## v0 features
- Free-text / arrow / comma itinerary parsing
- Place geocoding and OpenStreetMap visualization
- Directional trip distance and travel-load estimate
- Simple route-sanity score and warnings
- Animated trip playback
- Shareable trip URLs
- Remix workflow
- Affiliate booking exits for Trip.com, Klook, GetYourGuide, Expedia and Aviasales
- Mobile responsive UI
- Privacy / travel-risk / affiliate disclosures

## Validation gates
30-day targets:
- ≥500 targeted visits
- ≥15% start building a trip
- ≥40% of builders complete a route
- ≥15% of completed routes are shared
- ≥5% of viewers remix/copy a trip
- first attributable affiliate clicks and bookings

## Current architecture
Static browser-first MVP on Vercel. Geocoding uses OpenStreetMap Nominatim on explicit user actions and is cached in localStorage. No user account, server database, payment processing or media upload is enabled yet.

## Next build only after evidence
1. Real event analytics and affiliate click attribution
2. Day-by-day itinerary parser and route optimizer
3. AI import from pasted travel text / links
4. Public trip pages + remix graph
5. Post-trip photos/video → travel story

> Repository name is temporary; the product codename is TripRemix.
