require("dotenv").config();
const Cloudant = require("@cloudant/cloudant");
const { cloudantUrl, ibmCloudApiKey, serverPort } = require("./config");
const { App } = require("./app");
const { CarDao, CarTypeDao, FuelTypeDao, UserDao } = require("./dao");

async function run() {
  const cloudant = Cloudant({
    url: cloudantUrl,
    plugins: {
      iamauth: { iamApiKey: ibmCloudApiKey },
    },
  });
  const userDao = await UserDao({ cloudant });
  const carTypeDao = await CarTypeDao({ cloudant });
  const carDao = await CarDao({ cloudant });
  const fuelTypeDao = await FuelTypeDao({ cloudant });
  const app = App({ carDao, carTypeDao, fuelTypeDao, userDao });
  app.listen(serverPort, () =>
    console.log(`Server running at http://localhost:${serverPort}`)
  );
}

run();
