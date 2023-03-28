<template>
  <div class="shuo">
    <div class="background-filter"></div>
    <canvas id="yuki"></canvas>
    <div class="scroll orange-white-scroll">
      <div class="content">
        <div class="left">
          <div :class="['user']">
            <div class="top">
              <div class="user-img">
                <img
                  src="https://alioss.xiamoqwq.com/xiamo/WordPress/2022/02/20220214072108405.png?x-oss-process=style/large"
                  alt=""
                />
              </div>
              <div class="user-info">
                <img :src="info.avatar" alt=""/>
                <span>{{ info.nickname }}</span>
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
                  <input type="text" v-model="info.nickname"/>
                </div>
                <div class="row">
                  <div>key:</div>
                  <input type="text" v-model="info.userKey"/>
                </div>
                <div class="save-btn">
                  <div @click="saveUser()">保 存</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="center">
          <div class="add">
            <textarea
              v-model="content"
              :class="[
                'area-content',
                'blue-white-scroll',
                content ? 'area-content-focus' : '',
              ]"
            ></textarea>
            <span class="title">你指尖跃动的电光，是我此生不灭的信仰...</span>
            <div class="images-scale">
              <div class="item" v-for="(img, index) in fileList" :key="index">
                <div class="img">
                  <img :src="img.status ? img.url + '?x-oss-process=image/format,webp#' : uploadGif" alt=""/>
                </div>
              </div>
              <div class="item">
                <div class="img-sel">
                  <input type="file" @change="uploadChange"/>
                  <font-awesome-icon :icon="['fas', 'plus']"/>
                </div>
              </div>
            </div>
            <div class="sub"><span @click="submit">发 送</span></div>
          </div>
          <transition name="s-zero-ani">
            <div :class="['list-size-0']" v-if="zero">
              <canvas id="nos"></canvas>
              <span>快发布第一条说说吧!</span>
              <img
                src="https://alioss.xiamoqwq.com/anime_pic/hutao.png"
                alt=""
              />
            </div>
          </transition>
          <div
            :class="[
              'his-content',
              'his-hide',
              showIndex >= index ? 'his-show' : '',
              'shuo' + index,
            ]"
            v-for="(data, index) in list"
            :key="index"
          >
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
                <div
                  class="item"
                  v-for="(img, index) in data.imgs"
                  :key="index"
                >
                  <div class="img" @click="$ShowImage(img)">
                    <img :src="img + '?x-oss-process=image/format,webp#'" alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="his-content his-end">
            <img
              @click="toTop"
              :class="[scrollV > 0 ? 'to-top' : '']"
              src="https://alioss.xiamoqwq.com/插画/kaili.png"
              alt=""
            />
            <div class="msg-bubble">
              <!--              <span>やばいですね</span>-->
              <span>牙 白 得 死 内!!!</span>
              <span>要返回顶部吗?</span>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="message">
            <div class="api-content">
              <div class="content-row">
                <div class="api-content-title">
                  <span>#</span>
                  <span>Tree</span>
                </div>
                <div class="url">https://tree.qwq.link</div>
              </div>
              <div class="content-row">
                <div class="api-content-title">
                  <span>#</span>
                  <span>API地址</span>
                </div>
                <div class="code">
                  https://tree.qwq.link/api/tbShuoshuo/list
                </div>
              </div>
              <div class="content-row">
                <div class="params-title">
                  <span>#</span>
                  <span>Params</span>
                </div>
                <div class="params-item">
                  <span>userId</span>
                  <span>{{ info.id }}</span>
                </div>
              </div>
            </div>
            <div class="end">
              <img
                src="https://alioss.xiamoqwq.com/gif/41c4d0a159b80ec48e50a26de1374041.gif"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {saveSKey} from "@/js/api/user";

