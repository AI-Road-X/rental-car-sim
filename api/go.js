const PARTNERS={
  trip:"https://www.trip.com/t/soBXacpD9W2",
  klook:"https://affiliate.klook.com/redirect?aid=137710&aff_adid=1479735&k_site=https%3A%2F%2Fwww.klook.com%2F",
  gyg:"https://gyg.me/gDzs0IMg",
  expedia:"https://expedia.com/affiliate/N7fuXdI",
  hotels:"https://www.hotels.com/affiliate/Z7Ame8w",
  aviasales:"https://aviasales.tpo.lu/I4Lm5ahp"
};

const clean=(value,max)=>String(value||"").replace(/[\u0000-\u001f\u007f]/g,"").slice(0,max);

async function storeEvent(row){
  const url=process.env.ROUTERIFF_SUPABASE_URL;
  const key=process.env.ROUTERIFF_SUPABASE_PUBLISHABLE_KEY;
  if(!url||!key) return;
  try{
    const upstream=await fetch(url+"/rest/v1/routeriff_events",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "apikey":key,
        "Authorization":"Bearer "+key,
        "Prefer":"return=minimal"
      },
      body:JSON.stringify(row)
    });
    if(!upstream.ok) console.error("routeriff_go_store_failed",upstream.status);
  }catch(err){
    console.error("routeriff_go_store_error",String(err&&err.message||err).slice(0,160));
  }
}

export default async function handler(req,res){
  if(req.method!=="GET") return res.status(405).end();

  const partner=clean(req.query&&req.query.partner,24).toLowerCase();
  const destination=PARTNERS[partner];
  if(!destination) return res.status(404).json({error:"unknown_partner"});

  const row={
    event:"affiliate_click",
    session_id:clean(req.query&&req.query.sid,64)||null,
    source:clean(req.query&&req.query.source,80)||null,
    path:"/api/go",
    meta:{partner,score:clean(req.query&&req.query.score,4),verdict:clean(req.query&&req.query.verdict,32),edited:clean(req.query&&req.query.edited,5)}
  };

  console.log(JSON.stringify({kind:"routeriff_affiliate_redirect",...row,ts:new Date().toISOString()}));
  await storeEvent(row);

  res.setHeader("Cache-Control","no-store");
  return res.redirect(302,destination);
}