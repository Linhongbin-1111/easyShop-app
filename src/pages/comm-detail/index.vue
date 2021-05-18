<template>
  <div class="container">
    <div class="book-banner">
      <img :src="commDetailData.picPath" alt="">
    </div>

    <div class="book-detail">
      <div class="book-price">￥{{commDetailData.comPrice}}</div>
      <div class="book-name">{{commDetailData.comName}}</div>
      <div class="book-Describe">{{commDetailData.comPresent}}</div>
      <div class="comm-evaluate">
        商品评分&nbsp;:&nbsp;
        <el-rate v-model="evaluateScore" :colors="colors" disabled></el-rate>
      </div>
      <div class="count-box">
        <span>数量</span>

        <div class="handler-box">
          <div @click="countDelete">-</div>
          <div>{{bookCount}}</div>
          <div @click="countAdd">+</div>
        </div>
      </div>
      <!-- <div>
        <span>库存量：</span>{{commDetailData.comStock}} 件
      </div> -->
      <!-- <div class="address" @click="selectAdress">
        <div class="address-front">
          <span>送至</span>
          <img src="../../assets/images/定位.png" alt="">
        </div>
        <div class="address-last">{{address}}</div>
      </div> -->
    </div>
    <div class="footer">
      <div @click="toShopCar">
        <img src="../../assets/images/购物车满.png" alt="">
        <span>购物车</span>
      </div>

      <div @click="addShopCar">加入购物车</div>
      <div @click="payNow">立即购买</div>
    </div>
    <van-popup round v-model="show" position="bottom" :style="{ height: '65%' }">
      <div class="bodys">
        <div class="body1">
          <div class="pic">
            <img :src="commDetailData.picPath" alt="">
          </div>
          <div class="info">
            <div class="book-prices">￥{{commDetailData.comPrice}}</div>
            <div>剩余 {{stock}} 件</div>
            <div>请选择商品规格</div>
          </div>
        </div>
        <div class="body2">
          <div>
            规格选择
          </div>
          <div>
            <span class="buttonList" :class="index === actives ? 'actives' : ''" v-for="(item, index) in commDetailData.specInfoList" @click="selectSpec(item.stock, item.specCode, index, item.spec)">{{item.spec}}</span>
          </div>
        </div>
        <div class="count-box" style="margin-top: 5px;">
          <span>数量</span>
          <div class="handler-box">
            <div @click="countDelete">-</div>
            <div>{{bookCount}}</div>
            <div @click="countAdd">+</div>
          </div>
        </div>
        <div class="buttons">
          <van-button v-if="addType === 1" round block native-type="button" @click="addComm(1)" color="linear-gradient(to right, #ff6034, #ee0a24)">加入购物车</van-button>
          <van-button v-if="addType === 2" round block native-type="button" @click="addComm(2)" color="linear-gradient(to right, #ff6034, #ee0a24)">立即购买</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import req from '@/api/comm-detail.js'

