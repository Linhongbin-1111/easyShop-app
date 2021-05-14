<template>
  <div class="bodys">
    <ul class="adress" >
      <li v-for="(item, index) in adressData"
        @click="toConfirmOrder(item)"
        :key="index">
        <div>
          <span class="name">{{item.name}}</span>
          <span class="phone">{{item.phone}}</span>
          <span v-show="item.status === 1"
          :class="{'moren' : item.status === 1, 'putong': item.status === 0}">(默认)</span>
          <div class="user-adess">{{item.address}}</div>
        </div>
        <!-- 选择按钮 -->
        <!-- <div class="select-btn-box">
          <div>
            <div class="input"></div>
            <div class="action" :style="{display: item.checked ? 'block' : 'none'}"></div>
          </div>
        </div> -->
      </li>
    </ul>
    <div class="btn" @click="toaddadress">新增地址</div>
  </div>
</template>

<script>
import req from '@/api/change-adress.js'

export default {
  name: 'change-adress',
  data () {
    return {
      adress: '',
      adressCode: '',
      adressData: [],
      status: false
    }
  },
  mounted () {
    this.getAdress()
  },
  methods: {
    getAdress () {
      req('getAdress', {
      }).then(data => {
        console.log(data)
        this.adressData = data.data.map(item => {
          return Object.assign({}, item, {checked: false})
        })
        // 优先选中默认地址
        this.adressData.map(item => {
          if (item.status === 1) {
            item.checked = true
            return item
          }
        })
        // 如果没有地址，则提示跳转到设置地址页面
        if (this.adressData.length === 0) {
          this.$message.info('你还没有设置地址，请前往个人中心设置')
        }
      })
    },
    toaddadress () {
      this.$router.push('add-adress')
    },
    // getSelectAdress (item) {
    //   console.log('我是地址', item.address)
    //   this.adress = item.address
    //   this.adressCode = item.addressCode
    //   this.adressData.map(item => {
    //     item.checked = false
    //     return item
    //   })
    //   item.checked = !item.checked
    // },
    toConfirmOrder (item) {
      this.$router.push({path: '/confirm-order', query: {adress: item.address, adressCode: item.addressCode, name: item.name, phone: item.phone, status: item.status, page: this.$route.query.page, comCount: this.$route.query.comCount}})
      // this.adress = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.bodys {
  width: 100%;
  height: 100%;
  margin: 12px auto;
  background-color: #f6f6f6;
  padding-bottom: 50px;
  // border-radius: 8px;
  font-size: 17px;
  position: relative;
  // margin-top: 15px;
  .adress {
    width: 100%;
    height: 70%;
    // margin-top: 20px;
    li {
      width: 94%;
      // height: 50px;
      background: white;
      margin: 0 auto;
      margin-top: 15px;
      border-radius: 10px;
      line-height: 50px;
      padding: 0 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      >div {
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
  // margin-top: 50px;
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
