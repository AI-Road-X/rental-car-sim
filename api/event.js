export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).end();

  const body=req.body||{};
  const event=String(body.event||"").replace(/[^a-z0-9_:-]/gi,"").slice(0,64);
  if(!event) return res.status(400).json({ok:false});

  const clean=(value,max)=>String(value||"").replace(/[\u0000-\u001f\u007f]/g,"").slice(0,max);
  const session_id=clean(body.session_id,64)||null;
  const source=clean(body.source,80)||null;
  const path=clean(body.path,256)||null;

  const meta=(body.meta&&typeof body.meta==="object"&&!Array.isArray(body.meta))?body.meta:{};
  const safe={};
  for(const [k,v] of Object.entries(meta).slice(0,8)){
    const key=String(k).replace(/[^a-z0-9_:-]/gi,"").slice(0,32);
    if(key&&["string","number","boolean"].includes(typeof v)) safe[key]=String(v).slice(0,64);
  }

  const row={event,session_id,source,path,meta:safe};
  console.log(JSON.stringify({kind:"routeriff_event",...row,ts:new Date().toISOString()}));

  const url=process.env.ROUTERIFF_SUPABASE_URL;
  const key=process.env.ROUTERIFF_SUPABASE_PUBLISHABLE_KEY;
  if(url&&key){
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
      if(!upstream.ok) console.error("routeriff_event_store_failed",upstream.status);
    }catch(err){
      console.error("routeriff_event_store_error",String(err&&err.message||err).slice(0,160));
    }
  }

  return res.status(204).end();
}