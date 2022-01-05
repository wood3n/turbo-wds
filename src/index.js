import Vue from 'vue';

new Vue({
  data() {
    return {
      hi: "hello world!"
    }
  },
  render (h) {
    return h('div', this.hi)
  }
}).$mount("#app");