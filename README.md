# RouteRiff Lab

**Live MVP:** https://routeriff.vercel.app

RouteRiff is a second-pass itinerary checker: bring an itinerary you already have, reveal the geographic shape, fix the order, play it, share it and remix it.

## Core loop
**Paste → See → Fix → Play → Share → Remix → Book**

The first release intentionally does **not** try to be a full OTA or all-in-one AI travel planner.

## v0 features
- AI-style text / bullets / day-label / arrow / comma itinerary parsing
- Place geocoding and OpenStreetMap visualization
- Directional trip distance and travel-load estimate
- Transparent route-sanity score and warnings
- Detected-day pace warnings
- Manual stop reorder / removal
- Middle-stop route optimization
- Copyable correction prompt for ChatGPT, Claude, Gemini or another AI
- Animated trip playback
- Shareable trip URLs with embedded coordinates to reduce repeated geocoding
- Share → Remix conversion banner
- Local recent-route retention
- Contextual affiliate booking exits
- Measured affiliate redirect router
- Privacy-safe persistent funnel events
- Mobile responsive UI
- Privacy / travel-risk / affiliate disclosures
- SEO/GEO utility pages, starter routes, sitemap and llms.txt

## Affiliate exits
Current links use the user's supplied programs for:
- Trip.com
- Klook
- GetYourGuide
- Expedia
- Hotels.com
- Aviasales

Affiliate clicks are routed through a first-party redirect endpoint so a click can be measured before the traveler is sent to the provider.

## Validation gates
30-day targets:
- ≥500 targeted visits
- ≥15% start building a trip
- ≥40% of builders complete a route
- ≥15% of completed routes are shared
- ≥5% of shared-route viewers remix/copy a trip
- first attributable affiliate clicks and bookings

## Current architecture
Browser-first MVP on Vercel with small serverless endpoints for product events and affiliate redirects. Geocoding uses OpenStreetMap Nominatim only on explicit user actions and is cached locally. Privacy-safe funnel events are stored in a prefixed Supabase table with RLS; itinerary text is not stored in the event payload.

There is still no user account, cloud-saved trip library, payment processing or media upload.

## Build next only after evidence
1. Destination-aware partner deep links and booking-intent tests
2. Better day-by-day structure and route reasoning
3. Import from more itinerary formats / links
4. Public user trip pages + remix graph
5. Post-trip photos/video → travel story

> Repository name is temporary; the product brand is RouteRiff.
