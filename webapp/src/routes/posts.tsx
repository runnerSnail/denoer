import { Loadable } from 'components'

export default [
  {
    path: '/publish',
    exact: true,
    component: Loadable({
      loader: import('../pages/posts/publish')
    })
  }
]