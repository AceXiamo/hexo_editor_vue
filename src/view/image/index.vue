<template>
  <div class="assets">
    <div class="menu">
      <!-- <div class="menu-item">
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
                <font-awesome-icon :icon="['fas', 'check']" />
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="menu-item">
        <div class="title">画师</div>
        <div class="type-border">
          <div class="transition">
            <div class="type-list">
              <div @click="authClick(0)">ALL</div>
              <div @click="authClick(index + 1)" v-if="index < 10" v-for="(data, index) in author">{{ data.nick }}</div>
            </div>
            <div class="check-list">
              <div :style="{'opacity': checkIndex  === 0?'1':'0'}">
                <font-awesome-icon :icon="['fas', 'check']"/>
              </div>
              <div v-for="index of 10" :style="{'opacity': checkIndex  === index?'1':'0'}">
                <font-awesome-icon :icon="['fas', 'check']"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-content">
      <div class="item">
        <div>
          <font-awesome-icon :icon="['fas', 'code']"/>
        </div>
        <span>API</span>
      </div>
    </div>
    <div class="upload">
      <div class="border" @click="uploadShow = true">
        <font-awesome-icon :icon="['fas', 'upload']"/>
      </div>
    </div>
    <div class="info blue-white-scroll">
      <anime-area
        :images="list"
        :lineNum="7"
        urlKey="url"
        ref="imgArea"
      ></anime-area>
    </div>
    <div :class="['load', loading ? 'load-show' : '']">
      <div class="border">
        <font-awesome-icon :icon="['fas', 'spinner']"/>
      </div>
    </div>
    <div :class="['mask', loading ? 'mask-show' : '']"></div>
    <transition name="fade-ani">
      <div class="upload-dialog" v-if="uploadShow" @click="close()">
        <div class="upload-mask"></div>
        <div class="upload-content" @click.stop>
          <div class="title">
            <span><font-awesome-icon :icon="['fas', 'fire']"/>Upload</span>
            <div>
              <font-awesome-icon
                @click="close()"
                :icon="['fas', 'circle-xmark']"
              />
            </div>
          </div>
          <div class="content" :style="{ height: heightV + 'px' }">
            <transition name="fade-ani">
              <div class="first" ref="first" v-if="firstShow">
                <div :class="['border', loadPixivInfo ? 'border-hide' : '']">
                  <div>
                    <font-awesome-icon :icon="['fas', 'file-image']"/>
                  </div>
                  <div>or</div>
                  <div>
                    <input
                      type="text"
                      v-model="pixivUrl"
                      @keyup.enter="imageInfo"
                    />
                  </div>
                </div>
                <div :class="['load', loadPixivInfo ? 'load-show' : '']">
                  <font-awesome-icon :icon="['fas', 'star']"/>
                </div>
              </div>
            </transition>
            <transition name="fade-ani">
              <div class="sec" ref="sec" v-if="secShow">
                <div class="border">
                  <div class="back" @click="reStart()">
                    <font-awesome-icon :icon="['fas', 'circle-chevron-left']"/>
                    <span>Re</span>
                  </div>
                  <div class="back save" @click="save()">
                    <font-awesome-icon :icon="['fas', 'circle-check']"/>
                    <span>Save</span>
                  </div>
                  <div class="top-tip">
                    <span>PS:</span>
                    <span
                    >当前找到{{
                        pixiv['pageCount']
                      }}张插画，点击图片可放大预览</span
                    >
                  </div>
                  <div class="images">
                    <image-area
                      :showDel="true"
                      :images="imgUploadList"
                      urlKey="blobUrl"
                      :hasSuffix="false"
                      :lineNum="8"
                    ></image-area>
                  </div>
                  <div class="auth-info">
                    <div class="title">插画作者</div>
                    <div class="info-form">
                      <div class="left">
                        <div class="avatar">
                          <img
                            :src="pixivUser.imageBig_blobUrl"
                            alt=""
                          />
                        </div>
                        <div class="nick">
                          <input type="text" v-model="pixivUser.name"/>
                          <input type="text" v-model="pixivUser.homeUrl"/>
                        </div>
                      </div>
                      <div class="right">
                        <img
                          :src="
                            pixivUser.background && pixivUser.background.url
                              ? pixivUser.background.url_blobUrl
                              : defaultImg
                          "
                          alt=""
                        />
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </transition>
    <menu-sec :class-name="'item'" :img-index="imgIndex"></menu-sec>
  </div>
