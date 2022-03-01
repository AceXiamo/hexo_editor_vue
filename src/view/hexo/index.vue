<template>
  <div class="index">
    <div class="content">
      <div class="file" ref="leftFile">
        <div class="logo" style="display: none">
          <img src="@/assets/qwq-logo.png" />
        </div>
        <div class="file-url">
          <span>
            <div @click="urlEdit">
              <font-awesome-icon :icon="['fas', 'angle-double-right']" />
              <font-awesome-icon :icon="['fas', 'cog']" />
            </div>
            <div class="url-item">
              <div class="wheel-bar" ref="urlScroll">
                <span
                  v-for="(f, i) in fileArray"
                  :key="i"
                  v-show="f"
                  @click="to(i)"
                  >{{ f }}</span
                >
              </div>
            </div>
          </span>
        </div>
        <div class="fis-border">
          <div class="file-list">
            <div
              v-for="(d, i) in fileList"
              :key="i"
              :class="[d.is_dir ? 'dir' : '']"
              @click="fileClick(d)"
            >
              <span>{{ d.file_name }}</span>
            </div>
          </div>
        </div>
        <img
          class="background"
          src="https://xiamo.oss-accelerate.aliyuncs.com/xiamo/WordPress/2021/12/20211226021207651.png"
        />
      </div>
      <div ref="markdownBar" class="markdown">
        <mavon-editor
          :style="{ 'max-width': markdownInitWidth + 'px' }"
          class="editor"
          :toolbars="markDownOptions"
          v-model="markdown"
          ref="md"
        />
      </div>
      <div class="options">
        <div class="options-handle"></div>
        <transition name="bottom-in-50">
          <span @click="delShow()" class="btn" v-if="fileName">
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
            <div class="tip">
              <img :src="tipImg" /><span>要删除这篇文章吗！</span>
            </div>
          </span>
        </transition>
        <span @click="newBlog()" class="btn">
          <span class="edit options-btn">
            <font-awesome-icon :icon="['fas', 'pencil-alt']" />
          </span>
          <div class="tip">
            <img :src="tipImg" /><span>要写一篇新的文章吗！</span>
          </div>
        </span>
        <span @click="save()" class="btn">
          <span class="save options-btn">
            <font-awesome-icon :icon="['fas', 'check']" />
          </span>
          <div class="tip">
            <img :src="tipImg" /><span>修改后需要保存！</span>
          </div>
        </span>
        <span @click="showLogOut()" class="btn">
          <span class="login-out options-btn">
            <font-awesome-icon :icon="['fas', 'power-off']" />
          </span>
          <div class="tip">
            <img :src="tipImg" /><span>要退出登陆吗？</span>
          </div>
        </span>
      </div>
    </div>
    <transition name="hide-in">
      <div class="file-set" v-if="showUrlEdit">
        <div class="title">
          <span>
            <font-awesome-icon :icon="['fas', 'snowflake']" />
            <span>{{ tipText }}</span>
            <span> _</span>
          </span>
          <div>
            <input type="text" v-model="fileUrl" />
            <div @click="saveUrl">OK !</div>
          </div>
        </div>
        <div @click="showUrlEdit = false" class="close-edit">
          <font-awesome-icon :icon="['fas', 'times-circle']" />
        </div>
      </div>
    </transition>
    <transition name="hide-in">
      <div class="file-set name-set" v-if="showNameEdit">
        <div class="title">
          <span>
            <font-awesome-icon :icon="['fas', 'broom']" />
            <span>{{ tipText2 }}</span>
            <span> _</span>
          </span>
          <div>
            <input type="text" v-model="fileName" />
            <div @click="createFile">OK !</div>
          </div>
        </div>
        <div @click="showNameEdit = false" class="close-edit">
          <icon type="times-circle"></icon>
        </div>
      </div>
    </transition>
    <transition name="hide-in">
      <div class="del-dialog" v-if="delConfirm">
        <div>
          <span>
            <font-awesome-icon :icon="['fas', 'exclamation-circle']" />
            <span>{{ tipText3 }}</span>
            <span> _</span>
          </span>
          <div>
            <div class="close" @click="delConfirm = false">
              <icon type="times"></icon>
            </div>
            <div class="ok" @click="removeFile">
              <icon type="check"></icon>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="hide-in">
      <div class="del-dialog" v-if="logOutConfirm">
        <div>
          <span>
            <font-awesome-icon :icon="['fas', 'exclamation-circle']" />
            <span>{{ tipText4 }}</span>
            <span> _</span>
          </span>
          <div>
            <div class="close" @click="logOutConfirm = false">
              <font-awesome-icon :icon="['fas', 'times']" />
            </div>
            <div class="ok" @click="logOut">
              <font-awesome-icon :icon="['fas', 'check']" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  files,
  readFile,
  saveFile,
  removeFile,
  createFile
} from "@/js/api/file";
import Message from "@/components/message";

