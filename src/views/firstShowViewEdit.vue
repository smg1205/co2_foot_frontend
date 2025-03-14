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
      <div class="l3-container">
        <div class="box">日历</div>
        <div class="box">评价</div>
        <div class="box">deepseek</div>
      </div>
    </div>

    <div class="right-container">
      <div class="r-container">
        <div id="r1Chart" class="chart"></div>
        <div id="r2Chart" class="chart"></div>
      </div>
      <div class="r-container">
        <div id="r3Chart" class="chart"></div>
        <div id="r4Chart" class="chart"></div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  gap: 2vw;
  padding: 2vh 2vw;
  height: 96vh;
  background: #f0f0f0;
}

.left-container {
  flex: 0 0 58%;
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
  background: rgba(100, 100, 100, 0.3);
  border-radius: 8px;
  padding: 1.5vh;
  transition: transform 0.3s, background 0.3s;
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
  height: 95vh;
  float: right;
  box-sizing: border-box;
  overflow: hidden;
  transition: transform 0.3s ease, background 0.3s ease;
}


.right-container:hover {
  background: #40af5f;
  transform: translateY(-5px);
}

/* 确保图表填满容器 */
.chart {
  width: 50%;
  height: 55%;
  padding: 10px; /* 添加适当内边距 */
  box-sizing: border-box;
}
.l1-container {
  padding-top: 20px;
  width: 100%;
  overflow: hidden;
  height: 50%;
  box-sizing: border-box;
}
.r-container {
  padding-top: 20px;
  width: 95%;
  overflow: hidden;
  height: 45%;
  box-sizing: border-box;
}
.l2-container {
  width: 100%;
  height: 50%;
  text-align: center;
  align-items: center;
  box-sizing: border-box;
}
.l3-container {
  display: flex;
  justify-content: space-evenly; /* 均匀分布 */
  align-items: center; /* 垂直居中 */
  width: 100%;
  height: 30vh; /* 明确设置高度 */
  box-sizing: border-box;
  padding: 100px;
}

.box {
  width: 10vw;  /* 设置适当宽度 */
  height: 80px; /* 设置适当高度 */
  border: 2px solid #6d6d6d; /* 添加边框 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
}

.l1-container .chart {
  float: left;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
}
.r-container .chart {
  float: left;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
}
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
