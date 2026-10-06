const fs=require('fs');
const assert=(ok,msg)=>{if(!ok){console.error('FAIL:',msg);process.exitCode=1}else console.log('OK:',msg)};
const html=fs.readFileSync('index.html','utf8');
const sitemap=fs.readFileSync('sitemap.xml','utf8');
const vercel=JSON.parse(fs.readFileSync('vercel.json','utf8'));

assert(html.includes('<title>RouteRiff'), 'RouteRiff title present');
assert(html.includes('https://routeriff.vercel.app/'), 'canonical host present');
assert(!html.includes('TripRemix'), 'legacy brand absent from homepage');
assert(html.includes('/api/go?partner=trip'), 'measured affiliate router present');
assert(html.includes('copyFixPrompt'), 'AI correction loop present');
assert(html.includes('shareCard'), 'share-card flow present');
assert(html.includes('routeUrl('), 'share URLs include route state');
assert(sitemap.includes('https://routeriff.vercel.app/'), 'sitemap uses canonical host');
assert(Array.isArray(vercel.headers)&&vercel.headers.length>0, 'security headers configured');

const scripts=[...html.matchAll(/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)]
  .map(m=>m[1]).filter(s=>s.trim());
try{
  for(const js of scripts) new Function(js);
  console.log('OK: inline application JavaScript parses');
}catch(err){
  console.error('FAIL: inline application JavaScript syntax',err.message);
  process.exitCode=1;
}

if(process.exitCode) process.exit(process.exitCode);
