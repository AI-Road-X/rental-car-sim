# RouteRiff market note — 2026-10-06

## What changed after competitive review

The "paste a ChatGPT itinerary and put it on a map" feature is already a category, not a moat.

Current examples:
- Wanderlog — full travel-planning suite with map view, collaboration, reservations and Pro route optimization: https://wanderlog.com/
- GoWANDR — explicitly maps pasted ChatGPT/blog/friend itineraries and adds walking/transit times: https://play.google.com/store/apps/details?id=today.gowandr
- Treader — maps ChatGPT/Claude day-by-day plans and checks timing feasibility, sunset and missing overnight stays: https://www.treader.ca/
- TripSapien — checks ChatGPT itineraries against date-specific place details such as hours/closure signals and neighborhood fit: https://www.tripsapien.com/check/chatgpt-itinerary
- TravelViz — imports AI plans into a visual itinerary with budget/price/collaboration positioning: https://www.travelviz.ai/

## User pain seen in community discussions

The recurring problem is not "I cannot get AI to generate an itinerary." It is:
- AI plans can look convincing while being physically unrealistic.
- travelers worry about overpacked routes and too many hotel changes;
- users still have to verify travel times, real locations, opening hours, prices and live logistics;
- general AI often agrees with the user's plan instead of pushing back;
- travelers ask communities for an itinerary sanity check before committing money.

## RouteRiff strategic consequence

Do **not** compete as another all-in-one AI trip planner.

RouteRiff's Stage-0 wedge is now:

**AI planned it. RouteRiff pushes back.**

The product is a second-pass critic for the geographic skeleton of a trip:
1. Bring any existing itinerary.
2. Stress-test the route shape.
3. Surface long jumps, backtracking and travel-heavy pacing.
4. Reorder/remove/optimize stops.
5. Copy a correction prompt back to the user's preferred AI.
6. Share a remixable route artifact.
7. Only then move into booking exits.

## Why this wedge is still worth testing

It is narrower than Wanderlog / TravelViz and avoids competing with ChatGPT on generation.

The correction loop is intentionally model-agnostic:
**AI draft → RouteRiff critique → AI correction → verification → booking**

The near-term validation question is not whether the map is attractive. It is whether people:
- build a route,
- use the critique/fix controls,
- copy the AI-fix prompt,
- share/share-card the audit,
- create remixes,
- click booking partners after fixing the plan.

## What not to claim yet

RouteRiff does not yet verify:
- live transit schedules,
- real road routing,
- current opening hours,
- visa/entry rules,
- current prices or inventory,
- sold-out tickets,
- real-time weather or closures.

Those are potential Stage-1 data integrations only after Stage-0 shows demand.

## Defensibility path if Stage-0 works

The long-term asset is not the UI. It would be a growing corpus of:
- route structures that users accept/reject,
- common failure patterns by destination and trip length,
- before/after route fixes,
- share/remix behavior,
- booking-intent behavior after specific audit warnings.

That data could eventually support a stronger executable-trip audit, but only after enough real usage exists.
