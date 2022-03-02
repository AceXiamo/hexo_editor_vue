<template>
  <div name="ShowVideo">
    <transition name="ani">
      <div class="border" v-if="show" @click="show = false">
        <div class="content" @click.stop>
          <video :src="url" controls="controls" autoplay></video>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ShowVideo",
  data() {
    return {
      url: "",
      show: false,
    }
  }
}
</script>

<style lang="scss" scoped>
.ani-enter-active,
.ani-leave-active {
  opacity: 1;
  transition: all 0.3s;
}

.ani-enter,
.ani-leave-to {
  opacity: 0;
}

.border {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, .3);

  .content{
    video{
      width: 65vw;
      max-height: 72vh;
    }
  }
}
</style>
