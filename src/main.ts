import eruda from 'eruda'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './style.scss'
import '@google/model-viewer'

eruda.init()

createApp(App).use(router).mount('#app')
E
