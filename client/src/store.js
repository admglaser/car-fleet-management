function Store({ api }) {
  const state = {
    token: null,
    userId: null,
    name: null,
    admin: false,
    cars: [],
    users: [],
    carTypes: [],
    fuelTypes: [],
    claimableCars: [],
  };
  const mutations = {
    setToken: (state, value) => {
      state.token = value;
    },
    setUserId: (state, value) => {
      state.userId = value;
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
    setClaimableCars: (state, value) => {
      state.claimableCars = value;
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
    async addCar({ state, commit }, car) {
      const addedCar = await api.addCar(car);
      commit("setCars", [...state.cars, addedCar]);
    },
    async updateCar({ state, commit }, car) {
      const updatedCar = await api.updateCar(car);
      const cars = state.cars.filter((c) => c.id !== car.id);
      commit("setCars", [...cars, updatedCar]);
    },
    async loadCars({ commit }) {
      const cars = await api.getCars();
      cars.forEach((car) => {
        if (car.owner) {
          car.owner.text = car.owner.firstName + " " + car.owner.lastName;
        }
      });
      commit("setCars", cars);
    },
    async loadClaimableCars({ commit }) {
      const cars = await api.getClaimableCars();
      commit("setClaimableCars", cars);
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
