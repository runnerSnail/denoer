import Onion from './config/http_compose/onion.ts';
import { ServerRequest } from './dependcy/dep.ts';
import { setLogger } from './log/config.ts';
import router from './controllers/index.ts';
import reponseUtil from './utils/response.ts';

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


// 404 
app.use(async (req: ServerRequest, next) => {
    reponseUtil(req,{
        body:{
            code:404,
            message:'路径不匹配'
        },
        status:200,
        headers:{
            "Content-Type":"application/json"
        }
    })
})
app.listen(`127.0.0.1:8000`, () => {
    console.log(`启动：127.0.0.1:8000`);
});
