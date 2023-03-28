<template>
  <div class="cover">
    <div class="title">
      <span>Cover.<font-awesome-icon icon="fa-solid fa-image"/></span>
      <div>
        <font-awesome-icon icon="fa-solid fa-fan"/>
        <input type="file" @change="upload"/>
      </div>
    </div>
    <div class="scroll blue-white-scroll">
      <div class="item" v-for="(url, index) in list" :key="index">
        <div class="border">
          <div class="image">
            <img @click="$ShowImage(url)" :src="url + '?x-oss-process=style/medium'" alt=""/>
          </div>
          <div class="copy-shadow"></div>
          <div class="copy" @click="$copyUrl(url)">
            <font-awesome-icon icon="fa-solid fa-clipboard"/>
            <span>copy</span>
          </div>
          <font-awesome-icon @click="remove(index)" class="remove" icon="fa-solid fa-circle-xmark"/>
        </div>
      </div>
    </div>
    <div class="cover-background"></div>
  </div>
</template>

<script>
import {all} from "@/js/api/cover";

export default {
  name: "Cover",
  data() {
    return {
      defaultImg: "https://alioss.xiamoqwq.com/xiamo/WordPress/2022/02/20220214072108405.png?x-oss-process=style/large",
      list: [],
      ossHost: '',
    }
  },
  created() {
    let ali = localStorage.getItem("ali");
    ali = JSON.parse(ali)
    this.ossHost = ali['ossHost'] + '/';
    this.initCover();
  },
  methods: {
    initCover() {
      all().then((res) => {
        this.list = res.data.reverse();
      })
    },
    async remove(index) {
      await this.$submitCover(index, "", this);
      this.initCover();
    },
    async upload(e) {
      let file = e.target.files[0];
      let res = await this.$globalUploadFile(file, "/cover/");
      let url = this.ossHost + res.name;
      await this.$submitCover(-1, url, this)
      this.initCover();
    },
  }
}
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
