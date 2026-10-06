# RouteRiff Stage-0 Launch Pack

## Positioning
**Category:** AI itinerary sanity checker / visual route optimizer.

**One-line promise:**  
Use any AI to plan. RouteRiff checks the geography before you book.

**Core loop:**  
Paste → See → Fix → Play → Share → Remix → Book

## Homepage message
**Headline:** Use any AI to plan. Then check the geography.

**Subhead:** Paste the main stops from ChatGPT, Claude, Gemini, a blog or spreadsheet. RouteRiff visualizes the route, flags backtracking and travel load, lets you reorder it, then creates a correction prompt you can send back to any AI.

## Product Hunt draft
**Name:** RouteRiff

**Tagline:** Sanity-check any AI travel itinerary on a map before you book.

**Short description:**  
RouteRiff is the second-pass checker for AI-generated travel plans. Paste the main stops, see the route on a map, catch backtracking and travel-heavy legs, reorder or optimize the stops, play the journey, then copy a correction prompt back into ChatGPT, Claude, Gemini or another AI. No account required.

**Maker comment:**  
AI travel planners are getting very good at producing convincing text. The gap I kept hitting was geographic: a plan can read perfectly while the route quietly zig-zags, backtracks, or wastes a big part of a short trip in transit. RouteRiff is deliberately not another all-in-one planner. It is a small second-pass tool that turns an itinerary you already have into something visual and fixable.

## Reddit / community draft
**Title:** I built a free second-pass checker for AI travel itineraries

AI is great at drafting trips, but I kept seeing plans that sounded good in text and looked awkward once the cities were actually put on a map.

So I built RouteRiff: paste the main stops from ChatGPT / Claude / Gemini / a blog, and it:
- maps the route,
- estimates rough travel load,
- flags long jumps and possible backtracking,
- lets you reorder/remove stops,
- creates a correction prompt you can paste back into any AI,
- gives you a share/remix link.

It is free, no account required: https://routeriff.vercel.app/?src=reddit

I am most interested in routes where the checker gives a bad suggestion or misses an obvious problem.

## Hacker News / Indie Hackers draft
**Title:** Show HN: RouteRiff – a geographic sanity checker for AI travel plans

RouteRiff is intentionally narrower than an AI travel planner. It assumes you already have an itinerary, then checks the route shape.

The current MVP is browser-first and no-login. It uses a map, simple route heuristics and transparent warnings to surface long jumps, backtracking and transfer-heavy plans. You can reorder the stops, generate a correction prompt for your preferred AI, share the route and remix someone else's route.

The business hypothesis is that the useful artifact is not another chat answer; it is a persistent trip object that can move through Plan → Share → Remix → Booking.

## Short social posts

### X / Threads
AI can write a beautiful 10-day itinerary that quietly wastes 2 days in transit.

I built RouteRiff as a second-pass check:
paste route → see map → catch backtracking → fix order → send correction back to AI.

Free, no login:
https://routeriff.vercel.app/?src=x

### LinkedIn
The travel-planning problem is shifting.

Generating an itinerary is becoming cheap. Verifying whether the route actually makes sense is still work.

RouteRiff is an experiment around that second step: bring any AI-generated itinerary, visualize the geographic structure, identify travel-heavy legs or backtracking, fix the order, and send a correction prompt back to the model.

https://routeriff.vercel.app/?src=linkedin

## Launch metrics to watch
Do not judge the launch by raw visits alone.

1. Page view → Build start
2. Build start → Trip built
3. Trip built → Play / Optimize / Copy AI fix
4. Trip built → Share or Share card
5. Shared visitor → Remix
6. Trip built → Affiliate click
7. Partner-reported click → Booking

## Kill / pivot criteria
If targeted traffic is sufficient but:
- users do not build routes → positioning/onboarding problem;
- they build but do not use fix/play → weak utility;
- they use it but never share → weak distribution artifact;
- shares do not create remixes → Story/Remix thesis is weak;
- affiliate clicks stay negligible → booking layer is badly timed or irrelevant.

Do not solve weak metrics by adding an OTA, social feed, native app or large AI content operation.
