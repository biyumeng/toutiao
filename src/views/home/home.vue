<template>
<el-carousel :interval="2500" type="card" height="300px">
    <el-carousel-item v-for="item in list" :key="item">
      <!-- <h3 class="medium">{{ item }}</h3> -->
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data () {
    return {
      list: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2044511392,3442362113&fm=26&gp=0.jpg', 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1870009744,2586288392&fm=26&gp=0.jpg', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2332656088,2138285815&fm=26&gp=0.jpg']
    }
  }
}
</script>

<style>
.el-carousel__item img{
    width: 100%;
}
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
