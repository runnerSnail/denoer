import { ServerRequest } from "../dependcy/dep.ts";
import { checkParamsByArrayString } from "../utils/check_param_null.ts";
import formatSelectResult from "../model/format.ts";
import transaction from "../model/transaction.ts";
import reponseUtil from "../utils/response.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import successHandle from "../utils/successHandle.ts";


export default async function insertComment(req: ServerRequest, next) {
    if (req.url === '/api/insertCommit') {
        // 提取参数
        let body = await req.body();
        let praseBodyString = new TextDecoder().decode(body);
        const params:Comment = JSON.parse(praseBodyString);
        if(!checkParamsByArrayString(['content','user_id','article_id'],params)){
            reponseUtil(req, {
                body: errorReponseHandle(500,'参数不全'),
                status:200,
                headers:{
                    "Content-Type":"application/json"
                }
            })
        };

        if(!params.parent_id)  params.parent_id = 0;

        // 拼接sql
        let sql = `INSERT INTO "public"."comment"("content", "gitlab_id", "article_id", "parent_id") VALUES('${params['content']}', '${params['user_id']}', ${params['article_id']}, ${params['parent_id']}) RETURNING  "comment_id";`
        let result: any = formatSelectResult(await transaction(sql));
        //执行sql返回结果
        if(result){
            reponseUtil(req, {
                body: successHandle(200,result,'插入成功返回id'),
                status:200,
                headers:{
                    "Content-Type":"application/json"
                }
            })
        }else{
            reponseUtil(req, {
                body: errorReponseHandle(500,'插入失败'),
                status:200,
                headers:{
                    "Content-Type":"application/json"
                }
            })
        }
    }
}
export interface Comment {
    comment_id?: number, //评论id
    content: string,//文章内容 true
    gitlab_id: number, //评论创建人 true 传的是githubid
    article_id: number, // 评论的文章 true
    parent_id?: number, // 评论的父id --用于层级展示 true
    create_time?: string,//创建时间 // 不需要传 false
}