<template>
  <div class="container">
    <ul class="book-classify">
      <li :class="{active: item.firstSortCode === currentClassify.firstSortCode}" v-for="(item, index) in oneClassifyList" :key="index" @click="getTwoClassify(item)">
        <b></b>
        <span>{{item.firstSortName}}</span>
      </li>
    </ul>

    <ul class="book-classify-conteiner">
      <li class="book-classify-item" v-for="(item, index) in commList" :key="index">
        <div class="book-classify-item-title">{{item.secondSortName}}</div>
        <ul class="book-list">
          <li v-for="(childItem, childIndex) in item.cmdInfoList" :key="childIndex" @click="getCommDetail(childItem)">
            <img :src="childItem.picPath" alt="" width="50px">
            <div>{{childItem.comName}}</div>
            <div>
              ￥{{childItem.comPrice}}
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-classify.js'

export default {
  name: 'comm-classify',
  data () {
    return {
      oneClassifyList: [],
      currentClassify: {},
      commList: []
    }
  },
  mounted () {
    this.getClassify()
  },
  methods: {
    getClassify () {
      req('getClassify', {}).then(data => {
        // console.log(data)
        this.oneClassifyList = data.data

        this.currentClassify = this.oneClassifyList[0]

        this.getTwoClassify(this.currentClassify)
      })
    },
    getTwoClassify (item) {
      this.currentClassify = item

      req('getTwoClassify', {firstSortCode: item.firstSortCode}).then(data => {
        // console.log(data)
        this.commList = data.data
      })
    },
    getCommDetail (item) {
      sessionStorage.setItem('currentComm', JSON.stringify(item))

      this.$router.push({path: '/comm-detail'})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #f6f6f6;

  .book-classify {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20%;
    background: #fff;

    li {
      position: relative;
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 14px;

      >span {
        display: inline-block;
        width: 100%;
        height: 100%;
      }

    }
    li.active {
      color: #e1251b;
      background: #f6f6f6;

      b {
        position: absolute;
        left: 0;
        top: 50%;
        width: 3px;
        height: 20px;
        background: #e1251b;
        margin-top: -10px;
      }
    }
  }

  .book-classify-conteiner {
    position: absolute;
    top: 0;
    left: 22%;
    bottom: 0;
    overflow: auto;
    width: 78%;
    padding-bottom: 50px;
    box-sizing: border-box;

    .book-classify-item {
      .book-classify-item-title {
        width: 100%;
        height: 40px;
        padding-left: 10px;
        box-sizing: border-box;
        line-height: 40px;
      }

      .book-list {
        width: 100%;
        background: #fff;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0;
        box-sizing: border-box;

        li {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 46%;
          margin-bottom: 10px;

          img {
            width: 80%;
            height: 90px;
          }

          div:nth-child(2) {
            margin-left: 5px;
            font-size: 12px;
          }

          div:nth-child(3) {
            width: 100%;
            color: red;
            font-size: 14px;
            font-weight: bold;
            margin-left: 5px;
            text-align: left;

            span {
              color: #ddd;
              font-weight: normal;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
