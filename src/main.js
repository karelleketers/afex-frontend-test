import { createApp } from 'vue';
import App from './App.vue';
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

import './assets/main.css'

import router from "./router"

createApp(App)
    .use(router)
    .use(VuePlyr, {
        plyr: {}
      })
    .mount('#app')

