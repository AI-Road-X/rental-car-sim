(()=>{try{
  const sid=(()=>{try{let v=sessionStorage.getItem('routeriff_sid');if(!v){v=(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2));sessionStorage.setItem('routeriff_sid',v)}return v}catch{return Date.now().toString(36)}})();
  const q=new URLSearchParams(location.search).get('src');
  let source=q?q.slice(0,80):'direct';
  if(!q&&document.referrer){try{source=new URL(document.referrer).hostname.slice(0,80)||'direct'}catch{}}
  fetch('/api/event',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({event:'page_view',session_id:sid,source,path:location.pathname,meta:{surface:'landing'}}),keepalive:true}).catch(()=>{});
}catch{}})();