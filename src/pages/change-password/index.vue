<template>
  <div class="container">
    <div class="pwd-con">
        <div class="pwd-item">
            <div class="item-left">原密码</div>
            <input type="password" v-model="userPassword" placeholder="请输入原密码">
        </div>
        <div class="pwd-item">
            <div class="item-left">新密码</div>
            <input type="password" v-model="userNewPassword" placeholder="请输入新密码">
        </div>
        <div class="pwd-item">
            <div class="item-left">确认新密码</div>
            <input type="password" v-model="userNewConfirmPassword" placeholder="请再次输入新密码">
        </div>
    </div>
    <div class="btn" @click="submit">
        确认修改
    </div>
  </div>
</template>

<script>
import req from '@/api/change-password.js'

export default {
  name: 'change-password',
  data () {
    return {
      userPassword: '',
      userNewPassword: '',
      userNewConfirmPassword: ''
    }
  },
  methods: {
    submit () {
      if (!this.userPassword) {
        this.$message.info('请输入原密码')

        return false
      }
      if (!this.userNewPassword) {
        this.$message.info('请输入新密码')

        return false
      }
      if (this.userNewPassword.length < 6) {
        this.$message.info('密码不能小于6位')
        return false
      }
      if (!this.userNewConfirmPassword) {
        this.$message.info('请确认新密码')

        return false
      }
      if (this.userNewPassword !== this.userNewConfirmPassword) {
        this.$message.info('两次输入的密码不一致')

        return false
      }
      req('changePassword', {
        userPassword: this.userPassword,
        newUserPassword: this.userNewPassword,
        checkPassword: this.userNewConfirmPassword,
        version: JSON.parse(sessionStorage.getItem('roleInfo')).version
      }).then(data => {
        if (data.code === 0) {
          this.$message.success(data.msg)
          sessionStorage.clear('userInfo')
          sessionStorage.clear('roleInfo')
          sessionStorage.clear('currentComm')

          this.$router.push('/login')
        } else {
          this.$message.error(data.msg)
        }
        // console.log(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 90%;
  background: #f6f6f6;
}
  .pwd-con {
      width: 95%;
      height: 160px;
      margin: 12px auto;
      background-color: white;
      padding: 12px 24px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      border-radius: 8px;
      .pwd-item {
          flex: 1;
          width: 100%;
          display: flex;
          line-height: 45.34px;
          .item-left {
              flex: 1;
              font-size: 17px;
          }
          input {
              flex: 2;
              border: none;
              outline: none;
              font-size: 17px;
              color: rgb(168,168,168);
              &::placeholder {
                  color: rgb(168,168,168);
              }
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
</style>
