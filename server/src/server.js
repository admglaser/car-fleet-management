require("dotenv").config();
const Cloudant = require("@cloudant/cloudant");
const { cloudantUrl, ibmCloudApiKey, serverPort } = require("./config");
const { App } = require("./app");
const { CarTypeDao, UserDao } = require("./dao");

async function run() {
  const cloudant = Cloudant({
    url: cloudantUrl,
    plugins: {
      iamauth: { iamApiKey: ibmCloudApiKey },
    },
  });
  const userDao = await UserDao({ cloudant });
  const carTypeDao = await CarTypeDao({ cloudant });
  const app = App({ carTypeDao, userDao });
  app.listen(serverPort, () =>
    console.log(`Server running at http://localhost:${serverPort}`)
  );
}

run();
