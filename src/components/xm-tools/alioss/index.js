import Vue from 'vue';
import OSS from "ali-oss";
import {colors} from "nightwatch/lib/util/logger";

let client = {};

const ossConfig = function () {
  let ali = localStorage.getItem("ali");
  if (!ali || ali === "{}") {
    console.log("%cOSS未配置!", "color: #70C5B3")
    return
  }
  ali = JSON.parse(ali);
  // 加载oss相关配置
  client = new OSS(ali);
  console.log("%cOSS初始化成功!", "color: #70C5B3")
}

/*
* 普通上传
* */
const upload = async function (file, fileName, contentType) {
  let headers = {
    "Content-Type": contentType
  };
  // 文件上传
  try {
    return await client.put(fileName, file, {headers});
  } catch (e) {
    console.log(e);
  }
}

/*
* 分片上传
* */
const multipartUpload = async function (file, fileName, contentType, progress) {
  let headers = {
    "Content-Type": contentType
  };
  // 文件上传
  try {
    return await client.multipartUpload(fileName, file, {
      progress,
      headers
    });
  } catch (e) {
    console.log(e);
  }
}

const ossInit = function () {
  ossConfig();
  Vue.prototype.$AliOSSInit = ossConfig;
  Vue.prototype.$AliOSSUpload = upload;
  Vue.prototype.$AliOSSMultipartUpload = multipartUpload;
};

export default ossInit;
