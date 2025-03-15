<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'

// 左侧三个图表
function initChartL1() {
  const el = document.getElementById('l1Chart')
  if (!el) return
  const myChart = echarts.init(el)
  const option = {
    title: {
      text: '处理单位污水的耗电量',
      left: 'center',
      textStyle: { fontSize: 14 }
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line',
        smooth: true
      }
    ]
  }
  myChart.setOption(option)
}

function initChartL2() {
  const el = document.getElementById('l2Chart')
  if (!el) return
  const myChart = echarts.init(el)
  const option = {
    title: {
      text: '去除单位化学需氧量产生绝干污泥量',
      left: 'center',
      textStyle: { fontSize: 14 }
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: [20, 30, 35, 50, 40, 60, 55],
        type: 'line',
        smooth: true
      }
    ]
  }
  myChart.setOption(option)
}

function initChartL3() {
  const el = document.getElementById('l3Chart')
  if (!el) return
  const myChart = echarts.init(el)
  const option = {
    title: {
      text: '化学需氧量去除率',
      left: 'center',
      textStyle: { fontSize: 14 }
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: [90, 92, 88, 95, 93, 91, 94],
        type: 'line',
        smooth: true,
        areaStyle: {}
      }
    ]
  }
  myChart.setOption(option)
}

// 右侧三个图表
function initChartR1() {
  const el = document.getElementById('r1Chart')
  if (!el) return
  const myChart = echarts.init(el)
  const option = {
    title: {
      text: '右侧图表1',
      left: 'center',
      textStyle: { fontSize: 14 }
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: [50, 60, 80, 70, 110, 90, 120],
        type: 'line',
        smooth: true
      }
    ]
  }
  myChart.setOption(option)
}

function initChartR2() {
  const el = document.getElementById('r2Chart')
  if (!el) return
  const myChart = echarts.init(el)
  const option = {
    title: {
      text: '右侧图表2',
      left: 'center',
      textStyle: { fontSize: 14 }
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    },
    yAxis: { type: 'value' },
    series: [
      {
        data: [100, 90, 120, 80, 70, 130, 140],
        type: 'line',
        smooth: true
      }
    ]
  }
  myChart.setOption(option)
}
// 页面加载后初始化6个图表
onMounted(() => {
  initChartL1()
  initChartL2()
  initChartL3()
  initChartR1()
  initChartR2()
})
</script>

<template>
  <div class="container">
    <div class="left-container">
      <div class="l1-container">
        <div id="l1Chart" class="chart"></div>
      </div>
      <div class="l2-container">
        <div id="l2Chart" class="chart"></div>
      </div>
      <div class="l3-container">
        <div id="l3Chart" class="chart"></div>
      </div>
    </div>

    <div class="center-container">
    </div>

    <!-- 右侧容器：再放三个图表 -->
    <div class="right-container">
      <div class="r1-container">
        <div id="r1Chart" class="chart"></div>
      </div>
      <div class="r2-container">
        <div id="r2Chart" class="chart"></div>
      </div>
      <div class="r3-container">
        <div>
            <h1>DeepSeek建议</h1>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  margin: 30px;
  padding-top: 30px;
}

.left-container {
  background: #ff6363;
  width: 30vw;
  float: left;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
}

.center-container {
  background: #b2b2b2;
  float: left;
  width: 40vw;
  height: 100vh;
  box-sizing: border-box;
}

/* 右侧容器：宽30vw，高100vh */
.right-container {
  background: #63faff;
  width: 30vw;
  float: right;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden; /* 避免子元素溢出喵~ */
}

/* 左侧每个图表区域：占满父容器宽度(100%)，高度各占1/3 */
.l1-container,
.l2-container,
.l3-container {
  width: 100%;
  height: 33.33%;
  box-sizing: border-box;
  border-bottom: 1px solid #fff;
}

/* 右侧每个图表区域：同理占满父容器宽度、高度各占1/3 */
.r1-container,
.r2-container,
.r3-container {
  width: 100%;
  height: 33.33%;
  box-sizing: border-box;
  border-bottom: 1px solid #fff;
}

/* 图表本身铺满父容器 */
.chart {
  width: 100%;
  height: 100%;
}
</style>
