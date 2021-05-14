import req from '../fetch/index.js'

const config = {
  getClientDetail: {
    url: '/app/clientOrder/getOrder',
    method: 'post'
  },
  getShopDetail: {
    url: '/app/managerOrder/getOrder',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
