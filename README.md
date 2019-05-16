# denoer 中文社区

> 致力于推动 deno 在中国的学习氛围

## 前端实现

    . react + typescript + redux + 待补充

## 后端实现

    . deno + deno-postgresql + 自封的web中间件[http_compose]
    . dependcy 下面的 dep.ts 是所有三方包的的导入入口
    > 启动方式 cd server && deno run  --allow-net  index.ts



    ```
    const pool = new Pool({
    database: "test",
    user: "test",
    ....

    }, 10);

    // then you can do one-off queries like this
    await pool.query("SELECT _ FROM my_table;");
    // or get client from pool
    const client = await pool.connect();
    client.query("SELECT _ FROM my_table;");
    // remember to release the client back to pool
    client.release();
```
