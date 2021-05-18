<template>
  <div class="container">
    <div class="leader">
        <ul>
            <li :class="{active: this.orderType === 'all'}" @click="getOrderList('', 'all')">全部订单</li>
            <li :class="{active: this.orderType === 'payed'}" @click="getOrderList('0', 'payed')">已付款</li>
            <li :class="{active: this.orderType === 'pickup'}" @click="getOrderList('1', 'pickup')">待取货</li>
            <li :class="{active: this.orderType === 'confirm'}" @click="getOrderList('3', 'confirm')">已完成</li>
        </ul>
    </div>
    <div class="order-item" v-for="item of list" :key="item.id" @click="toPage(item)">
        <div class="item-top">
            <img src="../../assets/images/订单.png" alt="">
            <span>{{item.orderCode}}</span>
            <span>
                {{
                    item.orderStatus === '0' ? '已下单' :
                    item.orderStatus === '1' ? '待取货' :
                    item.orderStatus === '2' ? '已取货' :
                    item.orderStatus === '3' ? '已完成未评价' :
                    item.orderStatus === '4' ? '已评价' :
                    '已取消'
                }}
            </span>
        </div>
        <div class="item-center" v-for="(childItem, index) in item.cmdInfoList" :key="index">
            <div class="img-con">
                <img :src="childItem.picPath" alt="">
            </div>
            <div class="text">
                <div class="text-con">
                    {{childItem.comName}}
                </div>
                <div class="props-con">
                    {{childItem.comPresent}}
                </div>
                <div class="props-con">
                    {{childItem.spec}}
                </div>
                <div class="price-con">
                    <span>￥</span>
                    <span>{{childItem.comPrice}} &nbsp;</span>
                    <span>x{{childItem.detailAmount}}</span>
                </div>
            </div>
        </div>
        <div class="item-bottom">
            <span>共{{item.totalCmd}}件商品，合计</span>
            <span>￥</span>
            <span>{{item.totalPrice}}</span>
        </div>
        <!-- 客户 -->
        <div class="item-more" v-show="userType === '3'">
            <div
              class="btn"
              @click.stop="changeOrderStatus(item, '5')"
              v-show="item.orderStatus === '1' || item.orderStatus === '2' || item.orderStatus === '0'">
                <span>取消订单</span>
            </div>
            <div class="btn" @click.stop="evaluate(item, '4')" v-show="item.orderStatus === '3'">
                <span>评价</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, '3')" v-show="item.orderStatus === '2'">
                <span>确认收货</span>
            </div>
        </div>
        <!-- 店长 -->
        <div class="item-more" v-show="userType === '1'">
            <div
              class="btn"
              @click.stop="changeOrderStatus(item, '5')"
              v-show="item.orderStatus === '0'">
                <span>订单取消</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, '1')" v-show="item.orderStatus === '0'">
                <span>确认到货</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, '0')" v-show="item.orderStatus === '1'">
                <span>取消到货</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, '2')" v-show="item.orderStatus === '1'">
                <span>确认取货</span>
            </div>
            <div class="btn" @click.stop="changeOrderStatus(item, '1')" v-show="item.orderStatus === '2'">
                <span>取消取货</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/order-list.js'

