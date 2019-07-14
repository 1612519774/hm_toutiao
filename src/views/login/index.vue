<template>
  <div class="login-container">
    <el-card class="login_box">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form status-icon :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop='mobile'>
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item prop='code'>
          <el-input v-model="loginForm.code" style="width:380px" placeholder="请输入密码"></el-input>
          <el-button style="float:right">验证密码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意
          <el-link type="primary" :underline="false">用户协议</el-link>和
          <el-link type="primary" :underline="false">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号码不正确'))
      }
    }
    return {
      checked: true,
      loginForm: {
        mobile: '17131056084',
        code: '246810'
      },
      loginRules: {
        mobile: [{ required: true, message: '手机号必填', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }],
        code: [
          { required: true, message: '验证码必填', trigger: 'blur' },
          { len: 6, message: '密码是6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // this.$refs.loginForm.validate((valid) => {
      //   if (valid) {
      //     this.axios.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm).then((res) => {
      //       const data = this.data
      //       console.log(data)
      //       // 2.保持登录状态
      //       window.sessionStorage.setItem('hm_toutiao', JSON.stringify(res.data.data))
      //       this.$router.push('/')
      //     }).catch((err) => {
      //       console.log(err)
      //       this.$message.error('用户或者密码错误')
      //     })
      //   }
      // })

      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            const res = await this.axios.post('authorizations', this.loginForm)
            window.sessionStorage.setItem('hm-toutiao', JSON.stringify(res.data.data))
            this.$router.push('/')
          } catch (err) {
            this.$message.error('用户或者密码错误')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login_box {
    width: 550px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 5px auto 20px;
    }
  }
}
.el-checkbox {
  margin-right: 5px;
}
</style>
