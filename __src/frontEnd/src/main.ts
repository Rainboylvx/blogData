// import './style.scss'
// import { createApp } from 'vue'
// import App from './App.vue'

import './style.scss'

//@ts-ignore
import data from 'virtual:blogData'

import { createApp } from 'vue'
import __App__ from './App.vue'

// const app = createApp(App,{links:data})
// window.Root  = app.mount('#app')
(<any>window).App  = createApp(__App__,{links:data}).mount('#app')

import "./event_hook"
