<template>
  <div class="cover">
    <div class="title">
      <span>Cover.<font-awesome-icon icon="fa-solid fa-image"/></span>
      <font-awesome-icon icon="fa-solid fa-fan"/>
    </div>
    <div class="scroll blue-white-scroll">
      <div class="item" v-for="(url, index) in list" :key="index">
        <div class="border">
          <div class="image">
            <img @click="$ShowImage(url)" :src="url + '?x-oss-process=style/large'" alt=""/>
          </div>
          <div class="copy-shadow"></div>
          <div class="copy" @click="$copyUrl(url)">
            <font-awesome-icon icon="fa-solid fa-clipboard"/>
            <span>copy</span>
          </div>
          <font-awesome-icon @click="remove(index)" class="remove" icon="fa-solid fa-circle-xmark" />
        </div>
      </div>
    </div>
    <div class="background"></div>
  </div>
</template>

<script>
import {all} from "@/js/api/cover";

export default {
  name: "cover",
  data() {
    return {
      defaultImg: "https://alioss.xiamoqwq.com/xiamo/WordPress/2022/02/20220214072108405.png?x-oss-process=style/large",
      list: []
    }
  },
  created() {
    this.initCover();
  },
  methods: {
    initCover() {
      all().then((res) => {
        this.list = res;
      })
    },
    remove(index){
      this.$xmMessage.error(index)
      let msg = document.querySelector(".message");
      console.log(msg.clientHeight)
    }
  }
}
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
