import {App} from 'vue'
import NSwitch from "./NSwitch.vue"


const NSwitchPlugin = {
    install(app: App) {
        app.component('n-switch', NSwitch)
    }
}


export { NSwitch, NSwitchPlugin }
