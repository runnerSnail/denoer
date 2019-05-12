import { Pool } from "../dependcy/dep";

// 创建连接池
const pool = new Pool({
    database: "test",
    user: "test",

    }, 10);
// then you can do one-off queries like this
// await pool.query("SELECT _ FROM my_table;");
// or get client from pool
// const client = await pool.connect();
// client.query("SELECT _ FROM my_table;");
// remember to release the client back to pool
// client.release();