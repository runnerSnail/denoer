import axios from 'axios'

const productUrl = 'http://localhost:3000'
const customAxios = axios.create()

customAxios.defaults.withCredentials = true
customAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
customAxios.interceptors.response.use(
  axiosSuccessRes => axiosSuccessRes,
  axiosErrRes => Promise.reject(axiosErrRes)
)

const defaultOpt = {
  basePath: '/api',
  errorHandler: (err) => {},
  // 未登录跳转
  authFailureHandler: () => {}
}

export default (apiName, params = {}, opt = {}) => {

  const reqCustom = {
    ...defaultOpt,
    ...opt
  }

  const url = process.env.NODE_ENV === 'development'
    ? `${reqCustom.basePath}/${apiName}`
    : `${productUrl}/${reqCustom.basePath}/${apiName}`

  return customAxios({
    method: 'POST',
    withCredentials: false,
    responseType: 'json',
    url,
    params
  })
  .then(res => res)
  .catch(err => {
    console.log('err:', err)
    // 错误捕获。。
    // 未登录。。
    return err
  })
}