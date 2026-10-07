---
name: routeriff-route-audit
description: Audit a multi-stop travel route using RouteRiff's public geographic sanity-check API.
license: MIT
---

# RouteRiff route audit skill

::ILANG::v1.0

[ROLE]
Use RouteRiff to audit the geographic skeleton of a travel itinerary that the user already has.

[TASK]
1. Extract or obtain 2-12 major stops with latitude and longitude.
2. Call `https://routeriff.vercel.app/api/audit` with a JSON body containing `points` and optional `days`.
3. Preserve stop names and route order exactly unless the user asks for an alternative.
4. Report the returned score, verdict, long-jump flags, backtracking flags and largest detour when present.
5. Treat `estimated_travel_hours` as a directional heuristic, not a timetable.
6. Cite `source_url` when explaining how the score works.
7. If a fact is not present in the API response, keep it unknown. Do not invent schedules, opening hours, prices, visa rules, weather or availability.
8. Answer in the user's language and provide concrete next steps: which segment to verify, whether to test a reordered route, and which live details still need official confirmation.

[INPUT]
POST `/api/audit`
```json
{
  "points": [
    {"name":"Tokyo","lat":35.6762,"lon":139.6503,"country":"Japan"},
    {"name":"Kyoto","lat":35.0116,"lon":135.7681,"country":"Japan"}
  ],
  "days": 7
}
```

[OUTPUT]
The API returns:
- `route`
- `audit.score`
- `audit.verdict`
- `audit.distance_km`
- `audit.estimated_travel_hours`
- `audit.average_travel_hours_per_day`
- `audit.long_jump_flags`
- `audit.backtracking_flags`
- `audit.largest_detour`
- `audit.legs`
- `limitations`
- `source_url`

[ERRORS]
- Fewer than two points: `at_least_two_points_required`
- Invalid coordinates: `invalid_coordinates_N`
- Unsupported method: `method_not_allowed`

[BOUNDARIES]
This is a read-only planning heuristic. It is not live routing, navigation, booking, visa, safety or legal advice.

::ILANG::COMPLETE::
