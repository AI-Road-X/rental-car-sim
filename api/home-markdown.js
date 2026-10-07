export default function handler(req,res){
  if(!["GET","HEAD"].includes(req.method)) return res.status(405).end();
  const body=`# RouteRiff

**AI planned it. RouteRiff pushes back.**

RouteRiff is a second-pass critic for travel itineraries you already have. It turns the major stops into a visual route, surfaces geographic backtracking and travel-heavy structure, lets you reorder or remove stops, and creates a correction prompt you can send back to any AI.

## Main task

Paste or import the major stops from ChatGPT, Claude, Gemini, a blog, spreadsheet, Google Maps route or your own notes.

RouteRiff currently checks:

- rough straight-line distance;
- estimated travel load using simple transport-mode heuristics;
- very long jumps;
- likely backtracking;
- the largest detour stop;
- trip-day pacing when a day count is available;
- repeated country changes.

## Important limits

RouteRiff is **not** live navigation or a timetable.

It does not verify current train times, road routes, flights, visas, border rules, weather, opening hours, prices, ticket inventory or availability. Use official sources for those facts before booking.

## Human product

- [Open RouteRiff](https://routeriff.vercel.app/)
- [How the Route Sanity Score works](https://routeriff.vercel.app/how-route-score-works/)
- [AI itinerary critic](https://routeriff.vercel.app/ai-itinerary-critic/)
- [Japan itinerary checker](https://routeriff.vercel.app/japan-itinerary-checker/)
- [China itinerary checker](https://routeriff.vercel.app/china-itinerary-checker/)
- [Google Maps route import](https://routeriff.vercel.app/google-maps-route-to-itinerary/)

## Public agent interface

- [Markdown overview](https://routeriff.vercel.app/api/home-markdown)
- [OpenAPI](https://routeriff.vercel.app/openapi.json)
- [API catalog](https://routeriff.vercel.app/.well-known/api-catalog)
- [AI resource manifest](https://routeriff.vercel.app/.well-known/ai-catalog.json)
- [Agent Skills index](https://routeriff.vercel.app/.well-known/agent-skills/index.json)
- [Route audit skill](https://routeriff.vercel.app/ai/skills/route-audit/SKILL.md)
- [I-Lang instructions](https://routeriff.vercel.app/ai/index.ilang)

## Public route-audit API

POST \`https://routeriff.vercel.app/api/audit\`

Provide 2-12 stops with latitude and longitude plus an optional trip-day count.

The API is read-only and returns a route-sanity score, verdict, distance, rough travel load, backtracking/long-jump flags, the largest detour and explicit limitations.

## Privacy and commercial disclosure

Local text/CSV imports are read in the browser. Product analytics store coarse events rather than itinerary text. Some booking exits are affiliate links; affiliate economics do not alter the route-sanity score.

Updated: 2026-10-07
`;
  res.setHeader("Content-Type","text/markdown; charset=utf-8");
  res.setHeader("Cache-Control","public, max-age=0, s-maxage=3600");
  res.setHeader("Access-Control-Allow-Origin","*");
  if(req.method==="HEAD") return res.status(200).end();
  return res.status(200).send(body);
}