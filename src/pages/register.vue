<template>
  <div>
    <div class="header">
      <span class="iconfont iconzuojiantou" @click="$router.push({path: '/login'})"></span>
      <span>注册</span>
    </div>
    <div class="logo">
      <img src="../assets/images/applogo.png" alt="">
    </div>
    <van-form @submit="submit" style="width: 80%; margin: 0 auto;" ref="form">
      <van-field
        label-width="60px"
        v-model="formData.userAccount"
        name="用户名"
        label="用户名"
        :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]"
      />
      <van-field
        label-width="60px"
        v-model="formData.userPassword"
        name="密码"
        label="密码"
        type="password"
        :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },{min: 6, max: 18, message: '密码长度6-18位', trigger: 'blur'}]"
      />
      <van-field
        label-width="60px"
        v-model="formData.confirmUserPassword"
        name="确认密码"
        label="确认密码"
        type="password"
        :rules="[{ required: true, message: '请输入确认密码', trigger: 'blur' },{min: 6, max: 18, message: '密码长度6-18位', trigger: 'blur'}]"
      />
      <van-field
        label-width="60px"
        v-model="formData.phone"
        name="手机号"
        label="手机号"
        :rules="[{ required: true, message: '请输入手机号', trigger: 'blur' },{ pattern: /^1\d{10}$/, message: '请输入正确手机格式' }]"
      />
      <van-field
        label-width="60px"
        v-model="formData.userName"
        name="姓名"
        label="姓名"
        :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]"
      />
      <van-field name="头像" label="头像">
        <template #input>
          <van-uploader v-model="formData.photo" />
        </template>
      </van-field>
      <!-- <el-form-item label="头像" prop="photo" style="margin-left: -40px; margin-right: 20px">
        <i-file class="i-file" v-model="formData.photo"></i-file>
      </el-form-item> -->
      <div style="margin: 16px;">
        <van-button round block color="linear-gradient(to right, #ff6034, #ee0a24)" native-type="submit">注 册</van-button>
      </div>
    </van-form>
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
      pic: '',
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate().then(() => {
        if (this.formData.userPassword !== this.formData.confirmUserPassword) {
          this.$toast.fail('两次输入的密码不一致')
          return
        }
        axios({
          method: 'post',
          url: 'http://localhost:8080/app/clientRegistered/addUser',
          data: qs.stringify(this.formData),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;'
          }
        }).then(data => {
          if (data.data.code === 0) {
            this.$toast.success(data.data.msg)

            // this.getHeader(data.data.data.access_token)

            // sessionStorage.setItem('userInfo', JSON.stringify(data.data.data))

            setTimeout(() => {
              this.$router.push({path: '/login'})
            })
          } else {
            this.$toast.fail(data.data.msg)
          }
        })
      }).catch(() => {})
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
.i-file {
  width: 100%;
  height: 100%;
  // margin-top: 5px;
  // margin-left: 10px;
}
</style>
