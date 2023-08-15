import {App} from 'vue'
import NModal from "./NModal.vue"


const NModalPlugin = {
    install(app: App) {
        app.component('n-modal', NModal)
    }
}


export { NModal, NModalPlugin }
