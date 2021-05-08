import _axios from "axios";

export function Api({ axios = _axios, token } = {}) {
  const { get } = axios.create({
    headers: { Authorization: "Bearer " + token },
  });
  async function getCars() {
    const { data } = await get("/api/cars");
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
    getCarTypes,
    getFuelTypes,
    getUsers,
  };
}

export default Api;
