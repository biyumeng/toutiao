<template>
    <el-container>
        <!-- 左侧区域 -->
        <el-aside :style="{width:collapse?'60px':'230px'}" style="min-height:100vh;background-color:#353b4e;transition:all 0.5s;">
            <layout-aside :collapse="collapse"></layout-aside>
        </el-aside>
        <!-- 右侧区域 -->
        <el-container>
            <el-header>
                <layout-header></layout-header>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import eventBus from '../../utils/eventBus'
// import layoutAside from '../../components/home/layout-aside'
// import layoutHeader from '../../components/home/layout-header'
export default {
  data () {
    return {
      collapse: false // 默认是展开
    }
  },
  created () {
    // 开启监听
    eventBus.$on('changeCollapse', () => {
      this.collapse = !this.collapse // 不是展开就是折叠
    })
  }
}
</script>

<style>

</style>
