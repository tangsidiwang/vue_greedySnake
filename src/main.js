import { createApp } from 'vue'
//npm install pinia
import { createPinia } from 'pinia'
//npm i pinia-plugin-persistedstate持久化插件
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

//createApp(App).mount('#app')
const app=createApp(App)
app.use(pinia)
app.mount('#app')