const Yup = require("yup");

//? Validate Add Payment Schema
const validateAddPaymentSchema = Yup.object()
  .shape({
    paymentType: Yup.string().required("Payment type required!"),
    currency: Yup.string().required("Currency required!"),
    amountPay: Yup.number().required("Payment amount required!"),
    paymentDate: Yup.string().required("Payment date required!"),
    applicantId: Yup.string().notRequired(),
  })
  .required();

module.exports = { validateAddPaymentSchema };
