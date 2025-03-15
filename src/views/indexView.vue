<script setup>
import {goToTran} from "@/libs/RouterMove.js";

const back_img = "src/static/img_12.jpg";
</script>

<template>
  <div
      class="backend-img"
      :style="{backgroundImage: `url(${back_img})`} "
      @click="goToTran()"
  >
  </div>
</template>

<style scoped>
.backend-img {
  z-index: -1;
  background-color: #337ecc;
  height: 120vh;
  top: 0;
  left: 0;
  background-size: cover; /* 让图片铺满整个区域 */
  background-position: center; /* 图片居中 */
  background-repeat: no-repeat; /* 禁止图片重复 */
}
</style>
