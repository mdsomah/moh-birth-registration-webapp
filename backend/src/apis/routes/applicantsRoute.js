const express = require("express");
const router = express.Router();
const { uploads } = require("../utils/uploadUtils");
const { passportAuthenticateJWT } = require("../middlewares/jwtMiddleware");
const { verifyToken } = require("../middlewares/authMiddleware");
const { validateInputs } = require("../middlewares/validateMiddleware");
const {
  validateRegisterApplicantSchema,
} = require("../validations/validateRegisterApplicant");
const {
  validateAddApplicantSchema,
} = require("../validations/validateAddApplicant");
const {
  validateEditApplicantSchema,
} = require("../validations/validateEditApplicant");
const applicantsController = require("../controllers/applicantsController");

router.post(
  "/register-new-applicant",
  validateInputs(validateRegisterApplicantSchema),
  uploads.fields([
    {
      name: "applicantPhoto",
      maxCount: 1,
    },
    {
      name: "parentOrGuardianPhoto",
      maxCount: 1,
    },
  ]),
  applicantsController.RegisterNewApplicant
);
router.post(
  "/add-new-applicant",
  passportAuthenticateJWT,
  verifyToken,
  // validateInputs(validateAddApplicantSchema),
  uploads.fields([
    {
      name: "applicantPhoto",
      maxCount: 1,
    },
    {
      name: "parentOrGuardianPhoto",
      maxCount: 1,
    },
  ]),
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
router.post(
  "/generate-reports",
  passportAuthenticateJWT,
  verifyToken,
  applicantsController.GenerateApplicantReports
);

module.exports = router;
