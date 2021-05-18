<template>
  <div class="container">
    <div class="comm" v-for="(item, index) in evaluateList" :key="index">
      <div class="pic-info">
        <img :src="item.picPath" alt="">
         <el-rate
            v-model="score[index]"
            :colors="colors">
          </el-rate>
      </div>

      <div class="eva-box">
        <div class="title">分享你的使用体验吧</div>

        <el-input v-model="item.evaluateContent" style="display: block;width:95%;margin: 0 auto;" type="textarea" :rows="5"></el-input>
      </div>
    </div>
    <div class="btn" @click="addEvaluate">
        提交评价
    </div>
  </div>
</template>

<script>
import req from '@/api/order-evaluate.js'
import axios from 'axios'
// const qs = require('qs')

export default {
  name: 'order-evaluate',
  data () {
    return {
      evaluateList: [],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      score: []
    }
  },
  mounted () {
    // console.log(this.$route.query)
    this.getEvaluate()
  },
  methods: {
    getEvaluate () {
      req('getEvaluate', {orderCode: this.$route.query.orderCode}).then(data => {
        // console.log(data)
        this.evaluateList = data.data.cmdInfoList
      })
    },
    addEvaluate () {
      axios({
        method: 'post',
        url: 'http://localhost:8080/app/clientOrder/addCommodityAssess',
        data: JSON.stringify({
          orderCode: this.$route.query.orderCode,
          assessInfoList: this.evaluateList.map(item => {
            for (let i = 0; i < this.score.length; i++) {
              return Object.assign({}, {comCode: item.comCode, assContent: item.evaluateContent, starLevel: this.score[i]})
            }
          })
        }),
        headers: {
          'Content-Type': 'application/json;',
          Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('userInfo')).access_token
        }
      }).then(data => {
        if (data.data.code === 0) {
          // console.log(data)
          this.$toast.success(data.data.msg)

          this.$router.push({path: '/order-list'})
        } else {
          this.$toast.fail(data.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #fff;

  .comm {
    width: 100%;
    // height: 200px;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    padding: 10px 10px 0;
    box-sizing: border-box;
    background: #fff;

    .pic-info {
      width: 100%;
      display: flex;
      // justify-content: space-between;
      align-items: center;

      img {
        width: 130px;
        height: 130px;
      }

      .star {
        width: 160px;
        height: 36px;
        background: url('../../assets/stars.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }

    .eva-box {
      width: 100%;
      .title {
        padding-left: 10px;
        line-height: 40px;
      }
    }
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
  .el-rate {
    margin-left: 40px;
  /deep/ i {
   font-size: 28px;
  }
  }
}
</style>
