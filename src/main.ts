import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/main.scss'
import msgTime from './plugins/msgTime.js'
import chatDay from './plugins/chatDay.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(msgTime);
app.use(chatDay);


app.mount('#app')
