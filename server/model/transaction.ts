import pool from "../model/db.ts";
export default async function  transaction(sql:string):Promise<string>{
    let client,affect;
        try {
            client = await pool.connect();
            await client.query("BEGIN");
            affect = await client.query(sql);
            await client.query("COMMIT");
        } catch (error) {
            await client.query("ROLLBACK");
            affect = null;
        }finally{
            client.release();
        }
        return affect;
}
transaction('select * from article order by create_time desc limit 10 offset 0;');