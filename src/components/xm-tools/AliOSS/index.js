import Vue from 'vue';
import OSS from "ali-oss";

let client = {};

const ossConfig = function () {
  // 加载oss相关配置
  client = new OSS({
    accessKeyId: "",
    accessKeySecret: "",
    bucket: "",
    region: ""
  });
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
    return await client.put(fileName, file, { headers });
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
  Vue.prototype.$AliOSSUpload = upload;
  Vue.prototype.$AliOSSMultipartUpload = multipartUpload;
};

export default ossInit;
