<template>
  <el-card>
      <!-- 面包屑 -->
      <bread-crumb slot="header">
        <template slot="title">评论管理</template>
      </bread-crumb>
      <!-- 表格 -->
      <el-table :data="list">
          <el-table-column prop="title" label="标题" width="600"></el-table-column>
          <el-table-column :formatter="formatterBoolean" prop="comment_status" label="评论状态"></el-table-column>
          <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
          <el-table-column label="操作">
              <!-- 作用域插槽 -->
              <template slot-scope="obj">
                <el-button size="small" type="text">修改</el-button>
                <!-- 根据状态来判断评论是否打开或关闭 -->
                <el-button @click="openOrCloseState(obj.row)" size="small" type="text">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
              </template>
          </el-table-column>
      </el-table>

      <!-- 分页 -->
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
      list: [], // 定义一个数据接收返回的结果
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      } // 专门存放分页信息
    }
  },
  methods: {
    // 页码改变事件
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },

    // 获取评论信息
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count // 总条数
      })
    },
    formatterBoolean (row, colum, cellValue, index) {
      // row当前行数据  colum当前列信息  cellValue当前单元格的值  index索引
      return cellValue ? '正常' : '关闭'
    },

    // 打开或关闭评论
    openOrCloseState (row) {
      let mess = row.comment_status ? '关闭' : '开启'
      this.$confirm(`此操作将${mess}评论，是否进行此操作?`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(result => {
          // 执行成功
          this.getComment()
        })
      })
    }
  },

  // 钩子函数调用
  created () {
    this.getComment() // 获取评论数据
  }
}
</script>

<style>

</style>
