import { Loadable } from 'components'

import User from '../pages/user'

export default [
  {
    path: '/user',
    exact: true,
    component: User
    // component: Loadable({
    //   loader: import(/* webpackChunkName: "user" */ '../pages/user')
    // })
  }
]