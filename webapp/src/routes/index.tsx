import { Loadable } from 'components'

import UserRoutes from './user'
import PostsRoutes from './posts'

const routes = [
  {
    root: true,
    path: ['/', '/home', '/index'],
    exact: true,
    component: Loadable({
      loader: import(/* webpackChunkName: "home" */ '../pages/home')
    })
  },
  ...UserRoutes,
  ...PostsRoutes,
  {
    component: Loadable({
      loader: import(/* webpackChunkName: "404" */ '../pages/404')
    })
  }
]

export default routes