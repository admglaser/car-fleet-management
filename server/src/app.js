const express = require("express");
const path = require("path");
const FacebookAuth = require("./routes/facebookAuth");
const Api = require("./routes/api");
const jwtMiddleware = require("./middlewares/jwtMiddleware");

function App({ userDao }) {
  const app = express();
  app.use("/", express.static(path.join(__dirname, "../../client/dist/")));
  app.use(FacebookAuth({ app, userDao }));
  app.use("/api", jwtMiddleware, Api({ userDao }));
  return app;
}

module.exports = { App };
