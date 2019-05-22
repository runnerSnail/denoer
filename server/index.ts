import Onion from './config/http_compose/onion.ts';
import { ServerRequest } from './dependcy/dep.ts';
import { setLogger } from './log/config.ts';
import router from './controllers/index.ts';

const app = new Onion();

/**
 * 配置日志
 */

setLogger().then(() => {
    console.log('config log');
})

/**
 * 配置路由
 */
app.use(async (req: ServerRequest, next) => {
    await router.createArticle(req, next);
    await next();
});
app.use(async (req: ServerRequest, next) => {
    await router.getArticle(req, next);
    // await next();
});

app.use(async (req: ServerRequest, next) => {
    req.headers.set("Content-Type","application/json");
    req.respond({ body: new TextEncoder().encode("Hello World\n") });
})
app.listen(`127.0.0.1:8000`, () => {
    console.log(`启动：127.0.0.1:8000`);
});
