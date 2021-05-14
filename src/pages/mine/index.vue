<template>
  <div class="mine">
    <div class="user">
        <div class="img-con">
            <img v-show="!userInfo.photo" src="../../assets/user_default.png">
            <img v-show="userInfo.photo" :src="userInfo.photo" >
        </div>
        <div class="text-con">{{userInfo.userName}}</div>
    </div>

    <!-- 店长 -->
    <div class="shop-info" v-show="userType === '1'">
      <div>
        <img src="../../assets/u919.png" alt="">
        门店：{{userInfo.storeName}}
      </div>
      <div>
        <img src="../../assets/u1265.png" alt="">
        邀请码：{{userInfo.inviteCode}}
      </div>
      <div>
        <img src="../../assets/u295.png" alt="">
        {{userInfo.address}}
      </div>
    </div>

    <!-- 司机 -->
    <div class="driver-info" v-show="userType === '2'">
      <div>
        <img src="../../assets/u1210.png" alt="">
        {{userInfo.userName}}
      </div>
      <div>
        <img src="../../assets/u1151.png" alt="">
        {{userInfo.phone}}
      </div>
    </div>
    <!-- 用户 -->
    <div class="content">
        <div class="con-item" @click="toPage('/order-list')" v-show="userType === '3'">
            <div>
                <img src="../../assets/images/订单.png" alt="">
            </div>
            <div><span>我的订单</span></div>
            <div>
                <img src="../../assets/右.png" alt="">
            </div>
        </div>
        <div
          class="con-item"
          @click="toPage('/change-password')"
          v-show="userType === '1' || userType === '2' || userType === '3'">
            <div>
                <img src="../../assets/images/密码.png" alt="">
            </div>
            <div><span>修改密码</span></div>
            <div>
                <img src="../../assets/右.png" alt="">
            </div>
        </div>
        <div
          class="con-item"
          @click="toPage('/change-adress')"
          v-show="userType === '1' || userType === '2' || userType === '3'">
            <div>
                <img src="../../assets/images/定位.png" alt="">
            </div>
            <div><span>收货地址</span></div>
            <div>
                <img src="../../assets/右.png" alt="">
            </div>
        </div>
        <!-- <div
          class="con-item"
          @click="toPage('/change-store-code')"
          v-show="userType === '3'">
            <div>
                <img src="../../assets/邀请码.png" alt="">
            </div>
            <div><span>修改店铺邀请码</span></div>
            <div>
                <img src="../../assets/右.png" alt="">
            </div>
        </div> -->
        <div
          class="con-item"
          @click="toLogin"
          v-show="userType === '1' || userType === '2' || userType === '3'">
            <div>
                <img src="../../assets/images/退出.png" alt="">
            </div>
            <div><span>退出登录</span></div>
            <div>
                <img src="../../assets/右.png" alt="">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/mine.js'

export default {
  name: 'mine',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    userType () {
      return JSON.parse(sessionStorage.getItem('roleInfo')).role
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      req('getUserInfo', {}).then(data => {
        // console.log(data)
        this.userInfo = data.data
      })
    },
    toPage (path) {
      this.$router.push({path: path})
    },
    toLogin () {
      sessionStorage.clear('userInfo')
      sessionStorage.clear('roleInfo')
      sessionStorage.clear('currentComm')

      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .mine {
    background: #f6f6f6;
    height: 100%;
  }
  .user {
      width: 100%;
      display: flex;
      .img-con {
        flex: 1;
        display: flex;
        align-items: center;
        img {
          width: 70px;
          height: 70px;
          position: relative;
          left: 30%;
          border-radius: 50%;
        }
      }
      .text-con {
          flex: 2;
          line-height: 105px;
          font-size: 22px;
      }
  }

  .shop-info {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

    >div {
      display: flex;
      width: 100%;
      align-items: center;
      padding: 10px 0;
      // height: 40px;

      img {
        // width: 24px;
        // height: 24px;
        margin-right: 10px;
      }
    }

    >div:nth-child(2) {
      padding-left: 5px;
    }
  }

  .driver-info {
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding-left: 15px;
    box-sizing: border-box;

    >div {
      width: 100%;
      height: 50px;
      line-height: 50px;
      display: flex;
      align-items: center;

      img {
        margin-right: 10px;
      }
    }
  }

  .content {
      width: 95%;
      // height: 206px;
      padding: 18px 16px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 8px;
      .con-item {
          width: 100%;
          flex: 1;
          display: flex;
          div:nth-child(1) {
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                  width: 16px;
                  height: 16px;
              }
          }
          div:nth-child(2) {
              flex: 1;
              line-height: 42.5px;
              font-size: 17px;
              span {
                  position: relative;
                  left: 10px;
              }
          }
          div:nth-child(3) {
              width: 10px;
              display: flex;
              align-items: center;
              img {
                  width: 100%;
                  height: 14px;
              }
          }
      }
  }
  .img-spc {
      width: 15px;
      height: 15px;
  }
</style>
