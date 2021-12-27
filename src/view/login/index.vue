<template>
  <div class="login">
    <div class="login-c">
      <div class="qwq-icon">
        <span>Hexo Editor</span>
      </div>
      <div class="login-form">
        <div>
          <div class="line-border">
            <input type="text" v-model="username" placeholder="username..." />
          </div>
        </div>
        <div>
          <div class="line-border">
            <input type="text" v-model="password" placeholder="password..." />
          </div>
        </div>
      </div>
      <div>
        <div class="btn" @click="toEdit()">
          <span>登 陆</span>
          <div class="color"></div>
        </div>
        <div class="btn copy-shadow">
          <div class="color"></div>
        </div>
      </div>
    </div>
    <div class="background"></div>
  </div>
</template>

<script>
import { login } from "@/js/api/user";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  mounted() {},
  methods: {
    toEdit() {
      login({ username: this.username, password: this.password }).then(
        res => {
          if (res.code == 200) {
            this.$cookie.set("token", res.data);
            this.$cookie.set("user", {
              username: this.username,
              password: this.password
            });
            this.$message.success("登陆成功~");
            this.$router.push("/");
          } else {
            this.$message.error(res.msg);
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
