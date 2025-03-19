<script setup>
import {onMounted, onUnmounted, ref} from 'vue'
import * as echarts from 'echarts'
import {ElMessageBox} from "element-plus";
import {fetchAIData} from "@/libs/DeepSeekMsg.js";

const chineseMonths = [
  '1月', '2月', '3月', '4月', '5月', '6月',
  '7月', '8月', '9月', '10月', '11月', '12月'
]  // 定义中文月份喵~

// 左侧三个图表
//左一
function initChartL1() {
  const el = document.getElementById('l1Chart');
  if (!el) return;
  const myChart = echarts.init(el);

  // 原始数据
  const rawData = [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130];

  // 评价标准函数
  const getTotalGrade = (data) => {
    const maxValue = Math.max(...data);
    const avgValue = data.reduce((a, b) => a + b, 0) / data.length;

    // 双条件评价：当出现C级数据或平均超过阈值时
    if (maxValue > 150 || avgValue > 150) {
      return { grade: 'C', color: '#F5222D', desc: '能耗过高' };
    }
    if (maxValue > 80 || avgValue > 80) {
      return { grade: 'B', color: '#FAAD14', desc: '能耗正常' };
    }
    return { grade: 'A', color: '#52C41A', desc: '能耗优秀' };
  };

  // 获取总评结果
  const totalGrade = getTotalGrade(rawData);

  const option = {
    title: [{
      text: '处理单位污水的耗电量',
      left: 'center',
      textStyle: {
        fontSize: 14,
        lineHeight: 24,
        color: '#ffffff'
      },
      top: '5%'
    },
      {
        text: `总评等级：${totalGrade.grade}（${totalGrade.desc}）`,
        left: 'center',
        top: '15%',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: totalGrade.color
        }
      }],
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: chineseMonths,
      // 新增x轴颜色设置
      axisLabel: {
        color: '#fff' // x轴文字颜色
      },
      axisLine: {
        lineStyle: {
          color: '#fff' // x轴线颜色
        }
      }
    },
    yAxis: { type: 'value',// 新增y轴颜色设置
      axisLabel: {
        color: '#fff' // y轴文字颜色
      },
      axisLine: {
        lineStyle: {
          color: '#fff' // y轴线颜色
        }
      } },
    series: [{
      data: rawData,
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#5fd24a'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgb(95,210,74)' },
          { offset: 1, color: 'rgba(24,144,255,0.02)' }
        ])
      }
    }],
    // 添加总评说明
    graphic: {
      elements: [{
        type: 'text',
        left: 'center',
        top: '25%',
        style: {
          text: `评价标准：\nA级（≤80）: 优秀\nB级（81-150）: 正常\nC级（>150）: 过高`,
          fontSize: 12,
          fill: '#cad0d5',
          lineHeight: 20
        }
      }]
    }
  };

  myChart.setOption(option);
}
//右二
function initChartL2() {
  const el = document.getElementById('l2Chart');
  if (!el) return;
  const myChart = echarts.init(el);

  // 原始数据
  const rawData = [20, 30, 35, 50, 40, 60, 55, 20, 30, 35, 50, 40, 60, 55];

  // 评价标准函数（假设：A≤35kg，35<B≤50kg，C>50kg）
  const getTotalGrade = (data) => {
    const maxValue = Math.max(...data);
    const avgValue = data.reduce((a, b) => a + b, 0) / data.length;

    // 双条件评价：当出现C级数据或平均超过阈值时
    if (maxValue > 50 || avgValue > 45) {
      return { grade: 'C', color: '#F5222D', desc: '污泥量过高' };
    }
    if (maxValue > 35 || avgValue > 30) {
      return { grade: 'B', color: '#FAAD14', desc: '污泥量正常' };
    }
    return { grade: 'A', color: '#52C41A', desc: '污泥量优秀' };
  };

  // 获取总评结果
  const totalGrade = getTotalGrade(rawData);

  const option = {
    title: [{
      text: '去除单位化学需氧量产生绝干污泥量',
      left: 'center',
      textStyle: {
        fontSize: 14,
        lineHeight: 24,
        color: '#ffffff'
      },
      top: '5%'
    },
      {
        text: `总评等级：${totalGrade.grade}（${totalGrade.desc}）`,
        left: 'center',
        top: '15%',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: totalGrade.color
        }
      }],
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const data = params[0];
        return `${data.name}<br/>污泥量: ${data.value}kg`;
      }
    },
    xAxis: {
      type: 'category',
      data: chineseMonths,
      axisLabel: {
        color: '#fff' // x轴文字颜色
      },
      axisLine: {
        lineStyle: {
          color: '#fff' // x轴线颜色
        }
      }
    },
    yAxis: {
      type: 'value',
      name: 'kg/t',
      // 新增y轴颜色设置
      axisLabel: {
        color: '#fff' // y轴文字颜色
      },
      axisLine: {
        lineStyle: {
          color: '#fff' // y轴线颜色
        }
      }
    },
    series: [{
      data: rawData,
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#5fd24a'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgb(95,210,74)' },
          { offset: 1, color: 'rgba(24,144,255,0.02)' }
        ])
      }
    }],
    // 添加评价标准说明
    graphic: {
      elements: [{
        type: 'text',
        left: 'center',
        top: '25%',
        style: {
          text: `评价标准：
A级（≤35kg）: 优秀
B级（36-50kg）: 正常
C级（>50kg）: 过高`,
          fontSize: 12,
          fill: '#ffffff',
          lineHeight: 20
        }
      }]
    }
  };

  myChart.setOption(option);
}
//左三
function initChartL3() {
  const el = document.getElementById('l3Chart')
  if (!el) return
  const myChart = echarts.init(el)

  // 原始数据
  const chartData = [90, 92, 88, 95, 93, 91, 94,90, 92, 88, 95, 93, 91, 94];

  // 计算平均值
  const average = chartData.reduce((sum, val) => sum + val, 0) / chartData.length;

  // 确定评价等级
  let grade = 'C';
  if (average >= 90) grade = 'A';
  else if (average >= 80) grade = 'B';

  const option = {
    title: [
      {
        text: '化学需氧量去除率',
        left: 'center',
        textStyle: { fontSize: 14 ,color: '#ffffff'},
        top: 10,
        color: '#ffffff'
      },
      {
        text: `评价等级：${grade}`,
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: grade === 'A' ? '#2E8B57' : grade === 'B' ? '#FFA500' : '#FF4500'
        },
        top: 35
      }
    ],
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: chineseMonths,
      axisLabel: {
        color: '#fff' // x轴文字颜色
      },
      axisLine: {
        lineStyle: {
          color: '#fff' // x轴线颜色
        }
      }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        color: '#fff' // y轴文字颜色
      },
      axisLine: {
        lineStyle: {
          color: '#fff' // y轴线颜色
        }
      }
    },
    series: [
      {
        data: chartData,
        type: 'line',
        smooth: true,
        areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgb(95,210,74)' },
              { offset: 1, color: 'rgba(24,144,255,0.02)' }
            ])
          },
        itemStyle: {
          color: '#5fd24a'
        }

      }

    ]
  }
  myChart.setOption(option)
}

