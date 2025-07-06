const express = require("express");
const router = express.Router();
const { passportAuthenticateJWT } = require("../middlewares/jwtMiddleware");
const { verifyToken } = require("../middlewares/authMiddleware");
const { validateInputs } = require("../middlewares/validateMiddleware");
const {
  validateAddAppointmentSchema,
} = require("../validations/validateAddAppointment");
const {
  validateEditAppointmentSchema,
} = require("../validations/validateEditAppointment");
const appointmentsController = require("../controllers/appointmentsController");

router.post(
  "/create-new-appointment",
  passportAuthenticateJWT,
  verifyToken,
  validateInputs(validateAddAppointmentSchema),
  appointmentsController.CreateNewAppointment
);
router.get(
  "/",
  passportAuthenticateJWT,
  verifyToken,
  appointmentsController.GetAllAppointments
);
router.get(
  "/:id",
  passportAuthenticateJWT,
  verifyToken,
  appointmentsController.GetAppointmentById
);
router.put(
  "/:id",
  passportAuthenticateJWT,
  verifyToken,
  validateInputs(validateEditAppointmentSchema),
  appointmentsController.UpdateAppointmentById
);
router.delete(
  "/:id",
  passportAuthenticateJWT,
  verifyToken,
  appointmentsController.DeleteAppointmentById
);

module.exports = router;
