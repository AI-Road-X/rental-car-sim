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


for(const file of ['api/event.js','api/go.js','api/health.js','api/share.js','api/expand-map.js','api/audit.js']){
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


const idRefs=[...html.matchAll(/\$\(['"]([^'"]+)['"]\)/g)].map(m=>m[1]);
for(const id of [...new Set(idRefs)]){
  assert(html.includes('id="'+id+'"') || html.includes("id='"+id+"'"), 'DOM id reference exists: '+id);
}


// pure route logic tests
const logicStart=html.indexOf('function countDays');
const logicEnd=html.indexOf('async function geo');
const optStart=html.indexOf('function optimizeOrder');
const optEnd=html.indexOf('function optimize(){');
const csvStart=html.indexOf('function parseCsvLine');
const csvEnd=html.indexOf('async function importItineraryFile');
assert(logicStart>=0&&logicEnd>logicStart&&optStart>=0&&optEnd>optStart, 'pure route functions are extractable');
const pure=new Function(
  html.slice(logicStart,logicEnd)+
  html.slice(optStart,optEnd)+
  (csvStart>=0&&csvEnd>csvStart?html.slice(csvStart,csvEnd):'')+
  ';return {countDays,mapUrlStops,parse,km,optimizeOrder,'+
  (csvStart>=0?'csvToStops':'csvToStops:undefined')+'};'
)();

assert(pure.countDays('Day 1: Tokyo\nDay 2: Kyoto\nDay 3: Osaka')===3, 'day labels are counted');
assert(JSON.stringify(pure.parse('Paris, France\nBrussels, Belgium'))===JSON.stringify(['Paris, France','Brussels, Belgium']), 'city-country commas stay intact');
assert(JSON.stringify(pure.mapUrlStops('https://www.google.com/maps/dir/Tokyo/Hakone/Kyoto/Osaka/'))===JSON.stringify(['Tokyo','Hakone','Kyoto','Osaka']), 'Google Maps directions URL is parsed');
if(pure.csvToStops){
  assert(JSON.stringify(pure.csvToStops('Day,City\n1,Tokyo\n2,Kyoto\n3,Osaka'))===JSON.stringify(['Tokyo','Kyoto','Osaka']), 'CSV city column is parsed');
}
const pts={
  Tokyo:{name:'Tokyo',lat:35.6762,lon:139.6503},
  Kyoto:{name:'Kyoto',lat:35.0116,lon:135.7681},
  Hakone:{name:'Hakone',lat:35.2324,lon:139.1070},
  Osaka:{name:'Osaka',lat:34.6937,lon:135.5023}
};
const bad=[pts.Tokyo,pts.Kyoto,pts.Hakone,pts.Osaka];
const improved=pure.optimizeOrder(bad);
const pathKm=P=>P.slice(0,-1).reduce((n,p,i)=>n+pure.km(p,P[i+1]),0);
assert(pathKm(improved)<pathKm(bad), 'optimizer improves the Tokyo-Kyoto-Hakone-Osaka stress route');
assert(improved[0].name==='Tokyo'&&improved[improved.length-1].name==='Osaka', 'optimizer preserves start and finish');


// agent discovery artifacts
const crypto=require('crypto');
const openapi=JSON.parse(fs.readFileSync('openapi.json','utf8'));
assert(openapi.openapi==='3.1.0' && openapi.paths && openapi.paths['/api/audit'], 'OpenAPI describes the real route-audit endpoint');
const apiCatalog=JSON.parse(fs.readFileSync('.well-known/api-catalog','utf8'));
assert(Array.isArray(apiCatalog.linkset) && apiCatalog.linkset[0]?.['service-desc']?.[0]?.href==='https://routeriff.vercel.app/openapi.json', 'API catalog points to OpenAPI');
const ard=JSON.parse(fs.readFileSync('.well-known/ai-catalog.json','utf8'));
assert(Array.isArray(ard.entries) && ard.entries.length>=2, 'AI resource manifest has real entries');
const skillBytes=fs.readFileSync('ai/skills/route-audit/SKILL.md');
const skillDigest='sha256:'+crypto.createHash('sha256').update(skillBytes).digest('hex');
const skillIndex=JSON.parse(fs.readFileSync('.well-known/agent-skills/index.json','utf8'));
assert(skillIndex.skills?.[0]?.digest===skillDigest, 'Agent skill digest matches served bytes');
assert(fs.readFileSync('ai/index.ilang','utf8').includes('::ILANG::COMPLETE::'), 'I-Lang agent instructions are complete');

const auditSrc=fs.readFileSync('api/audit.js','utf8').replace(/export\s+default\s+function\s+handler/,'function handler');
const auditCore=new Function(auditSrc+';return {analyze,normalizePoint};')();
const auditPts=[
  {name:'Tokyo',lat:35.6762,lon:139.6503},
  {name:'Kyoto',lat:35.0116,lon:135.7681},
  {name:'Hakone',lat:35.2324,lon:139.1070},
  {name:'Osaka',lat:34.6937,lon:135.5023}
].map(auditCore.normalizePoint);
const auditResult=auditCore.analyze(auditPts,7);
assert(auditResult.backtracking_flags>0 || auditResult.largest_detour, 'public audit API flags the Japan stress route');
assert(['Looks reasonable','Needs a second look','Rework before booking'].includes(auditResult.verdict), 'public audit API returns a bounded verdict');
