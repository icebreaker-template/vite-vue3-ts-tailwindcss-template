import { createApp } from 'vue'
import App from './App.vue'
import IceImage from './components/IceImage.vue'
import { router } from './router'
import './style.css'

const app = createApp(App)

app.component('IceImage', IceImage)

app.use(router).mount('#app')
