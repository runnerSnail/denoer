import { ServerRequest } from "../dependcy/dep.ts";
import {getLogger} from "../log/config.ts";

export async function createArticle(req:ServerRequest,next){
    if(req.url==="/studentDetail"){
        await req.body();
        getLogger().debug('xxxxx')
        req.respond({ body: new TextEncoder().encode('mistake'), status: 500 })
    }
}