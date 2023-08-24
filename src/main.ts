import { createApp } from 'vue';
import App from './App.vue';
import { setColorPallete } from './utils';

setColorPallete();

const app = createApp(App);
app.mount('#app');
