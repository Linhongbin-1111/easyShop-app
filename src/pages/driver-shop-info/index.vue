<template>
  <div class="main">
    <div class="box" v-for="(item, index) in list" :key="index">
      <div class="shop-info">
        <img src="../../assets/u919.png" alt="">
        <span>{{item.storeId}}</span>
      </div>
      <div>
        门店：{{item.storeName}}
      </div>
      <div>
        地址：{{item.storeAddress}}
      </div>

      <div>
        店长：{{item.userName}}
      </div>
      <div>
        手机：{{item.phone}}
      </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/driver-shop-info.js'

export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.getDriverInfo()
  },
  methods: {
    getDriverInfo () {
      req('getDriverInfo', {
        pageNum: 1,
        pageSize: 100
      }).then(data => {
        console.log(data)
        this.list = data.data.list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding: 10px;
  border-bottom: 1px solid #ddd;

  .shop-info {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 0;

    img {
      margin-right: 6px;
    }
  }

  >div {
    height: 30px;
    line-height: 30px;
    padding-left: 30px;
  }
}
  .main{
    padding-bottom: 50px;
    box-sizing: border-box;
}
</style>
