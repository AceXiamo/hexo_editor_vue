// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// fontawesome
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';
// fontawesome.library.add(solid);
fontawesome.library.add(regular);
fontawesome.library.add(brands);
// 这里和markdown有冲突
fontawesome.config.autoReplaceSvg = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);

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

// 全局消息提示
import Msg from "@/js/message"
Vue.use(Msg);

// cookie
import cookie from 'vue-cookies'
Vue.prototype.$cookie = cookie

// 
import icon from "@/components/icon"
Vue.component('icon', icon)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})