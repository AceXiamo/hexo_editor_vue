<template>
  <div id="app">
    <transition name="fade">
      <router-view class="router"></router-view>
    </transition>
    <editor-menu></editor-menu>
  </div>
</template>
<script>
import EditorMenu from "@/components/editorMenu";
export default {
  name: "App",
  components: { EditorMenu }
};
</script>

<style lang="scss" scoped>
.router {
  position: fixed;
}
.fade-enter-active,
.fade-leave-active {
  position: absolute;
  top: 0;
  z-index: 1;
  transform: translateX(0);
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  position: absolute;
  opacity: 0;
  transform: translateX(-10%);
}
</style>
