const express = require("express");

function Api({ userDao }) {
  const router = express.Router();
  router.get("/users", async (req, res) => {
    if (!req.user.admin) {
      return res.sendStatus(401);
    }
    res.json(await userDao.getUsers());
  });
  return router;
}

module.exports = Api;
