<template>
  <div>
    <el-container>
      <el-header height="50px" v-show="!meta.headerHide">
        <div class="user-info">
          <span class="iconfont iconzuojiantou" @click="back" v-show="meta.goBackShow"></span>
          <span
            v-for="(item, index) in titleList"
            :key="index"
            @click="toPage(item)"
            :class="{active: item.active }">
            {{item.titleName}}
          </span>
        </div>
      </el-header>

      <el-container>
        <el-main :class="{'main-class1' : meta.headerHide, 'main-class2' : !meta.headerHide}">
          <router-view></router-view>
        </el-main>
      </el-container>

      <el-footer v-show="meta.footerShow">
        <!-- 店长 -->
        <div @click="$router.push({path: '/order-list'})" v-show="userType === '1'">
          <!-- <img v-show="currentPath !== '/comm-home'" src="../assets/u1075.png" alt=""> -->
          <img src="../assets/u1075.png" alt="">
          <div :style="{color: currentPath === '/order-list' ? '#e1251b' : '#333333'}">订单</div>
        </div>
        <div @click="$router.push({path: '/driver-info'})" v-show="userType === '1'">
          <!-- <img v-show="currentPath !== '/comm-home'" src="../assets/u1075.png" alt=""> -->
          <img src="../assets/u1080.png" alt="">
          <div :style="{color: currentPath === '/driver-info' ? '#e1251b' : '#333333'}">司机</div>
        </div>

        <!-- 司机 -->
        <div @click="$router.push({path: '/driver-shop-info'})" v-show="userType === '2'">
          <!-- <img v-show="currentPath !== '/comm-home'" src="../assets/u1075.png" alt=""> -->
          <img src="../assets/home2.png" alt="">
          <div :style="{color: currentPath === '/driver-shop-info' ? '#e1251b' : '#333333'}">门店</div>
        </div>

        <!-- 普通用户 -->
        <div @click="$router.push({path: '/comm-home'})" v-show="userType === '3'">
          <img v-show="currentPath !== '/comm-home'" src="../assets/home2.png" alt="">
          <img v-show="currentPath === '/comm-home'" src="../assets/images/主页.png" alt="">
          <div :style="{color: currentPath === '/comm-home' ? '#e1251b' : '#333333'}">首页</div>
        </div>
        <div @click="$router.push({path: '/comm-classify'})" v-show="userType === '3'">
          <img v-show="currentPath !== '/comm-classify'" src="../assets/classify2.png" alt="">
          <img v-show="currentPath === '/comm-classify'" src="../assets/images/分类.png" alt="">
          <div :style="{color: currentPath === '/comm-classify' ? '#e1251b' : '#333333'}">分类</div>
        </div>
        <div @click="$router.push({path: '/shop-car'})" v-show="userType === '3'">
          <img v-show="currentPath !== '/shop-car'" src="../assets/shop_car2.png" alt="">
          <img v-show="currentPath === '/shop-car'" src="../assets/images/购物车满.png" alt="">
          <div :style="{color: currentPath === '/shop-car' ? '#e1251b' : '#333333'}">购物车</div>
        </div>
        <div @click="$router.push({path: '/mine'})">
          <img v-show="currentPath !== '/mine'" src="../assets/mine2.png" alt="">
          <img v-show="currentPath === '/mine'" src="../assets/images/我 的.png" alt="">
          <div :style="{color: currentPath === '/mine' ? '#e1251b' : '#333333'}">我的</div>
        </div>

      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      mainStyle: {

      }
    }
  },
  computed: {
    titleList () {
      return this.$route.meta.title
    },
    goBackBtn () {
      return this.$route.meta.goBack
    },
    meta () {
      return this.$route.meta
    },
    currentPath () {
      return this.$route.path
    },
    userType () {
      return JSON.parse(sessionStorage.getItem('roleInfo')).role
    }
  },
  methods: {
    back () {
      if (this.goBackBtn === -1) {
        this.$router.go(-1);
      } else {
        this.$router.push({path: this.goBackBtn})
      }
    },
    toPage (data) {
      if (data.toPath !== this.$route.path) {
        this.$router.push({path: data.toPath})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-class1 {
  position: absolute;
  top: 0px;
  bottom: 60px;
}

.main-class2 {
  position: absolute;
  top: 50px;
  bottom: 0px;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: white;

  .router-link-active {
    font-size: 25px;
    color: #409EFF;
    text-decoration: none;
  }

  .user-info {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    font-size: 20px;
    width: 100%;

    .iconzuojiantou {
      position: absolute;
      top: 50%;
      left: -15px;
      transform: translate(0, -50%);
    }

    span {
      margin: 0 10px;
      color: #e1251b;
    }

    .active {
      color: #e1251b;
    }
  }
}

.el-main {
  padding: 0;
  width: 100%;
}

.el-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0;
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border-top: 1px solid #ddd;

  >div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #333333;

    img {
      width: 30px;
      height: 30px;
    }

    div {
      position: relative;
      top: 3px;
    }
  }
}
</style>
