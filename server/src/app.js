const express = require("express");
const path = require("path");

function App() {
  const app = express();
  app.use("/", express.static(path.join(__dirname, "../../client/dist/")));
  return app;
}

module.exports = { App };
