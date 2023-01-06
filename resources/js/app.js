import './bootstrap';
import '../css/app.css';
import '../sass/app.scss'; // Необходимо добавить для bootstrap

import { createApp } from 'vue';
import Index from "./components/Index.vue";
import router from "./router";


const app =createApp(Index)
app.use(router)
// app.config.globalProperties.axios = axios
app.mount('#app')


