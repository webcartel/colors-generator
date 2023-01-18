import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import tooltip from "./directives/tooltip.js";

createApp(App)
    .use(store)
    .directive('tooltip', tooltip)
    .mount('#app')
