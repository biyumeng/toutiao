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
                <el-card class="img-card" v-for="(item,index) in list" :key="item.id">
                  <img @click="openDialog(index)" :src="item.url" alt="">
                  <el-row class="operate" type="flex" align="middle" justify="space-around">
                    <i @click="collectOrCancel(item)" :style="{ color:item.is_collected?'red':'#000' }" class="el-icon-star-on"></i>
                    <i @click="delMaterial(item.id)" class="el-icon-delete-solid"></i>
                  </el-row>
                </el-card>
              </div>

            </el-tab-pane>
            <el-tab-pane label="收藏图片" name="collect">
              <div class="img-list">
                <el-card class="img-card" v-for="(item,index) in list" :key="item.id">
                  <img @click="openDialog(index)" :src="item.url" alt="">
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
        <el-dialog @opened="openEnd" :visible="dialogVisible" @close="dialogVisible=false">
          <el-carousel ref="myCarosel" :interval="5000" arrow="always" height="600px">
            <el-carousel-item v-for="(item,index) in list" :key="index">
              <img style="width:100%;height:100%" :src="item.url" alt="">
            </el-carousel-item>
          </el-carousel>
        </el-dialog>
    </el-card>
</template>

<script>
// import { url } from 'inspector'
export default {
  data () {
    return {
      dialogVisible: false, // 弹层
      loading: false,
      activeName: 'all', // 当前选中的标签
      list: [], // 接收素材的数据
      page: {
        total: 0,
        pageSize: 12,
        currentPage: 1
      }, // 专门存放分页信息
      clickIndex: -1 // 走马灯点击的索引
    }
  },
  methods: {
    // dialog里的回调属性方法
    openEnd () {
      this.$refs.myCarosel.setActiveItem(this.clickIndex)
    },
    // 打开弹层
    openDialog (index) {
      this.dialogVisible = true
      this.clickIndex = index
    },
    // 删除用户素材
    delMaterial (id) {
      this.$confirm('您确定要删除此图片吗？').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${id}`
        }).then((res) => {
          this.getMaterial()
        })
      })
    },

    // 取消或收藏
    collectOrCancel (item) {
      this.$axios({
        method: 'put',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected // 取反 因为收藏状态就要取消收藏
        }
      }).then(res => {
        this.getMaterial()
      })
    },

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
        i{
          cursor: pointer;
        }
      }
    }
  }
</style>
