<template>
  <div class="container">
    <div class="shopCarEmpty" v-if="this.list.length === 0">购物车空空如也，快去选购商品吧！</div>
    <ul class="book-list" v-else>
      <li class="book-list-item" v-for="(item, index) in list" :key="index">

        <!-- 选择按钮 -->
        <div class="select-btn-box">
          <div>
            <input type="checkbox" @change="inputChange(item)">
            <div class="action" :style="{display: item.checked ? 'block' : 'none'}"></div>
          </div>
        </div>
        <!-- 书本信息 -->
        <div class="book-count-info">
          <img :src="item.picPath" alt="">
          <div>
            <div>{{item.comName}}</div>
            <div>{{item.spec}}</div>
            <div class="price-count-box">
              <div class="price-box">
                <span>￥</span>
                <span>{{ (item.comPrice).toFixed(2) }}</span>
              </div>
              <div class="change-count-box">
                <div @click="countDelete(item)">-</div>
                <div>{{ item.cartAmount }}</div>
                <div @click="countAdd(item)">+</div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="close-count">
      <div>
        <div>
          <input type="checkbox" @change="allInputChange">
          <div class="action" :style="{display: allChecked ? 'block' : 'none'}"></div>
        </div>
        <span>全选</span>
      </div>

      <div>
        <div>
          <b>合计:</b>
          <span>{{totalPrice.toFixed(2)}}</span>
        </div>

        <button @click="deleteShopCar">删除</button>
        <button @click="addShopCar">结算</button>
      </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/shop-car.js'

