import _axios from "axios";

export function Api({ axios = _axios, token } = {}) {
  const { get, post, put } = axios.create({
    headers: { Authorization: "Bearer " + token },
  });
  async function getCars() {
    const { data } = await get("/api/cars");
    return data;
  }
  async function addCar(car) {
    const { data } = await post("/api/cars", car);
    return data;
  }
  async function updateCar(car) {
    const { data } = await put(`/api/cars/${car.id}`, car);
    return data;
  }
  async function getCarTypes() {
    const { data } = await get("/api/carTypes");
    return data;
  }
  async function getFuelTypes() {
    const { data } = await get("/api/fuelTypes");
    return data;
  }
  async function getUsers() {
    const { data } = await get("/api/users");
    return data;
  }

  return {
    getCars,
    addCar,
    updateCar,
    getCarTypes,
    getFuelTypes,
    getUsers,
  };
}

export default Api;
