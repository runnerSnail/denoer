# 项目启动

npm run start

## TODO LIST

1. 主题色配置
2. mock
3. ~~ts 组件函数式写法调研~~
4. 动态路由(loaderable/按需加载)
5. CDN 调研
6. https://www.whongbin.cn/index/article/detail/id/25.html(github三方登录)
7. ~~解析 markdown 样式文件~~
8. ~~antd 按需引入~~
9. 多入口打包压缩

#### 2019/05/29

1. 代码高亮(三方包: marked)
2. ts 有状态组件按照类的方式创建组件，无状态组件使用的是 SFC 创建形式，如下

```JavaScript

const Button: SFC<Props> = ({ onClick: handleClick, color, children }) => (
  <button style={{ color }} onClick={handleClick}>
    {children}
  </button>
)

```
 个人建议无状态组件可以直接使用函数的方式，如下

 ```JavaScript
 
 export default function ({ color, handleClick, ...otherProps }) {
   return (
    <button style={{ color }} onClick={handleClick}>
      {children}
    </button>
   )
 }
 // ---
 import Btn from 'path'

 <Btn color='color' handleClick='event' />
 
 
 ```

#### 2019/05/22

1. 抽离 service
2. 文章详情

#### 2019/05/14

1. 首页布局优化

#### 2019/05/12

1. 解决 antd 按需引入样式不生效问题
2. 首页列表
3. 优化

#### 2019/05/11

1. 页面布局
2. css 重置，font、color 全局变量，mixin
3. 封装 request 请求函数

#### 2019/05/10

1. 路由配置

#### 2019/05/29
1. 测试语雀图片可以被使用到网站中（前期时间紧迫可以可以不用做文章中的图片上传）

####
1. 服务端渲染模版已经完成 [handleHtmlTemplate](../server/config/test_templateHandle.ts)
2. cd server && deno run --allow-all   config/test_templateHandle.ts  进行测试

#### 打包 npm run build && gulp
gulp 是打包详情页