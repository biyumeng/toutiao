<template>
  <el-card class="articles">
      <bread-crumb slot="header">
        <template slot="title">
            文章列表
        </template>
      </bread-crumb>
      <!-- 表单容器 -->
      <el-form style="padding-left:50px">
          <el-form-item label="文章状态:">
              <!-- 单选框组 -->
              <!-- 第一种使用监听组件的方法搜索 -->
              <!-- <el-radio-group v-model="searchForm.status" @change="changCondition">
                <el-radio :label="5">全部</el-radio>
                  <el-radio :label="0">草稿</el-radio>
                  <el-radio :label="1">待审核</el-radio>
                  <el-radio :label="2">审核通过</el-radio>
                  <el-radio :label="3">审核失败</el-radio>
              </el-radio-group> -->

              <!-- 第二种使用watch方法搜索 -->
              <el-radio-group v-model="searchForm.status">
                  <!-- 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
                  <el-radio :label="5">全部</el-radio>
                  <el-radio :label="0">草稿</el-radio>
                  <el-radio :label="1">待审核</el-radio>
                  <el-radio :label="2">审核通过</el-radio>
                  <el-radio :label="3">审核失败</el-radio>
              </el-radio-group>

          </el-form-item>
          <el-form-item label="频道列表:">
              <!-- 第一种使用监听组件的方法 -->
              <!-- <el-select @change="changCondition" placeholder="请选择频道" v-model="searchForm.channels_id">
                <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select> -->

              <!-- 第二种使用watch方法搜索 -->
              <el-select placeholder="请选择频道" v-model="searchForm.channels_id">
                  <!-- el-option中label是选择值 value是存储值 -->
                  <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="时间选择:">
              <!-- 日期选择器 -->
              <!-- 第一种使用监听组件的方法 -->
              <!-- <el-date-picker
                v-model="searchForm.dateRange"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="changCondition">
              </el-date-picker> -->

              <!-- 第二种使用watch方法搜索 -->
              <el-date-picker
                v-model="searchForm.dateRange"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                @change="changCondition">
              </el-date-picker>
          </el-form-item>
      </el-form>

        <!-- 主体内容 -->
      <el-row class="total" type="flex" justify="middle">
          <span>
              共找到{{page.total}}条符合条件的内容
          </span>
      </el-row>
      <div class="article-item" v-for="item in list" :key="item.id.toString()">
          <!-- 左侧 -->
          <div class="left">
              <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
              <div class="info">
                  <span>{{item.title}}</span>
                  <!-- 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
                  <el-tag :type="item.status | filterType" class="tag">{{item.status | filterStatus}}</el-tag>
                  <span class="date">{{item.pubdate}}</span>
              </div>
          </div>
          <!-- 右侧 -->
          <div class="right">
              <span><i class="el-icon-edit"></i>修改</span>
              <span @click="delMaterial(item.id)"><i class="el-icon-delete"></i>删除</span>
          </div>
      </div>

      <!-- 分页组件 -->
      <el-row type="flex" justify="center" style="height:60px" align="middle">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="changePage">
        </el-pagination>
      </el-row>
  </el-card>

</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        status: 5, // 默认选择全部
        channels_id: null, // 默认不选择任何一个频道
        dateRange: [] // 默认日期
      },
      channels: [], // 接收频道数组
      list: [], // 接收文章列表数据
      defaultImg: require('../../assets/img/userlogo.jpg'), // 默认图片地址
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      } // 专门存放分页信息
    }
  },
  watch: {
    searchForm: {
      handler: function () {
        this.changCondition()
      },
      deep: true
    }
  },
  // 过滤器
  filters: {
    // 标签内容
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    // 删除方法
    delMaterial (id) {
      this.$confirm('是否删除文章？').then(() => {
        // 调用删除接口
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(result => {
          // 提示
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          // 重新拉取数据
          this.getConditionArticle()
        })
      })
    },

    // 改变页码方法
    changePage (newPage) {
      this.page.currentPage = newPage // 最新页码
      this.getConditionArticle() // 调用获取文章数据
    },

    // 改变搜索条件
    changCondition () {
      this.page.currentPage = 1 // 添加搜索条件后强制重置到第一页
      this.getConditionArticle() // 调用获取文章数据
    },
    // 将条件改变时的params封装
    getConditionArticle () {
      let params = {
        page: this.page.currentPage, // 当前页码
        per_page: this.page.pageSize, // 每页数量
        status: this.searchForm.status === 5 ? null : this.searchForm.status, // 因为5是前端自己定义的所有要改为null
        channel_id: this.searchForm.channels_id, // 分类
        begin_pubdate: this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null, // 开始时间
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null // 截止时间
      }
      this.getArticles(params)
    },

    // 获取所有的频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 获取文章列表数据
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results // 获得文章列表数据
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getChannels() // 获取文章数据
    this.getArticles({ page: 1, per_page: 10 }) // 获取文章列表数据
  }
}
</script>

<style lang="less" scoped>
    .articles{
        .total{
            height: 60px;
            border-bottom: 1px dashed #ccc;
        }
        .article-item{
            display: flex;
            justify-content: space-between;
            padding: 20px 0;
            border-bottom: 1px solid #f2f3f5;
            .left{
                display: flex;
                img{
                    width: 180px;
                    height: 100px;
                    border-radius: 5px;
                }
                .info{
                    height: 100px;
                    margin-left: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .date{
                        color: #999;
                        font-size: 12px;
                    }
                    .tag{
                        text-align: center;
                        width: 60px;
                    }
                }
            }
            .right{
                span{
                    font-size: 14px;
                    margin-right: 8px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
