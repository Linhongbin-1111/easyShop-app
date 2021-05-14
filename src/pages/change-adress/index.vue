<template>
  <div class="bodys">
    <ul class="adress" >
      <li v-for="(item, index) in adressData"
        :key="index">
        <div>
          <span class="name">{{item.name}}</span>
          <span class="phone">{{item.phone}}</span>
          <span v-show="item.status === 1"
          :class="{'moren' : item.status === 1, 'putong': item.status === 0}">(默认)</span>
          <div class="user-adess">{{item.address}}</div>
        </div>
        <div>
          <div class="edit-btn" @click="editAdress(item)">编辑</div>
          <div class="del-btn" @click="deleteAdress(item)">删除</div>
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
    <div class="btn" @click="toAddadress">
        新增收货地址
    </div>
  </div>
</template>

<script>
import req from '@/api/change-adress.js'

export default {
  name: 'change-adress',
  data () {
    return {
      adress: '',
      adressData: [],
      editAdressData: [],
      adressCode: ''
    }
  },
  mounted () {
    this.getAdress()
  },
  methods: {
    getAdress () {
      req('getAdress', {
      }).then(data => {
        // console.log(data)
        this.adressData = data.data.map(item => {
          return Object.assign({}, item, {checked: false})
        })
        // // 优先选中默认地址
        // this.adressData.map(item => {
        //   if (item.status === 1) {
        //     item.checked = true
        //     return item
        //   }
        // })
      })
    },
    toAddadress () {
      this.$router.push({path: '/add-adress'})
    },
    // getSelectAdress (item) {
    //   // console.log('我是地址', item.address)
    //   // this.adress = item.address
    //   this.adressCode = item.addressCode
    //   this.adressData.map(item => {
    //     item.checked = false
    //     return item
    //   })
    //   item.checked = !item.checked
    // },
    deleteAdress (item) {
      req('deleteAdress', {
        addressCode: item.addressCode
      }).then(data => {
        // console.log('数据', data)
        this.$message.success('删除成功')
        this.getAdress()
      })
    },
    editAdress (item) {
      this.$router.push({path: '/edit-adress', query: {adressCode: item.addressCode}})
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
  margin-right: 40px;
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
// .select-btn-box {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 40px;
//   height: 100%;

//   >div {
//     position: relative;
//     width: 18px;
//     height: 18px;
//     border: 2px solid #ddd;
//     border-radius: 50%;

//     .input {
//       position: absolute;
//       left: 50%;
//       top: 50%;
//       transform: translate(-50%, -50%);
//       padding: 0;
//       margin: 0;
//       width: 13px;
//       height: 13px;
//       z-index: 1;
//       opacity: 0;
//     }

//     .action {
//       display: none;
//       position: absolute;
//       width: 13px;
//       height: 13px;
//       border-radius: 50%;
//       background: #e1251b;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       z-index: 0;
//     }
//   }
// }
.edit-btn {
  // color: #e1251b;
  width: 40px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 14px;
  border: 1px solid #aaaaaa;
  border-radius: 5px;
}
.del-btn {
  width: 40px;
  line-height: 20px;
  height: 20px;
  border-radius: 5px;
  color: #e1251b;
  font-size: 14px;
  text-align: center;
  border: 1px solid #e1251b;
  margin-top: 20px;
}

</style>
