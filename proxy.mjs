import { next, rewrite } from "@vercel/functions";

export default function proxy(request) {
  const accept = request.headers.get("accept") || "";
  const wantsMarkdown = accept
    .split(",")
    .some((value) => value.trim().split(";")[0].toLowerCase() === "text/markdown");

  if (!wantsMarkdown) {
    return next({ headers: { Vary: "Accept" } });
  }

  const response = rewrite(new URL("/api/home-markdown", request.url));
  response.headers.set("Vary", "Accept");
  return response;
}
