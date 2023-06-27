import {createApp} from 'vue';
import App from './App.vue'
import apolloProvider from './services/apolloService';
import router from './router';
const app=createApp(App);
app.use(apolloProvider);
app.use(router);
app.mount('#app');


