import req from '../fetch/index.js'

const config = {
  getAdress: {
    url: '/app/clientPersonal/findAddress',
    method: 'post'
  },
  addOrder: {
    url: '/app/buy/addOrder',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
