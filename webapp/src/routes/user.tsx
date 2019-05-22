import { Loadable } from 'components'

export default [
  {
    path: '/user',
    exact: true,
    component: Loadable({
      loader: import(/* webpackChunkName: "user" */ '../pages/user')
    })
  }
]