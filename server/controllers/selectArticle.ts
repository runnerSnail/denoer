import { ServerRequest } from "../dependcy/dep.ts";
import { getLogger } from "../log/config.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import transaction from "../model/transaction.ts";
import successHandle from "../utils/successHandle.ts";
import formatSelectResult from "../model/format.ts";
export async function getArticle(req: ServerRequest, next) {
    let article_id
    if (!(req.url.indexOf('/api/getArticle/') > -1)) {
        return
    }
    try {
        article_id = req.url.match(/\/api\/getArticle\/article_id=(\d.)/)[1];
    } catch (error) {
        getLogger().error(`selectArticle: 提取id错误`);
        req.respond({ body: new TextEncoder().encode(errorReponseHandle(500, 'id不存在')), status: 200 });
        return;
    }

    if (article_id && req.method === 'GET') {
        let sql = `select * from article where article_id = ${article_id};`;
        let result: any = formatSelectResult(await transaction(sql));
        if (result) {
            req.respond({ body: new TextEncoder().encode(successHandle(200, result, '文章查询成功')), status: 200 });
        } else {
            getLogger().error(`查询 article_id:${article_id} 失败`)
            req.respond({ body: new TextEncoder().encode(errorReponseHandle(500, '文章查询失败')), status: 200 });
        }
    } else {
        getLogger().error(`查询 article_id:${article_id} 失败`);
        req.respond({ body: new TextEncoder().encode(errorReponseHandle(500, 'id不存在')), status: 200 });
    }
}