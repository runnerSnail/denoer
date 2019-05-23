import { ServerRequest } from "../dependcy/dep.ts";
import { getLogger } from "../log/config.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import transaction from "../model/transaction.ts";
import successHandle from "../utils/successHandle.ts";
import formatSelectResult from "../model/format.ts";
export async function getHome(req: ServerRequest, next) {
    // /api/home?code=11111
    try {
        if (req.url.match(/\/home/)) {
            let code: string;
            if (req.url.indexOf("?code=") > -1) {
                code = req.url.match(/\/home\?code=(\S+)/)[1]
            }
            console.log('enter')
            // 获取code
            var url = 'https://github.com/login/oauth/access_token';
            var data = {
                client_id: '8bf81a16134ffeef7284',
                client_secret: 'b93eb413a2e1e3243f8deadb3fc31f8dca18e404',
                code: code
            };
            // 获取 access_token
            let access_token: string;
            await fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then((response) => {
                    return response.body;
                })
                .then(async data => {
                    let text = await data.text();
                    access_token = text.match(/access_token=(\S+)&scope/)[1];
                })
                .catch(e => console.log("Oops, error", e));
            // 获取用户信息
            let userinfo = await fetch(`https://api.github.com/user?access_token=${access_token}`, {
                method: 'GET',
                headers: new Headers({
                    'User-Agent': 'runnerSnail',
                    'Accept': 'application/vnd.github.v3+json'
                })
            })
                .then((res) => res.json())
                .then((data) => data)
                .catch(e => console.log("Oops, error", e));
            
            req.respond({ body: new TextEncoder().encode(JSON.stringify(userinfo)), status: 200 });
        }
    } catch (error) {
        req.respond({ body: new TextEncoder().encode(errorReponseHandle(500, '登录错误')), status: 200 });
    }


}