<template>
  <div class="bodys">
    <div class="content">
      <el-form :model="adressData" ref="form" :rules="formRules">
        <el-form-item label="姓名" prop="name" inline label-width="100px">
          <el-input v-model="adressData.name" placeholder="请输入您的收件人姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" inline label-width="100px">
          <el-input v-model="adressData.phone" placeholder="请输入您的手机号码"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="address" inline label-width="100px">
          <el-input type="textarea" :rows="3" v-model="adressData.address" placeholder="请输入您的收货地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="adressData.status">
            <el-radio label=1>默认地址</el-radio>
            <el-radio label=0>普通地址</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn" @click="toAddadress">确认新增</div>
  </div>
</template>

<script>
import req from '@/api/add-adress.js'

export default {
  name: 'add-adress',
  data () {
    return {
      // 地址信息集合
      adressData: {
        address: '',
        status: Number,
        name: '',
        phone: ''
      },
      formRules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {pattern: /^1\d{10}$/, message: '手机号必须以1开头并且是11位', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入地址', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    toAddadress () {
      if (!this.adressData.address) {
        this.$toast.fail('请先输入地址')
        return
      }
      if (!this.adressData.status) {
        this.$toast.fail('请选择地址类型')
        return
      }
      if (!this.adressData.name) {
        this.$toast.fail('请先输入姓名')
        return
      }
      if (!this.adressData.phone) {
        this.$toast.fail('请先输入手机号')
        return
      }
      req('addAdress', {
        ...this.adressData
      }).then(data => {
        if (data.code === 0) {
          this.$toast.success(data.msg)
          this.$router.push({path: '/change-adress'})
        } else {
          this.$toast.fail(data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bodys {
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
}
  .content {
      width: 95%;
      margin: 5px auto;
      background: white;
      display: flex;
      border-radius: 8px;
      font-size: 17px;
      // margin-top: 20px;
      border-radius: 10px;
      .con-left {
          flex: 1;
          line-height: 90px;
          text-align: center;
      }
      input {
          flex: 2;
          line-height: 90px;
          border: none;
          outline: none;
          padding-left: 20px;
          box-sizing: border-box;
          font-size: 17px;
          color: rgb(168,168,168);
          &::placeholder {
              color: rgb(168,168,168)
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
  margin-top: 50px;
}
  .el-form {
    width: 100%;
    margin-top: 20px;
    .el-form-item {
      width: 90%;
    }
    .el-radio-group {
      margin: 0 auto;
      margin-left: 80px;
    }
  }
  /deep/ .el-radio__input.is-checked .el-radio__inner {
    border-color: #e1251b;
    background: #e1251b;
}
/deep/ .el-radio__input.is-checked+.el-radio__label {
    color: #e1251b;
}

</style>
