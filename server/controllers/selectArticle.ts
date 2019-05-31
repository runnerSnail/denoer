import { ServerRequest } from "../dependcy/dep.ts";
import { getLogger } from "../log/config.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import transaction from "../model/transaction.ts";
import successHandle from "../utils/successHandle.ts";
import formatSelectResult from "../model/format.ts";
import reponseUtil from "../utils/response.ts";
import { getCookies } from "../dependcy/dep.ts";
import checkSupport from "../model/check_support.ts";
export async function getArticle(req: ServerRequest, next) {
    let article_id;
    const cookies = getCookies(req);
    let user_id = cookies['user_id'];
    if (!(req.url.indexOf('/api/getArticle/') > -1)) {
        return
    }
    try {
        article_id = req.url.match(/\/api\/getArticle\/article_id=(\d.)/)[1];
        if (article_id && req.method === 'GET') {
            let sql = `select * from article where article_id = ${article_id};`;
            let result: any = formatSelectResult(await transaction(sql));
            let checkHas = await checkSupport('support_article',user_id,article_id)
            if(checkHas){
                result.hasSupport = true;
            }else{
                result.hasSupport = false;
            }
            if (result) {
                reponseUtil(req, {
                    body: successHandle(200,result,'文章查询失败'),
                    status:200,
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
            } else {
                getLogger().error(`查询 article_id:${article_id} 失败`);
                reponseUtil(req, {
                    body: errorReponseHandle(500,'文章查询失败'),
                    status:200,
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
            }
        } else {
            getLogger().error(`查询 article_id:${article_id} 失败`);
            reponseUtil(req, {
                body: errorReponseHandle(500,'id不存在'),
                status:200,
                headers:{
                    "Content-Type":"application/json"
                }
            })
        }
    } catch (error) {
        getLogger().error(`selectArticle: 提取id错误`);
        req.respond({ body: new TextEncoder().encode(errorReponseHandle(500, 'id不存在')), status: 200 });
        return;
    }

    
}