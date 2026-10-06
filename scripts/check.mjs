import fs from 'node:fs';

const fail=(msg)=>{console.error('CHECK FAILED:',msg);process.exit(1)};
const read=(p)=>fs.readFileSync(p,'utf8');

const html=read('index.html');
if(!html.includes('RouteRiff')) fail('RouteRiff brand missing');
if(!html.includes('https://routeriff.vercel.app/')) fail('canonical RouteRiff URL missing');
if(html.includes('TripRemix')||html.includes('tripremix')) fail('legacy TripRemix brand leaked into index.html');

const scriptRe=/<script(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g;
for(const match of html.matchAll(scriptRe)){
  const js=match[1].trim();
  if(!js) continue;
  try{ new Function(js) }catch(err){ fail('inline JS syntax: '+err.message) }
}


const parserStart=html.indexOf('function cleanStop');
const parserEnd=html.indexOf('function km(',parserStart);
if(parserStart<0||parserEnd<0) fail('parser functions not found in index.html');
let parser;
try{
  parser=new Function(html.slice(parserStart,parserEnd)+'; return {parsePlan,tripText};')();
}catch(err){
  fail('parser extraction failed: '+err.message);
}
const eq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const case1=parser.parsePlan('Day 1: Tokyo → Hakone\nDay 2: Kyoto\nOsaka');
if(!eq(case1.map(x=>x.name),['Tokyo','Hakone','Kyoto','Osaka'])) fail('day parser names regression');
if(!eq(case1.map(x=>x.day),[1,1,2,2])) fail('day parser assignments regression');
const case2=parser.parsePlan('Paris, France\nRome, Italy');
if(!eq(case2.map(x=>x.name),['Paris, France','Rome, Italy'])) fail('city-country comma parsing regression');
const case3=parser.parsePlan('Tokyo, Kyoto, Osaka');
if(!eq(case3.map(x=>x.name),['Tokyo','Kyoto','Osaka'])) fail('comma-list parsing regression');
const case4=parser.parsePlan('Tokyo\nHakone\nTokyo');
if(case4.length!==3) fail('return-to-city route was incorrectly deduplicated');
const case5=parser.parsePlan('Day 3: Travel to Kyoto\n- Visit Fushimi Inari');
if(!eq(case5.map(x=>x.name),['Kyoto','Fushimi Inari'])||!case5.every(x=>x.day===3)) fail('AI-style verb cleanup regression');
if(parser.tripText(case1)!=='Day 1: Tokyo\nHakone\nDay 2: Kyoto\nOsaka') fail('day text reconstruction regression');


const geoStart=html.indexOf('function km(');
const geoEnd=html.indexOf('async function geo(',geoStart);
if(geoStart<0||geoEnd<0) fail('geometry functions not found in index.html');
let geometry;
try{
  geometry=new Function(html.slice(geoStart,geoEnd)+'; return {km,routeGeometry};')();
}catch(err){
  fail('geometry extraction failed: '+err.message);
}
const tokyo={lat:35.6762,lon:139.6503},losAngeles={lat:34.0522,lon:-118.2437};
const pacific=geometry.routeGeometry([tokyo,losAngeles]);
const longs=pacific.all.map(p=>p[1]);
if(Math.max(...longs)-Math.min(...longs)>150) fail('dateline route used the long way around the map');
if(pacific.segments[0].length<30) fail('long-haul route is missing great-circle interpolation');
const distance=geometry.km(tokyo,losAngeles);
if(distance<8000||distance>9500) fail('haversine distance sanity check failed');

const directAff=[
  'https://www.trip.com/t/',
  'https://affiliate.klook.com/redirect',
  'https://gyg.me/',
  'https://expedia.com/affiliate/',
  'https://www.hotels.com/affiliate/',
  'https://aviasales.tpo.lu/'
];
for(const url of directAff){
  if(html.includes(url)) fail('direct affiliate URL should be behind /api/go: '+url);
}

for(const required of [
  'api/event.js','api/go.js','api/health.js','robots.txt','sitemap.xml',
  'privacy/index.html','terms/index.html','affiliate-disclosure/index.html',
  'how-route-score-works/index.html','ai-itinerary-checker/index.html'
]){
  if(!fs.existsSync(required)) fail('missing required file: '+required);
}

const sitemap=read('sitemap.xml');
if(!sitemap.includes('https://routeriff.vercel.app/')) fail('sitemap canonical host missing');
if(sitemap.includes('tripremix.vercel.app')) fail('legacy host leaked into sitemap');

console.log('RouteRiff repository checks passed.');
