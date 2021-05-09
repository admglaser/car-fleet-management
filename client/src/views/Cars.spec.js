import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { BIconJustifyLeft, BootstrapVue } from "bootstrap-vue";
import Store from "@/store";
import Router from "@/router";
import Cars from "./Cars.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(VueRouter);

const CAR_1 = {
  licenseNumber: "licenseNumber1",
  owner: null,
  carType: "carType1",
  year: 2000,
  cm3: 1500,
  fuelType: "fuelType1",
};

const CAR_2 = {
  licenseNumber: "licenseNumber2",
  owner: null,
  carType: "carType2",
  year: 2000,
  cm3: 1500,
  fuelType: "fuelType2",
};

describe("Cars", () => {
  let api, store, router;

  beforeEach(() => {
    api = {
      getCars: jest.fn().mockReturnValue([]),
      getCarTypes: jest.fn().mockReturnValue([]),
      getFuelTypes: jest.fn().mockReturnValue([]),
      getUsers: jest.fn().mockReturnValue([]),
    };
    store = new Vuex.Store(Store({ api }));
    router = Router({ store });
  });

  it("displays cars from store", async () => {
    api.getCars.mockReturnValue([CAR_1, CAR_2]);

    const wrapper = setup();
    await wrapper.vm.$nextTick();

    expect(wrapper.findAllComponents({ ref: "carRow" })).toHaveLength(2);
    expect(wrapper.findAllComponents({ ref: "editButton" })).toHaveLength(2);
  });

  it("edit button shows modal with car data", async () => {
    api.getCars.mockReturnValue([CAR_1]);

    const wrapper = setup();
    wrapper.vm.$bvModal.show = jest.fn();
    await wrapper.vm.$nextTick();
    wrapper
      .findAllComponents({ ref: "editButton" })
      .at(0)
      .trigger("click");
    await wrapper.vm.$nextTick();

    const modal = wrapper.findComponent({ ref: "modal" });
    expect(modal.props().selectedCar).toBe(CAR_1);
    expect(wrapper.vm.$bvModal.show).toBeCalledWith("carModal");
  });

  it("add button shows modal with empty data", async () => {
    api.getCars.mockReturnValue([CAR_1]);

    const wrapper = setup();
    wrapper.vm.$bvModal.show = jest.fn();
    await wrapper.vm.$nextTick();
    wrapper.findComponent({ ref: "addButton" }).trigger("click");
    await wrapper.vm.$nextTick();

    const modal = wrapper.findComponent({ ref: "modal" });
    expect(modal.props().selectedCar).toBe(null);
    expect(wrapper.vm.$bvModal.show).toBeCalledWith("carModal");
  });

  function setup() {
    return mount(Cars, { localVue, store, router });
  }
});
