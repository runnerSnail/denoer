import { ServerRequest } from "../dependcy/dep.ts";
import { getLogger } from "../log/config.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import transaction from "../model/transaction.ts";
import successHandle from "../utils/successHandle.ts";
import formatSelectResult from "../model/format.ts";
export async function getHome(req: ServerRequest, next) {
    // /api/home?code=11111
    try {
        if (req.url.match(/^\/$/)) {
            req.respond({ body: new TextEncoder().encode('hello world'), status: 200 });
        }
    } catch (error) {
        req.respond({ body: new TextEncoder().encode(errorReponseHandle(500, '登录错误')), status: 200 });
    }

    

}
// 登陆并创建