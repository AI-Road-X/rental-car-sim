const allowedHost=h=>{
  h=String(h||"").toLowerCase();
  if(h==="maps.app.goo.gl"||h==="goo.gl"||h==="maps.google.com") return true;
  return /^(?:www\.)?google\.[a-z.]{2,15}$/.test(h);
};

function problem(res,status,title,detail,code){
  res.setHeader("Content-Type","application/problem+json; charset=utf-8");
  return res.status(status).send(JSON.stringify({type:"about:blank",title,status,detail,code}));
}

export default async function handler(req,res){
  if(req.method!=="GET"){
    res.setHeader("Allow","GET");
    return problem(res,405,"Method Not Allowed","Use GET with a supported Google Maps or Apple Maps URL.","method_not_allowed");
  }
  const raw=String(req.query&&req.query.url||"").slice(0,1200);
  let current;
  try{current=new URL(raw)}catch{return problem(res,400,"Invalid map URL","Provide a valid full Google Maps or Apple Maps directions URL.","invalid_url")}
  if(!["http:","https:"].includes(current.protocol)||!allowedHost(current.hostname)) return problem(res,400,"Unsupported map host","Only supported Google Maps and Apple Maps hosts can be expanded.","unsupported_host");

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
        if(!allowedHost(next.hostname)) return problem(res,400,"Unsupported redirect","The map link redirected to a host RouteRiff cannot safely fetch.","unsafe_redirect");
        current=next;
        continue;
      }
      break;
    }
    if(!allowedHost(current.hostname)) return problem(res,400,"Unsupported final host","The final map URL is not on a supported map host.","unsupported_final_host");
    res.setHeader("Cache-Control","public, max-age=0, s-maxage=86400");
    return res.status(200).json({ok:true,url:current.toString()});
  }catch(err){
    return problem(res,502,"Map link could not be expanded","Try copying the full directions URL from Google Maps instead of a short share link.","expand_failed");
  }
}
