<template>
  <div class="container">
    <div class="address" @click="selectAdress">
      <div class="address-last">
        <span class="name">{{name}}</span>
        <span class="phone">{{phone}}</span>
        <span v-show="status === 1"
        :class="{'moren': status === 1, 'putong': status === 0}">(默认)</span>
        <div class="user-adess">{{address}}</div>
      </div>
      <div class="youjiantou">
        <img src="../../assets/images/右箭头.png" alt="">
      </div>
      <!-- <div class="address-last">{{address}}</div> -->
    </div>
    <div class="content">
      <div class="order-item" v-for="item of list" :key="item.cartCode">
          <div class="item-center">
              <div class="img-con">
                  <img :src="item.picPath">
              </div>
              <div class="text">
                  <div class="text-con">{{item.comName}}</div>
                  <div class="props-con">{{item.comPresent}}</div>
                  <div class="props-con">{{item.spec}}</div>
                  <div class="price-con">
                      <span>￥</span>
                      <span>{{item.comPrice}} </span>
                      <span>x{{item.cartAmount}}{{comCount}}</span>
                  </div>
              </div>
          </div>
      </div>
      <div class="item-bottom">
          <span>共{{totalNumber}}件商品，合计￥</span>
          <span>{{totalPrice}}</span>
      </div>
    </div>
    <div class="btn" @click="addOrder">提交订单</div>
  </div>
</template>

<script>
import req from '@/api/confirm-order.js'

export default {
  name: 'confirm-order',
  data () {
    return {
      address: '',
      addressCode: '',
      name: '',
      phone: '',
      status: 0,
      list: [],
      totalPrice: '',
      totalNumber: 0,
      page: String,
      comCode: '',
      comCount: this.$route.query.comCount,
      specCode: null
    }
  },
  computed: {
  },
  mounted () {
    this.page = this.$route.query.page
    // console.log(this.page)
    this.getAdress()
    if (this.page === '1') {
      this.comCode = JSON.parse(sessionStorage.getItem('commDetail')).comCode
      this.specCode = JSON.parse(sessionStorage.getItem('commDetail')).specCode
      console.log(this.specCode)
      this.list = [JSON.parse(sessionStorage.getItem('commDetail'))]
      this.totalPrice = JSON.parse(sessionStorage.getItem('totalPrice'))
      this.totalNumber = this.$route.query.comCount
      console.log(this.list)
    } else if (this.page === '2') {
      this.list = JSON.parse(sessionStorage.getItem('shopCarList'))
      this.totalPrice = JSON.parse(sessionStorage.getItem('totalPrice'))
      this.list.map(item => {
        this.totalNumber += parseInt(item.cartAmount)
      })
    }
  },
  methods: {
    addOrder () {
      if (this.page === '1') {
        req('addOrder', {
          comCode: this.comCode,
          comCount: this.$route.query.comCount,
          addressCode: this.addressCode,
          specCode: this.specCode
        }).then(data => {
          if (data.code === 0) {
            this.$toast.success(data.msg)
            // sessionStorage.clear('commDetail')
            // sessionStorage.clear('totalPrice')
            this.$router.push('order-list')
          } else {
            this.$toast.fail(data.msg)
          }
        })
      } else if (this.page === '2') {
        let goodsIds = this.list.map(item => {
          return item.comCode
        }).toString()

        let comCounts = this.list.map(item => {
          return item.cartAmount
        }).toString()

        let cartCodes = this.list.map(item => {
          return item.cartCode
        }).toString()

        let specCodes = this.list.map(item => {
          return item.specCode
        }).toString()
        // console.log(goodsIds, comCounts, cartCodes)
        req('addOrder', {
          comCode: goodsIds,
          comCount: comCounts,
          cartCode: cartCodes,
          addressCode: this.addressCode,
          specCode: specCodes
        }).then(data => {
          if (data.code === 0) {
            this.$toast.success(data.msg)
            // sessionStorage.clear('shopCarList')
            // sessionStorage.clear('totalPrice')
            this.$router.push({path: '/order-list'})
          } else {
            this.$toast.fail(data.msg)
          }
        })
      }
    },
    getAdress () {
      req('getAdress', {
      }).then(data => {
        // console.log(data)
        let count = 0
        data.data.map(item => {
          if (item.status === 1) {
            count = count + 1
          }
        })
        if (count === 0) {
          this.$toast.fail('你还没有设置收货地址，将跳转到设置收货地址页面')
          this.$router.push('/change-adress')
        }
        data.data.map(item => {
          if (item.status === 1) {
            this.address = item.address
            this.addressCode = item.addressCode
            this.name = item.name
            this.phone = item.phone
            this.status = item.status
          }
        })
        // 如果跳转过来的页面没有传地址，则使用默认地址，有则用传过来的地址
        // console.log(this.$route.query.adress)
        if (this.$route.query.adress !== undefined) {
          this.address = this.$route.query.adress
          this.addressCode = this.$route.query.adressCode
          this.name = this.$route.query.name
          this.phone = this.$route.query.phone
          this.status = this.$route.query.status
        }
      })
    },
    selectAdress () {
      if (this.page === '1') {
        this.$router.push({path: '/select-adress', query: {page: this.page, comCount: this.comCount}})
      } else {
        this.$router.push({path: '/select-adress', query: {page: this.page}})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
}
.address {
  width: 95%;
  // height: 60px;
  background-color: white;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 15px;
  line-height: 50px;
  display: flex;
  // justify-content: space-between;
  // align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  >div {
    // width: 90%;
    .name {
      font-size: 14px;
      // padding: 0%;
    }
    .phone {
      color: #aaaaaa;
      font-size: 12px;
      margin-left: 3px;
    }
  }
}
.youjiantou {
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 18px;
    height: 18px;
    margin-right: -50px;
  }
}
.user-adess {
  // height: 50px;
  line-height: 20px;
  font-size: 14px;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  // margin-right: 40px;
  padding-bottom: 15px;
}
.putong {
  // text-align: right;
  margin-left: 20px;
}
.moren {
  // text-align: right;
  margin-left: 20px;
  color: #e1251b;
}
.content {
  width: 95%;
  margin: 12px auto 12px;
  background-color: white;
  border-radius: 8px;
  padding: 13px 13px 0;
  box-sizing: border-box;
  .order-item {
      width: 95%;
      margin: 0 auto;
      background-color: white;
      border-radius: 8px;
      padding: 10px 15px;
      box-sizing: border-box;
      .item-center {
          width: 100%;
          display: flex;
          box-sizing: border-box;
          padding-top: 5px;
          .img-con {
              flex: 1;
              // // text-align: center;
              margin-right: 10px;
              margin-left: -10px;
              img {
                  width: 85px;
                  height: 84px;
              }
          }
          .text {
              flex: 3;
              .text-con {
                  font-size: 15px;
                  line-height: 22px;
                  overflow : hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
              }
              .props-con {
                  font-size: 13.5px;
                  line-height: 26px;
                  color: rgb(168,168,168);
                  overflow : hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
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
    }
  .item-bottom {
      width: 100%;
      line-height: 40px;
      text-align: right;
      padding-top: 5px;
      span:nth-child(1) {
          font-size: 15px;
      }
      span:nth-child(2) {
          font-size: 20px;
      }
  }
}
  .btn {
  color: white;
  font-size: 20px;
  letter-spacing: 3px;
  line-height: 50px;
  text-align: center;
  width: 250px;
  height: 50px;
  border-radius: 10px;
  background: #e1251b;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
