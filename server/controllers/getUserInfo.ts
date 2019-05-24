import formatSelectResult from "../model/format.ts";
import transaction from "../model/transaction.ts";
import { ServerRequest } from "../dependcy/dep.ts";
import checkUser from "../model/checkUser.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import successHandle from "../utils/successHandle.ts";

export async function getUserInfo(req: ServerRequest, next) {
    if (req.url.match(/\/api\/getUserInfo/)) {
        try {
            let matchArr = req.url.match(/\S*user_id=(\S+)/);
            let gitlab_id: string;
            if (matchArr && matchArr.length == 2) {
                gitlab_id = matchArr[1];
                let result = await checkUser(gitlab_id);
                req.respond({ body: new TextEncoder().encode(successHandle(200,result,'插入成功返回id')),status: 200 });
            }
        } catch (error) {
            req.respond({ body: new TextEncoder().encode(errorReponseHandle(500,'查询用户信息错误')),status: 200 });
        }

    }
}