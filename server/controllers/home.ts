import { ServerRequest } from "../dependcy/dep.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import reponseUtil from "../utils/response.ts";
import successHandle from "../utils/successHandle.ts";
import { getCookies } from "../dependcy/dep.ts";
import { handleHtmlTemplate } from "../config/templateHandle.ts";

export async function getHome(req: ServerRequest, next) {
    try {
        if (req.url === undefined || req.url.match(/^\/$/) || req.url.match(/^\/home$/)) {
            let htmlText = await handleHtmlTemplate('template/article.html');
            reponseUtil(req, {
                body: htmlText,
                status:200,
                headers:{
                    "Content-Type":"text/html"
                }
            })
        }
    } catch (error) {
        reponseUtil(req, {
            body: errorReponseHandle(500, '查询用户信息错误'),
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }



}
// 登陆并创建