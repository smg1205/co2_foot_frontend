<script setup>
import {ref} from "vue";
import {uploadFiles} from "@/libs/FileUploadModule.js";
import {goToMain} from "@/libs/RouterMove.js";
// 这里是文件上传的组件，目前就是需要页面设计一下，和文件上传的js未完成
const files = ref([]);

const handleFiles = async (event) => {
  const newFiles = event.target.files || event.dataTransfer.files;
  files.value = [newFiles[0]];
  await uploadFiles(files).then((res) => {
    if(res){
      goToMain();
    }else{
      alert("当前文件无效")
    }
  });
};

const dragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
};


const dropFile = (event) => {
  event.preventDefault();
  handleFiles(event);
};
</script>

<template>
  <div class="upload-container">
    <div class="drop-zone" @dragover="dragOver" @drop="dropFile" @click="$refs.fileInput.click()">
      <p>拖拽文件到这里 或 点击上传</p>
      <input ref="fileInput" type="file" @change="handleFiles" hidden />
    </div>
    <ul v-if="files.length" class="file-list">
      <li>{{ files[0].name }}</li>
    </ul>
  </div>
</template>

<style scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* 拖拽上传区域 */
.drop-zone {
  width: 400px;
  height: 250px;
  border: 2px dashed #ccc; /* 边框颜色更淡 */
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f5f5f5; /* 淡灰色背景 */
  color: #555; /* 文字颜色更柔和 */
  font-size: 18px;
  font-weight: bold;
}

/* 悬停效果 */
.drop-zone:hover {
  background-color: #e0e0e0; /* 悬浮时变亮 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* 轻微阴影 */
  transform: translateY(-2px);
}

/* 文件列表 */
.file-list {
  margin-top: 12px;
  padding: 0;
  list-style: none;
  width: 100%;
  text-align: center;
}

.file-list li {
  font-size: 16px;
  padding: 6px;
  border-bottom: 1px solid #ddd;
  color: #333;
}
</style>
