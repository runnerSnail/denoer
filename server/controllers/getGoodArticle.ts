import formatSelectResult from "../model/format.ts";
import transaction from "../model/transaction.ts";
import { ServerRequest } from "../dependcy/dep.ts";
import reponseUtil from "../utils/response.ts";
import successHandle from "../utils/successHandle.ts";
import { getLogger } from "../log/config.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
/**
 *  首页获取文章列表
 *  select * from article  ORDER BY create_time DESC limit  2  offset  0;
 *  --查询2行从第0行开始
 * 
 */
export async function getGoodArticleList(req: ServerRequest, next) {
    try {
        if (req.url.indexOf('/api/getGoodArticle') > -1) {
            
            let sql = `select * from article where type = 10 `;
            let result: any = formatSelectResult(await transaction(sql));
            reponseUtil(req, {
                body: successHandle(200, result, '查询成功'),
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
    } catch (error) {
        getLogger().error(`获取文章列表失败`)
        reponseUtil(req, {
            body: errorReponseHandle(500, '查询失败'),
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

}