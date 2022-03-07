<template>
  <div class="menu-bar">
    <span
      :class="[item.class, active == item.class ? 'menu-active' : '']"
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
  data() {
    return {
      active: "",
      menu: [
        {
          name: "Hexo编辑器",
          class: "hexo",
          path: "/hexo"
        },
        {
          name: "Cover>封面图",
          class: "cover",
          path: "/cover"
        },
        {
          name: "说说",
          class: "shuo",
          path: "/shuo"
        },
        {
          name: "插画&Upload",
          class: "image",
          path: "/image"
        }
      ]
    };
  },
  mounted() {
    this.acitve();
  },
  methods: {
    to(path) {
      this.$router.push(path);
      this.acitve();
    },
    acitve() {
      let path = this.$route.path;
      this.active = path.split("/")[1];
    }
  }
};
</script>
<style lang="scss" scoped>
.menu-bar {
  position: absolute;
  left: 30px;
  bottom: 0;
  z-index: 99;

  $bottom: 15px;
  > span {
    padding: 5px 10px 5px 10px;
    color: white;
    line-height: 10px;
    border-radius: 15px 15px 0 0;
    font-size: 12px;
    margin-right: 10px;
    position: relative;
    bottom: 5px;
    cursor: default;
    transition: all 0.2s;
    &:hover {
      transition: all 0.2s;
      padding-bottom: $bottom;
      bottom: $bottom;
    }
  }
  .menu-active {
    transition: all 0.2s;
    padding-bottom: $bottom;
    bottom: $bottom;
  }
  .hexo {
    background-color: #00caff;
  }
  .cover {
    background-color: #efad70;
  }
  .shuo {
    background-color: #eba2e6;
  }
  .image {
    background-color: #48c088;
  }
}
</style>
