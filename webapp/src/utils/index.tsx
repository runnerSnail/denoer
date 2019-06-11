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



export {
  request,
  sleep,
  TYPE_ARRAY
}