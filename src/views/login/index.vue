<template>
  <div class="login">
    <el-card class="login-acrd">
      <div class="title"><img src="../../assets/img/logo_index.png" alt=""></div>

      <!-- 表单 -->
      <el-form :model="loginForm" :rules="loginRules" ref="myForm">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input style="width:70%;" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
          <el-button plain style="float: right;">发送验证码</el-button>
        </el-form-item>

        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已阅读并同意<span style="color:#409EFF">用户协议</span>和<span style="color:#409EFF">隐私条款</span></el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width:100%;" @click="submitLogin">登录</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
// import { log } from 'util'
export default {
  data () {
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 是否同意协议
      },
      loginRules: {
        //   决定着校验规则  key(字段名):value(对象数组) => 一个对象就是一个校验规则
        // required 为true 就表示该字段必填 如果不填 就会提示消息
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/, message: '手机号格式不正确' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确' }
        ],
        check: [
          // 自定义校验函数
          { validator: function (rule, value, callback) {
            // rule 规则 没用
            // value 要校验的字段值
            // callback是回调函数
            if (value) {
              // 如果是true 认为已经勾选
              callback() // 认为当前规则校验通过
            } else {
              // 认为没勾选
              callback(new Error('请同意我们的用户协议和隐私条款')) // 认为当前规则校验失败，给出提示信息
            }
          }
          }
        ]
      }
    }
  },
  methods: {
    submitLogin () {
      // 校验整个表单的规则
      // validate 是一个方法 => 方法中传入的一个函数 两个校验参数  是否校验成功/未校验成功的字段
      this.$refs.myForm.validate((isOK) => {
        if (isOK) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(result => {
            window.localStorage.setItem('user-token', result.data.token)
            this.$router.push('/home')
          }).catch(() => {
            this.$message({
              message: '您的手机号或验证码有错误',
              type: 'warning'
            })
          })
        }
      })
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
