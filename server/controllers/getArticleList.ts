import formatSelectResult from "../model/format.ts";
import transaction from "../model/transaction.ts";
import { ServerRequest } from "../dependcy/dep.ts";

/**
 *  首页获取文章列表
 *  select * from article  ORDER BY create_time DESC limit  2  offset  0;
 *  --查询2行从第0行开始
 * 
 */
export  async function getArticleList(req: ServerRequest, next){
    if(req.url.match(/\/api\/getArticleList/)){
        let matchArr = req.url.match(/\S*page=(\S+)&size=(\S+)/);
        let page:number,size:number;
        if(matchArr && matchArr.length==3){
            page = parseInt(matchArr[1]);
            size = parseInt(matchArr[2]);
        }else{
            page = 1;
            size = 10;
        }
        let sql = `select * from article  order by create_time desc limit  ${size}  offset  ${(page-1)*size}`;
        console.log(sql);
        let sqlResult = await transaction(sql);
        console.log(sqlResult);
        // let result:any = formatSelectResult();
        // console.log(result);
    }
    

}