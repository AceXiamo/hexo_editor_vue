// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// axios
import './js/http'
import axios from 'axios';
Vue.prototype.$axios = axios;

// 全局js、css
import "./js/global.js"
import "./css/style.scss"
import "./css/animation.css"

// markdown
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

Vue.config.productionTip = false

// cookie
import cookie from 'vue-cookies'
// cookie有效时间
Vue.use(cookie)
// 设置全局过期时间，Vue.use后设置无效 💦
Vue.$cookies.config('30d')

// session
import VueSession from 'vue-session'
Vue.use(VueSession)

// xm-tools
import './components/xm-tools/tools'
import './components/xm-tools/css/global.scss'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})

router.beforeEach((to, from, next) => {
    next()
})
