<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";

// 获取 Vue Router 实例
const router = useRouter();

// 递归获取所有 isShow=true 的路由
const extractVisibleRoutes = (routes) => {
  let visibleRoutes = [];

  routes.forEach(route => {
    if (route.meta?.isShow) {
      visibleRoutes.push({ name: route.name, path: route.path });
    }

    // 递归处理子路由
    if (route.children) {
      visibleRoutes = [...visibleRoutes, ...extractVisibleRoutes(route.children)];
    }
  });

  return visibleRoutes;
};

// 计算需要展示的导航菜单
const navLinks = computed(() => extractVisibleRoutes(router.options.routes));
</script>

<template>
  <header class="nav-header">
    <nav>
      <ul>
        <li v-for="link in navLinks" :key="link.path">
          <router-link :to="link.path">{{ link.name }}</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/* 头部导航栏 */
.nav-header {
  border-radius: 6px;
  padding: 15px 30px; /* 上下留白更大 */
  height: 60px; /* 增加整体高度 */
  display: flex;
  align-items: center; /* 垂直居中 */
}

/* 导航列表 */
ul {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
}

/* 按钮（路由链接） */
a {
  text-decoration: none;
  color: #333;
  font-size: 18px; /* 字体更大 */
  padding: 12px 18px; /* 增大点击区域 */
  border-radius: 8px; /* 圆角更柔和 */
  transition: all 0.3s ease;
}

/* 悬停效果 */
a:hover {
  background-color: #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-3px); /* 悬浮更明显 */
}
</style>
