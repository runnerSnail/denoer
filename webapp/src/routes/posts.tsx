import { Loadable } from 'components'

export default [
  {
    path: '/publish',
    exact: true,
    component: Loadable({
      loader: import(/* webpackChunkName: "postsPublish" */ '../pages/posts/publish')
    })
  },
  {
    path: '/posts/:article_id',
    exact: true,
    component: Loadable({
      loader: import(/* webpackChunkName: "postsDetail" */ '../pages/posts/detail')
    })
  }
]