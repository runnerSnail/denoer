import Home from '../pages/home'
import UserRoutes from './user'
import PostsRoutes from './posts'

const routes = [
  {
    root: true,
    path: '/',
    exact: true,
    component: Home
  },
  ...UserRoutes,
  ...PostsRoutes
]

export default routes