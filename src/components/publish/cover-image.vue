<template>
  <div class="cover-image">
      <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-image-item">
          <img :src="item ? item : defaultImg" alt="">
      </div>
      <!-- 放置一个对话框 -->
      <el-dialog :visible="dialogVisible" @close="closeDialog">
        <!-- 再放置一个素材库和上传图片的组件 -->
        <!-- 监听谁就在标签上写监听 -->
        <select-image @selectOneImg="receiveImg"></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'), // 默认图片地址
      dialogVisible: false, // 用来控制弹层开关
      selectIndex: -1 // 用来存储点击的图片下标
    }
  },
  methods: {
    receiveImg (url) {
      this.$emit('selectTwoImg', url, this.selectIndex) // 再传给他的父元素
      this.closeDialog()
    },
    // 打开弹层
    openDialog (index) {
      this.dialogVisible = true
      this.selectIndex = index
    },
    // 关闭弹层
    closeDialog () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
    .cover-image{
        margin: 20px 100px;
        display: flex;
        .cover-image-item{
            border: 1px solid #ccc;
            width: 250px;
            height: 250px;
            padding: 20px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