// 右侧三个图表
//左二
function initChartR1() {
  const el = document.getElementById('r2Chart');
  if (!el) return;
  const myChart = echarts.init(el);

  // 原始数据
  const rawData = [50, 60, 80, 70, 110, 90, 120, 50, 60, 80, 70, 110, 90, 120];

  // 评价标准函数
  const getTotalGrade = (data) => {
    const maxValue = Math.max(...data);
    const avgValue = data.reduce((a, b) => a + b) / data.length;

    // R1标准：A(≤90) B(91-110) C(>110)
    if (maxValue > 110 || avgValue > 110) {
      return { grade: 'C', color: '#F5222D', desc: '能耗过高' };
    }
    if (maxValue > 90 || avgValue > 90) {
      return { grade: 'B', color: '#FAAD14', desc: '能耗正常' };
    }
    return { grade: 'A', color: '#52C41A', desc: '能耗优秀' };
  };

  // 获取总评结果
  const totalGrade = getTotalGrade(rawData);

  const option = {
    title: [{
      text: '去除单位化学需氧量的耗电量',
      left: 'center',
      textStyle: { fontSize: 14,color: '#ffffff' },
      top: '5%'

    },{
      text: `总评等级：${totalGrade.grade}（${totalGrade.desc}）`,
      left: 'center',
      top: '15%',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: totalGrade.color
      }
    }],
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: chineseMonths,
      axisLabel: {
        color: '#fff' // x轴文字颜色
      },
      axisLine: {
        lineStyle: {
          color: '#fff' // x轴线颜色
        }
      }
    },
    yAxis: { type: 'value' ,
      // 新增y轴颜色设置
      axisLabel: {
        color: '#fff' // y轴文字颜色
      },
      axisLine: {
        lineStyle: {
          color: '#fff' // y轴线颜色
        }
      } },
    series: [{
      data: rawData,
      type: 'line',
      smooth: true,
      itemStyle: { color: '#5fd24a' },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgb(95,210,74)' },
          { offset: 1, color: 'rgba(24,144,255,0.02)' }
        ])
      }
    }],
    graphic: {
      elements: [{
        type: 'text',
        left: 'center',
        top: '25%',
        style: {
          text: `评价标准：\nA级（≤90）: 优秀\nB级（91-110）: 正常\nC级（>110）: 过高`,
          fontSize: 12,
          fill: '#ffffff',
          lineHeight: 20
        }
      }]
    }
  };
  myChart.setOption(option);
}
//右一
function initChartR2() {
  const el = document.getElementById('r1Chart');
  if (!el) return;
  const myChart = echarts.init(el);

  // 原始数据
  const rawData = [100, 90, 120, 80, 70, 130, 140,100, 90, 120, 80, 70, 130, 140];

  // 评价标准函数
  const getTotalGrade = (data) => {
    const maxValue = Math.max(...data);
    const avgValue = data.reduce((a, b) => a + b) / data.length;

    // R2标准：A(≤100) B(101-120) C(>120)
    if (maxValue > 120 || avgValue > 120) {
      return { grade: 'C', color: '#F5222D', desc: '污泥量过高' };
    }
    if (maxValue > 100 || avgValue > 100) {
      return { grade: 'B', color: '#FAAD14', desc: '污泥量正常' };
    }
    return { grade: 'A', color: '#52C41A', desc: '污泥量优秀' };
  };

  // 获取总评结果
  const totalGrade = getTotalGrade(rawData);

  const option = {
    title: [{
      text: '处理单位污水产生绝干污泥量',
      left: 'center',
      textStyle: { fontSize: 14 ,color: '#ffffff'},
      top: '5%'
    },{
      text: `总评等级：${totalGrade.grade}（${totalGrade.desc}）`,
      left: 'center',
      top: '15%',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: totalGrade.color
      }
    }],
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: chineseMonths,
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: { type: 'value' ,
      // 新增y轴颜色设置
      axisLabel: {
        color: '#fff' // y轴文字颜色
      },
      axisLine: {
        lineStyle: {
          color: '#fff' // y轴线颜色
        }
      } },
    series: [{
      data: rawData,
      type: 'line',
      smooth: true,
      itemStyle: { color: '#5fd24a' },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgb(95,210,74)' },
          { offset: 1, color: 'rgba(24,144,255,0.02)' }
        ])
      }
    }],
    graphic: {
      elements: [{
        type: 'text',
        left: 'center',
        top: '25%',
        style: {
          text: `评价标准：\nA级（≤100）: 优秀\nB级（101-120）: 正常\nC级（>120）: 过高`,
          fontSize: 12,
          fill: '#ffffff',
          lineHeight: 20
        }
      }]
    }
  };
  myChart.setOption(option);
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
let pointIndex = 0; // 当前显示的点索引
const allPoints = [ // 所有点的数据
  [114.52, 38.05, 120, ],
  [116.46, 39.92, 100, ],
  [121.48, 31.22, 90, ],
  [117.20, 39.08, 95, ],
  [106.55, 29.57, 85, ],
  [126.63, 45.75, 75, ],
  [125.32, 43.90, 70, ],
  [123.43, 41.80, 65, ],
  [111.65, 40.82, 60, ],
  [112.55, 37.87, 55, ],
  [113.62, 34.75, 50, ],
  [108.93, 34.27, 45, ],
  [103.82, 36.06, 40, ],
  [101.77, 36.62, 35, ],
    //浙江、广东、四川三个有污水处理厂名字的坐标
  [104.68, 31.47, 70, '绵阳市水务有限公司塘汛污水处理厂'],      // 绵阳涪城区坐标
  [120.65, 27.96, 65, '温州市排水有限公司南片污水处理厂'],      // 温州瓯海区坐标
  [113.25, 22.84, 75, '佛山市顺德区华盈环保水务有限公司'] // 顺德坐标
];    //点的经纬度

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
              color: '#ffffff'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function(params) {
              return params.data.value[3]; // 显示第四列的污水处理厂名称
            }
          },
          geo: {
            map: 'china',
            roam: false, // 允许缩放拖动
            silent: false,          // 禁止geo组件触发事件
            label: {
              show: true,
              color: '#ffffff'    //省名颜色
            },
            itemStyle: {
              areaColor: '#524cff',   //地图填色
              borderColor: '#071142',   //地图描边
              borderWidth: 1.5,

              // 添加投影效果
              shadowColor: '#5853ed',      // 阴影颜色
              shadowBlur: 25,                         // 阴影模糊大小
              shadowOffsetY: 8,                       // 垂直偏移量
              shadowOffsetX: 8                        // 水平偏移量（保持垂直向下）
            },
            emphasis: {
              label: {
                color: 'white'
              },
              itemStyle: {
                areaColor: '#2973BB',

                shadowColor: 'rgba(0, 0, 0, 0.5)',    // 高亮状态加深阴影
                shadowBlur: 15,
                shadowOffsetY: 10
              }
            }
          },
          series: [{
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: [],
            encode: { // 调整编码映射
              lng: 0,    // 第一列为经度
              lat: 1,    // 第二列为纬度
              value: 2,  // 第三列为数值
              tooltip: 3 // 第四列为提示信息
            },
            rippleEffect: {
              brushType: 'stroke',
              scale: 4
            },
            // 设置点的大小
            symbolSize: 7, // 点的大小
            //亮一下
            itemStyle: {
              color: '#ffcc00' // 默认颜色（暗蓝色）
            },
            emphasis: {
              itemStyle: {
                color: '#ffea00', // 高亮颜色
                shadowBlur: 20,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'blue',
                opacity: 1
              }
            }
          }]
        }
        mapChart.setOption(option);

        // 开始动画
        startAnimation();
      });
};

