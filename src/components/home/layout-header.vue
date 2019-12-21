<template>
    <el-row class="layout-header" type="flex" align="middle">
        <el-col :span="12" class="left">
            <i class="el-icon-s-unfold"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="12" class="right">
            <el-row type="flex" justify="end" align="middle">
                <!-- <img src="../../assets/img/userlogo.jpg" alt=""> -->
                <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt="">
                <el-dropdown @command="clickMenu">
                    <span>{{userInfo.name}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="info">个人信息</el-dropdown-item>
                        <el-dropdown-item command="git">git地址</el-dropdown-item>
                        <el-dropdown-item command="lgout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}, // 定义一个接受数据的对象
      defaultImg: require('../../assets/img/userlogo.jpg') // 默认图片变为动态变量再赋值
    }
  },
  created () {
    let token = localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(result => {
      this.userInfo = result.data.data
    })
  },
  methods: {
    // 点击菜单触发
    clickMenu (command) {
      if (command === 'info') {

      } else if (command === 'git') {
        // 跳转git地址
        window.location.href = 'https://github.com/biyumeng/toutiao'
      } else {
        // 退出
        window.localStorage.removeItem('user-token')
        // 回到登录页
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang='less' scoped>
    .layout-header{
        height: 60px;
        .left{
            font-size: 20px;
            span{
                color: #2c3e50;
                font-size: 16px;
                margin-left: 4px;
            }
        }
        .right{
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right:10px;
            }
        }
    }
</style>
