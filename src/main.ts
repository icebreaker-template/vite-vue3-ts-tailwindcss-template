import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './style.scss'
import 'floating-vue/dist/style.css'

const app = createApp(App)
app.use(router)

app.mount('#app')
