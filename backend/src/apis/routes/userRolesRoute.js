const express = require("express");
const router = express.Router();
const { passportAuthenticateJWT } = require("../middlewares/jwtMiddleware");
const { verifyToken } = require("../middlewares/authMiddleware");
const { validateInputs } = require("../middlewares/validateMiddleware");
const {
  validateAddUserRoleSchema,
} = require("../validations/validateAddUserRole");
const {
  validateEditUserRoleSchema,
} = require("../validations/validateEditUserRole");
const userRolesController = require("../controllers/userRolesController");

router.post(
  "/create-new-role",
  passportAuthenticateJWT,
  verifyToken,
  validateInputs(validateAddUserRoleSchema),
  userRolesController.CreateNewUserRole
);
router.get(
  "/",
  passportAuthenticateJWT,
  verifyToken,
  userRolesController.GetAllUsersRoles
);
router.get(
  "/:id",
  passportAuthenticateJWT,
  verifyToken,
  userRolesController.GetUserRoleById
);
router.put(
  "/:id",
  passportAuthenticateJWT,
  verifyToken,
  validateInputs(validateEditUserRoleSchema),
  userRolesController.UpdateUserRoleById
);
router.delete(
  "/:id",
  passportAuthenticateJWT,
  verifyToken,
  userRolesController.DeleteUserRoleById
);

module.exports = router;
