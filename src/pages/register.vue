<template>
  <div>
    <div class="header">
      <span class="iconfont iconzuojiantou" @click="$router.push({path: '/login'})"></span>
      <span>注册</span>
    </div>
    <div class="logo">
      <img src="../assets/images/applogo.png" alt="">
    </div>
    <van-form validate-first @failed="onFailed">
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
        v-model="value1"
        name="pattern"
        placeholder="正则校验"
        :rules="[{ pattern, message: '请输入正确内容' }]"
      />
      <!-- 通过 validator 进行函数校验 -->
      <van-field
        v-model="value2"
        name="validator"
        placeholder="函数校验"
        :rules="[{ validator, message: '请输入正确内容' }]"
      />
      <!-- 通过 validator 进行异步函数校验 -->
      <van-field
        v-model="value3"
        name="asyncValidator"
        placeholder="异步函数校验"
        :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注 册</van-button>
      </div>
    </van-form>
    <el-form ref="form" :model="formData" :rules="formRules" inline label-width="80px">
      <el-form-item label="用户名" prop="userAccount">
        <el-input v-model="formData.userAccount"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input type="password" v-model="formData.userPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmUserPassword">
        <el-input type="password" v-model="formData.confirmUserPassword"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.number="formData.phone"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="photo" style="margin-left: -40px; margin-right: 20px">
        <i-file class="i-file" v-model="formData.photo"></i-file>
      </el-form-item>
      <el-form-item>
        <el-button class="register-btn" type="primary" @click="submit">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
        <div>
          <el-button class="backtologin" type="text" @click="toLogin">返回登录</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import req from '@/api/register.js'
import IFile from '@/components/common/i-file.vue'
import axios from 'axios'
const qs = require('qs')

export default {
  name: 'register',
  components: {
    IFile
  },
  data () {
    return {
      formData: {},
      pattern: /\d{6}/,
      pic: '',
      formRules: {
        userAccount: [
          {required: true, message: '请输入用户账号', trigger: 'blur'}
        ],
        userPassword: [
          {required: true, message: '请输入用户密码', trigger: 'blur'},
          {min: 6, max: 18, message: '密码不能小于6位', trigger: 'blur'}
        ],
        confirmUserPassword: [
          {required: true, message: '请输入确认密码', trigger: 'blur'},
          {min: 6, message: '密码不能小于6位', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          { pattern: /^1\d{10}$/, message: '请输入正确手机格式' }
        ],
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    toLogin () {
      this.$router.push({path: '/login'})
    },
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /1\d{10}/.test(val);
    },
    // 异步校验函数返回 Promise
    asyncValidator(val) {
      return new Promise((resolve) => {
        Toast.loading('验证中...');

        setTimeout(() => {
          Toast.clear();
          resolve(/\d{6}/.test(val));
        }, 1000);
      });
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.formData.userPassword !== this.formData.confirmUserPassword) {
            this.$message.info('两次输入的密码不一致')
            return
          }
          axios({
            method: 'post',
            url: 'http://n31335685f.wicp.vip/app/clientRegistered/addUser',
            data: qs.stringify(this.formData),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;'
            }
          }).then(data => {
            if (data.data.code === 0) {
              this.$message.success(data.data.msg)

              // this.getHeader(data.data.data.access_token)

              // sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))

              setTimeout(() => {
                this.$router.push({path: '/login'})
              })
            } else {
              this.$message.error(data.data.msg)
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #e1251b;
  font-size: 23px;

  span.iconzuojiantou {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0, -50%);
    color: #e1251b;
  }
}

.logo {
  width: 70%;
  margin: 0 auto;

  img {
    width: 100%;
  }
}

.el-form {
  margin-top: 20px;

  .el-form-item {
    width: 100%;
    text-align: center;
    margin: 0 auto 5px;

    /deep/ .el-form-item__error {
      padding-top: 0;
      top: 36px;
    }
  }
}

.register-btn {
  // width: 150px;
  // height: 40px;
  // margin-top: 150px;
  display: block;
  margin: 0 auto;
  width: 200px;
  height: 45px;
  border-radius: 10px;
  background: #e1251b;
  border: 0px;
  font-size: 20px;
  margin-top: 30px;
}
.backtologin {
  color: #e1251b;
}
.i-file {
  margin-top: 5px;
  // margin-left: 10px;
}
</style>
