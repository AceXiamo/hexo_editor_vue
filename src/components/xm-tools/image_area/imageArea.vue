<template>
  <div class="img-area">
    <div class="images-scale">
      <div class="item" :style="{'width': 'calc(100% / '+lineNum+')', 'padding-bottom': 'calc(100% / '+lineNum+')'}"
           v-for="url in images">
        <div :class="['img', ani?'img-hover':'']">
          <font-awesome-icon @mouseenter="ani = true" @mouseleave="ani = false" v-if="showDel" @click="del(url)"
                             class="del-icon" :icon="['fas', 'circle-xmark']"/>
          <img v-if="urlKey" :src="url[urlKey] + suffix" @click="$ShowImage(url[urlKey])" alt=""/>
          <img v-else :src="url + suffix" @click="$ShowImage(url)" alt=""/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "imageArea",
  props: ['images', 'lineNum', 'showDel', 'urlKey'],
  data() {
    return {
      ani: false,
      suffix: "?x-oss-process=image/format,webp#"
    }
  },
  methods: {
    del(url) {
      this.images.splice(this.images.indexOf(url), 1)
    }
  }
}
</script>

<style scoped lang="scss">
.img-area {
  .images-scale {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 5px;

    .item {
      width: 20%;
      height: 0;
      padding-bottom: 20%;
      position: relative;

      .img-hover {
        animation: del-ani .35s infinite !important;
        transition: all .5s;
      }

      .img {
        position: absolute;
        margin: 5px;
        border: 5px solid rgba(0, 0, 0, 0.03);
        border-radius: 7px;
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        display: flex;
        justify-content: center;
        align-items: center;
        animation: unset;
        transition: all .5s;

        .del-icon {
          color: #FFD779;
          position: absolute;
          top: 0;
          right: 0;
          font-size: 18px;
          transform: translateY(-50%) translateX(50%);
        }

        img {
          border-radius: 5px;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .img-sel {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px dashed #bdc0c5;
        margin: 10px;
        color: #bdc0c5;

        > input[type='file'] {
          opacity: 0;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }
      }
    }
  }
}

@keyframes del-ani {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(1deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-1deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