</template>

<script>
import animeArea from "./animeArea";
import {auth, list, pixivInfo, save, del} from "../../js/api/pixiv";
import MenuSec from "./menuSec";
import ImageArea from "../../components/xm-tools/image_area/imageArea";

export default {
  name: "assets",
  components: {ImageArea, MenuSec, animeArea},
  data() {
    return {
      author: [],
      checkIndex: 0,
      defaultImg:
        "https://xiamo.oss-accelerate.aliyuncs.com/xiamo/WordPress/2022/03/20220307152150653.png?x-oss-process=image/resize,m_fill,w_2048,h_879/format,webp#",
      imgUrl:
        "https://alioss.xiamoqwq.com/xiamo/WordPress/2020/05/1865c7433ff77983d9f83fc3661c2871.jpg?x-oss-process=image/format,webp#",
      list: [],
      windowHeight: window.innerHeight,
      scrollV: 0,
      loading: false,
      uploadShow: false,
      pixivUrl: "",
      loadPixivInfo: false,
      // pixiv中的数据
      info: {},
      pixiv: {},
      firstShow: true,
      secShow: false,
      // 从pixiv中读取到的图片路径
      imgUploadList: [],
      imgUploadFileList: [],
      // 从pixiv中读取到的插画作者信息
      pixivUser: {
        imageBig: "",
      },
      heightV: 450,
      ossHost: "",
      query: {
        page: 1,
        size: 35,
        nick: ''
      },
      imgIndex: -1,
    };
  },
  mounted() {
    let ali = localStorage.getItem("ali");
    ali = JSON.parse(ali);
    this.ossHost = ali.ossHost + "/";
    this.loadData();
    this.scrollListen();
    this.loadAuthor();
  },
  beforeDestroy() {
    window.removeEventListener(
      "scroll",
      this.scrollHandle,
      true
    );
  },
  methods: {
    async delPixiv(id) {
      let res = await del({id: id});
      if (res.code === 200) {
        this.$xmMessage.success("删除成功~")
        this.reload()
      } else {
        this.$xmMessage.error("Service Error~")
      }
    },
    reload() {
      this.query.page = 1;
      this.list = []
      this.loadData();
    },
    authClick(index) {
      this.checkIndex = index
      this.list = []
      this.query.page = 1
      let author = this.author[index - 1]
      if (author) this.query.nick = author.nick
      else this.query.nick = ""
      this.loadData()
    },
    loadAuthor() {
      auth().then(res => {
        if (res.code === 200) this.author = res.data;
      })
    },
    copy(url) {
      this.$copyUrl(url);
    },
    async imageInfo() {
      if (!this.pixivUrl || !this.$isUrl(this.pixivUrl)) {
        this.$xmMessage.error("Pixiv路径错误!");
        return;
      }
      this.loadPixivInfo = true;
      let res = await pixivInfo({url: this.pixivUrl});
      if (res.code !== 200) {
        this.$xmMessage.error("获取插画失败, 请检查路径是否正确!");
      }
      this.info = res.data;
      await this.infoHandle();
    },
    async infoHandle() {
      // 取key
      let key = this.pixivUrl.split("/");
      key = key[key.length - 1];
      let pixiv = this.info['illust'][key];
      this.pixiv = pixiv;
      let userKey = Object.keys(this.info.user)[0];
      this.pixivUser = this.info.user[userKey];
      this.pixivUser.homeUrl =
        "https://www.pixiv.net/users/" + this.pixivUser.userId;
      // p0的url路径，根据此路径和 pageCount, 拼接出其它p的url
      let p0 = pixiv.urls.original;
      for (let i = 0; i < pixiv['pageCount']; i++) {
        let url = p0.replace("_p0", "_p" + i);
        let res = {};
        res.blobUrl = await this.$UrlToBlobUrl(this.$pixivRequestUrl(url));
        res.originalUrl = this.$pixivRequestUrl(url);
        this.imgUploadList.push(res);
      }
      // 提前对作者头像和主页壁纸进行缓存
      this.pixivUser.imageBig_blobUrl = await this.$UrlToBlobUrl(this.$pixivRequestUrl(this.pixivUser.imageBig))
      if (this.pixivUser.background && this.pixivUser.background.url)
        this.pixivUser.background.url_blobUrl = await this.$UrlToBlobUrl(this.$pixivRequestUrl(this.pixivUser.background.url))

      this.loadPixivInfo = false;
      this.firstShow = false;
      this.secShow = true;
      this.heightV =
        500.5 - 93.75 + Math.ceil(this.imgUploadList.length / 8) * 93.75;
    },
    close() {
      this.uploadShow = false;
      this.pixivUrl = "";
      this.reStart();
    },
    reStart() {
      this.heightV = 450;
      this.firstShow = true;
      this.loadPixivInfo = false;
      this.secShow = false;
      this.info = {};
      this.imgUploadList = [];
      this.imgUploadFileList = [];
      this.pixivUser = {};
    },
    scrollListen() {
      window.addEventListener(
        "scroll",
        this.scrollHandle,
        true
      );
    },
    scrollHandle() {
      let scroll = document.querySelector(".info");
      if (scroll) {
        this.scrollV = scroll.scrollTop;
        let nowV = scroll.scrollHeight - scroll.clientHeight;
        if (this.scrollV === nowV) {
          this.query.page++;
          this.loadData();
        }
      }
    },
    async loadData() {
      this.loading = true;
      let res = await list(this.query);
      if (!res.data || res.data.length < 1) this.query.page--;
      this.list.push(...res.data);
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    async save() {
      this.loading = true;
      let images = [];
      let imageDetail = [];
      let date = new Date();
      for (let imgData of this.imgUploadList) {
        let image = {};
        let urlArr = imgData.originalUrl.split("/");
        let fileName = urlArr[urlArr.length - 1];
        let file = await this.getImageFileFromUrl(imgData.blobUrl, fileName);
        // clear blob
        URL.revokeObjectURL(imgData.blobUrl)
        let res = await this.$globalUploadFile(file, "/anime_pic/");
        image.id = this.$genId();
        image.url = this.ossHost + res.name;
        image.create_time = this.$dateFormat("YYYY-mm-dd HH:MM:SS", date);
        images.push(image);

        let detail = {};
        detail.id = this.$genId();
        urlArr = imgData.originalUrl;
        detail.original_path = urlArr[1];
        detail.image_id = image.id;
        detail.author_id = this.pixivUser.userId;
        urlArr = this.pixivUrl.split("/");
        detail.pixiv_code = urlArr[urlArr.length - 1];
        image.create_time = this.$dateFormat("YYYY-mm-dd HH:MM:SS", date);
        imageDetail.push(detail);
      }
      let auth = {};
      auth.id = this.pixivUser.userId;
      auth.nick = this.pixivUser.name;
      let avatarArr = this.pixivUser.imageBig.split("/");
      let avatarFileName = avatarArr[avatarArr.length - 1];
      let file = await this.getImageFileFromUrl(this.pixivUser.imageBig_blobUrl, avatarFileName);
      // clear blob
      URL.revokeObjectURL(this.pixivUser.imageBig_blobUrl)
      if (this.pixivUser.background && this.pixivUser.background.url)
        URL.revokeObjectURL(this.pixivUser.background.url_blobUrl)
      let res2 = await this.$globalUploadFile(file, "/anime_pic_auth/avatar/");
      auth.avatar = this.ossHost + res2.name;
      auth.pixiv_code = this.pixivUser.userId;
      auth.pixiv_home_url = this.pixivUser.homeUrl;
      auth.create_time = this.$dateFormat("YYYY-mm-dd HH:MM:SS", date);

      let resp = {};
      resp.image = images;
      resp.image_detail = imageDetail;
      resp.image_author = auth;
      let res = await save(resp);
      if (res.code === 200) this.$xmMessage.success("保存成功!");
      // 将数据补充到页面上
      for (let i = 0; i < images.length; i++) {
        images[i].detail = imageDetail[i];
        images[i].auth = auth;
        this.list.unshift(images[i]);
      }
      // this.list.push(...list)
      this.close();
      this.loading = false;
    },
    getImageFileFromUrl(url, imageName) {
      return new Promise((resolve, reject) => {
        let blob = null;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.setRequestHeader("Accept", "*/*");
        xhr.responseType = "blob";
        xhr.onload = () => {
          blob = xhr.response;
          let imgFile = new File([blob], imageName, {type: blob.type});
          resolve(imgFile);
        };
        xhr.onerror = (e) => {
          reject(e);
        };
        xhr.send();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
