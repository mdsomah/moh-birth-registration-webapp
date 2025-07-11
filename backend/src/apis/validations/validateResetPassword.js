const Yup = require("yup");

//? Password Reset Schema
const validatePasswordResetSchema = Yup.object()
  .shape({
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required!")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  })
  .required();

module.exports = { validatePasswordResetSchema };
