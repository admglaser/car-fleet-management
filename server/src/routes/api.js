const express = require("express");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

function Api({ carTypeDao, userDao }) {
  const router = express.Router();
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

  return router;
}

module.exports = Api;
