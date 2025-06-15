const Yup = require("yup");

//? Validate Edit User Role Schema
const validateEditUserRoleSchema = Yup.object()
  .shape({
    roleName: Yup.string().required("Role name required!"),
  })
  .required();

module.exports = { validateEditUserRoleSchema };