// 动画函数
const startAnimation = () => {
  const series = mapChart.getOption().series[0];
  const newData = [...series.data];

  // 每次添加一个点
  if (pointIndex < allPoints.length) {
    const newPoint = {
      value: allPoints[pointIndex],
      itemStyle: { color: '#ffea00' } // 初始亮蓝色
    };
    newData.push(newPoint);
    const currentIndex = newData.length - 1;
    pointIndex++;
    // 更新图表
// 更新图表
    mapChart.setOption({ series: [{ data: newData }] });

    // 两秒后将点颜色变为暗蓝色
    setTimeout(() => {
      const currentData = [...mapChart.getOption().series[0].data];
      if (currentIndex < currentData.length && currentData[currentIndex]) {
        currentData[currentIndex] = {
          ...currentData[currentIndex],
          itemStyle: { color: '#ffcc00' }
        };
        mapChart.setOption({ series: [{ data: currentData }] });
      }
    }, 2000);


  } else {
    // 所有点都显示后，重置索引，准备下一轮
    pointIndex = 0;
    // 让所有点消失
    setTimeout(() => {
      mapChart.setOption({
        series: [{
          data: []
        }]
      });
      // 重新开始动画
      setTimeout(startAnimation, 1000);
    }, 3000);
    return;
  }

  // 更新图表
  mapChart.setOption({
    series: [{
      data: newData
    }]
  });

  // 设置下一个点的显示时间
  setTimeout(startAnimation, 1000);
};

