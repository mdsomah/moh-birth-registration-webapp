const Yup = require("yup");

//? Forget Password Schema
const validateForgetPasswordSchema = Yup.object()
  .shape({
    email: Yup.string().required("Email required!").email("Invalid email!"),
  })
  .required();

module.exports = { validateForgetPasswordSchema };
