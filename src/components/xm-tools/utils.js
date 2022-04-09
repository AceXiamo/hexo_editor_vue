import Vue from 'vue';

const utils = function () {
  /*
* 通过对象的某个唯一值返回该对象在对象数组中的下标
*
* arr      对象数组
* field    唯一字段名
* value    字段值
* */
  Vue.prototype.$findArrayIndex = function (arr, field, value) {
    let index = -1;
    for (let i = 0; i <= arr.length - 1; i++) {
      if (arr[i][field] === value) {
        index = i;
      }
    }
    return index;
  }

  /*
* 传入后缀生成文件名
* 年月日时分秒 + 五伪随机数 + 后缀
*
* suffix  后缀
* */
  Vue.prototype.$genFileName = function (suffix) {
    return this.$genId() + "." + suffix;
  }

  /*
* 传入后缀生成文件名
* 年月日时分秒 + 五伪随机数 + 后缀
*
* suffix  后缀
* */
  Vue.prototype.$genId = function () {
    let time = new Date();
    let monthStr = time.getMonth() + 1;
    monthStr = monthStr < 10 ? "0" + monthStr : "" + monthStr;
    let timeStr = time.getFullYear().toString() + monthStr + time.getDate().toString() + time.getHours().toString()
      + time.getMinutes().toString() + time.getSeconds().toString();
    return timeStr + this.$genRandom(10000, 99999);
  }

  /*
  * 通用上传文件 - 上传至阿里云OSS
  *
  * file  上传的文件
  * path  需要上传到OSS中的路径
  * */
  Vue.prototype.$globalUploadFile = async function (file, path) {
    let name = file.name;
    name = name.split(".");
    // 文件后缀
    let suffix = name[name.length - 1];
    // 生成一个新的文件名
    let fileName = this.$genFileName(suffix);
    return await this.$AliOSSUpload(file, path + fileName, file.type);
  }

  /*
  * 分片上传 - 上传至阿里云OSS
  *
  * file        上传的文件
  * path        需要上传到OSS中的路径
  * progressF   上传进度的回调 - 函数
  * */
  Vue.prototype.$multipartUpload = async function (file, path, progressF) {
    const progress = (p, _checkpoint) => {
      progressF(p);
      // Object的上传进度。
      // console.log(p);
      // 分片上传的断点信息。
      // console.log(_checkpoint);
    };

    let name = file.name;
    name = name.split(".");
    // 文件后缀
    let suffix = name[name.length - 1];
    // 生成一个新的文件名
    let fileName = this.$genFileName(suffix);
    return await this.$AliOSSMultipartUpload(file, path + fileName, file.type, progress);
  }

  /*
  * 范围内随机数
  *
  * n  最小值
  * m  最大值
  * */
  Vue.prototype.$genRandom = function (n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n)
  }

  /*
  *
  * */
  Vue.prototype.$fileVerify = function (file, type, size) {
    size = size ? size : 2;
    let typeVerify;
    let sizeVerify
    if (type === 'image') {
      typeVerify = file.type === 'image/jpeg' || file.type === 'image/png';
    } else if (type === 'video') {
      typeVerify = file.type === 'video/mp4' || file.type === 'video/webm';
    }
    sizeVerify = file.size / 1024 / 1024 < size;
    if (!typeVerify) {
      this.$xMessage.error('选择的文件格式有误, 请重新选择!');
      return false;
    }
    if (!sizeVerify) {
      this.$xMessage.error('选择的文件最大不能超过5M, 请重新选择!');
      return false;
    }
    return true;
  }

  /*
  * 视频文件获取 视频信息, 时长,宽,高
  * */
  Vue.prototype.$getVideoInfo = function (file, infoBack) {
    const fileUrl = URL.createObjectURL(file);
    //经测试，发现audio也可获取视频的时长
    // const audioElement = new Audio(fileUrl);
    // audioElement.addEventListener("loadedmetadata", function (_event) {
    //   timeBack(audioElement.duration)
    // });
    const video = document.createElement('video')
    video.src = fileUrl;
    video.addEventListener('canplay', function () {
      infoBack(this.duration, this.videoWidth, this.videoHeight);
    })
  }
  Vue.prototype.$compareBigToSmall = function (property) {
    return function (a, b) {
      let value1 = a[property];
      let value2 = b[property];
      return value2 - value1;
    }
  };
  Vue.prototype.$compareSmallToBig = function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
  };
  Vue.prototype.$ossWebP = function (url) {
    let suffix = "?x-oss-process=image/format,webp#";
    return url + suffix;
  };
  Vue.prototype.$isUrl = function (str_url) {
    let urlRegex = /(^(http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/;
    let re = new RegExp(urlRegex);
    return re.test(str_url);
  }
  Vue.prototype.$dateFormat = function (fmt, date) {
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
    };
    return fmt;
  },
  Vue.prototype.$copyUrl = function(url){
    const input = document.createElement("input"); // 构建input
    input.value = url; // 设置内容
    console.log(input.value);
    document.body.appendChild(input); // 添加临时实例
    input.select(); // 选择实例内容
    document.execCommand("Copy"); // 执行复制
    document.body.removeChild(input); // 删除临时实例
    this.$xmMessage.success("复制成功！");
  }
}

export default utils;
