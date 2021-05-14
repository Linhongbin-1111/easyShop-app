import req from '../fetch/index.js'

const config = {
  getShopCarData: {
    url: '/app/clientCarts/getCartsByPage',
    method: 'post'
  },
  deleteShopCar: {
    url: '/app/clientCarts/deleteCarts',
    method: 'post'
  },
  updateCars: {
    url: '/app/clientCarts/updateCarts',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
