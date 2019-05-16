import { Loadable } from 'components'

import Home from '../pages/home'
import UserRoutes from './user'
import PostsRoutes from './posts'
import NotFound from '../pages/404'

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
    component: NotFound
  }
]

export default routes