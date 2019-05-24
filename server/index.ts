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
    console.log(req.url);
    await router.createArticle(req, next);
    await next();
});
app.use(async (req: ServerRequest, next) => {
    await router.getArticle(req, next);
    await next();
});
app.use(async (req: ServerRequest, next) => {
    await router.getHome(req, next);
    await next();
});
app.use(async (req: ServerRequest, next) => {
    await router.getLogin(req, next);
    await next();
});
app.use(async (req: ServerRequest, next) => {
    await router.getUserInfo(req, next);
    await next();
});
app.use(async (req: ServerRequest, next) => {
    await router.getArticleList(req, next);
    await next();
});
app.use(async (req: ServerRequest, next) => {
    let headers = new Headers();
    headers.set("Content-Type","application/json");
    let resBody = JSON.stringify({
        code:404,
        message:'没找到'
    });
    req.respond({ body: new TextEncoder().encode(resBody),status:200,headers });
})
app.listen(`127.0.0.1:8000`, () => {
    console.log(`启动：127.0.0.1:8000`);
});
