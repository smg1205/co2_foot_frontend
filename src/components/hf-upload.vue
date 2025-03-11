<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";  // 使用 useRouter 获取路由实例喵~
const router = useRouter();
const files = ref([]);

const handleFiles = async (event) => {
  const newFiles = event.target.files || event.dataTransfer.files;
  if (!newFiles.length) return;  // 如果没有文件则直接返回喵~
  files.value = [newFiles[0]];
  try {
    await router.push({ path: "/main/show" });  // 异步跳转到目标路由喵~
  } catch (error) {
    console.error("跳转失败:", error);
  }
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
      <p>拖拽excel文件到这里 或 点击上传</p>
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
  background-color: rgba(100, 100, 100, 0.4); /* 淡灰色背景 */
  color: #555; /* 文字颜色更柔和 */
  font-size: 18px;
  font-weight: bold;
}

/* 悬停效果 */
.drop-zone:hover {
  background-color: #808080; /* 悬浮时变亮 */
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
