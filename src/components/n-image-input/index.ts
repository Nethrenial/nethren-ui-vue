import { App } from 'vue';
import NImageInput from './NImageInput.vue';

const NImageInputPlugin = {
    install(app: App) {
        app.component('NImageInput', NImageInput);
    }
};

export { NImageInput, NImageInputPlugin };
