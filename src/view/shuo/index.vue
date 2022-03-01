<template>
  <div class="shuo">
    <div class="background-filter"></div>
    <div class="content">
      <div class="left">
        <div class="user">
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
          <textarea v-model="shuo" :class="['area-content', shuo?'area-content-focus':'']"></textarea>
          <span class="title">你指尖跃动的电光，是我此生不灭的信仰...</span>
          <div class="images">
            <div class="item" v-for="index of 6">
              <div class="img"><img src="https://qwq.link/images/avatar.jpg" alt=""/></div>
            </div>
            <div class="item">
              <div class="img-sel">
                <font-awesome-icon :icon="['fas', 'plus']" />
              </div>
            </div>
          </div>
          <div class="sub"><span>发 送</span></div>
        </div>
      </div>
      <div class="right">
        <div class="message">

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
      shuo: ""
    };
  },
  mounted() {
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
