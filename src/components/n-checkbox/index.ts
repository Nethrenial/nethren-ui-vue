import { App } from 'vue';
import NCheckbox from './NCheckbox.vue';

const NCheckboxPlugin = {
    install(app: App) {
        app.component('NCheckbox', NCheckbox);
    }
};

export { NCheckbox, NCheckboxPlugin };
