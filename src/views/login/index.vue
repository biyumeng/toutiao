<template>
  <div class="login">
    <el-card class="login-acrd">
      <div class="title"><img src="../../assets/img/logo_index.png" alt=""></div>

      <!-- 表单 -->
      <el-form :model="loginForm" :rules="loginRules">
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" v-model="loginForm.phone"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input style="width:70%;" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
          <el-button plain style="float: right;">发送验证码</el-button>
        </el-form-item>

        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已阅读并同意<span style="color:#409EFF">用户协议</span>和<span style="color:#409EFF">隐私条款</span></el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        phone: '',
        code: '',
        check: false
      },
      loginRules: {

      }
    }
  }
}
</script>

<style lang='less' scoped>
.login{
  background: url('../../assets/img/back.jpg');
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-acrd{
    width: 460px;
    height: 365px;
    .title{
      text-align: center;
      margin-bottom: 30px;
      img{
        height: 47px;
      }
    }
  }
}
</style>