export default {
  name: "Shuo",
  data() {
    return {
      info: {
        avatar: "",
        nickname: "",
        userKey: "",
      },
      content: "",
      scrollV: 0,
      apiUrl: "shuo_api/tbShuoshuo/list",
      apiUser: "shuo_api/tbUser/update",
      apiUserAdd: "shuo_api/tbUser/genAuth",
      apiSub: "shuo_api/tbShuoshuo/addSS",
      params: {
        offset: 0,
        limit: 100,
      },
      list: [],
      windowHeight: window.innerHeight,
      showIndex: -1,
      fileList: [],
      ossHost: "https://alioss.xiamoqwq.com/",
      uploadGif:
        "https://xiamo.oss-accelerate.aliyuncs.com/xiamo_avatar/2022021110100804966854.gif",
      zero: false,
    };
  },
  async mounted() {
    await this.initUser();
    await this.loadShuo();
    await this.initList();
    this.scrollListen();
  },
  beforeDestroy() {
    // 销毁前移除监听事件，destroy 中无效
    window.removeEventListener(
      "scroll",
      this.scrollEvent,
      true
    );
  },
  methods: {
    async submit() {
      if (!this.content) {
        this.$xmMessage.error("请先输入说说内容!");
        return;
      }
      let data = {};
      data.userKey = this.info.userKey;
      data.text = this.content;
      data.images = "";
      if (this.fileList && this.fileList.length > 0) {
        this.fileList.forEach((v) => {
          data.images += v.url + ",";
        });
        data.images = data.images.substring(0, data.images.length - 1);
      }
      let res = await this.$axios.post(this.apiSub, data);
      if (res.data.code === 200) {
        this.content = "";
        this.fileList = [];
        this.$xmMessage.success("发布成功!");
        await this.loadShuo();
        await this.initList();
      } else {
        this.$xmMessage.error("服务报错啦!");
      }
    },
    async uploadChange(e) {
      let file = e.target.files[0];
      let date = new Date();
      let path = "/shuo";
      path += "/" + date.getFullYear();
      path += "/" + (date.getMonth() + 1);
      path += "/" + date.getDate();
      let data = {};
      data.url = "";
      data.status = false;
      this.fileList.push(data);
      let res = await this.$globalUploadFile(file, path);
      data.status = true;
      data.url = this.ossHost + res.name;
    },
    toTop() {
      let scroll = document.querySelector(".scroll");
      // 滚动条的初始位置
      let initTop = scroll.scrollTop;
      // 定时器运行间隔, 结束时间
      let intervalMS = 10,
        endMS = 500;
      let one = (initTop * intervalMS) / endMS;

      let interval;
      let interF = () => {
        initTop -= one;
        scroll.scrollTop = initTop;
        if (initTop <= 0) clearInterval(interval);
      };
      interval = setInterval(interF, intervalMS);
    },
    initList() {
      let last = 0;
      for (let i = 0; i <= this.list.length - 1; i++) {
        let s = document.querySelector(".shuo" + i);
        if (s.offsetTop <= this.windowHeight) {
          last = i;
        }
      }
      let interval = setInterval(() => {
        this.showIndex++;
        if (this.showIndex >= last) {
          clearInterval(interval);
        }
      }, 100);
    },
    scrollListen() {
      window.addEventListener(
        "scroll",
        this.scrollEvent,
        true
      );
    },
    scrollEvent(e) {
      let scroll = document.querySelector(".scroll");
      if (scroll) {
        this.scrollV = scroll.scrollTop;
        this.indexHandle(
          this.showIndex,
          scroll.scrollTop + this.windowHeight
        );
      }
    },
    indexHandle(index, scrollV) {
      if (index < this.list.length - 1) {
        index++;
        let s = document.querySelector(".shuo" + index);
        if (s.offsetTop <= scrollV) {
          this.indexHandle(index, scrollV);
        } else {
          this.showIndex = index - 1;
        }
      } else {
        this.showIndex = index;
      }
    },
    async initUser() {
      let sUser = this.$cookies.get("shuoUser");
      if (sUser) {
        this.info = sUser;
      } else {
        let user = this.$cookies.get("user");
        if (user.shuo === "default_key_shuo") {
          // add
          let res = await this.$axios.get(this.apiUserAdd);
          this.info = res.data.data;
          this.$cookies.set("shuoUser", this.info);
          await this.updateKey(this.info.userKey, "default_key_shuo");
        } else {
          // update
          this.info.userKey = user.shuo;
          this.info.avatar = "1";
          this.info.nickname = "1";
          let res = await this.$axios.post(this.apiUser, this.info);
          this.info = res.data.data;
          // 更新缓存
          this.$cookies.set("shuoUser", this.info);
        }
      }
    },
    async updateKey(key, oldKey) {
      let res = await saveSKey({key: key, oldKey: oldKey});
      if (res.code === 200)
        console.log("%c说说用户标识更新成功!", "color: #70C5B3");
    },
    async saveUser() {
      let oldKey = this.$cookies.get("shuoUser").userKey;
      this.$axios.post(this.apiUser, this.info).then(async (res) => {
        if (res.data.code != 200) {
          this.$xmMessage.error(res.data.msg);
        } else {
          this.$xmMessage.success("修改成功!");
          this.info = res.data.data;
          // 更新缓存
          this.$cookies.set("shuoUser", this.info);
          if (this.info.userKey !== oldKey) {
            this.updateKey(this.info.userKey, oldKey);
            await this.loadShuo();
            await this.initList();
          }
        }
      });
    },
    async loadShuo() {
      this.showIndex = -1;
      this.params.userId = this.info.id;
      let res = await this.$axios.get(this.apiUrl, {
        params: this.params,
      });
      this.list = res.data.data;
      this.zero = !this.list || this.list.length < 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