export default {
  name: 'shop-car',
  data () {
    return {
      allChecked: false,
      totalPrice: 0,
      list: []
    }
  },
  mounted () {
    this.getShopCarList()
  },
  methods: {
    getShopCarList () {
      req('getShopCarData', {pageSize: 100, pageNum: 1}).then(data => {
        // console.log(data)
        this.list = data.data.list.map(item => {
          return Object.assign({}, item, {checked: false})
        })

        this.allChecked = false
        this.totalPrice = this.getTotal()
      })
    },
    addShopCar () {
      let payCommList = this.list.filter(item => {
        return item.checked === true
      })
      console.log(payCommList)

      if (!payCommList.length) {
        this.$toast.fail('请先选择需要购买的商品')

        return
      }
      // this.shopcarList = this.list.map(item => {
      //   if (item.checked === true) {
      //     return item
      //   }
      // })
      // console.log(this.shopcarList)
      sessionStorage.setItem('shopCarList', JSON.stringify(payCommList))
      sessionStorage.setItem('totalPrice', JSON.stringify(this.totalPrice))
      this.$router.push({path: '/confirm-order', query: {page: 2}})
    },
    // 删除购物车
    deleteShopCar () {
      let payCommList = this.list.filter(item => {
        return item.checked === true
      })

      if (!payCommList.length) {
        this.$toast.fail('请先选择需要删除的商品')

        return
      }

      let shopCartIds = this.list.filter(item => {
        return item.checked === true
      }).map(item => {
        return item.cartCode
      }).toString()

      req('deleteShopCar', {cartCode: shopCartIds}).then(data => {
        if (data.code === 0) {
          this.$toast.success(data.msg)

          this.getShopCarList()
        } else {
          this.$toast.fail(data.msg)
        }
      })
    },
    // 全选按钮
    allInputChange () {
      if (this.list.length === 0) {
        this.$toast.fail('没有商品可以选中')
      } else {
        this.allChecked = !this.allChecked

        this.list.forEach(item => {
          item.checked = this.allChecked
        })

        this.totalPrice = this.getTotal()
      }
    },
    // 单选按钮
    inputChange (item) {
      item.checked = !item.checked

      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].checked === false) {
          this.allChecked = false

          break
        } else {
          this.allChecked = true
        }
      }

      this.totalPrice = this.getTotal()
    },
    countDelete (data) {
      if (data.cartAmount > 1) {
        data.cartAmount = parseFloat(data.cartAmount) - 1
        req('updateCars', {
          cartCode: data.cartCode,
          comCode: data.comCode,
          cartAmount: parseInt(data.cartAmount)
        }).then(data => {
          // console.log(data)
        })
      }
      this.totalPrice = this.getTotal()
    },
    countAdd (data) {
      data.cartAmount = parseFloat(data.cartAmount) + 1
      req('updateCars', {
        cartCode: data.cartCode,
        comCode: data.comCode,
        cartAmount: parseInt(data.cartAmount)
      }).then(data => {
        // console.log(data)
      })
      this.totalPrice = this.getTotal()
    },
    getTotal () {
      let total = 0

      this.list.forEach(item => {
        if (item.checked) {
          total = total + parseFloat(item.cartAmount * item.comPrice)
        }
      })

      return parseFloat(total.toFixed(2))
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 130px;
  height: 100%;
  background: #f6f6f6;
}
  .shopCarEmpty {
    width: 100%;
    height: 100%;
    line-height: 500px;
    font-size: 18px;
    text-align: center;
    color: rgb(217, 217, 217);
  }
  .book-list {
    width: 96%;
    // position: absolute;
    // left: 50%;
    // bottom: 55px;
    overflow: auto;
    // transform: translate(-50%, 0);
    margin: 0 auto;

    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 150px;
      background: #fff;
      border-radius: 10px;
      padding: 10px 10px 10px 0;
      box-sizing: border-box;
      margin-top: 10px;

      .select-btn-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 100%;

        >div {
          position: relative;
          width: 18px;
          height: 18px;
          border: 2px solid #ddd;
          border-radius: 50%;

          input {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 0;
            margin: 0;
            width: 13px;
            height: 13px;
            z-index: 1;
            opacity: 0;
          }

          .action {
            display: none;
            position: absolute;
            width: 13px;
            height: 13px;
            border-radius: 50%;
            background: #e1251b;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
          }
        }
      }

      .book-count-info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1;
        height: 100%;
        width: 100%;

        >img {
          width: 30%;
          height: 75%;
          vertical-align: middle;
          align-self: center;
        }

        >div {
          > div:first-child {
            font-size: 16px;
            width: 100%;
            height: 30px;
            padding-left: 10px;
            box-sizing: border-box;
            // margin-top: 10px;
          }

          > div:nth-child(2) {
            font-size: 13px;
            width: 100%;
            height: 30px;
            padding-left: 10px;
            box-sizing: border-box;
            color: #ddd;
          }

          > div:nth-child(3) {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            width: 215px;
            height: 30px;
            padding-left: 10px;
            box-sizing: border-box;
            span:first-child {
              margin-right: -5px;
              font-size: 10px;
              color: red;
            }
            span:nth-child(2) {
              font-size: 16px;
              color: red;
            }

            .change-count-box {
              display: flex;
              height: 20px;

              div:first-child {
                width: 30px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
                border-top-left-radius:5px;
                border-bottom-left-radius: 5px;
              }

              div:nth-child(2) {
                width: 40px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
                border-left: none;
                border-right: none;
              }

              div:nth-child(3) {
                width: 30px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border: 1px solid #ddd;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
              }
            }
          }
        }
      }
    }
  }

.close-count {
  position: fixed;
  bottom: 60px;
  width: 100%;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0px 0px 10px;
  box-sizing: border-box;

  div:first-child {
    display: flex;
    height: 50px;
    align-items: center;

    div {
      position: relative;
      width: 18px;
      height: 18px;
      border: 2px solid #ddd;
      border-radius: 50%;
      margin-right: 10px;

      input {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 0;
        margin: 0;
        width: 13px;
        height: 13px;
        z-index: 1;
        opacity: 0;
      }

      .action {
        display: none;
        position: absolute;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: #e1251b;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
      }
    }
  }

  div:nth-child(2) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;

    div:first-child {
      justify-content: center;
      width: 130px;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      b {
        padding-right: 5px;
      }
      span {
        font-size: 18px;
        color: red;
      }
    }

    button {
      width: 85px;
      height: 50px;
      background: #e1251b;
      color: #fff;
      outline: none;
      line-height: 50px;
      text-align: center;
      border: none;
      // border-radius: 10px;
      // margin-left: 10px;
      font-size: 19px;
      font-family: '黑体', 'Courier New', Courier, monospace;
      letter-spacing: 2px;
    }

    button:nth-child(2) {
      background: #333333;
    }
  }
}

</style>
