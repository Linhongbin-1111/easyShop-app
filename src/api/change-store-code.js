import req from '../fetch/index.js'

const config = {
  changeStoreCode: {
    url: '/app/clientPersonal/updateInviteCode',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
