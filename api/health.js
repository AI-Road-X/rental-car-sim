export default function handler(req,res){
  if(req.method!=="GET") return res.status(405).end();
  res.setHeader("Cache-Control","no-store");
  return res.status(200).json({
    ok:true,
    service:"routeriff",
    analyticsConfigured:Boolean(
      process.env.ROUTERIFF_SUPABASE_URL &&
      process.env.ROUTERIFF_SUPABASE_PUBLISHABLE_KEY
    ),
    commit:(process.env.VERCEL_GIT_COMMIT_SHA||"").slice(0,12)||null,
    environment:process.env.VERCEL_ENV||null,
    now:new Date().toISOString()
  });
}