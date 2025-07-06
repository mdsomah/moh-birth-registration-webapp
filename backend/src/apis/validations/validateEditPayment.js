const Yup = require("yup");

//? Validate Edit Payment Schema
const validateEditPaymentSchema = Yup.object()
  .shape({
    paymentType: Yup.string().required("Payment type required!"),
    currency: Yup.string().required("Currency required!"),
    amountPay: Yup.number().required("Payment amount required!"),
    paymentDate: Yup.string().required("Payment date required!"),
  })
  .required();

module.exports = { validateEditPaymentSchema };
