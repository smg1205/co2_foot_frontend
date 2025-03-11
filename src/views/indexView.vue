<script setup>
import HfUpload from "@/components/hf-upload.vue";
const src  = "src/static/index_back_img_2.png";
</script>

<template>
  <div class="container">
    <h1>碳足迹，碳强度计算</h1>
    <h2>本网站可以根据上传的Excel表格进行碳足迹一集碳强度计算</h2>
    <h2>并且给出一定的建议</h2>
  </div>
  <el-image :src="src" style="padding-left: 15vw; position: absolute; z-index: -1; width: 70vw; height: 70vh"/>

  <div class="container">
    <HfUpload style=""/>
  </div>
</template>

<style scoped>
/* 让整体居中 */
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
