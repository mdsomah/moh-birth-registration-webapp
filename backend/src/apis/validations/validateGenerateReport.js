const Yup = require("yup");

//? Validate Generate Report Schema
const validateGenerateReportSchema = Yup.object()
  .shape({
    appointmentDate: Yup.string().required("Appointment date required!"),
    appointmentTime: Yup.string().required("Appointment time required!"),
    reasonForAppointment: Yup.number().required(
      "Reason for appointment required!"
    ),
    applicantId: Yup.string().notRequired(),
  })
  .required();

module.exports = { validateGenerateReportSchema };
