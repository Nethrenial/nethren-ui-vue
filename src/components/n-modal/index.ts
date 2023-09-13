import { App } from 'vue';
import NModal from './NModal.vue';

const NModalPlugin = {
    install(app: App) {
        app.component('NModal', NModal);
    }
};

export { NModal, NModalPlugin };
