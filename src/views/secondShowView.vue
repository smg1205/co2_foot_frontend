<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";

const charts = ref([]);

// 图表配置
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
  'n20、CH4、CO2随时间的变化趋势',
  '电耗、热耗、物耗随时间的变化趋势',
  'N20、CH4、CO2随污水处理量的变化趋势',
  '电耗、热耗、物耗随污水处理量的变化趋势',
  '本月主要物质浓度',
  '低碳评价',
  'deepseek的建议'
];
const adviceTemplates = {
  excellent: {
    score: [90, 100],
    template: `👍 优秀运营状态建议：
    1. 保持当前药剂投加量（COD去除率稳定在{COD}%）
    2. 建议每日{time}进行设备预防性维护
    3. 本月可尝试节能模式运行（预计节省{save}%）`
  },
  good: {
    score: [75, 89],
    template: `✨ 良好运营建议：
    1. 优化曝气时间（当前峰值在{peak}时段）
    2. 调整碳源投加量（建议减少{reduce}%）
    3. 检查污泥浓度（当前MLSS：{mlss}g/L）`
  },
  average: {
    score: [60, 74],
    template: `⚠️ 改进建议：
    1. 立即检查{device}运行状态
    2. 建议增加化验频次（当前检测间隔：{interval}小时）
    3. 考虑药剂替换方案（当前{chemical}效率下降）`
  }
};
const lowCarbonScore = ref(85); // 初始分数
const getScoreColor = () => {
  if (lowCarbonScore.value >= 90) return '#52c41a'; // 绿色
  if (lowCarbonScore.value >= 60) return '#1890ff'; // 蓝色
  return '#ff4d4f'; // 红色
};

// 生成每日数据（365 天）
const generateDailyData = () => {
  return Array.from({ length: 365 }, () => Math.floor(Math.random() * 50) + 10);
};

// 初始化动态图表
const initDynamicChart = (index) => {
  if (!charts.value[index]) return;
  const myChart = echarts.init(charts.value[index]);
  const config = chartConfigs[index];

  // 生成 365 天的数据
  const fullData = config.indicators.map(() => generateDailyData());
  const days = Array.from({ length: 365 }, (_, i) => `第${i + 1}天`);

  // 初始显示前 30 天的数据
  let startIndex = 0;
  let currentData = fullData.map(data => data.slice(startIndex, startIndex + 30));
  let currentDays = days.slice(startIndex, startIndex + 30);

  const option = {
    tooltip: { trigger: "axis" },
    legend: { data: config.indicators, bottom: 0 },
    xAxis: { type: "category", data: currentDays },
    yAxis: { type: "value" },
    grid: { top: 30, bottom: 50, left: 45, right: 20 },
    series: config.indicators.map((indicator, i) => ({
      name: indicator,
      type: 'line',
      data: currentData[i],
      itemStyle: { color: config.colors[i] },
      lineStyle: { type: config.lineStyles[i] }
    }))
  };

  myChart.setOption(option);

  // 动态更新数据
  const interval = setInterval(() => {
    startIndex = (startIndex + 1) % 336; // 365 - 30 = 335，确保不越界
    currentData = fullData.map(data => data.slice(startIndex, startIndex + 30));
    currentDays = days.slice(startIndex, startIndex + 30);

    myChart.setOption({
      xAxis: { data: currentDays },
      series: config.indicators.map((_, i) => ({ data: currentData[i] }))
    });
  }, 1000); // 每秒更新一次

  // 清理定时器
  onUnmounted(() => clearInterval(interval));

  window.addEventListener("resize", myChart.resize);
  return myChart;
};

// ... existing code for monthly chart and DeepSeek advice ...

onMounted(() => {
  // 初始化前四个图表
  charts.value.slice(0, 4).forEach((_, index) => initDynamicChart(index));

  // 初始化本月物质浓度图表
  const monthlyChartEl = charts.value[4];
  if (monthlyChartEl) {
    initMonthlyChart(monthlyChartEl);
  }
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
      <!-- 上层四个图表 -->
      <div class="top-section">
        <div
            class="chart-card"
            v-for="(title, index) in titles.slice(0,4)"
            :key="index"
        >
          <p class="chart-title">{{ title }}</p>
          <div ref="charts" class="chart-container"></div>
        </div>
      </div>

      <!-- 下层三个图表 -->
      <div class="bottom-section">
        <div
            class="chart-card"
            v-for="(title, index) in titles.slice(4)"
            :key="index+4"
        >
          <p class="chart-title">{{ title }}</p>
          <div v-if="index === 2" class="chart-container">
            <p>评价按照分数范围生成。</p>
            <p>{{ deepSeekAdvice }}</p>
          </div>
          <div v-else ref="charts" class="chart-container">
            <p v-if="index === 1">低碳评价包含低碳运行评价分数和碳排放强度核算两个指标。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 保持原有样式不变 */
.container {
  width: 98%;
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

.bottom-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.chart-card {
  background: white;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
  height: 200px;
  display: flex;
  flex-direction: column;
}

.chart-title {
  font-size: 16px;
  margin-bottom: 8px;
  flex-shrink: 0;
}

.chart-container {
  flex: 1;
  width: 100%;
  min-height: 150px;
}

@media (max-width: 768px) {
  .top-section {
    grid-template-columns: 1fr;
  }

  .bottom-section {
    grid-template-columns: 1fr;
  }

  .chart-card {
    height: auto;
  }
}
</style>