import { ServerRequest } from "../dependcy/dep.ts";
import {getLogger} from "../log/config.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import transaction from "../utils/transaction.ts";
import successHandle from "../utils/successHandle.ts";
import formatSelectResult from "../model/format.ts";
export async function createArticle(req:ServerRequest,next){
    if(req.url==="/api/article/create"){
        let body = await req.body();
        let praseBodyString = new TextDecoder().decode(body);
        const params = JSON.parse(praseBodyString);
        let sql = `INSERT INTO "public"."article"("title", "content", "read_num", "support_num", "type", "user_id") VALUES('${params['title']}', '${params['content']}', ${params['read_num']}, ${params['support_num']}, ${params['type']}, ${params['user_id']}) RETURNING  "article_id";`
        let result:any = formatSelectResult(await transaction(sql));
        if(result){
            req.respond({ body: new TextEncoder().encode(successHandle(200,result,'插入成功返回id')),status: 200 });
        }else{
            getLogger().error(`插入 ${praseBodyString} 失败`)
            req.respond({ body: new TextEncoder().encode(errorReponseHandle(500,'文章插入错误')),status: 200 });
        }
    }
}