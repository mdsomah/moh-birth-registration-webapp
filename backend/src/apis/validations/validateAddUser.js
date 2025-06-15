const Yup = require("yup");
require("yup-phone-lite");

//? Email Regex
const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

//? User Image upload formats
const SUPPORTED_FORMATS = ["image/jpeg, image/jpg, image/png, image/jif"];

//? User Image upload size
const FILE_SIZE = 1024 * 1024 * 25;

//? Validate Add User Schema
const validateAddUserSchema = Yup.object()
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
    password: Yup.string()
      .required("Password required!")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm password required!")
      .oneOf([Yup.ref("password"), null], "Confirm password does not match!"),
    photo: Yup.mixed()
      .notRequired()
      .test(
        "fileFormat",
        "File type not supported! Supported types: (.jpeg, .jpg, .png or .jif)",
        (value) =>
          !value || ((value) => value && SUPPORTED_FORMATS.includes(value.type))
      )
      .test(
        "fileSize",
        "File is too large! Supported size: (2MB)",
        (value) => !value || (value && value.size <= FILE_SIZE)
      ),
    userRoleId: Yup.string().notRequired(),
  })
  .required();

module.exports = { validateAddUserSchema };
