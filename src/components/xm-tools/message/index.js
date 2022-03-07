import message from "./message"

let Msg = {};


Msg.install = (Vue) => {
    let vue = Vue;
    let MsgClass = vue.extend(message);
    let instance = new MsgClass();
    instance.$mount(document.createElement('dev'));
    document.body.appendChild(instance.$el);

    let timer;
    let MsgMain = {
        showMessage(type, msg) {
            let time = new Date()
            let msgData = {
                msg: msg,
                type: type,
                show: true,
                id: time.getTime()
            }
            setTimeout(() => {
                msgData.show = false;
            }, 3000)
            instance.arr.push(msgData);
        },
        success(msg, type = "success") {
            this.showMessage(type, msg);
        },
        error(msg, type = "error") {
            this.showMessage(type, msg);
        },
        warning(msg, type = "warning") {
            this.showMessage(type, msg);
        }
    };

    Vue.prototype.$xmMessage = MsgMain;
}

export default Msg;
