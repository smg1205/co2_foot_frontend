<script setup>
import gsap from 'gsap'
import {onMounted, reactive, ref, watch} from 'vue'  // 导入 onMounted 喵~
import * as echarts from 'echarts'  // 导入 ECharts 喵~
import { ElMessage, ElMessageBox } from "element-plus"  // 导入 Element Plus 组件喵~
import { useCh4Store } from "@/libs/CH4FirstStore.js"
import {useHeatStore} from "@/libs/HeatFirstStore.js";
import {useEleStore} from "@/libs/EleFirstStore.js";
import {useNO2Store} from "@/libs/NO2FirstStore.js";
import {useCO2Store} from "@/libs/CO2FirstStore.js";
import {useObjectStore} from "@/libs/ObjectCarbonStore.js";
import {useFlocculantStore} from "@/libs/FlocculantStore.js";
import {fetchAIData} from "@/libs/DeepSeekMsg.js";  // 导入 Pinia store 喵~

const chineseMonths = [
  '1月', '2月', '3月', '4月', '5月', '6月',
  '7月', '8月', '9月', '10月', '11月', '12月'
]  // 定义中文月份喵~

// ====== 静态图表封装函数（仅初始化，后续数据不会自动刷新）喵~
function createStaticChart(el, title, data, categories, isBar = false) {
  if (!el) return  // 如果容器不存在则退出喵~
  const myChart = echarts.init(el)  // 初始化图表实例喵~
  const maxValue = Math.floor(Math.max(...data))   // 计算当前最大值喵~

  const option = {
    title: [
      {
        text: title,
        left: 'center',
        textStyle: { fontSize: 14, color: '#fff' }
      },
      {
        id: 'max-value',
        text: 'Max: ' + maxValue,
        right: -1,
        top: 10,
        textStyle: { color: '#fff', fontSize: 14 }
      }
    ],
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      name: "月份",
      nameGap: 25,
      nameLocation: 'center',
      axisLabel: { color: '#fff', fontSize: 12 },
      nameTextStyle: { color: '#fff', fontSize: 12 },
      data: categories
    },
    yAxis: {
      type: 'value',
      name: '单位：kgCO₂/m³',
      axisLabel: { color: '#fff' },
      nameLocation: 'center',
      nameGap: 45,
      nameTextStyle: { color: '#fff', fontSize: 12 }
    },
    grid: { left: '20%', bottom: '20%', top: '15%' },
    series: [
      {
        data,
        type: isBar ? 'bar' : 'line',
        smooth: !isBar,
        ...(isBar && { barWidth: 10, itemStyle: { color: '#FFA500' } }),
        ...(!isBar && { lineStyle: { color: '#FFA500', width: 2 }, itemStyle: { color: '#FFA500' } }),
        lineStyle: { color: '#5fd24a', width: 2 },
        itemStyle: { color: '#5fd24a' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgb(95,210,74)' },
            { offset: 1, color: 'rgba(24,144,255,0.02)' }
          ])
        }
      }
    ]
  }
  myChart.setOption(option)  // 设置图表配置喵~
}

// ====== 生成从 1 月 1 日开始的初始日期（示例 10 天）喵~
function generateInitialDates() {
  let xAxisData = []
  let startDate = new Date(new Date().getFullYear(), 0, 1)  // 今年的1月1日喵~
  for (let i = 0; i < 10; i++) {
    let tempDate = new Date(startDate)
    tempDate.setDate(startDate.getDate() + i)
    xAxisData.push(`${tempDate.getMonth() + 1}/${tempDate.getDate()}`)
  }
  return xAxisData  // 返回初始日期数组喵~
}

