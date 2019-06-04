# denoer 中文社区

> 致力于推动 deno 在中国的学习氛围
> 本站采用travis.ci自动化部署
> 您可以提交pr参与本站建设以及添加优秀资源超链接到 [资源汇总](https://deno.cn/new)


## 前端实现

    . react + typescript + redux + 待补充

## 后端实现

    . deno + deno-postgresql + 自封的web中间件[http_compose] config目录下面

    . dependcy 下面的 dep.ts 是所有三方包的的导入入口

    > 启动方式 cd server && deno run  --allow-net  index.ts

## 文章详情页服务端渲染 其他整个为单页应用

1. 路径区分/index 为单页面应用入口
2. 路径/api/getArticle?article_id===12121 为单页面 暂定jquery+html+css编写
3. 服务端书写简单的模版渲染引擎来渲染页面

## 目前代码 还不符合deno规范 待优化 sql操作也应该封装在model里面更好的分层[待优化]

## 本站顶部搜索实现
   1. ajax访问谷歌官网 https://www.google.com/
   2. 加载成功了，则利用谷歌搜索，err则显示百度搜索结果 
   3. 超过3秒自动跳转百度搜索
   4. 百度：https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=site:denoer.cn+关键字
   5. 谷歌：https://www.google.com.hk/search?hl=zh-CN&q=site:denoer.cn+关键字

## 接口规范

    /api/deno.模块名.描述.描述(例: 文章列表: /api/deno.posts.list, 文章详情: /api/deno.posts.detailByArticleId)

## 本站环境
    个人运营，目前采用 1核1G1M。站长会尽力优化以便于提供更优质的服务，如果您愿意支援改善服务配置。本人会为您悬挂一年横幅于本站首页

## travis 自动化编译部署