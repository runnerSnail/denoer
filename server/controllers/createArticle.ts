import { ServerRequest } from "../dependcy/dep.ts";
import { getLogger } from "../log/config.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import transaction from "../model/transaction.ts";
import successHandle from "../utils/successHandle.ts";
import formatSelectResult from "../model/format.ts";
import reponseUtil from "../utils/response.ts";
export async function createArticle(req: ServerRequest, next) {
    if (req.url.indexOf('/api/deno.posts.creatPosts') > -1) {
        let body = await req.body();
        let praseBodyString = new TextDecoder().decode(body);
        const params = JSON.parse(praseBodyString);
        const {
            title = '', article_content = '', read_num = 0,
            support_num = 0, type = 1, gitlab_id = ''
        } = params || {}
        if (!title && !article_content) {
            req.respond({ body: new TextEncoder().encode(errorReponseHandle(500, '标题内容不能为空')), status: 200 });
        }
        let sql = `INSERT INTO "public"."article"("title", "article_content", "read_num", "support_num", "type", "gitlab_id") VALUES('${title}', '${article_content}', ${read_num}, ${support_num}, ${type}, ${gitlab_id}) RETURNING  "article_id";`
        let result: any = formatSelectResult(await transaction(sql));
        if (result) {
            reponseUtil(req, {
                body: successHandle(200,result,'插入成功返回id'),
                status:200,
                headers:{
                    "Content-Type":"application/json"
                }
            })
        } else {
            getLogger().error(`插入 ${praseBodyString} 失败`)
            reponseUtil(req, {
                body: errorReponseHandle(500,'文章插入错误'),
                status:200,
                headers:{
                    "Content-Type":"application/json"
                }
            })
        }
    }
}