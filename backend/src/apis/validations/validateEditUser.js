const Yup = require("yup");
require("yup-phone-lite");

//? Validate Edit User Schema
const validateEditUserSchema = Yup.object()
  .shape({
    lastName: Yup.string().required("Last name required!"),
    firstName: Yup.string().required("First name required!"),
    middleName: Yup.string().notRequired(),
    displayName: Yup.string().required("Display name required!"),
    primaryPhoneNumber: Yup.string()
      .phone(null, "Please enter a valid phone number!")
      .required("Primary phone number required!"),
    secondaryPhoneNumber: Yup.string().notRequired(),
    email: Yup.string()
      .required("Email address required!")
      .email("Invalid email address!"),
    userName: Yup.string().required("User name required!"),
    role: Yup.string().required("Please select user role!"),
    userRoleId: Yup.string().notRequired(),
  })
  .required();

module.exports = { validateEditUserSchema };
