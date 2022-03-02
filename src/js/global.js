import Vue from 'vue'

Vue.prototype.markDownOptions = {
    bold: true, // 粗体
    italic: true, // 斜体
    header: true, // 标题
    underline: true, // 下划线
    strikethrough: true, // 中划线
    mark: true, // 标记
    superscript: true, // 上角标
    subscript: true, // 下角标
    quote: true, // 引用
    ol: true, // 有序列表
    ul: true, // 无序列表
    link: true, // 链接
    imagelink: true, // 图片链接
    code: true, // code
    table: true, // 表格
    fullscreen: true, // 全屏编辑
    readmodel: true, // 沉浸式阅读
    htmlcode: true, // 展示html源码
    help: true, // 帮助
    /* 1.3.5 */
    undo: true, // 上一步
    redo: true, // 下一步
    trash: true, // 清空
    save: false, // 保存（触发events中的save事件）
    /* 1.4.2 */
    navigation: true, // 导航目录
    /* 2.1.8 */
    alignleft: true, // 左对齐
    aligncenter: true, // 居中
    alignright: true, // 右对齐
    /* 2.2.1 */
    subfield: true, // 单双栏模式
    preview: true // 预览
}

// sleep
Vue.prototype.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

Vue.prototype.verifyRes = function(res) {
    let error = false;
    if (res.code != 200) {
        this.$message.error(res.msg)
        error = true;
    }
    return error;
}

Vue.prototype.timeNow = function() {
    return new Date(+new Date() + 8 * 3600 * 1000).toJSON().substr(0, 19).replace("T", " ");
}

Vue.prototype.$yuki = function (){
  let canvas = document.querySelector("#yuki");
  let min = .2;
  // 储存雪花
  let yuki = [];
  let canvasW = window.innerWidth;
  let canvasH = window.innerHeight;

  canvas.width = canvasW;
  canvas.height = canvasH;
  let ctx = canvas.getContext("2d");
  yukiFun()

  function yukiFun() {
    setInterval(() => {
      genYuki();
      clearCanvas();
      // 背景色
      ctx.fillStyle = "rgba(0,0,0,0)"
      ctx.fillRect(0, 0, canvasW, canvasH);
      yuki.forEach(v => {
        ctx.fillStyle = "rgba(255,255,255,.9)"
        v.y += v.speed;
        // 方向
        if (v.path == null) v.path = randomNum(-.5, .5);
        let num1 = v.x + v.path;
        let num2 = num1 + (v.path < 0 ? -.5 : .5);
        v.x = randomNum(num1, num2)
        ctx.shadowBlur = 20;
        ctx.shadowColor = "white";

        ctx.beginPath();
        ctx.arc(v.x, v.y, v.size, 0, 2 * Math.PI)
        ctx.closePath();
        ctx.fill()
      })
    }, 20)
  }

  let maxNum = 100;
  function genYuki() {
    delYuki();
    if (yuki.length > maxNum) return;
    let yukiObj = {};
    yukiObj.x = randomNum(0, canvasW);
    yukiObj.y = 0;
    yukiObj.speed = randomNum(.5, 5);
    yukiObj.size = min + 2 * yukiObj.speed;
    yuki.push(yukiObj);
  }

  function delYuki() {
    for (let i = 0; i <= yuki.length; i++) {
      if (yuki[i] && yuki[i].y >= canvasH) {
        yuki.splice(i, 1);
      }
    }
  }

  function clearCanvas() {
    let w = canvas.width;
    let h = canvas.height;
    ctx.clearRect(0, 0, w, h);
  }

  function randomNum(n, m) {
    return Math.random() * (m - n) + n;
  }
}
