const Yup = require("yup");

//? Validate Edit Appointment Schema
const validateEditAppointmentSchema = Yup.object()
  .shape({
    appointmentDate: Yup.string().required("Appointment date required!"),
    appointmentTime: Yup.string().required("Appointment time required!"),
    reasonForAppointment: Yup.number().required(
      "Reason for appointment required!"
    ),
  })
  .required();

module.exports = { validateEditAppointmentSchema };
