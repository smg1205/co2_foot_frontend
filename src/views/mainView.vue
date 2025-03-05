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
<!--  这里是主页面，进行路由跳转-->
    <el-container>
      <el-header>
        <hf-header></hf-header>
      </el-header>
      <el-main>
        <RouterView></RouterView>
      </el-main>
    </el-container>
</template>

<style scoped>
.common-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.--index-header {
  flex: 0 0 10%;
}

.--index-container {
  flex: 1;
  overflow: auto;
}
</style>
