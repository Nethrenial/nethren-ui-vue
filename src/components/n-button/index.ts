import {App} from 'vue'
import NButton from "./NButton.vue"


const NButtonPlugin = {
    install(app: App) {
        app.component('n-button', NButton)
    }
}


export { NButton, NButtonPlugin }