// 自适应大小
const resizeHandler = () => {
  mapChart?.resize()
}
const DeepSeekMsg = ref("")
onMounted(async () => {
  initChinaMap()
  console.log(await fetchAIData())
  DeepSeekMsg.value = await fetchAIData();
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler)
  mapChart?.dispose()
})
const open = async () => {
  ElMessageBox.alert(`${await fetchAIData()}`, 'DeepSeek建议', {confirmButtonText: '好的'})
}
</script>

<template>
  <div class="container">

    <div class="content-container">
      <div class="left-container">
        <div class="vertical-group">
          <div class="vertical-title">资源能源消耗指标</div>
          <div class="group-content">
            <div class="l1-container">
              <div id="l1Chart" class="chart"></div>
            </div>
            <div class="l2-container">
              <div id="r2Chart" class="chart"></div>
            </div>
          </div>
        </div>
        <div class="vertical-group-rb">
          <div class="vertical-title">产品特征指标</div>
            <div class="l3-container">
              <div id="l3Chart" class="chart"></div>
            </div>
        </div>

      </div>

      <div class="center-container">
        <div class="center-top-container">
          <div id="chinaMap" class="map-chart"></div>
        </div>

        <div class="center-bottom-container">
          <div class="scroller">
            <a href="https://baijiahao.baidu.com/s?id=1775889772126267438&wfr=spider&for=pc" class="link-item">
              污水处理厂节能降耗措施
            </a>
            <a href="https://baijiahao.baidu.com/s?id=1814234949320393420&wfr=spider&for=pc" class="link-item">
              污水处理厂常见问题及措施
            </a>
            <a href="https://baijiahao.baidu.com/s?id=1775889772126267438&wfr=spider&for=pc" class="link-item">
              污水处理厂能耗分析
            </a>
            <a href="https://baijiahao.baidu.com/s?id=1787943202869584373&wfr=spider&for=pc" class="link-item">
              低碳评价的介绍
            </a>
            <a href="https://baijiahao.baidu.com/s?id=1823161362311551178&wfr=spider&for=pc" class="link-item">
              打造污水处理绿色低碳标杆厂
            </a>
            <a href="https://zhuanlan.zhihu.com/p/388035480" class="link-item">
              絮凝剂用量大的原因
            </a>
            <a href="https://mbd.baidu.com/newspage/data/landingshare?id=1770999328247519264&third=baijiahao&baijiahao_id=1770999328247519264&wfr=&c_source=kunlun&c_score=0.999000&p_tk=1105bxiyearsqdYQ%2BT4fWNbk51NjjnysqkNuu%2B%2BZfrgAcEkyM%2FuqgPVEoi9kd54DR0jxClwpwe9DauWyGI2WycmhcIezhAdnJPlD9ligj%2B4fT6AKHsXTcyTrJv4IaLc4YdnP5FtrSn4Up0umN5TTk32knPm95R84tRzD8bmsDNBFh%2FM%3D&p_timestamp=1741964286&p_sign=4070dbb6abf73b04e52feb06fbcf372d&p_signature=550649ede44156534a4ad06c1a25dcbd&__pc2ps_ab=1105bxiyearsqdYQ%2BT4fWNbk51NjjnysqkNuu%2B%2BZfrgAcEkyM%2FuqgPVEoi9kd54DR0jxClwpwe9DauWyGI2WycmhcIezhAdnJPlD9ligj%2B4fT6AKHsXTcyTrJv4IaLc4YdnP5FtrSn4Up0umN5TTk32knPm95R84tRzD8bmsDNBFh%2FM%3D" class="link-item">
              污水处理厂碳源大的原因
            </a>
            <a href="https://baijiahao.baidu.com/s?id=1822629588703146318&wfr=spider&for=pc" class="link-item">
              污水处理中常见的问题及解决方法
            </a>
            <a href="https://baijiahao.baidu.com/s?id=1821486916594557296&wfr=spider&for=pc" class="link-item">
              污水处理厂中泡沫问题及治理方案
            </a>
            <a href="https://mp.weixin.qq.com/s?__biz=MzU5NTM0NTE1NQ==&mid=2247516107&idx=3&sn=7dc421e6627f80df8e262b3c7fc6552c&chksm=ff5236fd81840bd9a414fa3967337c4234351aab6bbd6ab38d6806e344257bc8ad69f21aa4b4&scene=27" class="link-item">
              污泥膨胀的原因及解决方法
            </a>
          </div>
        </div>
      </div>

      <!-- 右侧容器：再放三个图表 -->
      <div class="right-container">
        <div class="vertical-group">
          <div class="vertical-title">污染物产生指标</div>
          <div class="group-content">
            <div class="r1-container">
              <div id="r1Chart" class="chart"></div>
            </div>
            <div class="r2-container">
              <div id="l2Chart" class="chart"></div>
            </div>
          </div>
        </div>
        <div class="r3-container">
          <div class="-ds-container">
            <h1 @click="open">DeepSeek建议</h1>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.-ds-container{
  margin-top: 20%;
  text-align: center;
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
  display: flex;
  flex-direction: column;
}


