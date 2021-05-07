const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const { generateToken } = require("../util/jwt");
const { appUrl, facebookClientId, facebookClientSecret } = require("../config");

function Facebook({ app, userDao }) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
  passport.use(
    new FacebookStrategy(
      {
        clientID: facebookClientId,
        clientSecret: facebookClientSecret,
        callbackURL: appUrl + "/auth/facebook/callback/",
        profileFields: ["email", "name"],
      },
      function (_accessToken, _refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );

  const router = express.Router();
  router.use(passport.initialize());
  router.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: "email" })
  );
  router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      session: false,
    }),
    async (req, res) => {
      console.error("callbackURL", passport._strategies.facebook._callbackURL);
      const user = {
        id: req.user._json.id,
        email: req.user._json.email,
        firstName: req.user._json.first_name,
        lastName: req.user._json.last_name,
      };
      const userInDb = await userDao.findUser({ id: user.id });
      if (!userInDb) {
        await userDao.addUser(user);
      }
      const admin = userInDb ? userInDb.admin : false;
      const token = generateToken({ userId: user.id, admin });
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      res.cookie("auth", token, { expires });
      res.cookie("name", user.firstName, { expires });
      res.redirect("/");
    }
  );
  return router;
}

module.exports = Facebook;
