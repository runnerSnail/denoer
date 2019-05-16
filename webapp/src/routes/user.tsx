import { Loadable } from 'components'

export default [
  {
    path: '/user',
    exact: true,
    component: Loadable({
      loader: import('../pages/user')
    })
  }
]