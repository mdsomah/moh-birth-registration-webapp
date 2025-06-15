const { passport } = require("../config/passportConfig");
const { HTTPErrors } = require("../utils/errorUtils");

//? JWT Strategy
const passportAuthenticateJWT = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, _info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(HTTPErrors(401, "Not authenticated!"));
    }
    req.user = user;
    next();
  })(req, res, next);
};

//? Local Strategy
const passportAuthenticateLocal = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, _info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(HTTPErrors(406, "Invalid login!"));
    }
    req.user = user;
    next();
  })(req, res, next);
};

//? RememberMe Strategy
const passportAuthenticateRememberMe = (req, res, next) => {
  passport.authenticate(
    "remember-me",
    { session: false },
    (err, user, _info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(HTTPErrors(406, "Remember me not check!"));
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

module.exports = {
  passportAuthenticateJWT,
  passportAuthenticateLocal,
  passportAuthenticateRememberMe,
};
