<template>
  <div class="assets">
    <div class="menu">
      <div class="menu-item">
        <div class="title">类型</div>
        <div class="type-border">
          <div class="transition">
            <div class="type-list">
              <div>ALL</div>
              <div>风景画</div>
              <div>原神</div>
              <div>Anime</div>
            </div>
            <div class="check-list">
              <div>
                <font-awesome-icon :icon="['fas', 'check']"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="menu-item">
        <div class="title">画师</div>
        <div class="type-border">
          <div class="transition">
            <div class="type-list">
              <div>ALL</div>
              <div>40原</div>
              <div>甘城なつき</div>
              <div>Miloecute</div>
            </div>
            <div class="check-list">
              <div>
                <font-awesome-icon :icon="['fas', 'check']"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info blue-white-scroll">
      <div class="img-area">
        <div class="images-scale">
          <div class="item" v-for="url in list">
            <div class="img" @click="$ShowImage(url)"><img :src="url" alt=""/></div>
          </div>
        </div>
      </div>
    </div>
    <div :class="['load', loading?'load-show':'']">
      <div class="border">
        <font-awesome-icon :icon="['fas', 'spinner']"/>
      </div>
    </div>
    <div :class="['mask', loading?'mask-show':'']"></div>
  </div>
</template>

<script>
export default {
  name: "assets",
  data() {
    return {
      imgUrl: "https://alioss.xiamoqwq.com/xiamo/WordPress/2020/05/1865c7433ff77983d9f83fc3661c2871.jpg?x-oss-process=image/format,webp#",
      list: [],
      windowHeight: window.innerHeight,
      scrollV: 0,
      loading: false
    };
  },
  mounted() {
    this.emm()
    this.scrollListen();
  },
  methods: {
    scrollListen() {
      window.addEventListener("scroll", (e) => {
        let scroll = document.querySelector('.info');
        if (scroll) {
          this.scrollV = scroll.scrollTop;
          if (this.scrollV === scroll.scrollHeight - scroll.clientHeight) {
            this.loadData()
          }
        }
      }, true)
    },
    loadData(){
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.emm()
      }, 2000)
    },
    emm(){
      for (let i = 0; i <= 10; i++) {
        this.list.push(this.imgUrl);
        this.list.push("https://xiamo.oss-accelerate.aliyuncs.com/xiamo/WordPress/2022/02/20220214072108405.png?x-oss-process=image/format,webp#")
        this.list.push("https://xiamo.oss-accelerate.aliyuncs.com/xiamo/WordPress/2021/11/20211124181554702.jpg?x-oss-process=image/format,webp#")
        this.list.push("https://xiamo.oss-accelerate.aliyuncs.com/xiamo/WordPress/2021/10/348a87abc5f0870ed4d0e6085fd032fb.png?x-oss-process=image/format,webp#")
        this.list.push("https://xiamo.oss-accelerate.aliyuncs.com/xiamo/WordPress/2021/07/ccf42d2e79d0c5d0b583a4ad66d2a6be.jpg?x-oss-process=image/format,webp#")
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
