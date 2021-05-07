import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export function Store() {
  const state = {
    token: null,
    name: null,
  };
  const mutations = {
    setToken: (state, value) => {
      state.token = value;
    },
    setName: (state, value) => {
      state.name = value;
    },
  };

  return {
    state,
    mutations,
  };
}

export default new Vuex.Store(Store());
