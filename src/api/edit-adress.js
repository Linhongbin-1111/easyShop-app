import req from '../fetch/index.js'

const config = {
  editAdress: {
    url: '/app/clientPersonal/updateAddress',
    method: 'post'
  },
  getAdressData: {
    url: '/app/clientPersonal/findAddressByCode',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
