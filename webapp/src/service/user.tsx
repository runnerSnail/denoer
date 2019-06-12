import { request } from 'utils'

// 获取用户信息
export async function fetchUserInfo (user_id) {
  const res = await request('deno.user.getUserInfoById',
  { user_id },
  { method: 'GET' }
  )
  return res
}

export async function loginAuthByCode (code) {
  const res = await request('login',
  { code },
  { method: 'GET' }
  )
  return res
}