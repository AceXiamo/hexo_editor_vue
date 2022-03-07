import Vue from 'vue';
import ShowVideo from "./show_video"

// 构造Vue实例
let vueEl = Vue.extend(ShowVideo);

const Main = function(url) {
  let instance = new vueEl();
  instance.$mount();
  instance.url = url;
  instance.show = true;
  document.body.appendChild(instance.$el);
};

// 全局注册
const registry = function (){
  Vue.prototype.$ShowVideo = Main;
}

export default registry;
