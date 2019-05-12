import request from './request'

const sleep = (t) => new Promise((resolve, reject) => {
  setTimeout(resolve, t)
})




export {
  request,
  sleep
}