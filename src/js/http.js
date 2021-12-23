/**
 * 此模块为封装的axios,分发不同域名的接口和请求自动添加token
 */
import Vue from 'vue'
import axios from "axios";
import qs from "querystring"

var instance = axios.create({});
instance.interceptors.request.use((config) => {
    let url = config.url;
    //调用登录的时候不需要token
    config.headers.Auth = this.$cookie.get("Auth") || "";
    // config.baseURL = "http://localhost:7070";
    // config.baseURL = baseURL.backend;
    // if (url.indexOf("/faceentrance/") > -1) {
    //     config.baseURL = baseURL.facepass;
    // }
    // if (url.indexOf("/agentjs/") > -1 || url.indexOf("/nxadmindzyxjs/") > -1 || url.indexOf("/nxdzyxjs/") > -1 || url.indexOf("/dzyxjs/") > -1) {
    //     config.baseURL = baseURL.goodclass;
    //     config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    //     config.data = qs.stringify(config.data);
    //     console.log("config.data", config.data)
    // }
    return config;
}, (err) => {
    return Promise.resolve(err);
});


instance.interceptors.response.use((res) => {
    if (res.data.responseCode != 200) {
        if (res.data.responseMessage) {
            Message.error(res.data.responseMessage);
        }
    }
    if (res.data.responseCode == "400005" || res.data.responseCode == "9998") {
        // location.href = baseURL.productUrl;
    }
    return res;
}, (err) => {
    return err;
});
export default instance;