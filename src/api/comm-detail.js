
import req from '../fetch/index.js'

const config = {
  // portExport: {
  //   url: '/api/media/stimulate/exportExcel',
  //   method: 'post',
  //   fileConfig: {
  //     type: 'file',
  //     fileName: '销售激励报表'
  //   }
  // },
  getDetail: {
    url: '/app/clientCommodity/getCommodity',
    method: 'post'
  },
  payNow: {
    url: '/app/buy/addOrder',
    method: 'post'
  },
  addShopCar: {
    url: '/app/clientCarts/addCarts',
    method: 'post'
  },
  // 查询商品评价接口
  getCommEvaluates: {
    url: '/app/clientGoods/listGoodsEvaluates',
    method: 'post'
  },
  getAdress: {
    url: '/app/clientPersonal/findAddress',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
