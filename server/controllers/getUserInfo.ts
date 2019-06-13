import formatSelectResult from "../model/format.ts";
import transaction from "../model/transaction.ts";
import { ServerRequest } from "../dependcy/dep.ts";
import checkUser from "../model/checkUser.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import successHandle from "../utils/successHandle.ts";
import reponseUtil from "../utils/response.ts";

export async function getUserInfo(req: ServerRequest, next) {
    if (req.url.match(/\/api\/deno.user.getUserInfoById/)) {
        try {
            let matchArr = req.url.match(/\S*user_id=(\S+)/);
            let gitlab_id: string;
            if (matchArr && matchArr.length == 2) {
                gitlab_id = matchArr[1];
                let result = await checkUser(gitlab_id);
                reponseUtil(req, {
                    body: successHandle(200,result,'用户信息'),
                    status:200,
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
            }
        } catch (error) {
            reponseUtil(req, {
                body: errorReponseHandle(500,'查询用户信息错误'),
                status:200,
                headers:{
                    "Content-Type":"application/json"
                }
            })
        }
    }
}