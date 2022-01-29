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
           <div class="line">
             <!-- <div class="line-item" v-for="index of 5" :key="index">
                <div class="text">
                  qwqwqwqwqwqwqwqwq
                </div>
                <div class="image">
                  <div v-for="index of 5" :key="index">
                    <div>
                      <img src="https://image.qwq.link/images/2021/11/13/BE2962FD-639C-4E87-9943-2C9D6246B1DD.jpg"/>
                    </div>
                  </div>
                </div>
             </div> -->
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
      info:{
        nickname: "xiamo",
        key: "8622a994c2bc48b884b43b261f46495a",
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
