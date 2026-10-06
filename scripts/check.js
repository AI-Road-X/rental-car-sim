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


for(const file of ['api/event.js','api/go.js','api/health.js','api/share.js','api/expand-map.js']){
  const src=fs.readFileSync(file,'utf8').replace(/export\s+default\s+/g,'');
  try{
    new Function(src);
    console.log('OK: '+file+' parses');
  }catch(err){
    console.error('FAIL: '+file+' syntax',err.message);
    process.exitCode=1;
  }
}

const eventApi=fs.readFileSync('api/event.js','utf8');
assert(eventApi.includes('share_card'), 'share-card event is allowlisted');
const shareApi=fs.readFileSync('api/share.js','utf8');
assert(shareApi.includes('src","share"') || shareApi.includes('set("src","share")'), 'share endpoint returns to share-attributed route');


assert(Array.isArray(vercel.rewrites) && vercel.rewrites.some(x=>x.source==='/s' && x.destination=='/api/share'), 'dynamic share rewrite configured');
assert(Array.isArray(vercel.redirects) && vercel.redirects.some(x=>x.has && x.has.some(h=>h.type==='host' && h.value==='tripremix.vercel.app')), 'legacy TripRemix host redirect configured');
assert(eventApi.includes('audit_helpful') && eventApi.includes('audit_not_helpful'), 'audit feedback events are allowlisted');

assert(eventApi.includes('booking_unlock'), 'booking unlock event is allowlisted');

assert(eventApi.includes('copy_normalize_prompt'), 'normalize prompt event is allowlisted');

assert(eventApi.includes('file_import'), 'file import event is allowlisted');

const expandApi=fs.readFileSync('api/expand-map.js','utf8');
assert(expandApi.includes('maps.app.goo.gl') && expandApi.includes('unsafe_redirect'), 'Google Maps short-link expander is host-restricted');


const path=require('path');
function walkHtml(dir){
  const out=[];
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    if(['.git','node_modules','.github','api','scripts'].includes(ent.name)) continue;
    const p=path.join(dir,ent.name);
    if(ent.isDirectory()) out.push(...walkHtml(p));
    else if(ent.isFile() && ent.name.endsWith('.html')) out.push(p);
  }
  return out;
}

for(const file of walkHtml('.')){
  const src=fs.readFileSync(file,'utf8');
  assert(!src.includes('TripRemix'), file+' has no legacy product name');
  if(file==='404.html') continue;
  const m=src.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  assert(Boolean(m), file+' has canonical URL');
  if(m){
    assert(m[1].startsWith('https://routeriff.vercel.app/'), file+' canonical uses RouteRiff host');
    assert(sitemap.includes('<loc>'+m[1]+'</loc>') || file==='index.html', file+' canonical is represented in sitemap');
  }
}
