import formatSelectResult from "./format.ts";
import transaction from "./transaction.ts";
import { getLogger } from "../log/config.ts";

export default async function addUser(user: UserInfo): Promise<any> {
    try {
        let sql = `INSERT INTO "public"."useres"("user_name", "user_img", "gitlab_id", "gitlab_url", "company", "location","email","followers") VALUES('${user.login}', '${user.avatar_url}', '${user.id}', '${user.html_url}','${user.company}', '${user.location}', '${user.email}', '${user.followers}') RETURNING  "user_id";`
        let sqlResult = await transaction(sql);
        let result: any = formatSelectResult(sqlResult);
        return result;
    } catch (error) {
        return undefined;
    }

}
export interface UserInfo {
    avatar_url: string;
    login: string,
    id: string,
    company: string,
    location: string,
    email: string,
    html_url:string,
    followers:string
}
// user_name user_id user_img gitlab_id add_time gitlab_url company location email