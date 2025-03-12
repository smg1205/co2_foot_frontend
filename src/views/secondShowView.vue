<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";

const charts = ref([]);
const currentData = ref(Array(4).fill([]));
const currentDay = ref(Array(4).fill('1/1'));

const chartConfigs = [
  {
    indicators: ['N20', 'CH4', 'CO2'],
    colors: ['#91cc75', '#5470C6', '#EE6666'],
    lineStyles: ['solid', 'dashed', 'dotted']
  },
  {
    indicators: ['电耗', '热耗', '物耗'],
    colors: ['#73c0de', '#3ba272', '#fc8452'],
    lineStyles: ['solid', 'dashed', 'dotted']
  },
  {
    indicators: ['N20', 'CH4', 'CO2'],
    colors: ['#91cc75', '#5470C6', '#EE6666'],
    lineStyles: ['solid', 'dashed', 'dotted']
  },
  {
    indicators: ['电耗', '热耗', '物耗'],
    colors: ['#73c0de', '#3ba272', '#fc8452'],
    lineStyles: ['solid', 'dashed', 'dotted']
  }
];

const titles = [
  'N20、CH4、CO2随时间的变化趋势',
  '电耗、热耗、物耗随时间的变化趋势',
  'N20、CH4、CO2随污水处理量的变化趋势',
  '电耗、热耗、物耗随污水处理量的变化趋势',
];

const generateDailyData = () => {
  return Array.from({ length: 365 }, () => Math.floor(Math.random() * 50) + 10);
};

const getDaysInMonth = (month) => {
  return new Date(2023, month, 0).getDate();
};

const generateDaysArray = () => {
  const days = [];
  for (let month = 1; month <= 12; month++) {
    const daysInMonth = getDaysInMonth(month);
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(`${month}/${day}`);
    }
  }
  return days;
};

const initDynamicChart = (index) => {
  if (!charts.value[index]) return;
  const myChart = echarts.init(charts.value[index]);
  const config = chartConfigs[index];

  const fullData = config.indicators.map(() => generateDailyData());
  const days = generateDaysArray();

  let startIndex = 0;
  let currentDataArray = fullData.map(data => data.slice(startIndex, startIndex + 30));
  let currentDays = days.slice(startIndex, startIndex + 30);

  const option = {
    tooltip: { trigger: "axis" },
    legend: { data: config.indicators, bottom: 0 },
    xAxis: { type: "category", data: currentDays },
    yAxis: { type: "value" },
    grid: { top: 50, bottom: 50, left: 45, right: 20 },
    series: config.indicators.map((indicator, i) => ({
      name: indicator,
      type: 'line',
      data: currentDataArray[i],
      itemStyle: { color: config.colors[i] },
      lineStyle: { type: config.lineStyles[i] }
    }))
  };

  myChart.setOption(option);

  const interval = setInterval(() => {
    startIndex = (startIndex + 1) % (days.length - 30);
    currentDataArray = fullData.map(data => data.slice(startIndex, startIndex + 30));
    currentDays = days.slice(startIndex, startIndex + 30);

    myChart.setOption({
      xAxis: { data: currentDays },
      series: config.indicators.map((_, i) => ({ data: currentDataArray[i] }))
    });

    currentData.value[index] = currentDataArray.map(data => data[data.length - 1]);
    currentDay.value[index] = currentDays[currentDays.length - 1];

  }, 1000);

  onUnmounted(() => clearInterval(interval));

  window.addEventListener("resize", myChart.resize);
  return myChart;
};

onMounted(() => {
  charts.value.slice(0, 4).forEach((_, index) => initDynamicChart(index));
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
      <div class="top-section">
        <div
            class="chart-card"
            v-for="(title, index) in titles"
            :key="index"
        >
          <p class="chart-title">{{ title }}</p>
          <div class="chart-container" ref="charts"></div>
          <div class="max-value">
            <p class="current-day">{{ currentDay[index] }}</p>
            <span v-for="(indicator, i) in chartConfigs[index].indicators" :key="i" class="indicator">
              {{ indicator }}（MAX）：{{ currentData[index][i] || 0 }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.container {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.dashboard {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.top-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.chart-card {
  background: white;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 300px;
  position: relative;
}

.chart-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

.chart-container {
  flex: 1;
  width: 100%;
  min-height: 150px;
}

.max-value {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
}

.current-day {
  font-size: 14px;
  color: #555;
  margin-bottom: 4px;
  text-align: center;
}

.indicator {
  font-size: 10px;
  color: #333;
  margin-bottom: 2px;
  text-align: center;
}

@media (max-width: 768px) {
  .top-section {
    grid-template-columns: 1fr;
  }
}
</style>
