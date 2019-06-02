import { ServerRequest } from "../dependcy/dep.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import reponseUtil from "../utils/response.ts";
import successHandle from "../utils/successHandle.ts";
import { getCookies } from "../dependcy/dep.ts";
export async function notFound(req: ServerRequest, next) {
    if (
        req.url !== undefined ||
        req.url !== '/' ||
        req.url.indexOf("/home") > -1 ||
        req.url.indexOf("/api/creatArticle") > -1 ||
        req.url.indexOf("/api/getArticleList") > -1 ||
        req.url.indexOf("/api/getUserInfo") > -1 ||
        req.url.indexOf("/api/insertComment") > -1 ||
        req.url.indexOf("/api/selectComment") > -1 ||
        req.url.indexOf("/api/getArticle") > -1 ||
        req.url.indexOf("/api/comment/clicksupport") > -1 ||
        req.url.indexOf("/api/article/clicksupport") > -1 ||
        req.url.indexOf("/api/article/update") > -1 ||
        req.url.indexOf("/login") > -1
    ) { }
    else {
        reponseUtil(req, {
            body: {
                code: 404,
                message: '路径不匹配.'
            },
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}
// 登陆并创建