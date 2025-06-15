const Yup = require("yup");

const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

//? User Login Schema
const validateUserLoginSchema = Yup.object()
  .shape({
    Username: Yup.string()
      .required("Email or user name required!")
      .test("is-email", "Invalid Email", (value) => {
        if (value) {
          return value.includes("@")
            ? Yup.string().email().matches(emailRegex).isValid(value)
            : true;
        }
        return true;
      }),
    Password: Yup.string().required("Password required!"),
  })
  .required();

module.exports = { validateUserLoginSchema };
