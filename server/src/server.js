const { serverPort } = require("./config");
const { App } = require("./app");

const app = App();
app.listen(serverPort, () =>
  console.log(`Server running at http://localhost:${serverPort}`)
);
