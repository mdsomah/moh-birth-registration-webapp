require("dotenv").config();
const { Logger } = require("../libs/logger");
const asyncHandler = require("express-async-handler");
const { HTTPErrors } = require("../utils/errorUtils");
const {
  createNewPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
} = require("../services/paymentsService");

//? Create New Payment
const CreateNewPayment = asyncHandler(async (req, res, next) => {
  //? Destructure req.body
  const { paymentType, currency, amountPay, paymentDate, applicantId } =
    req.body;

  try {
    Logger.info("Creating New Payment: Status success!");
    const newPayment = await createNewPayment(
      paymentType,
      currency,
      amountPay,
      paymentDate,
      applicantId
    );
    return res.status(201).json({
      success: true,
      isAuthenticated: true,
      method: req.method,
      message: "Payment created successfully!",
      newPayment: newPayment,
    });
  } catch (err) {
    Logger.error("Creating New Payment: Status failed!");
    return next(HTTPErrors(500, `${err}`));
  }
});

//? Get All Payments
const GetAllPayments = asyncHandler(async (_req, res, next) => {
  try {
    Logger.info("Getting All Payments: Status success!");
    const payments = await getAllPayments();
    return res.status(200).json(payments);
  } catch (err) {
    Logger.error("Getting All Payments: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Get Payment ById
const GetPaymentById = asyncHandler(async (req, res, next) => {
  //? Destructure id from req.params
  const { id } = req.params;

  try {
    Logger.info("Getting Payment ById: Status success!");
    const payment = await getPaymentById(id);
    return res.status(200).json(payment);
  } catch (err) {
    Logger.error("Getting Payment ById: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Update Payment ById
const UpdatePaymentById = asyncHandler(async (req, res, next) => {
  //? Destructure id from req.params
  const { id } = req.params;

  //? Destructure req.body
  const { paymentType, currency, amountPay, paymentDate } = req.body;

  try {
    Logger.info("Updating Payment ById: Status success!");
    const updatePayment = await updatePaymentById(
      id,
      paymentType,
      currency,
      amountPay,
      paymentDate
    );
    return res.status(200).json({
      success: true,
      isAuthenticated: true,
      method: req.method,
      message: "Payment updated successfully!",
      updatePayment: updatePayment,
    });
  } catch (err) {
    Logger.error("Updating Payment ById: Status failed!");
    return next(HTTPErrors(500, `${err}`));
  }
});

//? Delete Payment ById
const DeletePaymentById = asyncHandler(async (req, res, next) => {
  //? Destructure id from req.params
  const { id } = req.params;

  try {
    Logger.info("Deleting Payment ById: Status success!");
    const deletePayment = await deletePaymentById(id);
    return res.status(200).json({
      success: true,
      isAuthenticated: true,
      method: req.method,
      message: "Role deleted successfully!",
      deletePayment: deletePayment,
    });
  } catch (err) {
    Logger.error("Deleting Payment ById: Status failed!");
    return next(HTTPErrors(400, `${err}`));
  }
});

module.exports = {
  CreateNewPayment,
  GetAllPayments,
  GetPaymentById,
  UpdatePaymentById,
  DeletePaymentById,
};
