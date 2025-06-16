const Yup = require("yup");

//? Validate Edit Applicant Schema
const validateEditApplicantSchema = Yup.object()
  .shape({
    applicantFirstName: Yup.string().required("Applicant first name required!"),
    applicantMiddleName: Yup.string().notRequired(),
    applicantLastName: Yup.string().required("Applicant last name required!"),
    applicantSex: Yup.string().required("Please choose one!"),
  })
  .required();

module.exports = { validateEditApplicantSchema };
