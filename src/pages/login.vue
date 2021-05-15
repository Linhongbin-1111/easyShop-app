<template>
  <div>
    <div class="logo">
      <img src="../assets/images/applogo.png" alt="">
    </div>
    <van-form @submit="login" style="width: 80%; margin: 0 auto;">
      <van-field
        label-width="50px"
        clearable
        v-model="formData.username"
        name="用户名"
        label="用户名"
        placeholder=""
        :rules="[{ required: true, message: '请填写用户名', trigger: 'blur' }]"
      />
      <van-field
        label-width="50px"
        clearable
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
      <div class="login-btn">
        <van-button round block native-type="submit" color="linear-gradient(to right, #ff6034, #ee0a24)">登 录</van-button>
      </div>
    </van-form>
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
  padding-top: 5px ;
  margin-right: 20px;
  .text {
    color: #e1251b;
  }
}

.login-btn {
  margin-top: 60px;
}
</style>
