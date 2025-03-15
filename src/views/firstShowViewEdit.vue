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
      text: 'CO2直接碳排放',
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

// **生成从1月1日开始的初始日期（最近7天）**
function generateInitialDates() {
  let xAxisData = []
  let startDate = new Date(new Date().getFullYear(), 0, 1) // 今年的1月1日

  // 从1月1日开始获取连续7天的日期
  for (let i = 0; i < 10; i++) {
    let tempDate = new Date(startDate)
    tempDate.setDate(startDate.getDate() + i)
    xAxisData.push(`${tempDate.getMonth() + 1}/${tempDate.getDate()}`) // 格式化日期为 "月/日"
  }

  return xAxisData
}

// **动态折线图函数**
function createDynamicChart(el, title, min, max, interval) {
  if (!el) return
  const myChart = echarts.init(el)

  let xAxisData = generateInitialDates()  // 从1月1号开始的七天数据
  // 假设这些是你从后端获取的七天数据
  let yAxisData = [70, 80, 90, 85, 95, 100, 110, 100, 50, 30]  // 你可以替换为实际数据

  const option = {
    title: { text: title, left: 'center', textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: xAxisData },
    yAxis: { type: 'value' },
    series: [{
      data: yAxisData,
      type: 'line',
      smooth: true,
      showSymbol: true,
      animationDuration: 10,
    }]
  }

  myChart.setOption(option)

  // **动态更新 x 轴日期 + y 轴数据**
  setInterval(() => {
    // 取当前最后一个日期并 +1 天
    let lastDateParts = xAxisData[xAxisData.length - 1].split('/')
    let newDate = new Date(new Date().getFullYear(), lastDateParts[0] - 1, lastDateParts[1])
    newDate.setDate(newDate.getDate() + 1)

    xAxisData.shift()
    xAxisData.push(`${newDate.getMonth() + 1}/${newDate.getDate()}`)

    // 更新 y 轴数据（模拟动态变化，这里使用随机数据替代）
    yAxisData.shift()
    yAxisData.push(Math.floor(Math.random() * (max - min)) + min)

    // 更新图表
    myChart.setOption({
      xAxis: { data: xAxisData },
      series: [{ data: yAxisData }]
    })
  }, interval)
}



// **CO2 直接碳排放**
function initChartL3() {
  createDynamicChart(
      document.getElementById('l3Chart'),
      'CH4 直接碳排放',
      50,   // 最小值 50
      100,  // 最大值 100
      1000  // 每 2 秒更新一次
  )
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
// 右侧图表4：物耗（碳源）碳排放量（柱状图）喵~
function initChartR2() {
  const el = document.getElementById('r2Chart')
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

function initChartR3() {
  createDynamicChart(
      document.getElementById('r3Chart'),
      '热耗碳排放强度',
      70,   // 最小值 70
      150,  // 最大值 150
      1000  // 每 4 秒更新一次
  )
}

function initChartR4() {
  createDynamicChart(
      document.getElementById('r4Chart'),
      '电耗碳排放强度',
      60,   // 最小值 60
      120,  // 最大值 120
      1000  // 每 3 秒更新一次
  )
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
const backImg = "/src/static/img_1.png";
</script>

<template>
  <div class="container" :style="{backgroundImage: `url(${backImg})`}">
    <div class="main-content">
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

    <div class="footer-container">
      <div style="color: #fff;">
        <h3>日历</h3>
        <h4>当前浓度最大物质</h4>
        <h4>浓度值为 </h4>
      </div>
      <div style="color: #fff;">
        <h3>低碳运行评价</h3>

        <span>
          低碳运行评价分数 <span class="count">100</span>
        </span>
        <span>
          碳排放强度核算 <span class="count">100</span>
        </span>
        <hr>
        <el-tooltip
            effect="dark"
            content="当前排名为第一名"
            placement="right"
        >
          <el-button>查看当前排名</el-button>
        </el-tooltip>

      </div>
      <div style="color: #fff;">
        <h3>deepseek</h3>
        <h3>当前暂无建议</h3>
      </div>
    </div>
  </div>
</template>


<style scoped>
.count{
  border-radius: 5px;
  background-color: #409eff;
  color: #fff;
}
.footer-container {
  width: 98%;
  height: 30vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2vw;
}

/* 让内部三个 div 均匀占据空间 */
.footer-container div {
  border-radius: 8px;
  flex: 1; /* 让 3 个 div 等宽 */
  height: 20vh;
  text-align: center; /* 文本居中 */
  font-size: 18px;
  padding: 10px; /* 添加适当的内边距 */
}

.container {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  padding: 2vh 2vw;
  height: 96vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.main-content {
  display: flex;
  flex-grow: 1; /* 让它填满除 footer 外的空间 */
  gap: 2vw;
}
.left-container {
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
  height: 67vh;
  gap: 1.5vh;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 1.5vh;
  transition: transform 0.3s, background 0.3s;
}

.left-container:hover {
  background: rgb(54, 190, 209);
  transform: translateY(-5px); /* 鼠标悬停时上移5px，产生向前突起效果喵~ */
}

.right-container {
  /* 修改为flex列布局 */
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.4);
  width: 55vw;
  height: 70vh;
  float: right;
  box-sizing: border-box;
  overflow: hidden;
  transition: transform 0.3s ease, background 0.3s ease;
}


.right-container:hover {
  background: #00ab2e;
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
  width: 100%;
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
