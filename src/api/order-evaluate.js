import req from '../fetch/index.js'

const config = {
  getEvaluate: {
    url: '/app/clientOrder/getOrder',
    method: 'post'
  },
  addEvaluate: {
    url: '/app/clientOrder/addCommodityAssess',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
