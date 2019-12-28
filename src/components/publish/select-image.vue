<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material">
        <div class="select-image-list">
            <el-card v-for="item in list" :key="item.id" class="img-card">
                <!-- 给图片注册点击事件 -->
                <img @click="clickImg(item.url)" :src="item.url" alt="">
            </el-card>
        </div>
        <!-- 放置一个分页组件 -->
        <el-row type="flex" justify="center">
            <el-pagination
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            background
            layout="prev, pager, next"
            :total="page.total"
            @current-change="changePage">
            </el-pagination>
        </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
        <!-- 上传组件  给action不报错 -->
        <el-upload action="" :http-request="upLoadImg" :show-file-list="false" class="upload-img">
            <i class="el-icon-plus"></i>
        </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 默认选择素材库
      list: [], // 接收素材管理的数据
      page: {
        currentPage: 1, // 默认请求页码
        pageSize: 8, // 每页条数
        total: 0 // 默认总页码
      } // 分页信息

    }
  },
  methods: {
    // 上传组件方法
    upLoadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        this.$emit('selectOneImg', result.data.url)
      })
    },
    // 给图片注册点击事件
    clickImg (url) {
      // 点击图片时传给显示的封面  用自定义事件
      this.$emit('selectOneImg', url) // 不用全小写 因为安装了模板
    },
    // 改变页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    // 获取所有素材
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: { collect: false, page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang='less' scoped>
    .select-image-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .img-card{
            width: 150px;
            height: 150px;
            margin: 20px 0;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .upload-img{
        display: flex;
        justify-content: center;
        i{
            font-size: 50px;
            padding: 50px;
            border: 1px dashed #ccc;
            border-radius: 4px;
        }
    }
</style>
