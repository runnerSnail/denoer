import { ServerRequest } from "../dependcy/dep.ts";
import { getLogger } from "../log/config.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import transaction from "../model/transaction.ts";
import successHandle from "../utils/successHandle.ts";
import reponseUtil from "../utils/response.ts";
import checkSupport from "../model/check_support.ts";
import { getCookies } from "../dependcy/dep.ts";
export async function updateArticleSupport(req: ServerRequest, next) {
    if (!(req.url.indexOf('/api/article/clicksupport') > -1)) return;

    try {
        let support_num: string, article_id: number;
        let body = await req.body();
        let praseBodyString = new TextDecoder().decode(body);
        const params = JSON.parse(praseBodyString);
        article_id = params['article_id'];
        const cookies = getCookies(req);
        let user_id = cookies['user_id'];

        if (params['user_has_upvoted']) {
            support_num = 'support_num + 1';
        } else {
            support_num = 'support_num - 1';
        }

        // 检查是否点过赞
        let result = await checkSupport('support_article',user_id,article_id);
        if(!result){
            throw new Error('重复点赞')
        }


        // 更新点赞
        let sqlUpdateArticle = `update article set support_num = ${support_num} where article_id = ${article_id}`;
        await transaction(sqlUpdateArticle);

        reponseUtil(req, {
            body: successHandle(200, {}, '更新成功'),
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        getLogger().error(`updateArticle: ${error}`);
        reponseUtil(req, {
            body: errorReponseHandle(500, error),
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })
        return
    }
}