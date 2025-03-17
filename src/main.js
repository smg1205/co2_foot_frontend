import './assets/main.css'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import {router} from "@/router/router.js";
import { createPinia } from 'pinia';

const app = createApp(App)

app.use(ElementPlus).use(router).use(createPinia());
app.mount('#app')
