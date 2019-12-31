<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">图文数据</template>
      </bread-crumb>

      <div ref="myChart" class='echarts'></div>
      <div ref="myChart2" class='echarts'></div>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    this.myChart = echarts.init(this.$refs.myChart)
    this.myChart2 = echarts.init(this.$refs.myChart2)
    this.myChart.setOption({
      title: {
        text: '测试数据'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
      }]
    })
    this.myChart2.setOption({
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '业务指标',
          type: 'gauge',
          detail: { formatter: '{value}%' },
          data: [{ value: 50, name: '完成率' }]
        }
      ]
    })
  }
}
</script>

<style lang='less' scoped>
.echarts {
     width:600px;
     height: 400px;
 }
</style>
