import axios from 'axios'

const productUrl = ''
const developUrl = ''
const customAxios = axios.create()

interface option {
  basePath?: string,
  method?: string
}

customAxios.defaults.withCredentials = true
customAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
customAxios.interceptors.response.use(
  axiosSuccessRes => axiosSuccessRes,
  axiosErrRes => Promise.reject(axiosErrRes)
)

const defaultOpt = {
  basePath: 'api',
  errorHandler: (err) => {},
  // 未登录跳转
  authFailureHandler: () => {}
}

export default (apiName, params = {}, opt: option) => {
  const { method = 'POST' } = opt

  const reqCustom = {
    ...defaultOpt,
    ...opt
  }

  const url = process.env.NODE_ENV === 'development'
    ? `${developUrl}/${reqCustom.basePath}/${apiName}`
    : `${productUrl}/${reqCustom.basePath}/${apiName}`
  return customAxios({
    method,
    withCredentials: false,
    responseType: 'json',
    url,
    params
  })
  .then(res => res.data)
  .catch(err => {
    console.log('err:', err)
    // 错误捕获。。
    // 未登录。。
    // return err
  })
}