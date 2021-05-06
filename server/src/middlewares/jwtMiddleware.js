const { verifyToken } = require("../util/jwt");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/, "");
    const data = verifyToken(token);
    req.user = { id: data.userId, admin: data.admin };
  } catch (err) {
    return res.sendStatus(401);
  }
  next();
};
