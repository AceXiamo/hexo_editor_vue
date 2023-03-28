<template>
  <div :class="['menu-bar', hide?'hide':'']">
    <span
      :class="[item.key, active === item.key ? 'menu-active' : '']"
      :style="{'background-color': item.color}"
      v-for="(item, i) in menu"
      @click="to(item.path)"
      :key="i"
    >{{ item.name }}</span
    >
  </div>
</template>

<script>
export default {
  name: "editor-menu",
  props: ['hide'],
  data() {
    return {
      active: "",
      menu: [
        {
          name: "✨ Hexo编辑器",
          key: "hexo",
          path: "/hexo",
          color: '#00caff90'
        },
        {
          name: "🍭 Cover>封面图",
          key: "cover",
          path: "/cover",
          color: '#FF6B6B90'
        },
        {
          name: "🍒 说说",
          key: "shuo",
          path: "/shuo",
          color: '#eba2e690'
        },
        {
          name: "🥕 插画&Upload",
          key: "image",
          path: "/image",
          color: '#48c08890'
        }
        ,
        {
          name: "🍁 文件",
          key: "file",
          path: "/file",
          color: '#A66CFF90'
        }
      ]
    };
  },
  mounted() {
    this.activeHandle();
  },
  methods: {
    to(path) {
      this.$router.push(path);
      this.activeHandle();
    },
    activeHandle() {
      let path = this.$route.path;
      this.active = path.split("/")[1];
    }
  }
};
</script>
<style lang="scss" scoped>
.hide {
  opacity: 0 !important;
  transition: all .5s;
}

.menu-bar {
  position: absolute;
  left: 30px;
  bottom: 0;
  z-index: 99;
  opacity: 1;
  transition: all .5s;

  $bottom: 15px;

  > span {
    padding: 5px 10px 5px 10px;
    color: white;
    line-height: 10px;
    border-radius: 15px 15px 0 0;
    font-size: 12px;
    margin-right: 10px;
    position: relative;
    bottom: 0;
    cursor: default;
    transition: all 0.2s;

    &:hover {
      transition: all 0.2s;
      padding-bottom: $bottom;
      bottom: $bottom - 5px;
    }
  }

  .menu-active {
    transition: all 0.2s;
    padding-bottom: $bottom;
    bottom: $bottom - 5px;
  }

}
</style>
