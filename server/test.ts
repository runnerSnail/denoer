import { serve } from "https://deno.land/std/http/server.ts";
const s = serve("0.0.0.0:8080");

async function main() {
  for await (const req of s) {
    req.respond({ body: new TextEncoder().encode('req.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.urlreq.url') });
  }
}

main();