<template>
  <div class="login">
    <div class="left">
      <div class="bg_bottom"></div>
      <div class="bg_top"></div>
      <div class="filter"></div>
    </div>
    <div class="right">
      <div class="title">
        <div v-for="index of 2"><span>🍭</span> <span>Hexo Editor</span></div>
      </div>
      <div class="login-content">
        <div class="username">
          <input type="text" v-model="username" placeholder="username...">
          <div :class="['border', username?'input-border':'']"></div>
        </div>
        <div class="password" :class="[password?'input-border':'']">
          <input type="password" @keyup.enter="toEdit" v-model="password" placeholder="password...">
          <div :class="['border', password?'input-border':'']"></div>
        </div>
        <div class="btn" @click="toEdit">
          <span>登 陆</span>
        </div>
      </div>
      <div class="foot">
        powered by xiamo@2021 <span>💤</span>
      </div>
      <div class="background">
        <img class="neko" src="https://alioss.xiamoqwq.com/素材/202204291433062302.png" alt=""/>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from "@/js/api/user";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      imgList: [],
      bgInter: {},
      nextBg: "top",
      bgIndex: 0,
      bgTop: document.querySelector(".bg_top"),
      bgBottom: document.querySelector(".bg_bottom"),
    };
  },
  mounted() {
    this.initBackground();
    this.bgHandle();
  },
  methods: {
    initBackground() {
      this.imgList.push("https://alioss.xiamoqwq.com/anime_pic/20220312143373655.png?x-oss-process=style/large");
      this.imgList.push("https://alioss.xiamoqwq.com/anime_pic/2022032811393490123.jpg?x-oss-process=style/large");
      this.imgList.push("https://alioss.xiamoqwq.com/anime_pic/20220427935468138.jpg?x-oss-process=style/large");
      this.imgList.push("https://alioss.xiamoqwq.com/anime_pic/2022031220274637629.jpg?x-oss-process=style/large");
      this.imgList.push("https://alioss.xiamoqwq.com/anime_pic/20220427964812556.jpg?x-oss-process=style/large");
      this.imgList.push("https://alioss.xiamoqwq.com/anime_pic/2022041817361259360.jpg?x-oss-process=style/large");
      this.imgList.push("https://alioss.xiamoqwq.com/anime_pic/202203151446394315.jpg?x-oss-process=style/large");
    },
    bgHandle() {
      let top = document.querySelector(".bg_top");
      let bottom = document.querySelector(".bg_bottom");
      this.bgSwitch(top, bottom);
      this.bgInter = setInterval(() => {
        this.bgSwitch(top, bottom);
      }, 5000)
    },
    bgSwitch(top, bottom) {
      if (this.nextBg === "top") {
        this.nextBg = "bottom";
        bottom.setAttribute("class", "bg_bottom background-ani");
        bottom.style.cssText = "background-image: url('" + this.imgList[this.bgIndex] + "')";
        top.setAttribute("class", "bg_top");
        setTimeout(() => {
          top.style.cssText = "background-image: url('" + this.imgList[this.bgIndex] + "'); opacity: 1; z-index: -1;";
        }, 4750)
      } else {
        this.nextBg = "top";
        top.setAttribute("class", "bg_top background-ani");
        top.style.cssText = "background-image: url('" + this.imgList[this.bgIndex] + "')";
        bottom.setAttribute("class", "bg_bottom");
        setTimeout(() => {
          bottom.style.cssText = "background-image: url('" + this.imgList[this.bgIndex] + "'); opacity: 1; z-index: -1;";
        }, 4750)
      }
      this.bgIndex++;
      if (this.bgIndex >= this.imgList.length) this.bgIndex = 0;
    },
    toEdit() {
      if (!(this.username && this.password)) {
        this.$xmMessage.success("💢");
        return
      }
      login({username: this.username, password: this.password}).then(
        res => {
          if (res.code === 200) {
            this.$cookies.set("token", res.data.code);
            this.$cookies.set("user", {
              username: this.username,
              password: this.password,
              shuo: res.data.shuo
            });
            if (res.data.ali) {
              localStorage.setItem("ali", JSON.stringify({
                accessKeyId: res.data.ali.AccessKeyId,
                accessKeySecret: res.data.ali.AccessKeySecret,
                bucket: res.data.ali.Bucket,
                ossHost: res.data.ali.OssHost,
                region: res.data.ali.Region
              }))
            }
            // 初始化阿里云OSS
            this.$AliOSSInit();
            this.$xmMessage.success("登陆成功~");
            this.$router.push("/");
          } else {
            this.$xmMessage.error(res.msg);
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
