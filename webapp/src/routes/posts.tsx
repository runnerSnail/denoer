import { Loadable } from 'components'

import PublishPosts from '../pages/posts/publish'
import PostsDetail from '../pages/posts/detail'

export default [
  {
    path: '/publish',
    exact: true,
    component: PublishPosts
    // component: Loadable({
    //   loader: import(/* webpackChunkName: "postsPublish" */ '../pages/posts/publish')
    // })
  },
  {
    path: '/posts/:article_id',
    exact: true,
    component: PostsDetail
    // component: Loadable({
    //   loader: import(/* webpackChunkName: "postsDetail" */ '../pages/posts/detail')
    // })
  }
]