import formatSelectResult from "./format.ts";
import transaction from "./transaction.ts";

export default async function checkSupport(tableName:string,gitlab_id:string,id:string):Promise<any>{
    let sql = `select * from ${tableName} where gitlab_id = '${gitlab_id}' and article_id = ${id};`;
    console.log(sql);
    let result = formatSelectResult(await transaction(sql));
    for (var i in result) {
        return result;
    }
    return null;
}
