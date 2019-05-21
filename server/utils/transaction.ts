import pool from "../model/db.ts";
export default async function  transaction(sql:string):Promise<string>{
    let client,affect;
        try {
            client = await pool.connect();
            affect = await client.query(sql);
        } catch (error) {
            await client.query("ROLLBACK");
            affect = null;
        }finally{
            client.release();
        }
        return affect;
}