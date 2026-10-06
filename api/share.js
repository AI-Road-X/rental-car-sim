const esc=s=>String(s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));

export default function handler(req,res){
  if(req.method!=="GET") return res.status(405).end();

  const raw=String(req.query&&req.query.trip||"").slice(0,1200);
  const geo=String(req.query&&req.query.geo||"").slice(0,1200);
  const days=String(req.query&&req.query.days||"").replace(/[^0-9]/g,"").slice(0,3);
  const stops=raw.split("|").map(x=>x.trim()).filter(Boolean).slice(0,12);

  if(stops.length<2) return res.redirect(302,"https://routeriff.vercel.app/");

  const start=stops[0], end=stops[stops.length-1];
  const title=`${start} → ${end} · RouteRiff`;
  const desc=`${stops.length}-stop trip${days?" · "+days+" days":""}. See the route, play it, sanity-check it and remix it.`;

  const dest=new URL("https://routeriff.vercel.app/");
  dest.searchParams.set("trip",stops.join("|"));
  if(geo) dest.searchParams.set("geo",geo);
  if(days) dest.searchParams.set("days",days);
  dest.searchParams.set("src","share");

  const html=`<!doctype html><html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="RouteRiff">
<meta property="og:url" content="${esc("https://routeriff.vercel.app/s?trip="+encodeURIComponent(stops.join("|")))}">
<meta name="twitter:card" content="summary">
<meta http-equiv="refresh" content="0;url=${esc(dest.toString())}">
<link rel="canonical" href="${esc(dest.toString())}">
<style>body{margin:0;background:#07101d;color:#eef5ff;font:16px/1.6 system-ui,sans-serif;display:grid;min-height:100vh;place-items:center}main{max-width:680px;padding:32px;text-align:center}a{display:inline-block;background:#72e6c0;color:#06130f;text-decoration:none;border-radius:14px;padding:13px 17px;font-weight:800}</style>
</head><body><main><h1>${esc(title)}</h1><p>${esc(desc)}</p><a href="${esc(dest.toString())}">Open & remix this trip →</a></main></body></html>`;

  res.setHeader("Content-Type","text/html; charset=utf-8");
  res.setHeader("Cache-Control","public, max-age=0, s-maxage=86400");
  return res.status(200).send(html);
}