const express = require("express");
const router = express.Router();
const { passportAuthenticateJWT } = require("../middlewares/jwtMiddleware");
const { verifyToken } = require("../middlewares/authMiddleware");
const { validateInputs } = require("../middlewares/validateMiddleware");
const {
  validateRegisterApplicantSchema,
} = require("../validations/validateRegisterApplicant");
const {
  validateEditApplicantSchema,
} = require("../validations/validateEditApplicant");
const applicantsController = require("../controllers/applicantsController");

router.post(
  "/register-new-applicant",
  // validateInputs(validateRegisterApplicantSchema),
  applicantsController.RegisterNewApplicant
);
router.get(
  "/",
  passportAuthenticateJWT,
  verifyToken,
  applicantsController.GetAllApplicants
);
router.get(
  "/:id",
  passportAuthenticateJWT,
  verifyToken,
  applicantsController.GetApplicantById
);
router.put(
  "/:id",
  passportAuthenticateJWT,
  verifyToken,
  validateInputs(validateEditApplicantSchema),
  applicantsController.UpdateApplicantById
);
router.delete(
  "/:id",
  passportAuthenticateJWT,
  verifyToken,
  applicantsController.DeleteApplicantById
);

module.exports = router;
