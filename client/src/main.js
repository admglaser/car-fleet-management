import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

// https://github.com/jaredhanson/passport-facebook#why-is-__-appended-to-the-redirect-uri
if (window.location.hash && window.location.hash == "#/_=_") {
  window.location.hash = "";
}

if (document.cookie) {
  const token = getCookie("auth");
  store.commit("setToken", token);
  const name = getCookie("name");
  store.commit("setName", name);
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return decodeURI(match[2]);
}