export default {
  name: "index",
  components: { Message },
  data() {
    return {
      fileUrl: "/data",
      fileArray: [],
      fileList: [],
      markdown: "",
      tipImg:
        "https://xiamo.oss-accelerate.aliyuncs.com/xiamo/WordPress/2021/12/20211231032248104.jpg",
      leftMenuInitWidth: 0,
      markdownInitWidth: 0,
      tipText: "",
      tipText2: "",
      tipText3: "",
      tipText4: "",
      showUrlEdit: false,
      showNameEdit: false,
      delConfirm: false,
      logOutConfirm: false,
      fileName: ""
    };
  },
  computed: {
    prop() {
      let data = {
        subfield: true, // 单双栏模式
        defaultOpen: "preview", //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: true,
        toolbarsFlag: false,
        scrollStyle: false,
        boxShadow: false //边框
      };
      return data;
    }
  },
  created() {
    this.init();
    this.fileArray = this.fileUrl.split("/");
    this.$nextTick(res => {
      this.wheelHandle();
      this.domInit();
    });
  },
  mounted() {},
  methods: {
    wheelHandle() {
      let fileDom = document.querySelector(".wheel-bar");
      fileDom.addEventListener("wheel", event => {
        event.preventDefault();
        fileDom.scrollLeft += event.deltaY;
      });
    },
    init() {
      // 取Cookie中配置的路径，首次加载/取不到则需要再次配置
      let fileUrl = this.$cookie.get("fileUrl");
      if (!fileUrl) {
        this.loadTip();
        this.showUrlEdit = true;
      } else {
        this.fileUrl = fileUrl;
        this.loadFile();
      }
    },
    domInit() {
      // 用于固定侧栏宽度
      this.$nextTick(() => {
        var width = this.$refs.leftFile.offsetWidth;
        var rootW = document.body.offsetWidth;
        this.leftMenuInitWidth = width;
        this.markdownInitWidth = rootW - width + 30;
      });
    },
    fileClick(data) {
      if (data.is_dir) {
        this.fileUrl += data.file_name + "/";
        this.fileArray = this.fileUrl.split("/");
        this.loadFile();
      } else {
        if (data.file_name.indexOf(".md") > -1) {
          this.fileName = data.file_name;
          this.readFile(data);
        }
      }
    },
    to(i) {
      let url = "";
      for (var j = 0; j <= i; j++) {
        url += this.fileArray[j] + "/";
      }
      this.fileUrl = url;
      this.fileArray = this.fileUrl.split("/");
      this.loadFile();
    },
    async loadFile() {
      files({ url: this.fileUrl }).then(res => {
        if (this.verifyRes(res)) {
          return;
        }
        this.fileList = res.data;
      });
    },
    async readFile(data) {
      readFile({ url: this.fileUrl + data.file_name }).then(res => {
        if (this.verifyRes(res)) {
          this.fileName = "";
          return;
        }
        this.markdown = res.data;
      });
    },
    async saveFile() {
      saveFile({
        url: this.fileUrl + this.fileName,
        content: this.markdown
      }).then(res => {
        if (this.verifyRes(res)) {
          return;
        }
        this.$message.success(res.data);
      });
    },
    async loadTip3() {
      let this_ = this;
      let tip = "确定要删除吗?";
      tip = tip.split("");
      this.tipText3 = "";
      for (let i = 0; i < tip.length; i++) {
        // console.log("sleep 1000ms");
        await this.sleep(100);
        this.tipText3 += tip[i];
      }
    },
    delShow() {
      this.loadTip3();
      this.delConfirm = true;
    },
    async removeFile() {
      removeFile({
        url: this.fileUrl + this.fileName
      }).then(res => {
        if (this.verifyRes(res)) {
          this.markdown = "";
          this.fileName = "";
          this.delConfirm = false;
          return;
        }
        if (res.code == 200) {
          this.markdown = "";
          this.fileName = "";
          this.delConfirm = false;
          this.$message.success(res.data);
          this.loadFile();
        }
      });
    },
    async createFile() {
      createFile({
        url: this.fileUrl + this.fileName + ".md",
        content: this.markdown
      }).then(res => {
        if (this.verifyRes(res)) {
          this.markdown = "";
          this.fileName = "";
          this.showNameEdit = false;
          return;
        }
        if (res.code == 200) {
          this.markdown = "";
          this.fileName = "";
          this.showNameEdit = false;
          this.$message.success(res.data);
          this.loadFile();
        }
      });
    },
    async loadTip2() {
      let this_ = this;
      let tip = "请在此处输入文件名";
      tip = tip.split("");
      this.tipText2 = "";
      for (let i = 0; i < tip.length; i++) {
        // console.log("sleep 1000ms");
        await this.sleep(100);
        this.tipText2 += tip[i];
      }
    },
    async save() {
      if (!this.markdown) {
        this.$message.error("无内容 ! ! !");
        return;
      }
      if (this.fileName) {
        // 修改
        this.saveFile();
      } else {
        this.showNameEdit = true;
        this.loadTip2();
      }
    },
    newBlog() {
      // 清空文件名和内容
      this.fileName = "";
      this.markdown =
        "---\r\n" +
        "title: [标题]\r\n" +
        "date: " +
        this.timeNow() +
        "\r\n" +
        "tags: [tag]\r\n" +
        "categories: [分类]\r\n" +
        "---\r\n";
    },
    async loadTip() {
      let this_ = this;
      let tip = "请在此处输入根目录路径";
      tip = tip.split("");
      this.tipText = "";
      for (let i = 0; i < tip.length; i++) {
        // console.log("sleep 1000ms");
        await this.sleep(100);
        this.tipText += tip[i];
      }
    },
    async loadTip4() {
      let this_ = this;
      let tip = "确定要退出登陆吗?";
      tip = tip.split("");
      this.tipText4 = "";
      for (let i = 0; i < tip.length; i++) {
        // console.log("sleep 1000ms");
        await this.sleep(100);
        this.tipText4 += tip[i];
      }
    },
    saveUrl() {
      this.showUrlEdit = false;
      if (this.fileUrl.substr(this.fileUrl.length - 1, 1) != "/") {
        this.fileUrl += "/";
      }
      this.$cookie.set("fileUrl", this.fileUrl);
      this.fileArray = this.fileUrl.split("/");
      this.loadFile();
    },
    urlEdit() {
      this.loadTip();
      this.showUrlEdit = true;
    },
    showLogOut() {
      this.loadTip4();
      this.logOutConfirm = true;
    },
    logOut() {
      this.$message.warning("退出登陆成功！");
      // 清除缓存并退出登陆
      // this.$cookie.remove("fileUrl");
      this.$cookie.remove("token");
      this.$cookie.remove("user");
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="scss">
h2,
hr {
  display: none;
}
</style>
<style lang="scss" scoped>
@import "@/css/options.scss";
@import "./style.scss";
</style>
