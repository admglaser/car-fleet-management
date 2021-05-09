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
    if (req.query && req.query.claimable) {
      const cars = await carDao.getCars();
      const claimableCars = cars.filter(
        (car) => !car.owner || car.owner.id === req.user.id
      );
      return res.json(claimableCars);
    }

    if (!req.user.admin) {
      return res.sendStatus(401);
    }
    res.json(await carDao.getCars());
  });

  router.get("/api/cars/:id/claim", async (req, res) => {
    const userId = req.user.id;
    const cars = await carDao.getCars();
    const canClaim = !cars.find((car) => car.owner && car.owner.id === userId);
    if (!canClaim) {
      return res.status(400).send("Cannot claim another car!");
    }

    const car = cars.find((c) => c.id === req.params.id);
    if (car.owner) {
      return res.status(400).send("This car is already claimed!");
    }

    const user = await userDao.findUser({ id: userId });
    const updatedCar = { ...car, owner: user };
    await carDao.updateCar(updatedCar);
    res.json(updatedCar);
  });

  router.get("/api/cars/:id/revoke", async (req, res) => {
    const userId = req.user.id;
    const carId = req.params.id;
    const cars = await carDao.getCars();
    const car = cars.find((c) => c.id === carId);
    if (!car.owner || car.owner.id !== userId) {
      return res.status(400).send("This car is not yours!");
    }

    const updatedCar = { ...car, owner: null };
    await carDao.updateCar(updatedCar);
    res.json(updatedCar);
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

  router.put("/api/cars/:id", async (req, res) => {
    if (!req.user.admin) {
      return res.sendStatus(401);
    }

    const car = req.body;
    const id = req.params.id;
    try {
      const users = await userDao.getUsers();
      const carTypes = await carTypeDao.getCarTypes();
      const fuelTypes = await fuelTypeDao.getFuelTypes();
      validateCar(car, users, carTypes, fuelTypes);
      await carDao.updateCar({ ...car, id });
      res.json({ ...car, id });
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

  return router;
}

module.exports = Api;
