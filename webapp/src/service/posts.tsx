import { request } from 'utils'

// get posts list
export async function fetchPostsList (params?: object) {
  // const res = await request('getArticleList',
  const res = await request('deno.posts.list',
  { ...params },
  { basePath: 'api', method: 'GET' })
  return res
}

// publish posts
export async function fetchPublishPosts (params: object) {
  const res = await request('create', {
    ...params
  }, { basePath: '/api/article' })
  return res
}

// update posts
export async function fetchUpdatePosts (params: object) {
  const res = await request('update', {
    ...params
  }, { basePath: 'api/article' })
  return res
}

// get posts detail
export async function fetchPostsInfo (article_id: number) {
  const res = await request(`${article_id}`, {
    article_id
  }, { basePath: 'api/getacticle', method: 'GET' })
  return res
}