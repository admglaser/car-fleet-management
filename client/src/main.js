import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import App from "./App.vue";
import Router from "./router";
import Store from "./store";
import Api from "./api";

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

// https://github.com/jaredhanson/passport-facebook#why-is-__-appended-to-the-redirect-uri
if (window.location.hash && window.location.hash == "#_=_") {
  window.location.hash = "";
}

let token, name, admin;

if (document.cookie) {
  token = getCookie("auth");
  name = getCookie("name");
  admin = getCookie("admin");
}
const api = Api({ token });

const store = new Vuex.Store(Store({ api }));
store.commit("setToken", token);
store.commit("setName", name);
store.commit("setAdmin", admin === "true");

const router = Router({ store });

if (document.cookie) {
  const token = getCookie("auth");
  store.commit("setToken", token);
  const name = getCookie("name");
  store.commit("setName", name);
  const admin = getCookie("admin");
  store.commit("setAdmin", admin === "true");
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
