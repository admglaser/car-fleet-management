require("dotenv").config();
const Cloudant = require("@cloudant/cloudant");
const { cloudantUrl, ibmCloudApiKey, serverPort } = require("./config");
const { App } = require("./app");
const UserDao = require("./dao/userDao");

async function run() {
  const cloudant = Cloudant({
    url: cloudantUrl,
    plugins: {
      iamauth: { iamApiKey: ibmCloudApiKey },
    },
  });
  const userDao = await UserDao({ cloudant });
  const app = App({ userDao });
  app.listen(serverPort, () =>
    console.log(`2Server running at http://localhost:${serverPort}`)
  );
}

run();
