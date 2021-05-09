import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { BootstrapVue } from "bootstrap-vue";
import Store from "@/store";
import Router from "@/router";
import NavBar from "./NavBar.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(VueRouter);

describe("NavBar", () => {
  let store, router;

  beforeEach(() => {
    store = new Vuex.Store(Store({ api: {} }));
    router = Router({ store });
  });

  it("name appears in the user menu", () => {
    store.state.name = "someName";
    const wrapper = setup();
    expect(wrapper.findComponent({ ref: "name" }).text()).toBe("someName");
  });

  it("logout resets user values in store", async () => {
    store.replaceState({
      token: "someToken",
      userId: "someId",
      name: "someName",
      admin: true,
    });
    const wrapper = setup();
    wrapper.findComponent({ ref: "logout" }).vm.$emit("click");
    expect(store.state.token).toBe(null);
    expect(store.state.userId).toBe(null);
    expect(store.state.name).toBe(null);
    expect(store.state.admin).toBe(false);
  });

  function setup() {
    return mount(NavBar, { localVue, store, router });
  }
});
