import { Loadable } from 'components'

import UserRoutes from './user'
import PostsRoutes from './posts'

import Home from '../pages/home'
import MyArticle from '../pages/myarticle'
import About from '../pages/about'
import New from '../pages/new'
import NotFound from '../pages/404'

const routes = [
  {
    root: true,
    path: ['/', '/home', '/index'],
    exact: true,
    component: Home
    // component: Loadable({
    //   loader: import(/* webpackChunkName: "home" */ '../pages/home')
    // })
  },{
    root: true,
    path: ['/myarticle'],
    exact: true,
    component: MyArticle
    // component: Loadable({
    //   loader: import(/* webpackChunkName: "myarticle" */ '../pages/myarticle')
    // })
  },
  ...UserRoutes,
  ...PostsRoutes,
  {
    root: true,
    path: '/about',
    exact: true,
    component: About
    // component: Loadable({
    //   loader: import(/* webpackChunkName: "about" */ '../pages/about')
    // })
  },{
    root: true,
    path: '/new',
    exact: true,
    component: New
    // component: Loadable({
    //   loader: import(/* webpackChunkName: "new" */ '../pages/new')
    // })
  },
  {
    component: NotFound
    // component: Loadable({
    //   loader: import(/* webpackChunkName: "404" */ '../pages/404')
    // })
  }
]

export default routes