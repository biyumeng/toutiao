<template>
<el-carousel :interval="4000" type="card" height="350px">
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
      list: ['https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/06/ChMkJ1bKyhuIGRtXAAbBuD0Zv5YAALIWwFttD0ABsHQ210.jpg', 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/02/0A/ChMkJlbKz1OIExEzAAPwXPnZ9VoAALJUAGPoNgAA_B0033.jpg', 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g4/M09/08/08/Cg-4y1TQL-qICShGABkB7JQ0AHYAATwkQIefFgAGQIE224.jpg', 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/0A/09/Cg-4WlWSUxyIWFetABBPRnTfvisAAGOFQPoX9oAEE9e254.jpg', 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g4/M0B/03/00/Cg-4y1TZbYeIPwEsAAcKG5QBv8oAAUaewAZXHkABwoz876.jpg']
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
