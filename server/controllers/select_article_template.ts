import { ServerRequest } from "../dependcy/dep.ts";
import { getLogger } from "../log/config.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import transaction from "../model/transaction.ts";
import successHandle from "../utils/successHandle.ts";
import formatSelectResult from "../model/format.ts";
import reponseUtil from "../utils/response.ts";
import { getCookies } from "../dependcy/dep.ts";
import checkSupport from "../model/check_support.ts";
import { handleHtmlTemplate } from "../config/templateHandle.ts";
export async function getArticleTemplate(req: ServerRequest, next) {
    if (!(req.url.indexOf('/article.html') > -1)) {
        return
    }
    let article_id;
    const cookies = getCookies(req);
    let user_id = cookies['user_id'];

    try {
        console.log('runnerSnail')
        article_id = req.url.match(/\/article\.html\?article_id=(\d+)/)[1];
        if (article_id && req.method === 'GET') {
            let sql = `select * from article,useres where article.article_id = ${article_id} and useres.gitlab_id = article.gitlab_id;`;
            let result: any = formatSelectResult(await transaction(sql));
            let checkHas = await checkSupport('support_article',user_id,article_id);
            if(checkHas){
                result['has_support'] = 'true';
            }else{
                result['has_support'] = 'false';
            }
            console.log(result)
            if (result) {
                let htmlText = await handleHtmlTemplate('template/article.html',result);
                reponseUtil(req, {
                    body: htmlText,
                    status:200,
                    headers:{
                        "Content-Type":"text/html"
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
        getLogger().error(`selectArticle: ${error}`);
        req.respond({ body: new TextEncoder().encode(errorReponseHandle(500, 'id不存在')), status: 200 });
        return;
    }

    
}