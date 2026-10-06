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
