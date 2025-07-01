import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './assets/styles.css'

createApp(App).use(vuetify).mount('#app')
