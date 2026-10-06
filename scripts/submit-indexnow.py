import json, re, sys, urllib.request
from pathlib import Path

HOST="routeriff.vercel.app"
KEY="b84303762a345adc3028979f3d746106"
KEY_LOCATION=f"https://{HOST}/{KEY}.txt"

xml=Path("sitemap.xml").read_text(encoding="utf-8")
urls=re.findall(r"<loc>(https://routeriff\.vercel\.app/[^<]*)</loc>", xml)
urls=list(dict.fromkeys(urls))[:100]
if not urls:
    print("No canonical RouteRiff URLs found in sitemap.xml")
    sys.exit(1)

payload=json.dumps({
    "host": HOST,
    "key": KEY,
    "keyLocation": KEY_LOCATION,
    "urlList": urls,
}).encode()

req=urllib.request.Request(
    "https://api.indexnow.org/indexnow",
    data=payload,
    headers={"Content-Type":"application/json; charset=utf-8","User-Agent":"RouteRiff-IndexNow/1.0"},
    method="POST",
)
try:
    with urllib.request.urlopen(req, timeout=20) as res:
        print("IndexNow status:", res.status)
        print("Submitted URLs:", len(urls))
except urllib.error.HTTPError as e:
    print("IndexNow HTTP error:", e.code, e.read().decode("utf-8","ignore")[:500])
    # 200/202 are normal success/accepted; other codes should fail the workflow.
    if e.code not in (200,202):
        raise
