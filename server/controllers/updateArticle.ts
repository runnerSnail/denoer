import { ServerRequest } from "../dependcy/dep.ts";
import {getLogger} from "../log/config.ts";
import errorReponseHandle from "../utils/errorReponseHandle.ts";
import transaction from "../utils/transaction.ts";
import successHandle from "../utils/successHandle.ts";
import setUpdateSql from "../utils/updateHandle.ts";
export async function updateArticle(req:ServerRequest,next){
    
    if(!(req.url.indexOf('/api/article/update/')>-1)) return;
    
    try {
        let article_id:string;
        article_id = req.url.match(/\/api\/getarticle\/(\d.)/)[1];
        let body = await req.body();
        let praseBodyString = new TextDecoder().decode(body);
        const params = JSON.parse(praseBodyString);
        // 禁止更新id 创建时间 //
        let newObj:any;
        // title content img type
        if(params['title'])newObj['title']=params['title'];
        if(params['content'])newObj['content']=params['content'];
        if(params['img'])newObj['img']=params['img'];
        if(params['type'])newObj['type']=params['type'];
        let sql = setUpdateSql('article',{column:'article_id',id:article_id},newObj);
        let affect:any =  await transaction(sql);
        req.respond({ body: new TextEncoder().encode(successHandle(200,{},'更新成功')),status: 200 });
    } catch (error) {
        getLogger().error(`updateArticle: ${error}`)
        req.respond({ body: new TextEncoder().encode(errorReponseHandle(500,'更新失败')),status: 200 });
        return
    }
    
}