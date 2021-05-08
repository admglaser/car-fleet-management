function Store({ api }) {
  const state = {
    token: null,
    name: null,
    admin: false,
    cars: [],
    users: [],
    carTypes: [],
    fuelTypes: [],
  };
  const mutations = {
    setToken: (state, value) => {
      state.token = value;
    },
    setName: (state, value) => {
      state.name = value;
    },
    setAdmin: (state, value) => {
      state.admin = value;
    },
    setCars: (state, value) => {
      state.cars = value;
    },
    setCarTypes: (state, value) => {
      state.carTypes = value;
    },
    setFuelTypes: (state, value) => {
      state.fuelTypes = value;
    },
    setUsers: (state, value) => {
      state.users = value;
    },
  };
  const actions = {
    async loadCars({ commit }) {
      const cars = await api.getCars();
      commit("setCars", cars);
    },
    async loadCarTypes({ commit }) {
      const carTypes = await api.getCarTypes();
      commit("setCarTypes", carTypes);
    },
    async loadFuelTypes({ commit }) {
      const fuelTypes = await api.getFuelTypes();
      commit("setFuelTypes", fuelTypes);
    },
    async loadUsers({ commit }) {
      const users = await api.getUsers();
      users.forEach(
        (user) => (user.text = user.firstName + " " + user.lastName)
      );
      commit("setUsers", users);
    },
  };
  return {
    state,
    mutations,
    actions,
  };
}

export default Store;
