import { Loadable } from 'components'

import UserRoutes from './user'
import PostsRoutes from './posts'

const routes = [
  {
    root: true,
    path: ['/', '/home', '/index'],
    exact: true,
    component: Loadable({
      loader: import('../pages/home')
    })
  },
  ...UserRoutes,
  ...PostsRoutes,
  {
    component: Loadable({
      loader: import('../pages/404')
    })
  }
]

export default routes