// ====== 动态图表封装函数（定时刷新数据），增加 initialData 参数喵~
function createDynamicChart(el, title, min, max, interval,initialData = null) {
  if (!el) return;  // 容器不存在则退出喵~
  const myChart = echarts.init(el);  // 初始化图表喵~
  let xAxisData = generateInitialDates();  // 生成初始 x 轴日期喵~

  // 如果存在 initialData，就复制一份，否则使用默认数据喵~
  let yAxisData = (initialData && initialData.length > 0) ? initialData.slice() : [70, 80, 90, 85, 95, 100, 110, 100, 50, 30];
  // console.log(yAxisData)
  let currentMax = Math.max(...yAxisData);  // 计算当前数据中的最大值喵~

  let option = {
    title: [
      {
        text: title,
        left: 'center',
        textStyle: { fontSize: 14, color: '#fff' }
      },
      {
        id: 'max-value',
        text: 'Max: ' + currentMax,
        right: 10,
        top: 10,
        textStyle: { color: '#fff', fontSize: 14, fontWeight: 'bold' }
      }
    ],
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: xAxisData,
      name: '日期',
      nameLocation: 'center',
      nameGap: 25,
      axisLabel: { color: '#fff', fontSize: 12 },
      nameTextStyle: { color: '#fff', fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      name: '单位：kgCO₂/m³',
      axisLabel: { color: '#fff' },
      nameLocation: 'center',
      nameGap: 25,
      nameTextStyle: { color: '#fff', fontSize: 12 }
    },
    grid: { left: '20%', bottom: '20%', right: "", top: '15%' },
    series: [
      {
        data: yAxisData,
        type: 'line',
        smooth: true,
        showSymbol: true,
        animationDuration: 10,
        lineStyle: { color: '#5fd24a', width: 2 },
        itemStyle: { color: '#5fd24a' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgb(95,210,74)' },
            { offset: 1, color: 'rgba(24,144,255,0.02)' }
          ])
        }
      }
    ]
  };
  myChart.setOption(option);  // 设置初始配置喵~

  // 定时更新 x 轴和 y 轴数据，并刷新当前最大值喵~
  setInterval(() => {
    // 更新 x 轴：移除第一个日期，添加新日期（加一天）喵~
    let lastDateParts = xAxisData[xAxisData.length - 1].split('/');
    let newDate = new Date(new Date().getFullYear(), lastDateParts[0] - 1, lastDateParts[1]);
    newDate.setDate(newDate.getDate() + 1);
    xAxisData.shift();
    xAxisData.push(`${newDate.getMonth() + 1}/${newDate.getDate()}`);
    // 更新 y 轴：移除第一个数据，添加一条随机数据喵~
    yAxisData.push(yAxisData[0]);
    yAxisData.shift();
    // 重新计算当前显示数据的最大值喵~
    currentMax = Math.max(...(yAxisData.slice(0, 10)));

    // 更新图表配置喵~
    myChart.setOption({
      xAxis: { data: xAxisData },
      series: [{
        data: yAxisData,
        lineStyle: { color: '#5fd24a', width: 2 },
        itemStyle: { color: '#5fd24a' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgb(95,210,74)' },
            { offset: 1, color: 'rgba(24,144,255,0.02)' }
          ])
        }
      }],
      title: [
        { text: title },
        { id: 'max-value', text: 'Max: ' + currentMax, textStyle: { color: '#fff', fontSize: 14, fontWeight: 'bold' } }
      ]
    });
  }, interval);
}

// ====== 初始化各个图表的函数喵~
function initChartL1() {
  const el = document.getElementById('l1Chart')
  if (!el) return
  createStaticChart(el, 'N₂O直接碳排放', NO2Store.NO2Info, chineseMonths)
}

function initChartL2() {
  const el = document.getElementById('l2Chart')
  if (!el) return
  createStaticChart(el, 'CO₂直接碳排放', CO2Store.CO2Info, chineseMonths)
}

function initChartL3() {
  const el = document.getElementById('l3Chart')
  if (!el) return
  // 使用 Pinia store 中获取的 organicMatterFractions 作为初始数据喵~
  createDynamicChart(el, 'CH₄ 直接碳排放', 50, 100, 1000,ch4Store.organicMatterFractions)
}

