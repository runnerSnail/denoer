import formatSelectResult from "./format.ts";
import transaction from "./transaction.ts";

export default async function checkUser(gitlab_id:string):Promise<Array<any>>{
    let sql = `select * from useres where gitlab_id = '${gitlab_id}';`;
    let result:any = formatSelectResult(await transaction(sql));
    return result;
}
