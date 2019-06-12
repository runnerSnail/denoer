import request from './request'

const sleep = (t) => new Promise((resolve, reject) => {
  setTimeout(resolve, t)
})

const TYPE_ARRAY = [
  {
    key: 1,
    value: '全部'
  },
  {
    key: 2,
    value: '精华'
  },
  {
    key: 3,
    value: '分享'
  },
  {
    key: 4,
    value: '问答'
  },
  {
    key: 5,
    value: '招聘'
  }
]

const loginConfig = {
  client_id: '8bf81a16134ffeef7284'
  // client_secret: 'b93eb413a2e1e3243f8deadb3fc31f8dca18e404'
}

export {
  request,
  sleep,
  loginConfig,
  TYPE_ARRAY
}