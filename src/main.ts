import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { i18n } from './store'
import './style.css'
import 'element-plus/dist/index.css'

const pinia = createPinia()

const app = createApp(App)

app.use(router)
  .use(i18n)
  .use(pinia)
  .mount('#app')
