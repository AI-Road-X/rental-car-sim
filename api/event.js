export default function handler(req,res){
  if(req.method!=="POST") return res.status(405).end();
  const body=req.body||{};
  const event=String(body.event||"").replace(/[^a-z0-9_:-]/gi,"").slice(0,64);
  if(!event) return res.status(400).json({ok:false});
  const meta=(body.meta&&typeof body.meta==="object")?body.meta:{};
  const safe={};
  for(const [k,v] of Object.entries(meta).slice(0,8)){
    const key=String(k).replace(/[^a-z0-9_:-]/gi,"").slice(0,32);
    if(["string","number","boolean"].includes(typeof v)) safe[key]=String(v).slice(0,64);
  }
  console.log(JSON.stringify({kind:"tripremix_event",event,meta:safe,ts:new Date().toISOString()}));
  res.status(204).end();
}