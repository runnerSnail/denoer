import { request } from 'utils'

// get posts list
export async function fetchPostsList (params?: object) {
  // const res = await request('getArticleList',
  const res = await request('deno.posts.list',
  { ...params },
  { method: 'GET' })
  return res
}

// publish posts
export async function fetchPublishPosts (params: object) {
  const res = await request('deno.posts.creatPosts', {
    ...params
  }, { method: 'POST' })
  return res
}

// update posts
export async function fetchUpdatePosts (params: object) {
  const res = await request('deno.posts.update', {
    ...params
  }, { method: 'POST' })
  return res
}

// get posts detail
export async function fetchPostsInfo (article_id: number) {
  const res = await request(`deno.posts.detailByArticleId`, {
    article_id // ${article_id}
  }, { basePath: 'api', method: 'GET' })
  return res
}