<template>
  <div class="login-container">
    <el-card class="login_box">
        <img src="../../assets/images/logo_index.png" alt="">
        <el-form >
            <el-form-item>
                <el-input placeholder="请输入手机号码"></el-input>
            </el-form-item>
             <el-form-item>
                <el-input style="width:380px" placeholder="请输入密码"></el-input>
                <el-button style="float:right">验证密码</el-button>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="checked"></el-checkbox>
                我已阅读并同意 <el-link type="primary" :underline="false">用户协议</el-link> 和 <el-link type="primary" :underline="false">隐私条款</el-link>
            </el-form-item>
            <el-form-item>
                <el-button style="width:100%" type="primary">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: true
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
    width:550px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    img{
       display: block;
       width: 200px;
       margin: 5px auto 20px ;
    }
  }
}
.el-checkbox{
    margin-right: 5px;
}
</style>
