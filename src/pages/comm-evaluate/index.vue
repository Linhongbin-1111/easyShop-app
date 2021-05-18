<template>
  <div class="container">
    <div class="evaluate-title">
      <span :class="{active: evaluateBtnType === 'all'}" @click="getEvaluate('', 'all')">全部评价</span>
      <span :class="{active: evaluateBtnType === 'perfect'}" @click="getEvaluate('1', 'perfect')">好评</span>
      <span :class="{active: evaluateBtnType === 'good'}" @click="getEvaluate('2', 'good')">中评</span>
      <span :class="{active: evaluateBtnType === 'differ'}" @click="getEvaluate('3', 'differ')">差评</span>
    </div>

    <ul class="evaluate-list">
      <li v-for="(item, index) in list" :key="index">
        <!-- <div class="head-pic">
          <img src="../../assets/head_pic.png" alt="">
        </div> -->

        <div class="content">
          <div class="title">
            <div class="user-info">
              <div class="name">{{item.userName}}</div>
              <div class="date">{{item.assTime}}</div>
            </div>

            <div
              class="star"
              :style="{backgroundPosition: `${90 - item.starLevel*18}px 0`}">
            </div>
          </div>
          <div class="msg">{{item.assContent}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-evaluate.js'

export default {
  name: 'comm-evaluate',
  data () {
    return {
      list: [],
      // all perfect good differ
      evaluateBtnType: 'all'
    }
  },
  mounted () {
    this.getEvaluate('', 'all')
  },
  methods: {
    getEvaluate (score = '', type) {
      this.evaluateBtnType = type
      // console.log(score)
      let commData = JSON.parse(sessionStorage.getItem('currentComm'))
      let data = {
        comCode: commData.comCode,
        starLevel: parseInt(score),
        pageSize: 100,
        pageNum: 1
      }

      if (!score) {
        delete data.starLevel
      }

      req('getEvaluate', {
        ...data
      }).then(data => {
        console.log(data)
        this.list = data.data.list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  background: #f6f6f6;
  padding-bottom: 10px;

  .evaluate-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    box-sizing: border-box;

    span {
      padding: 0 10px;
    }

    .active {
      color: #e1251b;
      font-size: 18px;
    }
  }

  .evaluate-list {
    width: 95%;
    background: #fff;
    margin: 0 auto;
    border-radius: 10px;

    li {
      display: flex;
      border-bottom: 1px solid #f6f6f6;

      // .head-pic {
      //   width: 50px;
      //   height: 50px;
      //   padding: 10px;

      //   img {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }

      .content {
        flex: 1;
        padding: 10px;

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 60px;

          .user-info {
            .date {
              color: #ddd;
              font-size: 14px;
              margin-top: 5px;
            }
          }

          .star {
            width: 90px;
            height: 18px;
            background-image: url('../../assets/stars.png');
            background-position: 0 0;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
}
</style>
