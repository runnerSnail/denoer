## 针对用户设置接口 权限

## 利用cookie做简单的用户校验 p0
认证流程
1. 后端从请求中读取cookie，如果失效。利用github登陆
2. 从github中读取用户信息写入cookie并签发带有钥匙的cookie，并创建userid


网站中是否有cookie
1. 每次POST请求解析cookie验证cookie是否有效
2. 有些操作检验是否登陆
3. 浏览器写入 cookie