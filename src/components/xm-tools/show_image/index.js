import Vue from 'vue';
import ShowImage from "./show_image"

// 构造Vue实例
let vueEl = Vue.extend(ShowImage);

const Main = function(url) {
  let instance = new vueEl();
  instance.$mount();
  if(url instanceof Array){
    instance.urls = url;
  }else{
    instance.url = url;
  }
  instance.show = true;
  document.body.appendChild(instance.$el);
};

// 全局注册
const registry = function (){
  Vue.prototype.$ShowImage = Main;
}

export default registry;
