<template>
  <div class="shuo">
    <div class="item">
      <div class="content id-card">
        <span class="title">ID Card</span>
        <div class="info">
          <img class="avatar" src="https://qwq.link/images/avatar.jpg" />
          <div class="uid">
            <div>UID</div>
            <span>20</span>
          </div>
          <div class="nick">
            <div>nick</div>
            <div class="input-line">
              <input type="text" v-model="info.nickname" />
              <font-awesome-icon :icon="['fas', 'check-circle']" />
            </div>
          </div>
          <div class="key">
            <div>Key</div>
            <div class="input-line">
              <input type="text" v-model="info.key" />
              <font-awesome-icon :icon="['fas', 'check-circle']" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="content his">
        <span class="title">History</span>
        <div class="his-border">
          <div class="line">
          <div class="line-item" v-for="index of 10" :key="index">
            <div class="hover his-c">
              <div class="user">
                <img src="https://qwq.link/images/avatar.jpg" />
                <span>xiamo</span>
              </div>
              <div class="ani-p">
                <div class="shuo-c">
                  <div class="text">
                    emmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
                  </div>
                  <div class="img-c">
                    <div class="img-border" v-for="index1 of 5" :key="index1">
                       <div class="img-p">
                         <img :src="img" />
                       </div>
                    </div>
                  </div>
                </div>
                <span class="time">发布于 2022-02-07 14:00</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="content">
        <span class="title">Add</span>
      </div>
    </div>
    <img
      class="background"
      src="https://xiamo.oss-accelerate.aliyuncs.com/xiamo/WordPress/2022/01/20220124085336334.jpg"
    />
  </div>
</template>

<script>
export default {
  name: "shuo",
  data() {
    return {
      info: {
        nickname: "xiamo",
        key: "8622a994c2bc48b884b43b261f46495a"
      },
      img:
        "https://xiamo.oss-accelerate.aliyuncs.com/xiamo_avatar/202112221049337302542.jpg"
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
