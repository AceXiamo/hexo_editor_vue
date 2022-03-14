<template>
  <div name="image-dialog">
    <transition name="ani">
      <div class="border" v-if="show" @click="show = false">
        <div class="content">
          <i class="el-icon-arrow-left" v-if="urls.length > 0" @click.stop="last()"></i>
          <img @click.stop :src="urls.length > 0 ? urls[index] : url" alt=""/>
          <i class="el-icon-arrow-right" v-if="urls.length > 0" @click.stop="next()"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ShowImage",
  data() {
    return {
      url: "",
      urls: [],
      index: 0,
      show: false,
    }
  },
  methods: {
    last() {
      if (this.index > 0) {
        this.index--;
      }
    },
    next() {
      if (this.index < this.urls.length - 1) {
        this.index++;
      }
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

  .content {
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      font-weight: 700;
      color: white;
      background: #409eff;
      border-radius: 100%;
      padding: 5px;
      font-size: 23px;
    }

    img {
      margin: 0 15px;
      max-width: 1000px;
      max-height: 800px;
    }
  }
}
</style>
