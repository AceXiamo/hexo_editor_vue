<template>
  <div class="index">
    <div class="content">
      <div
        class="file"
        ref="leftFile"
        :style="{ 'min-width': leftMenuInitWidth + 'px' }"
      >
        <div class="logo" style="display: none">
          <img src="@/assets/qwq-logo.png" />
        </div>
        <div class="file-url">
          <span>
            <div @click="urlEdit">
              <icon type="angle-double-right"></icon>
              <icon type="cog"></icon>
            </div>
            <span
              v-for="(f, i) in fileArray"
              :key="i"
              v-show="f"
              @click="to(i)"
              >{{ f }}</span
            >
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
      </div>
      <div class="markdown">
        <mavon-editor
          class="editor"
          :toolbars="markDownOptions"
          v-model="markdown"
          ref="md"
        />
      </div>
      <div class="options">
        <transition name="bottom-in-50">
          <span @click="delShow()" v-if="fileName">
            <icon class="remove options-btn" type="trash-alt"></icon>
          </span>
        </transition>
        <span @click="newBlog()">
          <icon class="edit options-btn" type="pencil-alt"></icon>
        </span>
        <span @click="save()">
          <icon class="save options-btn" type="check"></icon>
        </span>
        <span @click="showLogOut()">
          <icon class="login-out options-btn" type="power-off"></icon>
        </span>
      </div>
    </div>
    <transition name="hide-in">
      <div class="file-set" v-if="showUrlEdit">
        <div class="title">
          <span>
            <icon type="snowflake"></icon>
            <span>{{ tipText }}</span>
            <span> _</span>
          </span>
          <div>
            <input type="text" v-model="fileUrl" />
            <div @click="saveUrl">OK !</div>
          </div>
        </div>
        <div @click="showUrlEdit = false" class="close-edit">
          <icon type="times-circle"></icon>
        </div>
      </div>
    </transition>
    <transition name="hide-in">
      <div class="file-set name-set" v-if="showNameEdit">
        <div class="title">
          <span>
            <icon type="broom"></icon>
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
            <icon type="exclamation-circle"></icon>
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
            <icon type="exclamation-circle"></icon>
            <span>{{ tipText4 }}</span>
            <span> _</span>
          </span>
          <div>
            <div class="close" @click="logOutConfirm = false">
              <icon type="times"></icon>
            </div>
            <div class="ok" @click="logOut">
              <icon type="check"></icon>
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
      leftMenuInitWidth: 0,
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
    this.domInit();
  },
  mounted() {},
  methods: {
    init() {
      let token = this.$cookie.get("token");
      if (token) {
        // 取Cookie中配置的路径，首次加载/取不到则需要再次配置
        let fileUrl = this.$cookie.get("fileUrl");
        if (!fileUrl) {
          this.loadTip();
          this.showUrlEdit = true;
        } else {
          this.fileUrl = fileUrl;
          this.loadFile();
        }
      } else {
        this.$router.push("/login");
      }
    },
    domInit() {
      // 用于固定侧栏宽度
      this.$nextTick(() => {
        var width = this.$refs.leftFile.offsetWidth;
        this.leftMenuInitWidth = width;
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
        console.log("sleep 1000ms");
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
        console.log("sleep 1000ms");
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
        console.log("sleep 1000ms");
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
        console.log("sleep 1000ms");
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
      this.$cookie.remove("fileUrl");
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
<style lang="scss">
@import "@/css/options.scss";
.index {
  // background-color: rgba(153, 204, 255, 0.9);
  background-color: white;
  min-width: 100vw;
  min-height: 100vh;
  .content {
    width: 100%;
    display: flex;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    position: relative;
    .options {
      position: absolute;
      right: 50px;
      bottom: 30px;
      font-size: 25px;
      display: flex;
      flex-direction: column;
      .remove {
        margin-bottom: 20px;
        box-shadow: 0 5px 10px rgba(245, 135, 137, 1);
        &:hover {
          box-shadow: 0 5px 10px rgba(245, 135, 137, 0);
        }
        &::after {
          background-color: rgba(245, 135, 137, 1);
        }
      }
      .edit {
        margin-bottom: 20px;
        box-shadow: 0 5px 10px rgba(153, 204, 255, 1);
        &:hover {
          box-shadow: 0 5px 10px rgba(153, 204, 255, 0);
        }
        &::after {
          background-color: rgba(153, 204, 255, 1);
        }
      }
      .save {
        margin-bottom: 20px;
        box-shadow: 0 5px 10px rgba(121, 250, 197, 1);
        &:hover {
          box-shadow: 0 5px 10px rgba(121, 250, 197, 0);
        }
        &::after {
          background-color: rgba(121, 250, 197, 1);
        }
      }
      .login-out {
        box-shadow: 0 5px 10px rgba(255, 21, 21, 0.8);
        &:hover {
          box-shadow: 0 5px 10px rgba(255, 21, 21, 0);
        }
        &::after {
          background-color: rgba(255, 21, 21, 0.8);
        }
      }
      .options-btn {
        background-color: white;
        color: white;
        padding: 20px;
        border-radius: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.5s;
        svg {
          z-index: 10;
        }
        &:hover {
          transition: all 0.5s;
        }
        &::after {
          $size: 90%;
          content: "";
          width: $size;
          height: $size;
          border-radius: 100%;
          position: absolute;
          z-index: 1;
        }
      }
    }
    .file {
      flex: 2;
      height: 100vh;
      padding: 0 $border-30;
      .fis-border {
        height: calc(100% - 155px);
        padding: 15px;
        background: rgba(255, 255, 255, 0.5);
        color: black;
        margin-top: 30px;
        border-radius: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
        .file-list {
          height: calc(100%);
          overflow: hidden;
          font-size: 13px;
          &:hover {
            overflow: auto;
          }
          &::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
            height: 1px;
          }
          &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 10px;
            background-color: skyblue;
            background-image: -webkit-linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.2) 25%,
              transparent 25%,
              transparent 50%,
              rgba(255, 255, 255, 0.2) 50%,
              rgba(255, 255, 255, 0.2) 75%,
              transparent 75%,
              transparent
            );
          }
          &::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            border-radius: 10px;
          }
          .dir {
            span::before {
              background-color: #996699;
            }
          }
          > div {
            margin-bottom: 25px;
            > span {
              position: relative;
              padding-left: 20px;
              cursor: pointer;
              &::before {
                content: "";
                position: absolute;
                width: 10px;
                height: 10px;
                background-color: #ffcccc;
                top: calc(50% - 5px);
                left: 0;
                border-radius: 100%;
              }
            }
          }
        }
      }
      .logo {
        padding-top: 30px;
        img {
          height: 35px;
        }
      }
      .file-url {
        padding-top: $border-30;
        > span {
          @include box-line-center;
          background-color: rgba(0, 0, 0, 0.15);
          font-size: 15px;
          padding: 5px 10px;
          color: #979797;
          border-radius: 10px;
          i {
            color: #ffff33;
            margin-right: 7px;
            font-size: 17px;
          }
          > div {
            display: flex;
            flex-direction: column;
            height: 15px;
            overflow: hidden;

            i:nth-child(1),
            i:nth-child(2) {
              transform: translateY(0%);
              transition: all 0.5s;
            }

            &:hover i:nth-child(1),
            &:hover i:nth-child(2) {
              transform: translateY(-100%);
              transition: all 0.5s;
            }
          }
          > span {
            color: white;
            font-size: 13px;
            border-radius: 10px;
            padding: 5px 10px;
            margin-right: 5px;
            background-color: rgba(0, 0, 0, 0.07);
            cursor: pointer;
            white-space: nowrap;
          }
        }
      }
    }
    .markdown {
      flex: 8;
      height: 100vh;
      background-color: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(10px);

      .editor {
        height: 100%;
        box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15) !important;
      }
    }
  }
  .name-set {
    .title {
      > span {
        svg {
          color: #fab2cf !important;
          animation: unset !important;
        }
      }
    }
  }
  .file-set {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.5);
    .title {
      display: flex;
      flex-direction: column;
      > span {
        font-size: 25px;
        margin-bottom: 30px;
        svg {
          color: #63dfff;
          margin-right: 10px;
          animation: spin infinite linear 3s;
        }
        > span:nth-child(3) {
          animation: hide_show infinite 1s;
        }
        > span:nth-child(2),
        > span:nth-child(3) {
          filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.5));
        }
      }
      > div {
        display: flex;
        animation: bottom-in-50 0.5s forwards;
        > input {
          outline: none;
          margin-right: 50px;
          background-color: rgba(96, 223, 255, 0.7);
          color: white;
          font-size: 20px;
          min-width: 400px;
          padding: 15px 30px;
          border-radius: 35px;
          border: 3.5px solid white;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        }
        > div {
          background-color: white;
          padding: 15px 30px;
          border-radius: 35px;
          border: 3.5px solid white;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
          transition: all 0.3s;
          cursor: pointer;

          &:hover {
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
            transition: all 0.3s;
          }
        }
      }
    }
    .close-edit {
      position: absolute;
      right: 30px;
      top: 30px;
      color: #ee787d;
      font-size: 40px;
    }
  }

  .del-dialog {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.5);

    > div {
      > span {
        font-size: 25px;
        svg {
          color: #ffca42;
          margin-right: 10px;
        }
        > span:nth-child(3) {
          animation: hide_show infinite 1s;
        }
      }
      > div {
        margin-top: 50px;
        display: flex;
        justify-content: center;
        .close {
          svg {
            position: relative;
            left: 2px;
          }
          box-shadow: 0 5px 10px rgba(153, 204, 255, 1);
          &:hover {
            box-shadow: 0 5px 10px rgba(153, 204, 255, 0);
          }
          &::before {
            background-color: rgba(153, 204, 255, 1);
          }
        }
        .ok {
          margin-left: 50px;
          box-shadow: 0 5px 10px rgba(245, 135, 137, 1);
          &:hover {
            box-shadow: 0 5px 10px rgba(245, 135, 137, 0);
          }
          &::before {
            background-color: rgba(245, 135, 137, 1);
          }
        }

        .ok,
        .close {
          $size: 90px;
          color: white;
          height: $size;
          width: $size;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30px;
          border-radius: 100%;
          background-color: white;
          position: relative;
          z-index: 1;
          transition: all 0.3s;
          &:hover {
            transition: all 0.3s;
          }
          &::before {
            content: "";
            position: absolute;
            $after-size: 5px;
            left: $after-size;
            right: $after-size;
            top: $after-size;
            bottom: $after-size;
            border-radius: 100%;
            z-index: -1;
          }
        }
      }
    }
  }
}
</style>
