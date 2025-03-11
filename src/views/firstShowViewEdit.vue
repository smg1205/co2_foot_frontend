<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'

// 左侧图表1：处理单位污水的耗电量喵~
function initChartL1() {
  const el = document.getElementById('l1Chart')
  if (!el) return
  const myChart = echarts.init(el)
  const option = {
    title: {
      text: 'NO2直接碳排放',
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

// 左侧图表2：去除单位化学需氧量产生绝干污泥量喵~
function initChartL2() {
  const el = document.getElementById('l2Chart')
  if (!el) return
  const myChart = echarts.init(el)
  const option = {
    title: {
      text: 'CH4直接碳排放',
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

// 左侧图表3：化学需氧量去除率喵~
function initChartL3() {
  const el = document.getElementById('l3Chart')
  if (!el) return
  const myChart = echarts.init(el)
  const option = {
    title: {
      text: 'CO2直接碳排放',
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
// 右侧图表1：物耗（絮凝剂）碳排放量（曲线图）喵~
function initChartR1() {
  const el = document.getElementById('r1Chart')
  if (!el) return
  const myChart = echarts.init(el)
  const option = {
    title: {
      text: '物耗（絮凝剂）碳排放量',
      left: 'center',
      textStyle: { fontSize: 14 }
    },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
    yAxis: { type: 'value' },
    series: [{
      data: [100, 120, 110, 130, 90, 150, 140],
      type: 'line',
      smooth: true
    }]
  }
  myChart.setOption(option)
}

// 右侧图表2：电耗碳排放强度（曲线图）喵~
function initChartR2() {
  const el = document.getElementById('r2Chart')
  if (!el) return
  const myChart = echarts.init(el)
  const option = {
    title: {
      text: '电耗碳排放强度',
      left: 'center',
      textStyle: { fontSize: 14 }
    },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
    yAxis: { type: 'value' },
    series: [{
      data: [80, 95, 85, 100, 75, 110, 105],
      type: 'line',
      smooth: true
    }]
  }
  myChart.setOption(option)
}

// 右侧图表3：热耗碳排放强度（曲线图）喵~
function initChartR3() {
  const el = document.getElementById('r3Chart')
  if (!el) return
  const myChart = echarts.init(el)
  const option = {
    title: {
      text: '热耗碳排放强度',
      left: 'center',
      textStyle: { fontSize: 14 }
    },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
    yAxis: { type: 'value' },
    series: [{
      data: [60, 70, 65, 80, 55, 90, 85],
      type: 'line',
      smooth: true
    }]
  }
  myChart.setOption(option)
}

// 右侧图表4：物耗（碳源）碳排放量（柱状图）喵~
function initChartR4() {
  const el = document.getElementById('r4Chart')
  if (!el) return
  const myChart = echarts.init(el)
  const option = {
    title: {
      text: '物耗（碳源）碳排放量',
      left: 'center',
      textStyle: { fontSize: 14 }
    },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
    yAxis: { type: 'value' },
    series: [{
      data: [200, 180, 220, 210, 190, 230, 205],
      type: 'bar'
    }]
  }
  myChart.setOption(option)
}
// 页面加载后初始化所有图表喵~
onMounted(() => {
  // 左侧图表喵~
  initChartL1()
  initChartL2()
  initChartL3()
  // 右侧图表喵~
  initChartR1()
  initChartR2()
  initChartR3()
  initChartR4()
})
</script>

<template>
  <div class="container">
    <div class="left-container">
      <div class="l1-container">
        <span id="l1Chart" class="chart"></span>
        <span id="l2Chart" class="chart"></span>
      </div>
      <div class="l2-container">
        <div id="l3Chart" class="chart"></div>
      </div>
    </div>
    <div class="right-container">
      <div class="grid-item">
        <div id="r1Chart" class="chart"></div>
      </div>
      <div class="grid-item">
        <div id="r2Chart" class="chart"></div>
      </div>
      <div class="grid-item">
        <div id="r3Chart" class="chart"></div>
      </div>
      <div class="grid-item">
        <div id="r4Chart" class="chart"></div>
      </div>
    </div>
    <div class="footer-container">

    </div>
  </div>
</template>


<style scoped>
.container {
  width: 95vw;
  height: 100vh;
  box-sizing: border-box;
  margin: 0;
  padding-top: 3vh;
}

.left-container {
  border-radius: 5px;
  background: rgba(100, 100, 100, 0.3);
  width: 45vw;
  float: left;
  height: 59vh;
  box-sizing: border-box;
  overflow: hidden;
  transition: transform 0.3s ease, background 0.3s ease; /* 添加过渡效果喵~ */
}

.left-container:hover {
  background: rgba(100, 100, 100, 0.5);
  transform: translateY(-5px); /* 鼠标悬停时上移5px，产生向前突起效果喵~ */
}

.right-container {
  /* 修改为flex列布局 */
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: rgb(92, 212, 102);
  width: 48vw;
  height: 59vh;
  float: right;
  box-sizing: border-box;
  overflow: hidden;
  transition: transform 0.3s ease, background 0.3s ease;
}


.right-container:hover {
  background: #40af5f;
  transform: translateY(-5px);
}

.grid-item {
  /* 每个项目占25%高度 */
  flex: 0 0 25%;
  box-sizing: border-box;
  position: relative; /* 为图表定位提供基准 */
}
/* 确保图表填满容器 */
.chart {
  width: 100%;
  height: 100%;
  padding: 10px; /* 添加适当内边距 */
  box-sizing: border-box;
}
.l1-container {
  padding-top: 20px;
  width: 95%;
  overflow: hidden;
  height: 45%;
  box-sizing: border-box;
}
.l2-container {
  width: 95%;
  height: 50%;
  text-align: center;
  align-items: center;
  box-sizing: border-box;
}

.l1-container .chart {
  float: left;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
}

/* l2-container 内的 .chart：取消浮动，宽度100%，占满整个容器喵~ */
.l2-container .chart {
  float: none;
  width: 90%;
  height: 100%;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
