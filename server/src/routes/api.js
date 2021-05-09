const express = require("express");
const bodyParser = require("body-parser");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const { validateCar } = require("../validators");

function Api({ carDao, carTypeDao, fuelTypeDao, userDao }) {
  const router = express.Router();
  router.use(bodyParser.json());
  router.use(jwtMiddleware);

  router.get("/api/users", async (req, res) => {
    if (!req.user.admin) {
      return res.sendStatus(401);
    }
    res.json(await userDao.getUsers());
  });

  router.get("/api/carTypes", async (req, res) => {
    if (!req.user.admin) {
      return res.sendStatus(401);
    }
    res.json(await carTypeDao.getCarTypes());
  });

  router.get("/api/fuelTypes", async (req, res) => {
    if (!req.user.admin) {
      return res.sendStatus(401);
    }
    res.json(await fuelTypeDao.getFuelTypes());
  });

  router.get("/api/cars", async (req, res) => {
    if (!req.user.admin) {
      return res.sendStatus(401);
    }
    res.json(await carDao.getCars());
  });

  router.post("/api/cars", async (req, res) => {
    if (!req.user.admin) {
      return res.sendStatus(401);
    }
    const car = req.body;
    try {
      const users = await userDao.getUsers();
      const carTypes = await carTypeDao.getCarTypes();
      const fuelTypes = await fuelTypeDao.getFuelTypes();
      validateCar(car, users, carTypes, fuelTypes);
      const data = await carDao.addCar(car);
      res.json({ ...car, id: data.id });
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

  return router;
}

module.exports = Api;
