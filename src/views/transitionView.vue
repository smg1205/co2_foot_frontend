<template>
  <div class="custom-background">
    <h1 class="page-title">污水处理厂智慧碳管理系统</h1>
    
    <div class="software-intro">
      <div class="intro-content">
        <p>
          本软件专为污水处理厂设计，用于实时监测和计算碳排放量。通过先进的算法和数据分析技术，帮助用户优化污水处理流程，降低碳排放，实现绿色环保目标。
        </p>
        <p>
          主要功能包括：
        </p>
        <ul>
          <li>实时监测污水处理过程中的碳排放量。</li>
          <li>生成碳排放报告，支持多种格式导出。</li>
          <li>提供碳排放趋势分析，帮助用户制定减排策略。</li>
          <li>集成智能预警系统，及时发现异常排放。</li>
        </ul>
        <p>
          我们的软件已成功应用于多个大型污水处理厂，显著降低了碳排放量，获得了用户的一致好评。
        </p>
        <p>
          此外，我们提供了实时数据监控界面和详细的历史数据查询功能，方便用户随时查看污水处理过程的各项数据，并对未来的排放量进行预测。
        </p>
        <p>
          我们的系统支持多种语言，适用于不同地区的用户，并且系统界面简洁易用，用户可以在不需要任何培训的情况下快速上手。
        </p>
        <p>
          我们的目标是帮助各类污水处理厂减少碳排放，减少能源消耗，实现可持续发展。
        </p>
      </div>
    </div>


    <button class="circle-button download-button" @click="downloadTemplate">
      模板下载
    </button>


    <label class="circle-button upload-button">
      数据上传
      <input
          type="file"
          accept=".xlsx, .xls"
          style="display: none;"
          @change="handleFileUpload"
      />
    </label>
  </div>
</template>

<script setup>

const downloadTemplate = () => {
  alert('模板下载');
};


const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    alert(`已选择文件: ${file.name}`);
  }
};
</script>

<style scoped>
.custom-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('/src/static/Background1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}


.page-title {
  position: absolute;
  top: 4.5%;
  left: 55%;
  transform: translateX(-50%);
  color: white;
  font-size: 54px;
  font-family: 'Exo 6', sans-serif;

  font-weight: bold;
  color: white;
  text-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 40px #FFD700;
  letter-spacing: 7px;
  animation: future-glow 20s infinite alternate;
}

@keyframes future-glow {
  0% {
    text-shadow: 0 0 10px #0000FF, 0 0 20px #00ffcc, 0 0 40px #0000FF ;
  }
  100% {
    text-shadow: 0 0 20px #00ffcc, 0 0 40px #00ffcc, 0 0 80px #00ffcc;
  }
}


.software-intro {
  position: absolute;
  top:53%;
  left: 51.4%;
  width: 19%;
  transform: translate(-166%, -50%);
  color: white;
  padding: 20px;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.1);
  max-height: 59%;
  overflow: hidden;
  border: 2px solid rgba(30, 144, 255, 0.8);
  box-shadow: 0 0 10px rgba(30, 144, 255, 0.9), 0 0 20px rgba(30, 144, 255, 0.9);
}

.intro-content {
  font-size: 17px;
  line-height: 1.8;
  animation: scroll 45s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}


.circle-button {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 36px;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  letter-spacing: 4px;
  text-shadow: 0 0 10px rgba(30, 144, 255, 0.8), 0 0 20px rgba(30, 144, 255, 0.6);
  transition: all 0.3s ease;
  z-index: 1;
}


.circle-button:hover {
  background-color: rgba(30, 144, 255, 0.4);
  text-shadow: 0 0 15px rgba(30, 144, 255, 1), 0 0 30px rgba(30, 144, 255, 0.8);
}


.download-button {
  top: 50%;
  right: 10%;
  transform: translateY(-53%);
}


.upload-button {
  top: 50%;
  right: 36.5%;
  transform: translateY(-53%);
}
</style>