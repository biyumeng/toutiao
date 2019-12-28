<template>
  <el-card v-loading="loading">
      <bread-crumb slot="header">
        <template slot="title">发布文章</template>
      </bread-crumb>
      <!-- 容器 -->
      <el-form ref="publistForm" :model="formData" :rules="publistRules" style="margin-left:20px" label-width="100px">
          <el-form-item prop="title" label="标题">
              <el-input v-model="formData.title" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item prop="content" label="内容">
              <quill-editor
              v-model="formData.content"
              type="textarea"
              style="height:300px"></quill-editor>
          </el-form-item>
          <el-form-item style="margin-top:120px" prop="cover" label="封面">
              <el-radio-group @change="changeType" v-model="formData.cover.type">
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>
                  <el-radio :label="0">无图</el-radio>
                  <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <!-- 封面组件 -->
          <cover-image @selectTwoImg="receiveImg" :list="formData.cover.images"></cover-image>
          <el-form-item prop="channel_id" label="频道">
              <el-select v-model="formData.channel_id">
                  <el-option v-for="item in channels" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button @click="publistArticle(false)" type="primary">发布</el-button>
              <el-button @click="publistArticle(true)">存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      channels: [], // 接收频道数组
      formData: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 放置封面地址
        },
        channel_id: null // 频道id 默认没id
      },
      publistRules: {
        // 校验规则 title，content，channel_id 必填
        title: [{ required: true, message: '文章不能为空' }, { min: 5, max: 30, message: '标题长度在5-30字符之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
      }
    }
  },
  watch: {
    // 处理了 两个地址对应同一组件 组件没消毁 数据也没重置问题
    $route: function (to, from) {
      if (to.params.articleId) {
        // 是修改

      } else {
        // 是发布
        this.formData = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
            images: [] // 放置封面地址
          },
          channel_id: null // 频道id 默认没id
        }
      }
    }
    // 监听封面改变
    // 'formData.cover.type': function () {
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //     this.formData.cover.images = [] // 无图或自动
    //   } else if (this.formData.cover.type === 1) {
    //     this.formData.cover.images = [''] // 单图
    //   } else if (this.formData.cover.type === 3) {
    //     this.formData.cover.images = ['', '', ''] // 三图
    //   }
    // }
  },
  methods: {
    // 接收子组件数据
    receiveImg (url, index) {
      // 现在拿到的url地址 还要拿到下标
      // 但是要改的是数组
      // this.formData.cover.images[index] = url //  这种写法 错误!!!!! 不能保证每次都成功
      // 响应式数据 => 数据变化 => 视图变化
      // 数据变化 =>vuejs => 检测到了数据变化 =>vuejs 对于数组的检测变化 不能通过索引来处理
      // Vuejs会检测到 新数组 替换原数组 => 进行响应式更新
      // this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
      //   if (index === i) {
      //     // 说明找到了要替换的地址
      //     return url
      //   }
      //   // 如果没找到 要直接返回原来的数据
      //   return item
      // })
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)
    },
    // 绑定change 监听封面改变
    changeType () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = [] // 无图或自动
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // 单图
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // 三图
      }
    },
    // 获取所有的频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 发布文章
    publistArticle (draft) {
      this.$refs.publistForm.validate(isOK => {
        if (isOK) {
          let { articleId } = this.$route.params // 获取动态路由参数
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft }, // 查询参数
            data: this.formData // 请求体参数
          }).then(() => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            // 跳转到文章列表页
            this.$router.push('/home/articles')
          })

        //   if (articleId) {
        //     // 修改文章接口
        //     this.$axios({
        //       url: `/articles/${articleId}`,
        //       method: 'put',
        //       params: { draft }, // 查询参数
        //       data: this.formData // 请求体参数
        //     }).then(() => {
        //       this.$message({
        //         type: 'success',
        //         message: '保存成功'
        //       })
        //       // 跳转到文章列表页
        //       this.$router.push('/home/articles')
        //     })
        //   } else {
        //   // 调用发布接口
        //     this.$axios({
        //       url: '/articles',
        //       method: 'post',
        //       params: { draft }, // 查询参数
        //       data: this.formData // 请求体参数
        //     }).then(() => {
        //       this.$message({
        //         type: 'success',
        //         message: '保存成功'
        //       })
        //       // 跳转到文章列表页
        //       this.$router.push('/home/articles')
        //     })
        //   }
        }
      })
    },
    // 通过id查询文章数据
    getarticleById (articleId) {
      this.loading = true
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.loading = false
        this.formData = result.data // 将数据赋值data
      })
    }
  },
  created () {
    this.getChannels()
    let { articleId } = this.$route.params // 获取动态路由参数
    articleId && this.getarticleById(articleId)
  }
}
</script>

<style>

</style>
