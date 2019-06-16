import { ServerRequest } from "../dependcy/dep.ts";
import transaction from "../model/transaction.ts";
import reponseUtil from "../utils/response.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import successHandle from "../utils/successHandle.ts";
import formatSelectResult from "../model/format.ts";


export default async function selectCommit(req: ServerRequest, next) {
    if(req.url.match(/\/api\/selectComment/)){
        let matchArr = req.url.match(/\S*article_id=(\S+)/);
        let article_id:number;
        if(matchArr && matchArr.length==2){
            article_id = parseInt(matchArr[1]);
            let sql = `select * from comment,useres  where comment.article_id = ${article_id} and comment.gitlab_id = useres.gitlab_id;`;
            let temp = await transaction(sql);
            let result = formatSelectResult(temp);
            if(result){
                reponseUtil(req,{
                    body:successHandle(200,result,''),
                    status:200,
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
            }else{
                reponseUtil(req,{
                    body:errorReponseHandle(500,'查询失败'),
                    status:200,
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
            }
        }else{
            reponseUtil(req,{
                body:errorReponseHandle(500,'article_id 参数不正确'),
                status:200,
                headers:{
                    "Content-Type":"application/json"
                }
            })
        }
        
    }
}