function initChartR1() {
  const el = document.getElementById('r1Chart')

  if (!el) return
  createStaticChart(el, '物耗（絮凝剂）碳排放量', FloStore.flocculants, chineseMonths)
}

function initChartR2() {
  const el = document.getElementById('r2Chart')
  if (!el) return
  createStaticChart(el, '物耗（碳源）碳排放量', O2CStore.O2CInfo, chineseMonths, true)
}

function initChartR3() {
  const el = document.getElementById('r3Chart')
  if (!el) return
  createDynamicChart(el, '热耗碳排放强度', 0, 5, 1000, heatStore.standardCoalEmissionFactors)
}

function initChartR4() {
  const el = document.getElementById('r4Chart')
  if (!el) return
  createDynamicChart(el, '电耗碳排放强度', 0, 1, 1000, eleStore.electricityCarbonEmissionFactors)
}

const ch4Store = useCh4Store()  // 获取 Pinia store 实例喵~
const heatStore = useHeatStore()
const eleStore = useEleStore()

const NO2Store = useNO2Store()
const CO2Store = useCO2Store()
const FloStore = useFlocculantStore()
const O2CStore = useObjectStore()

// ====== 页面加载后先获取 CH₄ 数据，再初始化所有图表喵~
onMounted(async () => {
  await ch4Store.fetchCh4Data()  // 异步获取数据喵~
  await heatStore.fetchHeatData()
  await eleStore.fetchEleData()

  await NO2Store.fetchNO2Data()
  await CO2Store.fetchCO2Data()
  await FloStore.fetchFlocculantData()
  await O2CStore.fetchO2CData()

  // 初始化左侧图表喵~
  initChartL1()
  initChartL2()
  initChartL3()  // CH₄ 图表使用真实数据喵~
  // 初始化右侧图表喵~
  initChartR1()
  initChartR2()
  initChartR3()
  initChartR4()

})

const open = async () => {
  ElMessageBox.alert(`${await fetchAIData()}`, 'DeepSeek建议', {confirmButtonText: '好的'});
}
const mouths_number = ref(0);
const months_numbers = O2CStore.O2CInfo;
const idx = ref(0)



const tweened = reactive({
  number: 11451
})

setInterval(() => {
  idx.value = (idx.value + 1) % 12 // Move to the next number in the array
  mouths_number.value = months_numbers[idx.value] // Use .value to access and modify the ref
}, 3000)

watch(
    mouths_number,
    (n) => {
      gsap.to(tweened, { duration: 0.5, number: Number(n) || 0 })
    }
)
</script>

<template>
  <div class="container">
    <div class="main-content">
      <!-- 左侧容器喵~ -->
      <div class="left-container">
        <div style="text-align: center">
          <h3 style="color: #fff">直接碳排放</h3>
        </div>
        <div class="l1-container">
          <div id="l1Chart" class="chart"></div>
          <div id="l2Chart" class="chart"></div>
        </div>
        <div class="l2-container">
          <div id="l3Chart" class="chart"></div>
        </div>
      </div>
      <!-- 右侧容器喵~ -->
      <div class="right-container">
        <div style="text-align: center">
          <h3 style="color: #fff">间接碳排放</h3>
        </div>
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
    <!-- 底部 footer 容器喵~ -->
    <div class="footer-container">
      <transition name="fade" mode="out-in">
        <div class="calendar-box">
          <h5>&nbsp</h5>
          <h4>当前月份 物耗（碳源）碳排放强度最大</h4>
          <h4>碳排放强度：{{ Math.floor( tweened.number.toFixed(0))  }} kgCO₂/m³</h4>
        </div>
      </transition>
      <div style="color: #fff;">
        <h3>低碳运行评价</h3>
        <span class="flex-span">
          低碳运行评价分数 <span class="count">85.82(一级)</span>
          <el-tooltip effect="dark" content="上一名暂无，下一名是xxx" placement="right">
            <el-button>数据库排名第一名</el-button>
          </el-tooltip>
        </span>
        <hr>
        <span class="flex-span">
          碳排放强度核算 <span class="count"> 0.50 </span>
          <el-tooltip effect="dark" content="上一名暂无，下一名是xxx" placement="right">
            <el-button>数据库排名第一名</el-button>
          </el-tooltip>
        </span>
      </div>
      <div class="ds-container" style="color: #fff; cursor: pointer;">
        <h2 class="--ds-span" @click="open">DeepSeek建议</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-box {
  color: #fff;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  animation: fadeIn 0.5s ease-in-out;
}
/* ---- 进入动画 ---- */
.swing-in-top-fwd {
  -webkit-animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
  animation: swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}

