import { App } from 'vue';
import NButton from './NButton.vue';

const NButtonPlugin = {
    install(app: App) {
        app.component('NButton', NButton);
    }
};

export { NButton, NButtonPlugin };
