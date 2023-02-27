import { createApp } from 'vue'
// import Vue from "vue" 并不能返回Vue对象;
import App from './App.vue'
import router from "@/router";
import store from '@/store';
import mitt from "mitt";

import FastClick from 'fastclick'
// import VueLazyload from "vue-lazyload";

import toast from "@/components/common/toast";

// createApp(App).use(router).mount('#app')
const app = createApp(App);
app.use(router);
app.use(store)
// app.use(VueLazyload)

app.config.globalProperties.$bus  = mitt()

FastClick.attach(document.body)

app.mount('#app')