/* ---- 退出动画 ---- */
.swing-out-top-fwd {
  -webkit-animation: swing-out-top-fwd 0.55s cubic-bezier(0.600, -0.280, 0.735, 0.045) both;
  animation: swing-out-top-fwd 0.55s cubic-bezier(0.600, -0.280, 0.735, 0.045) both;
}

/* ---- 动画关键帧 ---- */
@-webkit-keyframes swing-in-top-fwd {
  0% { transform: rotateX(-100deg); transform-origin: top; opacity: 0; }
  100% { transform: rotateX(0deg); transform-origin: top; opacity: 1; }
}

@keyframes swing-in-top-fwd {
  0% { transform: rotateX(-100deg); transform-origin: top; opacity: 0; }
  100% { transform: rotateX(0deg); transform-origin: top; opacity: 1; }
}

@-webkit-keyframes swing-out-top-fwd {
  0% { transform: rotateX(0deg); transform-origin: top; opacity: 1; }
  100% { transform: rotateX(70deg); transform-origin: top; opacity: 0; }
}

@keyframes swing-out-top-fwd {
  0% { transform: rotateX(0deg); transform-origin: top; opacity: 1; }
  100% { transform: rotateX(70deg); transform-origin: top; opacity: 0; }
}
.ds-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.--ds-span {
  color: #fff;
  display: block;
  width: 100%;
  text-align: center;
}
.flex-span {
  height: 3vh;
  text-align: center;
  align-items: center;
  width: 100%;
  padding: 8px 0;
}
.count {
  margin: 0 10px;
}
.footer-container {
  width: 96%;
  height: 50vh;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  align-items: center;
  padding: 0 2vw;
  background: rgba(0, 145, 255, 0.4);
  transition: transform 0.3s, background 0.3s;
}
.footer-container div {
  border-radius: 8px;
  flex: 1;
  height: 20vh;
  text-align: center;
  font-size: 18px;
  padding: 10px;
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
  flex-grow: 1;
  gap: 2vw;
}
.left-container {
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  height: 67vh;
  gap: 1.5vh;
  border-radius: 8px;
  padding: 1.5vh;
  background: rgba(0, 145, 255, 0.4);
  transition: transform 0.3s, background 0.3s;
}
.left-container:hover {
  transform: translateY(-5px);
}
.footer-container:hover {
  transform: translateY(-5px);
}
.right-container {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: rgba(0, 145, 255, 0.4);
  width: 55vw;
  height: 70vh;
  float: right;
  box-sizing: border-box;
  overflow: hidden;
  transition: transform 0.3s ease, background 0.3s ease;
}
.right-container:hover {
  transform: translateY(-5px);
}
.chart {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 8px;
}
.l1-container {
  padding-top: 20px;
  width: 100%;
  overflow: hidden;
  height: 50%;
  box-sizing: border-box;
}
.l1-container .chart {
  float: left;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
}
.l2-container {
  width: 100%;
  height: 50%;
  text-align: center;
  align-items: center;
  box-sizing: border-box;
}
.l2-container .chart {
  float: none;
  width: 90%;
  height: 100%;
}
.r-container {
  padding-top: 20px;
  width: 100%;
  overflow: hidden;
  height: 45%;
  box-sizing: border-box;
}
.r-container .chart {
  float: left;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
}
</style>
