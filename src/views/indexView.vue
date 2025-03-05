<script setup>
import HfUpload from "@/components/hf-upload.vue";
</script>

<template>
<!--  这里是一开始进去的页面，感觉可以设计的稍微好看一点-->
  <div class="container">
    <h1>碳足迹，碳强度计算</h1>
    <h2>本网站可以根据上传的Excel表格进行碳足迹一集碳强度计算</h2>
    <h2>并且给出一定的建议</h2>
    <HfUpload />
  </div>
</template>

<style scoped>
/* 让整体居中 */
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 让内容垂直居中 */
  text-align: center;
}
</style>
