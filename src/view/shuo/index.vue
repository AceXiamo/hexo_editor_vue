<template>
  <div class="shuo">
    <div class="background-filter"></div>
    <canvas id="yuki"></canvas>
    <div class="scroll orange-white-scroll" @scroll="scrollChange">
      <div class="content">
        <div class="left">
          <div :class="['user']">
            <div class="top">
              <div class="user-img"></div>
              <div class="user-info">
                <img src="https://qwq.link/images/avatar.jpg" alt="">
                <span>浅末saki</span>
              </div>
            </div>
            <div class="bottom">
              <div class="title">
                <span>#</span>
                <span>Config</span>
              </div>
              <div class="user-config">
                <div class="row">
                  <div>昵称:</div>
                  <input type="text"/>
                </div>
                <div class="row">
                  <div>key:</div>
                  <input type="text"/>
                </div>
                <div class="save-btn">
                  <div>保 存</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="center">
          <div class="add">
            <textarea v-model="content"
                      :class="['area-content', 'blue-white-scroll', content?'area-content-focus':'']"></textarea>
            <span class="title">你指尖跃动的电光，是我此生不灭的信仰...</span>
            <div class="images-scale">
              <div class="item" v-for="index of 6">
                <div class="img"><img src="https://qwq.link/images/avatar.jpg" alt=""/></div>
              </div>
              <div class="item">
                <div class="img-sel">
                  <font-awesome-icon :icon="['fas', 'plus']"/>
                </div>
              </div>
            </div>
            <div class="sub"><span>发 送</span></div>
          </div>
          <div class="his-content" v-for="(data,index) in list" :key="index">
            <div class="user">
              <div class="left">
                <img alt="" :src="data.avatar"/>
              </div>
              <div class="right">
                <span>{{ data.nickname }}</span>
                <span>{{ data.createTime }}</span>
              </div>
            </div>
            <div class="text-area">
              <span>{{ data.text }}</span>
            </div>
            <div class="img-area" v-if="data.images.length > 0">
              <div class="images-scale">
                <div class="item" v-for="img in data.imgs">
                  <div class="img" @click="$ShowImage(img)"><img :src="img" alt=""/></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="message">
            <img src="https://alioss.xiamoqwq.com/gif/41c4d0a159b80ec48e50a26de1374041.gif">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shuo",
  data() {
    return {
      info: {
        img: "https://xiamo.oss-accelerate.aliyuncs.com/xiamo_avatar/202112221049337302542.jpg",
        nickname: "xiamo",
        key: "8622a994c2bc48b884b43b261f46495a"
      },
      content: "",
      scrollV: 0,
      apiUrl: "https://tree.qwq.link/api/tbShuoshuo/list",
      params: {
        offset: 0,
        limit: 100,
        userId: 22,
      },
      list: []
    };
  },
  mounted() {
    this.$yuki();
    this.loadShuo();
  },
  methods: {
    scrollChange(e) {
      // 距离顶部的高度
      this.scrollV = e.target.scrollTop;
    },
    loadShuo(){
      this.$axios.get(this.apiUrl, {
        params: this.params
      }).then(res => {
        this.list = res.data.data;
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
