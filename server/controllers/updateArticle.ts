import { ServerRequest } from "../dependcy/dep.ts";
import {getLogger} from "../log/config.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import transaction from "../model/transaction.ts";
import successHandle from "../utils/successHandle.ts";
import setUpdateSql from "../utils/updateHandle.ts";
import reponseUtil from "../utils/response.ts";
export async function updateArticle(req:ServerRequest,next){
    
    if(!(req.url.indexOf('/api/article/update')>-1)) return;
    
    try {
        let article_id:string;
        let body = await req.body();
        let praseBodyString = new TextDecoder().decode(body);
        const params = JSON.parse(praseBodyString);
        console.log(params['article_id'])
        console.log('=====>>>')
        article_id = params['article_id'];
        // 禁止更新id 创建时间 //
        let newObj:any = {};
        // title content img type
        if(params['title'])newObj['title']=params['title'];
        if(params['content'])newObj['content']=params['content'];
        if(params['img'])newObj['img']=params['img'];
        if(params['type'])newObj['type']=params['type'];
        // 更新阅读量和点赞
        if(params['support_num'])newObj['support_num']=1;
        console.log(params['read_num'])
        if(params['read_num'])newObj['read_num']=1;
        console.log('xxxx');
        let sql = setUpdateSql('article',{column:'article_id',id:article_id},newObj);
        console.log(sql);
        console.log('cccc');
        await transaction(sql);
        reponseUtil(req, {
            body: successHandle(200,{},'更新成功'),
            status:200,
            headers:{
                "Content-Type":"application/json"
            }
        })
    } catch (error) {
        getLogger().error(`updateArticle: ${error}`);
        reponseUtil(req, {
            body: errorReponseHandle(500,'更新失败'),
            status:200,
            headers:{
                "Content-Type":"application/json"
            }
        })
        return
    }
    
}