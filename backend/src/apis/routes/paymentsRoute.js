const express = require("express");
const router = express.Router();
const { passportAuthenticateJWT } = require("../middlewares/jwtMiddleware");
const { verifyToken } = require("../middlewares/authMiddleware");
const { validateInputs } = require("../middlewares/validateMiddleware");
const {
  validateAddPaymentSchema,
} = require("../validations/validateAddPayment");
const {
  validateEditPaymentSchema,
} = require("../validations/validateEditPayment");
const paymentsController = require("../controllers/paymentsController");

router.post(
  "/create-new-payment",
  passportAuthenticateJWT,
  verifyToken,
  validateInputs(validateAddPaymentSchema),
  paymentsController.CreateNewPayment
);
router.get(
  "/",
  passportAuthenticateJWT,
  verifyToken,
  paymentsController.GetAllPayments
);
router.get(
  "/:id",
  passportAuthenticateJWT,
  verifyToken,
  paymentsController.GetPaymentById
);
router.put(
  "/:id",
  passportAuthenticateJWT,
  verifyToken,
  validateInputs(validateEditPaymentSchema),
  paymentsController.UpdatePaymentById
);
router.delete(
  "/:id",
  passportAuthenticateJWT,
  verifyToken,
  paymentsController.DeletePaymentById
);

module.exports = router;
