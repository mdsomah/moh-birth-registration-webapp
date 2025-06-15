const Yup = require("yup");

//? Validate Add User Role Schema
const validateAddUserRoleSchema = Yup.object()
  .shape({
    roleName: Yup.string().required("Role name required!"),
  })
  .required();

module.exports = { validateAddUserRoleSchema };
