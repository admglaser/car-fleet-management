const express = require("express");
const path = require("path");
const { Api, FacebookAuth } = require("./routes");

function App({ carDao, carTypeDao, fuelTypeDao, userDao }) {
  const app = express();
  app.use("/", express.static(path.join(__dirname, "../../client/dist/")));
  app.use(FacebookAuth({ app, userDao }));
  app.use(Api({ carDao, carTypeDao, fuelTypeDao, userDao }));
  return app;
}

module.exports = { App };
