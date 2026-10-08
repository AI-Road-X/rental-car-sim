# RouteRiff Google Search Console submission checklist

Updated: 2026-10-08

Scope: **RouteRiff only.** Other websites are intentionally out of scope for this project thread.

## 1. Add the RouteRiff property

Use a URL-prefix property:

- https://routeriff.vercel.app/

Preferred verification method:

- HTML tag (`google-site-verification`) placed in the RouteRiff homepage `<head>`.

### Owner action needed

In Google Search Console:

1. Add property → **URL prefix**
2. Enter: `https://routeriff.vercel.app/`
3. Choose **HTML tag**
4. Copy the complete verification tag, for example:
   `<meta name="google-site-verification" content="...">`
5. Send that tag back in this chat.

After receiving the tag, add it to RouteRiff, deploy production, verify the live tag is present, then the owner can click **Verify** in Search Console.

## 2. Submit the sitemap

After the property is verified, submit:

- https://routeriff.vercel.app/sitemap.xml

Expected sitemap host:

- `https://routeriff.vercel.app/`

Do not submit the legacy TripRemix host.

## 3. Priority URL Inspection / Request indexing

Request indexing only for the highest-intent pages first:

1. https://routeriff.vercel.app/
2. https://routeriff.vercel.app/ai-itinerary-critic/
3. https://routeriff.vercel.app/is-my-itinerary-too-rushed/
4. https://routeriff.vercel.app/japan-itinerary-checker/
5. https://routeriff.vercel.app/china-itinerary-checker/
6. https://routeriff.vercel.app/google-maps-route-to-itinerary/
7. https://routeriff.vercel.app/examples/ai-itinerary-fails/

The sitemap should handle the rest. Do not repeatedly request indexing for every utility page.

## 4. After Google begins crawling

Review in Search Console:

- Indexed pages
- Crawled - currently not indexed
- Duplicate / canonical issues
- Mobile usability / Core Web Vitals
- Search queries and pages
- CTR for the highest-intent problem pages

Do not change product positioning from impressions alone. Stage-0 product decisions remain based on qualified sessions and the RouteRiff funnel.

## Existing non-Google discovery

RouteRiff already has:

- sitemap.xml
- robots.txt
- IndexNow submission
- canonical URLs
- structured data
- llms.txt
- public agent/API discovery resources

Google Search Console is the missing Google-specific submission and indexing-feedback layer.
