<template>
  <div class="menuSec">
    <div id="menu">
      <span @click="copyUrl">复制链接</span>
      <span @click="download">下载插画</span>
      <span @click="toCover">添加到封面图</span>
      <span @click="del">删除插画</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "menuSec",
  props: ['imgIndex'],
  data() {
    return {}
  },
  created() {
    this.init();
  },
  methods: {
    del() {
      let data = this.$parent['list'][this.imgIndex];
      console.log(data)
      this.$parent['delPixiv'](data.id)
      // this.$xmMessage.error("删除达咩!");
    },
    copyUrl() {
      this.$parent['copy'](this.$parent['list'][this.imgIndex].url);
    },
    download() {
      let url = this.$parent['list'][this.imgIndex].url;
      let name = url.split('/');
      name = name[name.length - 1]
      this.$downloadFile(url, name);
    },
    toCover() {
      let url = this.$parent['list'][this.imgIndex].url;
      this.$submitCover(-1, url, this);
    },
    init() {
      let this_ = this;
      window.oncontextmenu = function (e) {
        let evt = window.event || arguments[0];
        let target = document.querySelector(".images-scale").childNodes[this_.imgIndex].childNodes[0];
        let react = target.getBoundingClientRect();
        // 判断点击的位置是否在该Class内
        if (evt.clientX >= react.left && evt.clientX <= react.right && evt.clientY >= react.top && evt.clientY <= react.bottom) {
          e.preventDefault();//取消默认的浏览器自带右键
          let evt = window.event || arguments[0];
          let menu = document.getElementById('menu');//获取右键菜单
          let container = document.querySelector(".assets");
          /*获取当前鼠标右键按下后的位置，据此定义菜单显示的位置*/
          let rightEdge = container.clientWidth - evt.clientX;
          let bottomEdge = container.clientHeight - evt.clientY;
          /*如果从鼠标位置到容器右边的空间小于菜单的宽度，就定位菜单的左坐标（Left）为当前鼠标位置向左一个菜单宽度*/
          if (rightEdge < menu.offsetWidth) {
            menu.style.left = container.scrollLeft + evt.clientX - menu.offsetWidth + "px";
          } else { /*否则，就定位菜单的左坐标为当前鼠标位置*/
            menu.style.left = container.scrollLeft + evt.clientX + "px";
          }
          /*如果从鼠标位置到容器下边的空间小于菜单的高度，就定位菜单的上坐标（Top）为当前鼠标位置向上一个菜单高度*/
          if (bottomEdge < menu.offsetHeight) {
            menu.style.top = container.scrollTop + evt.clientY - menu.offsetHeight + "px";
          } else {/*否则，就定位菜单的上坐标为当前鼠标位置*/
            menu.style.top = container.scrollTop + evt.clientY + "px";
          }
          /*设置菜单可见*/
          menu.style.visibility = "visible";
        } else {
          document.getElementById('menu').style.visibility = 'hidden';
        }
      }
      window.onclick = function (e) {//关闭右键菜单
        this_.$parent.imgIndex = -1;
        try {
          document.getElementById('menu').style.visibility = 'hidden';　//用户触发click事件就可以关闭了，因为绑定在window上，按事件冒泡处理，不会影响菜单的功能
        }catch (e){
          console.log("%c没有报错!没有报错!没有报错!", "color: #70C5B3")
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.menuSec {
  #menu {
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .15);
    visibility: hidden;
    position: absolute;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    overflow: hidden;
    background-color: white;

    span {
      text-align: center;
      cursor: pointer;
      padding: 10px 30px;
      transition: background-color .2s;

      &:hover {
        background-color: rgba(0, 0, 0, .1);
        transition: background-color .2s;
      }
    }
  }
}
</style>
