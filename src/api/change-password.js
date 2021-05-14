import req from '../fetch/index.js'

const config = {
  changePassword: {
    url: '/app/clientPersonal/updateUserPassword',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
