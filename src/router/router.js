import {createRouter, createWebHistory} from "vue-router";
import {routes} from "@/router/routes.js";

// 这里是路由实现的地方，可以设置路由跳转的条件什么的
export const router = createRouter({
    history: createWebHistory(),
    routes
})