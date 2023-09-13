import { App } from 'vue';
import NInput from './NInput.vue';

const NInputPlugin = {
    install(app: App) {
        app.component('NInput', NInput);
    }
};

export { NInput, NInputPlugin };
