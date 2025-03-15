<script setup>
import { onMounted, onUnmounted } from 'vue'
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
      text: '去除单位化学需氧量的耗电量',
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
      text: '处理单位污水产生绝干污泥量',
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

// 初始化中国地图
let mapChart = null
const initChinaMap = () => {
  const dom = document.getElementById('chinaMap')
  if (!dom) return

  // 动态加载地图数据
  fetch('/map-data/china.json')
      .then(response => response.json())
      .then(chinaJSON => {
        echarts.registerMap('china', chinaJSON)

        mapChart = echarts.init(dom)
        const option = {
          title: {
            text: '中国地图数据展示',
            left: 'center',
            textStyle: {
              color: '#333'
            }
          },
          geo: {
            map: 'china',
            roam: true, // 允许缩放拖动
            label: {
              show: true,
              color: '#4D4D4D'
            },
            itemStyle: {
              areaColor: '#F0F8FF',
              borderColor: '#2973BB',
              borderWidth: 1
            },
            emphasis: {
              label: {
                color: 'white'
              },
              itemStyle: {
                areaColor: '#2973BB'
              }
            }
          },
          series: [{
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: [ // 改为二维数组格式
              [114.52, 38.05, 120, '石家庄'], // 河北省会
              [116.46, 39.92, 100, '北京'],
              [121.48, 31.22, 90, '上海'],
              [113.23, 23.16, 80, '广州'],
              [117.20, 39.08, 95, '天津'],
              [106.55, 29.57, 85, '重庆'],
              [126.63, 45.75, 75, '哈尔滨'],
              [125.32, 43.90, 70, '长春'],
              [123.43, 41.80, 65, '沈阳'],
              [111.65, 40.82, 60, '呼和浩特'],
              [112.55, 37.87, 55, '太原'],
              [113.62, 34.75, 50, '郑州'],
              [108.93, 34.27, 45, '西安'],
              [103.82, 36.06, 40, '兰州'],
              [101.77, 36.62, 35, '西宁']
            ],
            encode: { // 调整编码映射
              lng: 0,    // 第一列为经度
              lat: 1,    // 第二列为纬度
              value: 2,  // 第三列为数值
              tooltip: 3 // 第四列为提示信息
            },
            rippleEffect: {
              brushType: 'stroke',
              scale: 4
            }
          }]
        }
        mapChart.setOption(option)
      })
}

// 自适应大小
const resizeHandler = () => {
  mapChart?.resize()
}

onMounted(() => {
  initChinaMap()
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler)
  mapChart?.dispose()
})
const backImg = "/src/static/img_1.png";

</script>

<template>
  <!-- 新增顶部栏 -->
  <div class="container" :style="{backgroundImage: `url(${backImg})`}">
    <div class="top-bar">
      <div v-for="n in 5" :key="n" class="indicator">
        指标 {{ n }}
      </div>
    </div>

    <div class="content-container">
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
        <div class="center-top-container">
          <div id="chinaMap" class="map-chart"></div>
        </div>

        <div class="center-bottom-container">
          <div class="scroller">
            <a href="https://baijiahao.baidu.com/s?id=1720542580856660031" class="link-item">
              碳循环的基本概念与原理
            </a>
            <a href="https://www.sohu.com/a/736656508_121124020" class="link-item">
              “双碳”科普——基础知识篇
            </a>
            <a href="https://www.endress.com.cn/zh/sustainability-solutions" class="link-item">
              工业领域的可持续发展解决方案
            </a>
            <a href="https://sdxw.iqilu.com/share/YS0yMS0xMzIzNjIwOQ%3D%3D.html" class="link-item">
              碳达峰碳中和知识科普
            </a>
            <a href="https://sthjj.wenzhou.gov.cn/art/2022/4/27/art_1317648_58871462.html" class="link-item">
              碳达峰碳中和知识科普
            </a>
            <a href="https://www.bilibili.com/video/BV16C4y127r4/?vd_source=2aba2a89a6ca10511b4f4eebb2808bdd" class="link-item">
              双碳小知识——碳排放
            </a>
            <a href="https://www.chinacaj.net/news/56799.html" class="link-item">
              碳循环，你要知道的科普小知识
            </a>
            <a href="https://rcees.cas.cn/kx/kxpj/kpwz/200911/t20091108_6825855.html" class="link-item">
              碳循环和CO2排放
            </a>
            <a href="https://sisd.org.cn/express/express617.html" class="link-item">
              双碳科普
            </a>
            <a href="https://xn--6oq29spurowlws4a.cn/lore.html" class="link-item">
              碳汇基础知识
            </a>
          </div>
        </div>
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
  </div>