export default {
  name: 'comm-detail',
  data () {
    return {
      show: false,
      stock: null, // 库存
      spec: null, // 规格
      specCode: null, // 规格编号
      addType: null, // 加入购物车 或 立即购买
      actives: null, // 活跃
      specInfoList: [
        // {
        //   spec: '黑红 XL',
        //   stock: 10,
        //   specCode: 1
        // },
        // {
        //   spec: '黑红 XL',
        //   stock: 120,
        //   specCode: 2
        // },
        // {
        //   spec: '黑红 XL',
        //   stock: 1,
        //   specCode: 3
        // },
      ],
      commDetailData: {},
      bookCount: 1,
      addressData: [],
      address: '',
      addressCode: '',
      evaluateScore: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      comPrice: 0,
      totalPrice: 0
    }
  },
  computed: {
  },
  mounted () {
    // this.getAdress()
    this.getDetail()
  },
  methods: {
    // getAdress () {
    //   req('getAdress', {
    //   }).then(data => {
    //     // console.log(data)
    //     data.data.map(item => {
    //       if (item.status === 1) {
    //         this.address = item.address
    //         this.addressCode = item.addressCode
    //       }
    //     })
    //     // 如果跳转过来的页面没有传地址，则使用默认地址
    //     // console.log(this.$route.query.adress)
    //     if (this.$route.query.adress !== undefined) {
    //       this.address = this.$route.query.adress
    //       this.addressCode = this.$route.query.adressCode
    //     }
    //   })
    // },
    // selectAdress () {
    //   this.$router.push({path: '/select-adress'})
    // },
    countDelete () {
      if (this.bookCount > 1) {
        this.bookCount--
      }
    },
    countAdd () {
      this.bookCount++
    },
    getDetail () {
      req('getDetail', {comCode: JSON.parse(sessionStorage.getItem('currentComm')).comCode}).then(data => {
        console.log(data)
        this.commDetailData = data.data
        this.evaluateScore = parseFloat(data.data.starLevel)
        this.comPrice = this.commDetailData.comPrice;
      })
    },
    toShopCar () {
      this.$router.push({path: '/shop-car'})
    },
    payNow () {
      this.show = true;
      this.addType = 2;
      // this.$confirm('确定立即购买该商品吗?').then(() => {
      //   req('payNow', {
      //     comCode: this.commDetailData.comCode,
      //     comCount: this.bookCount
      //     // goodsPrice: this.commDetailData.goodsPrice,
      //     // shopCartId: '0',
      //     // addressCode: this.addressCode
      //     // storeId: JSON.parse(sessionStorage.getItem('roleInfo')).storeId
      //   }).then(data => {
      //     if (data.code === 0) {
      //       this.$toast.success(data.msg)

      //       this.$router.push({path: '/order-list'})
      //     } else {
      //       this.$toast.error(data.msg)
      //     }
      //   })
      // })
    },
    selectSpec(stock, commCode, index, spec) {
      this.actives = index;
      this.stock = stock;
      this.specCode = commCode;
      this.spec = spec;
    },
    addShopCar () {
      this.show = true;
      this.addType = 1;
    },
    addComm (type) {
      if (!this.specCode) {
        this.$toast.fail('请选择规格');
        return
      }
      if (this.bookCount == 0) {
        this.$toast.fail('请选择商品数量');
        return
      }
      this.show = false;
      if (type == 1) {
        req('addShopCar', {
          userCode: JSON.parse(sessionStorage.getItem('roleInfo')).userCode,
          comCode: this.commDetailData.comCode,
          cartAmount: this.bookCount,
          specCode: this.specCode
        }).then(data => {
          console.log(data)
          if (data.code === 0) {
            this.$toast.success(data.msg)
            // this.$router.push({path: '/shop-car'})
          } else {
            this.$toast.fail(data.msg)
          }
        })
      } else {
        this.totalPrice = this.bookCount * this.comPrice
        this.commDetailData.specCode = this.specCode;
        this.commDetailData.spec = this.spec;
        sessionStorage.setItem('commDetail', JSON.stringify(this.commDetailData))
        sessionStorage.setItem('totalPrice', JSON.stringify(this.totalPrice))
        this.$router.push({path: '/confirm-order', query: {comCount: this.bookCount, page: 1}})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bodys {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  position: relative;
}
.body1 {
  display: flex;
  padding-bottom: 15px;
  border-bottom: 1px solid #f7f8fa;
}
.pic {
  width: 130px;
  height: 130px;
  border: 1px solid #f7f8fa;
  img {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
}
.info {
  color: #969799;
  padding-top: 30px;
  div {
    margin: 10px 10px 0px 10px;
  }
}
.book-prices {
  font-size: 22px;
  color: red;
}
.body2 {
  div {
    padding-top: 15px;
  }
}
.buttonList {
  display: inline-block;
  font-size: 16px;
  width: auto;
  height: 30px;
  padding: 5px;
  line-height: 30px;
  background-color: #f7f8fa;
  margin-right: 15px;
  border: 1px solid #f7f8fa;
  border-radius: 5px;
}
.buttons {
  width: 90%;
  position: absolute;
  bottom: 0px;
  .vanbutton {
    font-size: 18px;
    width: 82%;
    margin: 0 auto;
  }
}
.container {
  background: #f6f6f6;
  padding-bottom: 100px;
}

.book-banner {
  width: 96%;
  height: 250px;
  padding: 10px;
  background: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-sizing: border-box;
  margin: 0 auto;

  img {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
}

.book-detail {
  padding: 10px;
  // padding-bottom: 80px;
  box-sizing: border-box;
  background: #fff;
  margin-top: 10px;
  border-radius: 10px;
  width: 96%;
  margin: 10px auto 0;

  .book-price {
    font-size: 22px;
    color: red;
  }

  // .book-name {
  //   font-size: 18px;
  //   line-height: 30px;
  // }

  .comm-evaluate {
    display: flex;
    align-items: center;
    margin-top: 10px;
    span {
      color: red;
      font-size: 20px;
    }
  }

  .book-Describe {
    font-size: 14px;
    color: #333;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }

  .count-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;

    .handler-box {
      display: flex;
      height: 25px;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-top: 10px;

      div:first-child {
        width: 30px;
        height: 25px;
        text-align: center;
        line-height: 25px;
      }

      div:nth-child(2) {
        width: 40px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
      }

      div:nth-child(3) {
        width: 30px;
        height: 25px;
        text-align: center;
        line-height: 25px;
      }
    }
  }
}
.address {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      .address-front {
        width: 20%;
        img {
          width: 16px;
          height: 16px;
        }
      }
      .adress-last {
        width: 80%;
        text-align: left;
      }
    }

.footer {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  align-items: center;

   div:first-child {
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 12px;
    color: #e1251b;

    img {
      width: 25px;
      height: 25px;
    }
  }

  div:nth-child(2) {
    width: 95px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border: 1px solid #e1251b;
    background: #fff;
    border-radius: 10px;
    margin-left: 10px;
    color: #e1251b;
  }

  div:nth-child(3) {
    width: 95px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: #e1251b;
    border: 1px solid #e1251b;
    color: #fff;
    border-radius: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }
}
.count-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;

    .handler-box {
      display: flex;
      height: 25px;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-top: 10px;

      div:first-child {
        width: 30px;
        height: 25px;
        text-align: center;
        line-height: 25px;
      }

      div:nth-child(2) {
        width: 40px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
      }

      div:nth-child(3) {
        width: 30px;
        height: 25px;
        text-align: center;
        line-height: 25px;
      }
    }
  }
.actives {
  color: #e1251b;
  background-color: #fde7ea;
}
</style>
