<template>
  <div>
    <div class="logo">
      <img src="../assets/images/applogo.png" alt="">
    </div>
    <van-form @submit="login" style="width: 80%; margin: 0 auto;">
      <!-- <van-field
        v-model="formData.username"
        clearable
        label="用户名"
        right-icon="warning-o"
        placeholder="用户名"
      />
      <van-field
        v-model="formData.password"
        clearable
        label="密码"
        right-icon="warning-o"
        placeholder="密码"
      /> -->
      <van-field
        v-model="formData.username"
        name="用户名"
        label="用户名"
        placeholder=""
        :rules="[{ required: true, message: '请填写用户名', trigger: 'blur' }]"
      />
      <van-field
        v-model="formData.password"
        type="password"
        name="密码"
        label="密码"
        placeholder=""
        :rules="[{ required: true, message: '请填写密码', trigger: 'blur' }]"
      />
      <div class="register-btn">
        <span class="text" @click="$router.push({path: '/register'})">我要注册</span>
      </div>
      <div style="margin: 16px;">
        <van-button round block native-type="submit" color="linear-gradient(to right, #ff6034, #ee0a24)">登 录</van-button>
      </div>
    </van-form>
    <!-- <el-form :model="formData" ref="form" :rules="formRules" inline label-width="65px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
    </el-form>
    <div class="register-btn">
      <el-button class="text" type="text" @click="$router.push({path: '/register'})">我要注册</el-button>
    </div>
    <van-button class="login-btn" color="linear-gradient(to right, #ff6034, #ee0a24)" @click="login">
      渐变色按钮
    </van-button> -->
    <!-- <el-button @click="login" class="login-btn" type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button> -->
  </div>
</template>

<script>
import req from '@/api/global.js'
import axios from 'axios'
const qs = require('qs')

export default {
  name: 'login',
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      formRules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios({
            method: 'post',
            url: 'http://n31335685f.wicp.vip/uaa/auth/form',
            data: qs.stringify(this.formData),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;'
            }
          }).then(data => {
            if (data.data.code === 0) {
              this.$message({
                type: 'success',
                message: data.data.msg
              })

              // this.getHeader(data.data.data.access_token)

              sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))

              this.getUserInfo()
            } else {
              this.$message({
                type: 'error',
                message: data.data.msg
              })
            }
          })
        } else {
          return false
        }
      })
    },
    getUserInfo () {
      req('getUserInfo', {...this.formData}).then(data => {
        // console.log(data)
        sessionStorage.setItem('roleInfo', JSON.stringify(data.data))
        if (data.data.role === '3') {
          this.$router.push({path: '/home'})
        } else if (data.data.role === '1') {
          this.$router.push({path: '/order-list'})
        } else {
          this.$router.push({path: '/driver-shop-info'})
        }
        // console.log('data', data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  margin: 0 auto;
  margin-top: 30px;

  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 50px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 10px;
    /deep/ .el-input {
      outline: none;
      border: none;
    }

    /deep/ .el-form-item__error {
      padding-top: 0;
    }
  }
}

.register-btn {
  font-size: 14px;
  text-align: right;
  margin-right: 50px;
  .text {
    color: #e1251b;
  }
}

.login-btn {
  display: block;
  margin: 50px auto;
  width: 250px;
  height: 50px;
  background: #e1251b;
  border-color: #e1251b;
  border-radius: 10px;
  font-size: 22px;
}
</style>
