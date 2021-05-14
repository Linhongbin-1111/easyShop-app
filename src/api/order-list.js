import req from '../fetch/index.js'

const config = {
  getOrderList: {
    url: '/app/clientOrder/listOrderByPage',
    method: 'post'
  },
  getShopOrderList: {
    url: '/app/managerOrder/listOrderByPage',
    method: 'post'
  },
  changeOrderStatus: {
    url: '/app/clientOrder/updateOrderStatus',
    method: 'post'
  },
  updateOrderStatus: {
    url: '/app/clientOrder/updateOrderStatus',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