</template>

<style scoped>
/* 新增顶部栏样式 */
.top-bar {
  height: 80px;
  width: 90vw;
  display: flex;
  gap: 15px;
  padding: 30px 20px 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.indicator {
  flex: 1;
  background-color: rgba(4, 2, 2, 0.5);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #606266;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
  transition: transform 0.2s;
}

.indicator:hover {
  transform: translateY(-2px);
  background-color: rgb(83, 184, 187);
  box-shadow: 0 4px 8px rgba(136, 136, 136, 0.12);
}

.content-container {
  height: calc(100vh - 80px);
  display: flex;
  width: 90vw;
}

.left-container {
  width: 30vw;
  float: left;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

.center-container {
  float: left;
  width: 40vw;
  height: 100%;
  box-sizing: border-box;

  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 右侧容器：宽30vw，高100vh */
.right-container {
  width: 30vw;
  float: right;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

/* 左侧每个图表区域：占满父容器宽度(100%)，高度各占1/3 */
.l1-container,
.l2-container,
.l3-container {
  width: 98%;
  height: 33.33%;
  box-sizing: border-box;
  border-bottom: 1px solid #fff;
  transition: transform 0.3s, background 0.3s;
}
.l1-container:hover,
.l2-container:hover,
.l3-container:hover {
  background: rgba(246, 244, 244, 0.5);
  transform: translateY(-5px); /* 鼠标悬停时上移5px，产生向前突起效果喵~ */
}

.r3-container{
  text-align: center;
  color: #fff;
  width: 100%;
  height: 33.33%;
  box-sizing: border-box;
  border-bottom: 1px solid #fff;
  transition: transform 0.3s, background 0.3s;
}
/* 右侧每个图表区域：同理占满父容器宽度、高度各占1/3 */
.r1-container,
.r2-container {
  width: 100%;
  height: 33.33%;
  box-sizing: border-box;
  border-bottom: 1px solid #fff;
  transition: transform 0.3s, background 0.3s;
}
.r1-container:hover,
.r2-container:hover,
.r3-container:hover {
  background: rgba(150, 150, 150, 0.5);
  transform: translateY(-5px); /* 鼠标悬停时上移5px，产生向前突起效果喵~ */
}

/* 图表本身铺满父容器 */
.chart {
  width: 100%;
  height: 100%;
}



.center-top-container {
  flex: 2;
  height: 100%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  padding: 10px;
}

.map-chart {
  width: 100%;
  height: 100%;
}


.center-bottom-container {
  flex: 1;
  overflow: hidden; /* 隐藏溢出内容 */
  position: relative;
  background: #f5f7fa; /* 更柔和的背景色 */
  border-radius: 8px; /* 圆角 */
  padding: 15px 0;
}

.scroller {
  position: absolute;
  width: 100%;
  animation: scroll 20s linear infinite; /* 控制滚动速度 */
}

.scroller:hover {
  animation-play-state: paused; /* 悬停暂停 */
}

@keyframes scroll {
  0% { transform: translateY(0); }
  100% { transform: translateY(-60%); } /* 控制滚动幅度 */
}

.link-item {
  display: block;
  padding: 12px 20px;
  margin: 8px 15px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: #409eff;
  text-decoration: none;
  transition: all 0.3s;
}

.link-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  color: #337ecc;
}
</style>
