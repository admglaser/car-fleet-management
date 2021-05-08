const express = require("express");
const path = require("path");
const { Api, FacebookAuth } = require("./routes");

function App({ carTypeDao, userDao }) {
  const app = express();
  app.use("/", express.static(path.join(__dirname, "../../client/dist/")));
  app.use(FacebookAuth({ app, userDao }));
  app.use(Api({ carTypeDao, userDao }));
  return app;
}

module.exports = { App };
