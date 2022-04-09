<template>
  <div class="animeArea">
    <div class="images-scale">
      <div
        class="item"
        @contextmenu.prevent="$parent.imgIndex = index"
        :style="{
          width: 'calc(100% / ' + lineNum + ')',
          'padding-bottom': 'calc(100% / ' + lineNum + ')',
        }"
        v-for="(url, index) in images"
        :key="index"
      >
        <div :class="['img', ani ? 'img-hover' : '']">
          <font-awesome-icon
            @mouseenter="ani = true"
            @mouseleave="ani = false"
            v-if="showDel"
            @click="del(url)"
            class="del-icon"
            :icon="['fas', 'circle-xmark']"
          />
          <img
            @error="imgErr"
            v-if="urlKey"
            :src="url[urlKey] + suffix"
            @click="imgShow(url[urlKey])"
            :key="url[urlKey]"
            alt=""
          />
          <img
            @error="imgErr"
            v-else
            :src="url + suffix"
            @click="imgShow(url)"
            :key="url"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuSec from "./menuSec";

export default {
  name: "animeArea",
  components: { MenuSec },
  props: ["images", "lineNum", "showDel", "urlKey"],
  data() {
    return {
      ani: false,
      suffix: "?x-oss-process=image/resize,m_fill,w_400,h_400/format,webp",
      gif: "https://alioss.xiamoqwq.com/gif/9080607321ab98fa3e70dd24b2513a20.gif",
    };
  },
  methods: {
    imgShow(url) {
      if (this.$parent.imgIndex === -1) {
        this.$ShowImage(url);
      }
    },
    imgErr(e) {
      let img = e.target;
      img.src =
        "https://xiamo.oss-accelerate.aliyuncs.com/xiamo_avatar/2022021110100804966854.gif";
    },
  },
};
</script>

<style scoped lang="scss">
.img-area {
  height: 100%;

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
        animation: del-ani 0.35s infinite !important;
        transition: all 0.5s;
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
        transition: all 0.5s;

        .del-icon {
          color: #ffd779;
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

        > input[type="file"] {
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
