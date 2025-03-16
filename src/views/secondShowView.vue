<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";

const charts = ref([]);
const currentData = ref(Array(4).fill([]));
const currentDay = ref(Array(4).fill('1/1'));

const chartConfigs = [
  { indicators: ['BOD', 'COD'], colors: [' #FFFF00',' #00FFFF'], lineStyles: ['solid', 'dashed'] },
  { indicators: ['TN'], colors: ['#00FFBF'], lineStyles: ['solid'] },
  { indicators: ['N₂0', 'CH₄', 'CO₂'], colors: ['#FFD700', '#FF69B4', '#00CED1'], lineStyles: ['solid', 'dashed', 'dotted'] }, // 亮黄色、亮粉色、亮青色
  { indicators: ['电耗', '热耗', '物耗'], colors: ['#FFD700', '#FF69B4', '#00CED1'], lineStyles: ['solid', 'dashed', 'dotted'] } // 亮黄色、亮粉色、亮青色
];

const titles = [
  '好氧污染物削减量随时间的变化趋势',
  '总氮削减量随时间的变化趋势',
  'N₂0、CH₄、CO₂随污水处理量的变化趋势',
  '电耗、热耗、物耗随污水处理量的变化趋势',
];

const fixedBODCODValues = {
  BOD: { max: 201, min: 61 },
  COD: { max: 321, min: 213 }
};

const generateDailyData = () => {
  return Array.from({ length: 365 }, () => Math.floor(Math.random() * 50) + 10);
};

const generateWaterVolumeData = () => {
  return Array.from({ length: 100 }, (_, i) => i + 1);
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

  const isWaterVolumeChart = index >= 2;
  const xAxisData = isWaterVolumeChart ? generateWaterVolumeData() : generateDaysArray();

  let startIndex = 0;
  let currentDataArray = fullData.map(data => data.slice(startIndex, startIndex + 30));
  let currentXAxisData = xAxisData.slice(startIndex, startIndex + 30);

  const isBarChart = index < 2;
  const seriesType = isBarChart ? 'bar' : 'line';

  const option = {
    tooltip: { trigger: "axis" },
    legend: { data: config.indicators, bottom: 0, textStyle: { color: '#fff' } },
    xAxis: {
      type: "category",
      data: currentXAxisData,
      name: isWaterVolumeChart ? '水量 (m³)' : '日期',
      nameLocation: 'center',
      nameGap: 25,
      axisLabel: {
        color: '#fff',
        fontSize: 12
      },
      nameTextStyle: {
        color: '#fff',
        fontSize: 12
      }
    },
    yAxis: {
      type: "value",
      name: index < 2 ? '削减量 (g/d)' : '碳排放强度 (kg CO₂e)',
      nameLocation: 'center',
      nameGap: 25,
      axisLabel: {
        color: '#fff',
        fontSize: 12
      },
      nameTextStyle: {
        color: '#fff',
        fontSize: 12
      }
    },
    grid: { top: 40, bottom: 70, left: 45, right: 20 },
    series: config.indicators.map((indicator, i) => ({
      name: indicator,
      type: seriesType,
      data: currentDataArray[i],
      itemStyle: {
        color: config.colors[i],
        borderColor: '#fff',
        borderWidth: 1
      },
      barWidth: isBarChart ? 10 : null,
      lineStyle: isBarChart ? null : { type: config.lineStyles[i], width: 2 },
      smooth: !isBarChart,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: config.colors[i]
        }
      }
    }))
  };

  myChart.setOption(option);

  const interval = setInterval(() => {
    startIndex = (startIndex + 1) % (xAxisData.length - 30);
    currentDataArray = fullData.map(data => data.slice(startIndex, startIndex + 30));
    currentXAxisData = xAxisData.slice(startIndex, startIndex + 30);
    myChart.setOption({
      xAxis: { data: currentXAxisData },
      series: config.indicators.map((_, i) => ({ data: currentDataArray[i] }))
    });
    currentData.value[index] = currentDataArray.map(data => data[data.length - 1]);
    currentDay.value[index] = currentXAxisData[currentXAxisData.length - 1];
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
        <div class="chart-card" v-for="(title, index) in titles" :key="index">
          <p class="chart-title">{{ title }}</p>
          <div class="chart-container" ref="charts"></div>
          <div class="max-value">
            <template v-if="index === 0">
              <span class="indicator">BOD（MAX）：{{ fixedBODCODValues.BOD.max }}</span>
              <span class="indicator">BOD（MIN）：{{ fixedBODCODValues.BOD.min }}</span>
              <span class="indicator">COD（MAX）：{{ fixedBODCODValues.COD.max }}</span>
              <span class="indicator">COD（MIN）：{{ fixedBODCODValues.COD.min }}</span>
            </template>
            <template v-else>
              <p class="current-day">{{ currentDay[index] }}</p>
              <span v-for="(indicator, i) in chartConfigs[index].indicators" :key="i" class="indicator">
                {{ indicator }}（MAX）：{{ currentData[index][i] || 0 }}
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-size: cover;
  background-position: center;
  opacity: 0.5;
  z-index: -1;
}

.dashboard {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.top-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  height: 100%;
}

.chart-card {
  background: linear-gradient(135deg, rgba(25, 25, 112, 0.5), rgba(173, 216, 230, 0.3));
  padding: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  height: 280px;
  width: 98%;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s;
}

.chart-card:hover {
  transform: scale(1.02);
}

.chart-title {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  color: white;
}

.chart-container {
  flex: 1;
  width: 98%;
  min-height: 120px;
}

.max-value {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 80px;
}

.current-day {
  font-size: 14px;
  color: white;
  margin-bottom: 4px;
  text-align: center;
}

.indicator {
  font-size: 10px;
  color: white;
  margin-bottom: 2px;
  text-align: center;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .top-section {
    grid-template-columns: 1fr;
  }
}
</style>