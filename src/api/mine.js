import req from '../fetch/index.js'

const config = {
  getUserInfo: {
    url: '/app/clientPersonal/getUserMessage',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
