const Yup = require("yup");
require("yup-phone-lite");

//? Email Regex
const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

//? Validate User Profile Schema
const validateUserProfileSchema = Yup.object()
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
      .email("Invalid email address!")
      .test("is-email", "Invalid email address", (value) => {
        if (value) {
          return value.includes("@")
            ? Yup.string().email().matches(emailRegex).isValid(value)
            : true;
        }
        return true;
      }),
    userName: Yup.string().required("User name required!"),
    role: Yup.string().required("Please select role!"),
    userRoleId: Yup.string().notRequired(),
  })
  .required();

module.exports = { validateUserProfileSchema };
