<template>
  <div class="container">
    <div class="search">
      <span class="cancel-btn" @click="cancelSearch">返回</span>
      <div>
        <input type="text" v-model="keyword">
      </div>
      <span class="search-btn" @click="getsearchData">搜索 </span>
    </div>
    <div class="module-title">您感兴趣的商品</div>
    <div class="line"></div>
    <ul class="comm-list">
      <li
        v-for="(item, index) in searchData"
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
  name: 'search',
  data () {
    return {
      keyword: '',
      searchData: []
    }
  },
  mounted () {
  },
  methods: {
    cancelSearch () {
      req('getsearchData', {
        keyWord: this.keyword
      }).then(data => {
        this.searchData = data.data
      })
      this.$router.push({path: '/comm-home'})
      console.log(this.keyword)
    },
    getsearchData () {
      req('getsearchData', {
        keyWord: this.keyword
      }).then(data => {
        this.searchData = data.data
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
  width: 100%;
  height: 100%;
  background: #f6f6f6;
}
.search {
  width: 100%;
  height: 60px;
  background-color: #e1251b;
  // border-bottom-left-radius: 30px;
  // border-bottom-right-radius: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 10px;
  box-sizing: border-box;
  div {
    width: 70%;
    height: 35px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: 80%;
      height: 30px;
      outline: none;
      border: none;
      // background: orange;
    }
  }
}
.module-title {
  width: 100%;
  height: 20px;
  text-align: left;
  line-height: 20px;
  color: #aaaaaa;
  margin-left: 20px;
  margin-top: 15px;
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
.cancel-btn {
  color: white;
  font-size: 17px;
}
.search-btn {
  color: white;
  font-size: 17px;
}
.line {
  width: 100%;
  height: 2px;
  border: 1px;
  border-color: #f6f6f6;
}
</style>
