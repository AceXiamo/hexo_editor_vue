<template>
  <v-app id="inspire">
    <div class="page-container ">
      <v-app-bar app :elevation="6">
        <v-row>
          <v-col cols="12" sm="6" md="3" class="d-flex align-center">
            <v-btn class="ma-2" text icon color="blue lighten-2">
              <font-awesome-icon icon="fa-solid fa-folder"/>
            </v-btn>
            <span class="text-md-h6 font-weight-bold mr-5">静态资源喵 ~</span>
          </v-col>
          <v-col class="d-flex justify-end align-center">
            <v-hover v-slot="{ hover }">
              <v-btn :class="`elevation-${hover ? 15 : 5}`" class="ma-2" color="red" dark rounded @click="showUpload = true">Upload 🔥</v-btn>
            </v-hover>
          </v-col>
        </v-row>
      </v-app-bar>

      <v-main>
        <div class="content-container d-flex flex-wrap">
          <v-card v-for="(data, index) in files" class="file-item" :key="index">
            <v-img
              lazy-src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px">
            </v-img>
            <v-card-title class="text-h6">20210223.png</v-card-title>
            <v-card-subtitle>this is a image remark</v-card-subtitle>
          </v-card>
        </div>
      </v-main>

      <!--   upload-container   -->
      <v-dialog v-model="showUpload" width="500">
        <v-card class="pa-5">
          <span class="text-h6">File Upload 🔥</span>
          <v-form class="ma-5">
            <v-file-input
              accept="image/*"
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

      <!--   date-picker   -->
      <div class="date-picker">
        <v-menu v-model="showTimePicker" :close-on-content-click="false"
                :nudge-left="40" :nudge-bottom="100" transition="scale-transition" :offset-x="true" :left="true"
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
    </div>
  </v-app>
</template>
<script>
export default {
  name: "File",
  data() {
    return {
      files: [],
      queryDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      showTimePicker: false,
      showUpload: false,
      form: {
        remark: '',
        file: ''
      }
    }
  },
  mounted() {
    let file = {
      show: false,
    }
    for (let i = 0; i < 30; i++)
      this.files.push(JSON.parse(JSON.stringify(file)))
  },
  methods: {
    fileUpload(e) {
      this.form.file = e
    },
    formConfirm() {
      if (!this.form.file) {
        this.$xmMessage.error('请选择文件!');
        return
      }
      console.log(this.form)
      this.showUpload = false
    }
  }
}
</script>

<style scoped lang="scss">
@import "style";
</style>
