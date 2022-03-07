<template>
  <div class="message">
    <transition-group name="message-ani">
      <div
        :class="['tips', data.type]"
        v-show="data.show"
        v-for="data in arr"
        :key="data.id"
      >
        <i>
          <svg
            class="svg-inline--fa fa-pencil-alt fa-w-16"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"
            ></path>
          </svg>
        </i>
        <span>{{ data.msg }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
      arr: []
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
* {
  transition: all 0.5s;
}
.message {
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  text-align: center;
  animation: enter 0.5s forwards;
  z-index: 999;
  > span {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
  .tips {
    display: inline-flex;
    min-width: 170px;
    max-width: 500px;
    min-height: 25px;
    justify-content: start;
    align-items: center;
    border-radius: 35px;
    border: 3px solid white;
    background-color: rgba(153, 204, 102, 0.9);
    padding: 10px 10px;
    line-height: 23px;
    margin-bottom: 20px;
    position: relative;
    box-shadow: 0 3px 10px rgba(153, 204, 102, 0.5);
    > span {
      flex: 9;
      color: white;
      font-size: 14px;
    }
    > i {
      flex: 1;
      color: white;
    }
  }
  .success {
    background-color: rgba(153, 204, 102, 0.9);
    box-shadow: 0 3px 10px rgba(153, 204, 102, 0.5);
  }
  .error {
    background-color: rgba(255, 0, 51, 0.7);
    box-shadow: 0 3px 10px rgba(255, 0, 51, 0.5);
  }
  .warning {
    background-color: rgba(255, 153, 0, 0.9);
    box-shadow: 0 3px 10px rgba(255, 153, 0, 0.5);
  }
}

@keyframes message-ani {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.message-ani-enter-active {
  animation: message-ani 0.5s;
}

.message-ani-leave-active {
  animation: message-ani 0.5s reverse;
}
</style>
