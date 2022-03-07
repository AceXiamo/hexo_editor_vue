import Vue from 'vue';

import ShowImage from "./show_image/index";
Vue.use(ShowImage);

import ShowVideo from "./show_video/index";
Vue.use(ShowVideo);

import Utils from "./utils"
Vue.use(Utils);

import Msg from "./message/index"
Vue.use(Msg);

import AliOSS from "./alioss/index";
Vue.use(AliOSS);
