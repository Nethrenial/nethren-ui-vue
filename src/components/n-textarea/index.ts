import { App } from 'vue';
import NTextarea from './NTextarea.vue';

const NTextareaPlugin = {
    install(app: App) {
        app.component('NTextarea', NTextarea);
    }
};

export { NTextarea, NTextareaPlugin };
