import { ServerRequest, setCookie } from "../dependcy/dep.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import { githubConfig } from "../config/set_json.ts";
import successHandle from "../utils/successHandle.ts";
import { getLogger } from "../log/config.ts";
import addUser, { UserInfo } from "../model/addUser.ts";
import checkUser from "../model/checkUser.ts";
import reponseUtil from "../utils/response.ts";

/**
 * github 获取授权过程 
 * 1 获取code https://github.com/login/oauth/authorize
 * 2 获取access_token post https://github.com/login/oauth/access_token
 * 3 发送get请求到https://api.github.com/user 需要设置user-Agent
 * 
 */
const { fetch } = window;
export async function getLogin(req: ServerRequest, next) {
    // /api/home?code=11111
    try {
        if (req.url.match(/\/login/)) {
            let code: string;
            if (req.url.indexOf("?code=") > -1) {
                code = req.url.match(/\/login\?code=(\S+)/)[1]
                getLogger().debug(code)
            }
            // 获取code
            var url = 'https://github.com/login/oauth/access_token';
            var data = {
                client_id: githubConfig.client_id,
                client_secret: githubConfig.client_secret,
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
                .then(async (data:any) => {
                    let text = await data.text();
                    access_token = text.match(/access_token=(\S+)&scope/)[1];
                })
                .catch(e => getLogger().error(e));
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
                .catch(e => getLogger().error(e));
            // 检验用户是否 利用GitHub注册，如果没注册创建userid，如果已经注册关联已有的userId
            userinfo = await getUser(userinfo);
            console.log('userinfo===>')
            console.log(userinfo.gitlab_id);
            let headers = new Headers();
            headers.set("Location","/home")
            let res = { body: new TextEncoder().encode(), status: 301, headers };
            setCookie(res, {
                name: "user_id",
                value: userinfo.gitlab_id,
                maxAge: 2678400
            });
            req.respond(res);
        }
    } catch (error) {
        getLogger().error(error);
        reponseUtil(req, {
            body: errorReponseHandle(500, '用户信息'),
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

async function getUser(userinfo: any) {
    let result = await checkUser(userinfo.id);
    if (result) {
        return result;
    }
    result = await addUser(userinfo);
    result = await checkUser(userinfo.id);
    if (result) return result;
    return null;
}
