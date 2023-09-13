import { App } from 'vue';
import NSwitch from './NSwitch.vue';

const NSwitchPlugin = {
    install(app: App) {
        app.component('NSwitch', NSwitch);
    }
};

export { NSwitch, NSwitchPlugin };
