import App from './setup_render/App.mjs'
import {createApp} from './setup_render/index.mjs'

const appDom = document.querySelector('#app')
createApp(App).mount(appDom)

