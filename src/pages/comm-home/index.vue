<template>
  <div class="container">
    <div class="search">
      <div>
        <span @click="clearSearch()">
          <img class="search-icon" src="../../assets/images/搜索 search.png" alt="">
          <span>搜索想要的商品</span>
        </span>
        <!-- <input type="text" v-model="keyword" @click="clearSearch"> -->
        <!-- <img src="../../assets/用户名.png" alt="" @click="clearSearch"> -->
      </div>
    </div>
    <div class="banner-pic-list">
      <el-carousel height="200px" indicator-position="none">
        <el-carousel-item v-for="(item, index) in picShowList" :key="index">
          <img :src="item.path" alt="" @click="toDetailPage(item)">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="line"></div>
    <div class="comm-classify">
      <ul>
        <li @click="toCommClassify()">
          <img src="../../assets/images/篮球鞋 (1).png" alt="">
          <p>篮球鞋</p>
        </li>
        <li @click="toCommClassify()">
          <img src="../../assets/images/跑步鞋 (1).png" alt="">
          <p>跑步鞋</p>
        </li>
        <li @click="toCommClassify()">
          <img src="../../assets/images/帆布鞋.png" alt="">
          <p>帆布鞋</p>
        </li>
        <li @click="toCommClassify()">
          <img src="../../assets/images/衣服 (1).png" alt="">
          <p>衣服</p>
        </li>
      </ul>
    </div>

    <div class="module-title"># # 潮流热品 # #</div>

    <ul class="comm-list">
      <li
        v-for="(item, index) in commList"
        :key="index"
        @click="toDetailPage(item)">
        <img :src="item.picPath" alt="">
        <div class="book-info">{{item.comName}}</div>
        <div>￥{{item.comPrice}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-home.js'

export default {
  name: 'comm-home',
  data () {
    return {
      picShowList: [],
      commList: []
    }
  },
  mounted () {
    this.getSliderPicList()
    this.getHotComm()
  },
  methods: {
    toCommClassify () {
      this.$router.push({path: '/comm-classify'})
    },
    clearSearch () {
      this.$router.push({path: 'search'})
    },
    getSliderPicList () {
      req('getSliderPicList', {}).then(data => {
        console.log(data)
        this.picShowList = data.data
      })
    },
    getHotComm () {
      req('getHotComm', {}).then(data => {
        this.commList = data.data
        // console.log(data)
      })
    },
    toDetailPage (data) {
      sessionStorage.setItem('currentComm', JSON.stringify(data))

      this.$router.push({path: '/comm-detail'})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #f6f6f6;
}
.search {
  width: 100%;
  height: 100px;
  background-color: #e1251b;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  position: relative;
  div {
    width: 90%;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -90%);
    border-radius: 20px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      width: 100%;
      position: relative;
      text-align: center;
      .search-icon {
        position: absolute;
        left: 20%;
        top: 10%;
        width: 30px;
        height: 30px;
      }
      span {
        color: #aaaaaa;
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
.banner-pic-list {
  background: #f6f6f6;
  // border-radius: 20px;
  padding: 10px 0 0 0;
  box-sizing: border-box;
  margin-top: -45px;
}
.el-carousel {
  .el-carousel__container {
    .el-carousel__item {
      img {
        width: 96%;
        height: 100%;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        border-radius: 20px;
      }
    }
  }
}
.comm-classify {
  width: 100%;
  height: 90px;
  background: white;
  ul {
    display: flex;
    width: 100%;
    // margin-right: 4%;
    li {
      width: 20%;
      height: 80%;
      margin-left: 4%;
      img {
        width: 100%;
        height: 50%;
      }
      p {
        color: #aaaaaa;
        margin: 0;
        margin-left: 22%;
        margin-top: -15px;
      }
    }
  }
}
.comm-classify ul li:nth-child(3) img {
  width: 80%;
  height: 40%;
  margin: 10%;
}
.comm-classify ul li:nth-child(4) img {
  width: 80%;
  height: 40%;
  margin: 10%;
}

.module-title {
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 35px;
  color: #e1251b;
  // margin-left: 15px;
  font-size: 20px;
  font-weight: 600;
  margin: 10px;
  letter-spacing: 5px;
}

.comm-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 60px;
  box-sizing: border-box;
  // margin-top: 10px;

  li {
    position: relative;
    width: 46%;
    background: white;
    padding: 10px;
    box-sizing: border-box;
    margin: 5px 2%;
    border-radius: 10px;

    img {
    width: 100%;
    height: 110px;
    position: relative;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0%);
    }

    div:nth-child(2) {
      font-size: 14px;
      padding-left: 5px;
      padding-top: 3px;
    }

    div:nth-child(3) {
      font-size: 16px;
      text-align: left;
      margin-top: 10px;
      color: red;
    }
  }
}
.line {
  width: 100%;
  height: 2px;
  border: 1px;
  border-color: #f6f6f6;
}
</style>
