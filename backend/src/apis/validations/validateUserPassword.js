const Yup = require("yup");

//? Validate User Password Schema
const validateUserPasswordSchema = Yup.object()
  .shape({
    password: Yup.string()
      .required("Password required!")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm password required!")
      .oneOf([Yup.ref("password"), null], "Confirm password does not match!"),
  })
  .required();

module.exports = { validateUserPasswordSchema };
