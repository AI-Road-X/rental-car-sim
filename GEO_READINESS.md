# RouteRiff — Agent / GEO Readiness

Updated: 2026-10-07

This document records truthful implementation state. It is **not** a claim of a 100/100 scanner score.

## Implemented and deployed

- Canonical HTTPS site on `routeriff.vercel.app`
- robots.txt
- sitemap.xml
- llms.txt
- HTTP `Link` discovery header on the homepage
- Public read-only route audit API: `/api/audit`
- OpenAPI 3.1: `/openapi.json`
- RFC-style API catalog: `/.well-known/api-catalog`
- Human AI/API documentation: `/ai/`
- I-Lang operating instructions: `/ai/index.ilang`
- Agent Skill: `/ai/skills/route-audit/SKILL.md`
- Agent Skills discovery index with exact SHA256 digest
- AI resource manifest: `/.well-known/ai-catalog.json`
- Public CORS on discovery artifacts
- Explicit methodology and limitations page
- Automated CI checks for the discovery graph and skill digest

## Real public agent task

**Task:** audit the geographic skeleton of a 2–12 stop travel route.

Input:
- stop names
- latitude / longitude
- optional country
- optional trip-day count

Output:
- route-sanity score
- verdict
- straight-line distance
- rough travel-load estimate
- long-jump flags
- backtracking flags
- largest detour
- leg-by-leg heuristic
- explicit limitations
- methodology source URL

The endpoint is read-only.

## Not implemented / not claimed

- Homepage `Accept: text/markdown` content negotiation
- DNS-AID records — the canonical production host is a provider-owned `vercel.app` subdomain and the project does not control authoritative DNS for `vercel.app`
- MCP server / MCP Server Card
- WebMCP browser tool registration
- OAuth discovery / Auth.md — RouteRiff currently has no account/auth requirement, and no fake auth surface has been added
- A2A Agent Card
- x402 / MPP / UCP / ACP commerce protocols
- Web Bot Auth

These must not be presented as working until actually implemented and verified.

## Scanner limitation

The current agent-readiness scanner was reviewed from its public current UI, but this environment does not have a working POST/browser path to execute the scanner's live scan API and verify the displayed default-profile score. Therefore no numeric readiness score is claimed here.

## Next useful GEO work

Only continue protocol work if it improves real agent use or a current default-scored check. The highest-value remaining candidate is meaningful Markdown negotiation on the actual homepage without degrading ordinary HTML caching.

Do not add fake OAuth, fake MCP or commerce declarations solely to increase a score.
