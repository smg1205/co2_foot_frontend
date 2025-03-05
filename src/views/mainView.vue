<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import { router } from "@/router/router";
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
    <el-container>
      <el-header>
        <h1>Hello</h1>
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
