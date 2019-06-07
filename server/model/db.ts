import { Pool } from "../dependcy/dep.ts";
import { dbConfig } from '../config/set_json.ts';

// 创建连接池
const pool = new Pool({
    database: dbConfig.database,
    user: dbConfig.user,
    host: dbConfig.host,
    port: dbConfig.port,
    password: dbConfig.password,
}, 10);

export async function testDB() {
    const client = await pool.connect();
    let result = await client.query("SELECT * FROM article;");
    console.log(result.rows);
}
export default pool;