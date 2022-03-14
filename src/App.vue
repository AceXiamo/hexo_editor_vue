<template>
  <div id="app">
    <transition name="fade">
      <router-view class="router"></router-view>
    </transition>
    <editor-menu :hide="hide"></editor-menu>
  </div>
</template>
<script>
import EditorMenu from "@/components/editorMenu";

export default {
  name: "App",
  components: {EditorMenu},
  data() {
    return {
      hide: false
    }
  },
  watch: {
    $route(to, from) {
      this.menuHandle(to.path)
    }
  },
  created() {
    let path = this.$route.path;
    this.menuHandle(path);
  },
  methods: {
    menuHandle(path) {
      if (path === '/login') this.hide = true
      else this.hide = false
    }
  }
};
</script>

<style lang="scss" scoped>
.router {
  position: fixed;
}
</style>
