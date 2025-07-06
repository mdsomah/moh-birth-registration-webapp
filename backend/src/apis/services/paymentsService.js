const dayjs = require("dayjs");
const { prisma } = require("../models/db/database");

//? Create New Payment
const createNewPayment = async (
  paymentType,
  currency,
  amountPay,
  paymentDate,
  applicantId
) => {
  const newPayment = await prisma.payment.create({
    data: {
      paymentType: paymentType.trim(),
      currency: currency.trim(),
      amountPay: amountPay,
      paymentDate: dayjs(paymentDate).format("MM/DD/YYYY").trim(),
      applicant: {
        connect: { id: applicantId },
      },
    },
    include: { applicant: true },
  });

  return newPayment;
};

//? Get All Payments
const getAllPayments = async () => {
  const payments = await prisma.payment.findMany({
    include: { applicant: true },
  });
  if (!payments) {
    throw new Error("Payments not found!");
  }

  return payments;
};

//? Get Payment ById
const getPaymentById = async (id) => {
  const payment = await prisma.payment.findFirst({
    where: { id: id },
    include: { applicant: true },
  });
  if (!payment) {
    throw new Error(`Payment with this id: ${id} not found!`);
  }

  return payment;
};

//? Update Payment ById
const updatePaymentById = async (
  id,
  paymentType,
  currency,
  amountPay,
  paymentDate
) => {
  const updatePayment = await prisma.payment.update({
    where: { id: id },
    data: {
      paymentType: paymentType.trim(),
      currency: currency.trim(),
      amountPay: amountPay,
      paymentDate: dayjs(paymentDate).format("MM/DD/YYYY").trim(),
    },
    include: { applicant: true },
  });
  if (!updatePayment) {
    throw new Error(`Payment with this id: ${id} not found!`);
  }

  return updatePayment;
};

//? Delete Payment ById
const deletePaymentById = async (id) => {
  const deletePayment = await prisma.payment.delete({
    where: { id: id },
    include: { applicant: true },
  });
  if (!deletePayment) {
    throw new Error(`Payment with this id: ${id} not found!`);
  }

  return deletePayment;
};

module.exports = {
  createNewPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};
