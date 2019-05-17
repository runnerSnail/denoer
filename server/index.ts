import Onion from './dependcy/http_compose/onion.ts';
import { ServerRequest } from './dependcy/dep.ts';
const {  } = Deno;
const app = new Onion();

app.use(async (req:ServerRequest, next) => {
    // await req.body()
    const body = await req.body();
    const encoder = new TextDecoder();
    const data = encoder.decode(body);
    req.respond({ body: new TextEncoder().encode(data)});
});
app.listen('127.0.0.1:8000', () => {
    console.log(`启动：127.0.0.1:8000`);
});