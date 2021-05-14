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
  getSliderPicList: {
    url: '/app/clientIndex/listCarousel',
    method: 'post'
  },
  getHotComm: {
    url: '/app/clientIndex/listCommodityHot',
    method: 'post'
  },
  getsearchData: {
    url: '/app/clientIndex/searchCmd',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
