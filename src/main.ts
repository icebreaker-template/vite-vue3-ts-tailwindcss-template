import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './style.scss'

createApp(App).use(router).mount('#app')
