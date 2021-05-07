import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export function Store() {
  const state = {
    token: null,
    name: null,
    cars: [],
  };
  const mutations = {
    setToken: (state, value) => {
      state.token = value;
    },
    setName: (state, value) => {
      state.name = value;
    },
    setCars: (state, value) => {
      state.cars = value;
    },
  };

  return {
    state,
    mutations,
  };
}

export default new Vuex.Store(Store());
