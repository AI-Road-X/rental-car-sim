const allowedHost=h=>{
  h=String(h||"").toLowerCase();
  if(h==="maps.app.goo.gl"||h==="goo.gl"||h==="maps.google.com") return true;
  return /^(?:www\.)?google\.[a-z.]{2,15}$/.test(h);
};

export default async function handler(req,res){
  if(req.method!=="GET") return res.status(405).end();
  const raw=String(req.query&&req.query.url||"").slice(0,1200);
  let current;
  try{current=new URL(raw)}catch{return res.status(400).json({ok:false,error:"invalid_url"})}
  if(!["http:","https:"].includes(current.protocol)||!allowedHost(current.hostname)) return res.status(400).json({ok:false,error:"unsupported_host"});

  try{
    for(let i=0;i<6;i++){
      const r=await fetch(current.toString(),{
        method:"HEAD",
        redirect:"manual",
        headers:{"User-Agent":"RouteRiff/1.0 (+https://routeriff.vercel.app/)"}
      });
      if(r.status>=300&&r.status<400){
        const loc=r.headers.get("location");
        if(!loc) break;
        const next=new URL(loc,current);
        if(!allowedHost(next.hostname)) return res.status(400).json({ok:false,error:"unsafe_redirect"});
        current=next;
        continue;
      }
      break;
    }
    if(!allowedHost(current.hostname)) return res.status(400).json({ok:false,error:"unsupported_final_host"});
    res.setHeader("Cache-Control","public, max-age=0, s-maxage=86400");
    return res.status(200).json({ok:true,url:current.toString()});
  }catch(err){
    return res.status(502).json({ok:false,error:"expand_failed"});
  }
}