<template>
  <div id="app">
    <router-view/>
    <editor-menu></editor-menu>
  </div>
</template>
<script>
import EditorMenu from "@/components/editorMenu";
export default {
  name: 'App',
 components: { EditorMenu },
}
</script>

<style lang="scss">
</style>
