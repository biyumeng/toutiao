<template>
    <el-card v-loading="loading">
        <!-- 头部内容 -->
        <bread-crumb slot="home">
            <template slot="title">
                素材管理
            </template>
        </bread-crumb>

        <!-- 上传标签 -->
        <el-row type="flex" justify="end">
          <el-upload action="" :http-request="uploadImg" :show-file-list="false">
            <el-button size="small" type="primary">上传图片</el-button>
          </el-upload>
        </el-row>

        <!-- 标签页 -->
        <el-tabs v-model="activeName" @tab-click="changeTab">
            <el-tab-pane label="全部图片" name="all">
              <!-- 生成页面结构 -->
              <div class="img-list">
                <el-card class="img-card" v-for="item in list" :key="item.id">
                  <img :src="item.url" alt="">
                  <el-row class="operate" type="flex" align="middle" justify="space-around">
                    <i class="el-icon-delete-solid"></i>
                    <i class="el-icon-star-on"></i>
                  </el-row>
                </el-card>
              </div>

            </el-tab-pane>
            <el-tab-pane label="收藏图片" name="collect">
              <div class="img-list">
                <el-card class="img-card" v-for="item in list" :key="item.id">
                  <img :src="item.url" alt="">
                </el-card>
              </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 公共分页 -->
        <el-row type="flex" justify="center" align="middle" style="height:80px">
          <el-pagination
              background
              layout="prev, pager, next"
              :total="page.total"
              :page-size="page.pageSize"
              :current-page="page.currentPage"
              @current-change="changePage">
          </el-pagination>
        </el-row>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      activeName: 'all', // 当前选中的标签
      list: [], // 接收素材的数据
      page: {
        total: 0,
        pageSize: 12,
        currentPage: 1
      } // 专门存放分页信息
    }
  },
  methods: {
    // 上传图片
    uploadImg (params) {
      this.loading = true // 打开弹层
      let data = new FormData()
      data.append('image', params.file) // 文件添加到参数
      this.$axios({
        method: 'post',
        url: '/user/images',
        data: data
      }).then(result => {
        this.loading = false// 关闭弹层
        this.getMaterial()
      })
    },

    // 改变页码方法
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },

    // 切换页签方法
    // 切换后this.activeName改变
    changeTab () {
      this.page.currentPage = 1 // 重置回到第一页
      this.getMaterial()
    },

    // 获取素材的方法
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          page: this.page.currentPage,
          per_page: this.page.pageSize,
          // 根据文档传入false是获得所有数据 传入true是获得收藏数据 如果《this.activeName === 'collect'》是true这显示收藏的图片，false显示全部
          collect: this.activeName === 'collect'
        }
      }).then(result => {
        this.list = result.data.results // 获得图片数据
        this.page.total = result.data.total_count // 获得总条数
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
  .img-list{
    display: flex;
    flex-wrap:wrap;
    .img-card{
      width: 200px;
      height: 220px;
      margin: 20px 50px;
      position: relative;
      img{
        width: 100%;
        height: 100%;
      }
      .operate{
        height: 36px;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        font-size: 20px;
        background-color: #f4f5f6;
      }
    }
  }
</style>
