import { ServerRequest } from "../dependcy/dep.ts";
import { getLogger } from "../log/config.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import transaction from "../model/transaction.ts";
import successHandle from "../utils/successHandle.ts";
import reponseUtil from "../utils/response.ts";
export async function updateCommentSupport(req: ServerRequest, next) {
    if (!(req.url.indexOf('/api/comment/clicksupport') > -1)) return;

    try {
        let support_num: string, comment_id: number;
        let body = await req.body();
        let praseBodyString = new TextDecoder().decode(body);
        const params = JSON.parse(praseBodyString);
        comment_id = params['comment_id'];

        if (params['user_has_upvoted']) {
            support_num = 'support_num + 1';
        } else {
            support_num = 'support_num - 1';
        }

        // 更新点赞
        let sql = `update comment set support_num = ${support_num} where comment_id = ${comment_id}`;
        console.log(sql);
        await transaction(sql);
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
            body: errorReponseHandle(500, '更新失败'),
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })
        return
    }
}