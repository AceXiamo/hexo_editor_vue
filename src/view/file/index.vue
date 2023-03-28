<template>
  <v-app>
    <div class="page-container" data-app="true">
      <div class="top-container">
        <div class="left">
          <v-btn class="ma-2" text icon color="blue lighten-2">
            <font-awesome-icon icon="fa-solid fa-folder"/>
          </v-btn>
          <span class="text-md-h6 font-weight-bold mr-5">静态资源喵 ~</span>
        </div>
        <div class="right">
          <span @click="showUpload = true">UPLOAD 🔥</span>
        </div>
      </div>

      <div class="content-container ma-9">
        <div class="item" v-for="(row, index) in list">
          <font-awesome-icon icon="fa-solid fa-file" style="color: #606266;font-size: 12px"/>
          <span>{{ row.source_name }}</span>
          <span>{{ row.remark }}</span>
          <span>{{ row.create_time }}</span>
          <div>
            <v-btn icon color="indigo" @click="open(row)">
              <font-awesome-icon icon="fa-solid fa-meteor"/>
            </v-btn>
            <v-btn icon color="green lighten-1" @click="copy(row)">
              <font-awesome-icon icon="fa-solid fa-copy"/>
            </v-btn>
            <v-btn icon color="red darken-1" @click="removeFile(row)">
              <font-awesome-icon icon="fa-solid fa-trash-can"/>
            </v-btn>
          </div>
        </div>
      </div>

      <!--   date-picker   -->
      <div class="date-picker">
        <v-menu v-model="showTimePicker" :close-on-content-click="false"
                :nudge-left="40"
                :nudge-bottom="100" transition="scale-transition" :offset-x="true" :left="true"
                min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2" fab dark large color="purple" @click="showTimePicker = true">
              <v-icon dark>
                mdi-android
              </v-icon>
            </v-btn>
          </template>
          <v-date-picker v-model="queryDate" @input="showTimePicker = false"></v-date-picker>
        </v-menu>
      </div>

      <!--   upload-container   -->
      <v-dialog v-model="showUpload" width="500">
        <v-card class="pa-5">
          <span class="text-h6">File Upload 🔥</span>
          <v-form class="ma-5">
            <v-file-input
              prepend-icon=""
              label="Select File"
              @change="fileUpload"
            ></v-file-input>
            <v-text-field
              v-model="form.remark"
              :counter="50"
              label="File Remark"
              required
            ></v-text-field>
          </v-form>

          <v-divider></v-divider>
          <div class="d-flex justify-end mt-5">
            <v-spacer></v-spacer>
            <v-btn
              text
              @click="showUpload = false"
            >
              Cancel
            </v-btn>
            <v-btn
              class="ml-5"
              color="primary"
              text
              @click="formConfirm"
            >
              Confirm
            </v-btn>
          </div>
        </v-card>
      </v-dialog>

      <div :class="['submitting', loading?'submitting-show':'']">
        <v-progress-circular
          indeterminate
          color="amber"
        ></v-progress-circular>
      </div>
    </div>
  </v-app>
</template>
<script>

import {list, save, del, update} from "../../js/api/source";

export default {
  name: "File",
  data() {
    return {
      showTimePicker: false,
      queryDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      files: [],
      showUpload: false,
      form: {
        file: '',
        remark: '',
      },
      ossHost: '',
      list: [],
      loading: false
    }
  },
  mounted() {
    let ali = localStorage.getItem("ali");
    ali = JSON.parse(ali);
    this.ossHost = ali.ossHost + "/";
    this.load()
  },
  methods: {
    load() {
      list({time: this.queryDate}).then(res => {
        this.list = res.data
      })
    },
    fileUpload(e) {
      this.form.file = e
    },
    copy(row) {
      this.$copyUrl(row.source_url)
    },
    open(row) {
      if (row.source_type === 'image') {
        this.$ShowImage(row.source_url)
      } else if (row.source_type === 'video') {
        this.$ShowVideo(row.source_url)
      } else {
        this.$xmMessage.error('暂时仅支持预览图片视频捏!');
      }
    },
    removeFile(row) {
      const handle = async (row) => {
        new Promise((resolve, reject) => {
          del({id: row.id})
          let path = '/source' + row.source_url.split("source")[1]
          this.$AliOSSRemove(path)
          resolve()
        })
      }
      handle(row).then(() => {
        this.$xmMessage.success('remove complete 🎯');
        this.load()
      })
    },
    async formConfirm() {
      if (!this.form.file) {
        this.$xmMessage.error('请选择文件!');
        return
      }
      this.loading = true
      let data = {}
      let path = "/source/"
      path += this.$dayjs().format("YYYY-MM-DD") + "/"
      let res = await this.$globalUploadFileNoRename(this.form.file, path)
      data.source_url = this.ossHost + res.name
      data.source_type = this.form.file.type.split("/")[0]
      data.remark = this.form.remark
      data.source_name = this.form.file.name
      save(data).then(res => {
        this.loading = false
        this.$xmMessage.success("upload complete 🎈")
        this.load()
        this.close()
      })
    },
    close() {
      this.form = {}
      this.showUpload = false
    },
  }
}
</script>

<style scoped lang="scss">
@import "style";
</style>
