import './style.scss'
import { createApp } from 'vue'
import App from './App.vue'


function myCreateApp(props = {},mount_id = '#app') {
    createApp(App,props).mount(mount_id)
}

export default myCreateApp