/* 竖向排列容器 */
.vertical-group {
  display: flex;
  margin-bottom: 20px;
  height: 66%; /* 根据实际高度调整 */
}
.vertical-group-rb{
  display: flex;
  margin-bottom: 20px;
  height: 34%; /* 根据实际高度调整 */

}
/* 竖向标题样式 */
.vertical-title {

  writing-mode: vertical-lr;
  text-orientation: upright;
  padding: 15px 5px;
  background: rgba(255, 255, 255, 0.2);
  border-right: 2px solid #ffffff;
  font-weight: bold;
  color: #ffffff;
}

/* 组合内容区域 */
.group-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 左侧每个图表区域：占满父容器宽度(100%)，高度各占1/3 */
.l1-container,
.l2-container{
  width: 98%;
  flex: 1;
  height: 50%;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  border-bottom: 1px solid #fff;
  transition: transform 0.3s, background 0.3s;
}
.l3-container {
  flex: 1;
  width: 100%;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  border-bottom: 1px solid #fff;
  transition: transform 0.3s, background 0.3s;
}
.l1-container:hover,
.l2-container:hover,
.l3-container:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px); /* 鼠标悬停时上移5px，产生向前突起效果喵~ */
}

.r3-container{
  align-items: center;
  text-align: center;
  color: #fff;
  width: 100%;
  height: 30%;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid #fff;
  border-radius: 5px;
  transition: transform 0.3s, background 0.3s;
}
/* 右侧每个图表区域：同理占满父容器宽度、高度各占1/3 */
.r1-container,
.r2-container {
  width: 100%;
  flex: 1;
  height: 50%;
  box-sizing: border-box;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid #fff;
  transition: transform 0.3s, background 0.3s;
}
.r1-container:hover,
.r2-container:hover,
.r3-container:hover {
  background: rgba(255, 255, 255, 0.1);
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

  border-radius: 8px;
  overflow: hidden;
  padding: 10px;

  background:transparent ;
}

.map-chart {
  width: 100%;
  height: 100%;
}


.center-bottom-container {
  flex: 1;
  overflow: hidden; /* 隐藏溢出内容 */
  position: relative;
  background: linear-gradient(135deg, rgba(25, 25, 112, 0.5), rgba(173, 216, 230, 0.3));
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
  background: linear-gradient(135deg, rgba(25, 25, 112, 0.5), rgba(173, 216, 230, 0.3));
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  color: #eef8ff;
  text-decoration: none;
  transition: all 0.3s;
}

.link-item:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  color: #337ecc;
}
</style>