export default {
  name: 'order-list',
  data () {
    return {
      list: [],
      orderType: 'all'
    }
  },
  computed: {
    userType () {
      return JSON.parse(sessionStorage.getItem('roleInfo')).role
    }
  },
  mounted () {
    this.getOrderList('', 'all')
  },
  methods: {
    //   用户获取订单
    getOrderList (orderStatus = '', type) {
      let data = {
        orderStatus: orderStatus,
        pageSize: 100,
        pageNum: 1
      }

      if (!orderStatus) {
        delete data.orderStateId
      }

      this.orderType = type
      if (JSON.parse(sessionStorage.getItem('roleInfo')).role === '3') {
        req('getOrderList', {
          ...data
        }).then(data => {
          if (data.code === 0) {
            // console.log(data)
            this.list = data.data.list
          } else {
            this.$toast.fail(data.msg)
          }
        })
      } else {
        req('getShopOrderList', {
          ...data
        }).then(data => {
          // console.log(data)
          if (data.code === 0) {
            this.list = data.data.list
          } else {
            this.$toast.fail(data.msg)
          }
        })
      }
    },
    toPage (data) {
      this.$router.push({path: '/order-detail', query: data})
    },
    evaluate (data) {
      // console.log(data)
      this.$router.push({path: '/order-evaluate', query: data})
    },
    changeOrderStatus (item, changeStatus) {
      // let orderType = ''

      // if (item.orderStateId === '0') {
      //   orderType = '已下单'
      // } else if (item.orderStateId === '1') {
      //   orderType = '已取消'
      // } else if (item.orderStateId === '2') {
      //   orderType = '已到货'
      // } else if (item.orderStateId === '3') {
      //   orderType = '已取货'
      // } else if (item.orderStateId === '4') {
      //   orderType = '已完成未评价'
      // } else {
      //   orderType = '已完成已评价'
      // }
      if (JSON.parse(sessionStorage.getItem('roleInfo')).role === '3') {
        this.$confirm('确定进行该操作吗?').then(() => {
          req('changeOrderStatus', {
            orderCode: item.orderCode,
            orderStatus: changeStatus,
            version: item.version
          }).then(data => {
            if (data.code === 0) {
              this.$toast.success(data.msg)
              this.getOrderList('', this.orderType)
            } else {
              this.$toast.fail(data.msg)
            }
          })
        })
      } else {
        this.$confirm('确定进行该操作吗?').then(() => {
          req('updateOrderStatus', {
            orderCode: item.orderCode,
            orderStatus: changeStatus,
            version: item.version
          }).then(data => {
            if (data.code === 0) {
              this.$toast.success(data.msg)
              this.getOrderList('', this.orderType)
            } else {
              this.$toast.fail(data.msg)
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    padding-bottom: 300px;
    background: #f6f6f6;
}
 .leader {
      height: 50px;
      width: 100%;
      ul {
          height: 100%;
          padding: 0 0 0 2.5%;
          margin: 0;
          display: flex;
          li {
              line-height: 50px;
              padding: 0;
              margin: 0;
              list-style: none;
              padding: 0 13px;
              font-size: 15px;
          }
          .active {
              font-size: 17px;
              color: #e1251b;
          }
      }
  }
  .order-item {
      width: 95%;
      margin: 0 auto 12px;
      background-color: white;
      border-radius: 8px;
      padding: 10px 15px;
      box-sizing: border-box;
      .item-top {
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          img {
              width: 13px;
              height: 16px;
          }
          span:nth-child(2) {
              font-size: 16px;
              flex: 1;
              line-height: 38px;
              position: relative;
              left: 8px;
          }
          span:nth-child(3) {
              position: absolute;
              right: 0;
              font-size: 13px;
              color: #e1251b;
          }
      }
      .item-center {
          width: 100%;
          display: flex;
          box-sizing: border-box;
          padding-top: 5px;
          .img-con {
              flex: 1;
              text-align: center;
              img {
                  width: 120px;
                  height: 90px;
              }
          }
          .text {
              flex: 2.2;
              .text-con {
                  font-size: 15px;
                  line-height: 22px;
                  overflow : hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                  margin-left: 5px;
              }
              .props-con {
                  font-size: 13.5px;
                  line-height: 20px;
                  color: rgb(168,168,168);
                  overflow : hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  margin-left: 5px;
              }
              .price-con {
                  text-align: right;
                  line-height: 26px;
                  span:nth-child(1) {
                      font-size: 11px;
                      color: rgb(242,0,0);
                  }
                  span:nth-child(2) {
                      font-size: 16px;
                      color: rgb(242,0,0);
                  }
                  span:nth-child(3) {
                      font-size: 11px;
                      color: rgb(168,168,168);
                  }
              }
          }
      }
      .item-bottom {
        width: 100%;
        height: 35px;
        // padding-top: 5px;
        box-sizing: border-box;
        line-height: 35px;
        text-align: right;
        // padding-top: 5px;
        span:nth-child(1) {
          font-size: 15px;
        }
        span:nth-child(2) {
          font-size: 12px;
          color: red;
        }
        span:nth-child(3) {
          margin-left: -5px;
          color: red;
          font-size: 20px;
        }
      }
      .item-more {
          width: 100%;
          display: flex;
          justify-content: flex-end;

          .btn {
              width: 92px;
              height: 28px;
              border-radius: 20px;
              position: relative;
              border: 1.5px solid #e1251b;
              margin-left: 5px;
              margin-top: 10px;
              margin-bottom: 6px;
              span {
                  font-size: 15px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                //   margin-top: -10.4px;
                //   margin-left: -16px;
                    width: 100%;
                    text-align:center;
                  color: #e1251b;
              }
          }
      }
  }
</style>
