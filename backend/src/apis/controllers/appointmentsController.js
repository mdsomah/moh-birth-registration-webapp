require("dotenv").config();
const { Logger } = require("../libs/logger");
const asyncHandler = require("express-async-handler");
const { HTTPErrors } = require("../utils/errorUtils");
const {
  createNewAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
} = require("../services/appointmentsService");

//? Create New Appointment
const CreateNewAppointment = asyncHandler(async (req, res, next) => {
  //? Destructure req.body
  const {
    appointmentDate,
    appointmentTime,
    reasonForAppointment,
    applicantId,
  } = req.body;

  try {
    Logger.info("Creating New Appointment: Status success!");
    const newAppointment = await createNewAppointment(
      appointmentDate,
      appointmentTime,
      reasonForAppointment,
      applicantId
    );
    return res.status(201).json({
      success: true,
      isAuthenticated: true,
      method: req.method,
      message: "Appointment created successfully!",
      newAppointment: newAppointment,
    });
  } catch (err) {
    Logger.error("Creating New Appointment: Status failed!");
    return next(HTTPErrors(500, `${err}`));
  }
});

//? Get All Appointments
const GetAllAppointments = asyncHandler(async (_req, res, next) => {
  try {
    Logger.info("Getting All Appointments: Status success!");
    const appointments = await getAllAppointments();
    return res.status(200).json(appointments);
  } catch (err) {
    Logger.error("Getting All Appointments: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Get Appointment ById
const GetAppointmentById = asyncHandler(async (req, res, next) => {
  //? Destructure id from req.params
  const { id } = req.params;

  try {
    Logger.info("Getting Appointment ById: Status success!");
    const appointment = await getAppointmentById(id);
    return res.status(200).json(appointment);
  } catch (err) {
    Logger.error("Getting Appointment ById: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Update Appointment ById
const UpdateAppointmentById = asyncHandler(async (req, res, next) => {
  //? Destructure id from req.params
  const { id } = req.params;

  //? Destructure req.body
  const { appointmentDate, appointmentTime, reasonForAppointment } = req.body;

  try {
    Logger.info("Updating Appointment ById: Status success!");
    const updateAppointment = await updateAppointmentById(
      id,
      appointmentDate,
      appointmentTime,
      reasonForAppointment
    );
    return res.status(200).json({
      success: true,
      isAuthenticated: true,
      method: req.method,
      message: "Appointment updated successfully!",
      updateAppointment: updateAppointment,
    });
  } catch (err) {
    Logger.error("Updating Appointment ById: Status failed!");
    return next(HTTPErrors(500, `${err}`));
  }
});

//? Delete Appointment ById
const DeleteAppointmentById = asyncHandler(async (req, res, next) => {
  //? Destructure id from req.params
  const { id } = req.params;

  try {
    Logger.info("Deleting Appointment ById: Status success!");
    const deleteAppointment = await deleteAppointmentById(id);
    return res.status(200).json({
      success: true,
      isAuthenticated: true,
      method: req.method,
      message: "Role deleted successfully!",
      deleteAppointment: deleteAppointment,
    });
  } catch (err) {
    Logger.error("Deleting Appointment ById: Status failed!");
    return next(HTTPErrors(400, `${err}`));
  }
});

module.exports = {
  CreateNewAppointment,
  GetAllAppointments,
  GetAppointmentById,
  UpdateAppointmentById,
  DeleteAppointmentById,
};
