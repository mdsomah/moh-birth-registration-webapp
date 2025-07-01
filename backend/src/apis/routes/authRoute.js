const router = require("express").Router();
const { rateLimitter } = require("../middlewares/rateLimitMiddleware");
const { rateSlowdown } = require("../middlewares/rateSlowdownMiddleware");
const {
  passportAuthenticateJWT,
  passportAuthenticateLocal,
  passportAuthenticateRememberMe,
} = require("../middlewares/jwtMiddleware");
const { verifyToken } = require("../middlewares/authMiddleware");
const { validateInputs } = require("../middlewares/validateMiddleware");
const { validateUserLoginSchema } = require("../validations/validateAuth");
const {
  validateForgetPasswordSchema,
} = require("../validations/validateForgetPassword");
const {
  validatePasswordResetSchema,
} = require("../validations/validateResetPassword");
const authController = require("../controllers/authController");

router.post(
  "/login",
  validateInputs(validateUserLoginSchema),
  passportAuthenticateLocal,
  passportAuthenticateRememberMe,
  authController.Login
);
router.post(
  "/logout",
  passportAuthenticateJWT,
  verifyToken,
  authController.Logout
);
router.get(
  "/authenticated",
  passportAuthenticateJWT,
  verifyToken,
  authController.GetAuthenticatedUser
);
router.post(
  "/refresh-token",
  passportAuthenticateJWT,
  authController.RefreshToken
);
router.post(
  "/forget-password",
  rateLimitter,
  rateSlowdown,
  validateInputs(validateForgetPasswordSchema),
  authController.ForgetUserPassword
);
router.post(
  "/reset-password",
  validateInputs(validatePasswordResetSchema),
  authController.ResetUserPassword
);

module.exports = router;
