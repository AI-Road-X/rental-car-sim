(()=>{try{
  const sid=(()=>{try{let v=sessionStorage.getItem('routeriff_sid');if(!v){v=(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2));sessionStorage.setItem('routeriff_sid',v)}return v}catch{return Date.now().toString(36)}})();
  const q=new URLSearchParams(location.search).get('src');
  let source=q?q.slice(0,80):'direct';
  if(!q&&document.referrer){try{source=new URL(document.referrer).hostname.slice(0,80)||'direct'}catch{}}
  const send=(event,meta={})=>fetch('/api/event',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({event,session_id:sid,source,path:location.pathname,meta}),keepalive:true}).catch(()=>{});
  send('page_view',{surface:'landing'});
  document.addEventListener('click',e=>{
    const a=e.target&&e.target.closest?e.target.closest('a[href]'):null;
    if(!a)return;
    try{
      const u=new URL(a.href,location.href);
      if(u.origin!==location.origin)return;
      const kind=u.searchParams.has('trip')?'route':(u.hash==='#builder'?'builder':'internal');
      send('landing_cta',{surface:'landing',kind,target:u.pathname.slice(0,64)});
    }catch{}
  },true);
}catch{}})();