const jwt = require("jsonwebtoken");
const jwtSecret = "someSecret";

module.exports = {
  generateToken: (data, expiresIn = "24h") => {
    return jwt.sign(data, jwtSecret, { expiresIn });
  },
  verifyToken: (token) => {
    return jwt.verify(token, jwtSecret);
  },
};
