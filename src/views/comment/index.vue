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
              <template slot-scope="obj">
                <el-button size="small" type="text">修改</el-button>
                <el-button size="small" type="text">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
              </template>
          </el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [] // 定义一个数据接收返回的结果
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        this.list = result.data.results
      })
    },
    formatterBoolean (row, colum, cellValue, index) {
      // row当前行数据  colum当前列信息  cellValue当前单元格的值  index索引
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment() // 获取评论数据
  }
}
</script>

<style>

</style>
