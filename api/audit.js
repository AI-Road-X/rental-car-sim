const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const km=(a,b)=>{
  const R=6371,A=(b.lat-a.lat)*Math.PI/180,B=(b.lon-a.lon)*Math.PI/180;
  const x=Math.sin(A/2)**2+Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(B/2)**2;
  return 2*R*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));
};
const mode=d=>d>650?["flight",720,3]:d>120?["rail_or_drive",150,.6]:d>25?["drive_or_local_rail",65,.25]:["local_transfer",20,.1];

function normalizePoint(p,i){
  if(!p||typeof p!=="object") throw new Error("invalid_point_"+i);
  const lat=Number(p.lat),lon=Number(p.lon);
  if(!Number.isFinite(lat)||lat<-90||lat>90||!Number.isFinite(lon)||lon<-180||lon>180) throw new Error("invalid_coordinates_"+i);
  const name=String(p.name||("Stop "+(i+1))).replace(/[\u0000-\u001f\u007f]/g,"").slice(0,90);
  const country=String(p.country||"").replace(/[\u0000-\u001f\u007f]/g,"").slice(0,90);
  return{name,lat,lon,country};
}
function analyze(points,days){
  let dist=0,hours=0,long=0,back=0,legs=[],detours=[];
  for(let i=0;i<points.length-1;i++){
    const d=km(points[i],points[i+1]),m=mode(d),h=d/m[1]+m[2];
    dist+=d;hours+=h;if(d>900)long++;
    legs.push({from:points[i].name,to:points[i+1].name,distance_km:+d.toFixed(1),estimated_hours:+h.toFixed(1),mode_hint:m[0]});
  }
  for(let i=1;i<points.length-1;i++){
    const direct=km(points[i-1],points[i+1]),left=km(points[i-1],points[i]),right=km(points[i],points[i+1]),via=left+right;
    const excess=Math.max(0,via-direct),ratio=direct<5?(via>40?99:1):via/direct;
    if((direct<5&&via>40)||(direct>30&&ratio>2.05))back++;
    if(excess>40&&ratio>1.55)detours.push({index:i,stop:points[i].name,between:[points[i-1].name,points[i+1].name],excess_km:+excess.toFixed(1),ratio:+ratio.toFixed(2)});
  }
  detours.sort((a,b)=>b.excess_km-a.excess_km);
  const score=clamp(Math.round(100-long*8-back*13-Math.max(0,(dist/(points.length-1)-650)/100)*3-Math.max(0,(hours-24)/3)),35,99);
  const severe=back>0||long>1||(days&&hours/days>5.5);
  const verdict=score>=86&&!severe?"Looks reasonable":score>=68&&!severe?"Needs a second look":"Rework before booking";
  return{
    score,verdict,
    distance_km:+dist.toFixed(1),
    estimated_travel_hours:+hours.toFixed(1),
    average_travel_hours_per_day:days?+(hours/days).toFixed(1):null,
    long_jump_flags:long,
    backtracking_flags:back,
    largest_detour:detours[0]||null,
    legs
  };
}
function parseQuery(raw){
  const parts=String(raw||"").split("|").filter(Boolean).slice(0,12);
  return parts.map((part,i)=>{
    const seg=part.split(",");
    if(seg.length<2) throw new Error("invalid_points_query");
    const lat=Number(seg[0]),lon=Number(seg[1]);
    const name=decodeURIComponent(seg.slice(2).join(",")||("Stop "+(i+1)));
    return normalizePoint({lat,lon,name},i);
  });
}
function bodyFromReq(req){
  if(req.method==="POST"){
    const b=req.body&&typeof req.body==="object"?req.body:{};
    return{points:(Array.isArray(b.points)?b.points:[]).slice(0,12),days:Number(b.days)||0};
  }
  return{points:parseQuery(req.query&&req.query.points),days:Number(req.query&&req.query.days)||0};
}
export default function handler(req,res){
  if(!["GET","POST"].includes(req.method)) return res.status(405).json({ok:false,error:"method_not_allowed"});
  try{
    const input=bodyFromReq(req);
    const points=input.points.map(normalizePoint);
    if(points.length<2) return res.status(400).json({ok:false,error:"at_least_two_points_required"});
    const days=clamp(Math.floor(input.days||0),0,365);
    const audit=analyze(points,days);
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Cache-Control","public, max-age=0, s-maxage=3600");
    return res.status(200).json({
      ok:true,
      version:"2026-10-07",
      route:{stops:points.map(p=>({name:p.name,lat:p.lat,lon:p.lon,country:p.country||undefined})),days:days||null},
      audit,
      limitations:[
        "Uses straight-line distance and simple mode heuristics, not live road, rail or flight routing.",
        "Does not verify schedules, borders, visas, weather, opening hours, prices or availability.",
        "Treat the verdict as a planning signal and verify critical travel details with official sources."
      ],
      source_url:"https://routeriff.vercel.app/how-route-score-works/"
    });
  }catch(err){
    return res.status(400).json({ok:false,error:String(err&&err.message||err).slice(0,120)});
  }
}