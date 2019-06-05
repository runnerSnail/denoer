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
export async function getArticleList(req: ServerRequest, next){
    if(req.url.indexOf('/api/deno.posts.list') > -1) {
        let matchArr = req.url.match(/\S*page=(\S+)&size=(\S+)/);
        let page:number,size:number;
        if(matchArr && matchArr.length==3){
            page = parseInt(matchArr[1]);
            size = parseInt(matchArr[2]);
        }else{
            page = 1;
            size = 10;
        }
        let sql = `select * from article limit  ${size}  offset  ${(page-1)*size} order by create_time desc`;
        let result: any = formatSelectResult(await transaction(sql));
        console.log('===>');
        if (result) {
            reponseUtil(req, {
                body: successHandle(200,result,'查询成功'),
                status:200,
                headers:{
                    "Content-Type":"application/json"
                }
            })
        } else {
            getLogger().error(`获取文章列表失败`)
            reponseUtil(req, {
                body: errorReponseHandle(500,'查询失败'),
                status:200,
                headers:{
                    "Content-Type":"application/json"
                }
            })
        }
    }
}