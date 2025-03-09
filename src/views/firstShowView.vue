<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";

const charts = ref([]);

// 图表类型配置
const chartConfigs = [
  { type: 'line', smooth: true },   // NO2
  { type: 'line', smooth: false },  // CH4（将特殊处理）
  { type: 'bar' },                  // CO2
  { type: 'line', smooth: true },   // 物耗（絮凝剂）
  { type: 'line', smooth: false },  // 电耗
  { type: 'line', smooth: true },   // 热耗
  { type: 'line', smooth: true }    // 物耗（碳源）
];

const generateData = () => {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 50) + 10);
};

const initChart = (index) => {
  if (!charts.value[index]) return;
  const myChart = echarts.init(charts.value[index]);
  const config = chartConfigs[index];

  // 生成完整12个月数据
  const fullData = generateData();
  const months = ["1月","2月","3月","4月","5月","6月",
    "7月","8月","9月","10月","11月","12月"];

  // CH4特殊处理逻辑
  if (index === 1 || index === 4 || index === 5) {
    let startIndex = 0;
    let currentData = fullData.slice(0, 6);
    let currentMonths = months.slice(0, 6);

    // 定时更新数据
    const interval = setInterval(() => {
      startIndex = (startIndex + 1) % 7;  // 保证在0-6之间循环
      currentData = fullData.slice(startIndex, startIndex + 6);
      currentMonths = months.slice(startIndex, startIndex + 6);

      myChart.setOption({
        xAxis: { data: currentMonths },
        series: [{ data: currentData }]
      });
    }, 1500);

    // 清理定时器
    onUnmounted(() => clearInterval(interval));
  }

  const option = {
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: index === 1 ? months.slice(0, 6) : months
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 80,
      interval: 20,
      axisLabel: { margin: 8 }
    },
    grid: {
      top: 30,
      bottom: 25,
      left: 45,
      right: 20
    },
    series: [{
      ...config,
      data: index === 1 ? fullData.slice(0, 6) : fullData,
      itemStyle: {
        color: config.type === 'bar' ? '#5470c6' : '#91cc75'
      }
    }]
  };

  myChart.setOption(option);
  window.addEventListener("resize", myChart.resize);
  return myChart;
};

onMounted(() => {
  charts.value.forEach((_, index) => initChart(index));
});

onUnmounted(() => {
  charts.value.forEach(chartEl => {
    echarts.getInstanceByDom(chartEl)?.dispose();
  });
});
</script>

<template>
  <div class="container">
    <div class="dashboard">
      <div class="chart-card" v-for="(title, index) in [
        'NO2直接碳排放',
        'CH4直接碳排放',
        'CO2直接碳排放',
        '物耗（絮凝剂）碳排放量',
        '电耗碳排放强度',
        '热耗碳排放强度',
        '物耗（碳源）碳排放量'
      ]" :key="index">
        <p class="chart-title">{{ title }}</p>
        <div ref="charts" class="chart-container"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 保持原有样式不变 */
.container {
  width: 98%;
  padding: 10px;
}

.dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 20px;
}

.chart-card {
  background: white;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}

.chart-title {
  font-size: 16px;
  margin-bottom: 8px;
}

.chart-container {
  width: 100%;
  height: 150px;
}
</style>