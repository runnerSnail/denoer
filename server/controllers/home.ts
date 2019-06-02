import { ServerRequest } from "../dependcy/dep.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import reponseUtil from "../utils/response.ts";
import successHandle from "../utils/successHandle.ts";
import { getCookies } from "../dependcy/dep.ts";
export async function getHome(req: ServerRequest, next) {
    try {
        if (req.url === undefined || req.url.match(/^\/$/) || req.url.match(/^\/home$/)) {
            console.log('进入home')
            const cookies = getCookies(req);
            let user_id = cookies['user_id'];
            console.log(user_id);
            reponseUtil(req, {
                body: successHandle(200, 'user_id', '用户信息'),
                status: 200,
                headers: {
                    "Content-Type": "application/json"
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