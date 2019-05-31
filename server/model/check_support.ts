import formatSelectResult from "./format.ts";
import transaction from "./transaction.ts";

export default async function checkSupport(tableName:string,gitlab_id:string,id:string):Promise<Array<any>>{
    let sql = `select * from ${tableName} where gitlab_id = '${gitlab_id}' and ${tableName}_id = ${id};`;
    let result = formatSelectResult(await transaction(sql));
    return result;
}
