<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import { router } from "@/router/router";
import HfHeader from "@/components/hf-header.vue";
const route = useRoute();
const currentRoute = ref(route.fullPath);

watch(
    () => route.fullPath,
    (newPath) => {
      currentRoute.value = newPath;
      router.push({'path': newPath})
    }
);
</script>

<template>
  <!-- 添加背景层 -->
  <div class="background">
    <!-- 这里是主页面，进行路由跳转 -->
    <el-container class="common-layout">
      <el-header class="fixed-header">
        <hf-header></hf-header>
      </el-header>
      <el-main class="main-content">
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </div>
</template>



<style scoped>
.common-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.background {
  position: fixed; /* 让背景固定填充整个屏幕 */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('/src/static/img_2.png'); /* 确保路径正确 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1; /* 让背景不遮挡其他内容 */
}
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px; /* 适当调整 header 高度 */
  background: rgba(255, 255, 255, 0.8); /* 设置半透明背景，避免遮挡 */
  backdrop-filter: blur(10px); /* 增加毛玻璃效果 */
  z-index: 1000; /* 让 header 始终在最上层 */
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 添加阴影提升层次感 */
}

.main-content {
  margin-top: 60px; /* 防止内容被固定 header 遮挡 */
  flex: 1;
  overflow: auto;
}


</style>
