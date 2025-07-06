const dayjs = require("dayjs");
const { prisma } = require("../models/db/database");

//? Create New Appointment
const createNewAppointment = async (
  appointmentDate,
  appointmentTime,
  reasonForAppointment,
  applicantId
) => {
  const newAppointment = await prisma.appointment.create({
    data: {
      appointmentDate: dayjs(appointmentDate).format("MM/DD/YYYY").trim(),
      appointmentTime: dayjs(appointmentTime).format("HH:mm").trim(),
      reasonForAppointment: reasonForAppointment.trim(),
      applicant: {
        connect: { id: applicantId },
      },
    },
    include: { applicant: true },
  });

  return newAppointment;
};

//? Get All Appointments
const getAllAppointments = async () => {
  const appointments = await prisma.appointment.findMany({
    include: { applicant: true },
  });
  if (!appointments) {
    throw new Error("Appointments not found!");
  }

  return appointments;
};

//? Get Appointment ById
const getAppointmentById = async (id) => {
  const appointment = await prisma.appointment.findFirst({
    where: { id: id },
    include: { applicant: true },
  });
  if (!appointment) {
    throw new Error(`Appointment with this id: ${id} not found!`);
  }

  return appointment;
};

//? Update Appointment ById
const updateAppointmentById = async (
  id,
  appointmentDate,
  appointmentTime,
  reasonForAppointment
) => {
  const updateAppointment = await prisma.appointment.update({
    where: { id: id },
    data: {
      appointmentDate: dayjs(appointmentDate).format("MM/DD/YYYY").trim(),
      appointmentTime: dayjs(appointmentTime).format("HH:mm").trim(),
      reasonForAppointment: reasonForAppointment.trim(),
    },
    include: { applicant: true },
  });
  if (!updateAppointment) {
    throw new Error(`Appointment with this id: ${id} not found!`);
  }

  return updateAppointment;
};

//? Delete Appointment ById
const deleteAppointmentById = async (id) => {
  const deleteAppointment = await prisma.appointment.delete({
    where: { id: id },
    include: { applicant: true },
  });
  if (!deleteAppointment) {
    throw new Error(`Appointment with this id: ${id} not found!`);
  }

  return deleteAppointment;
};

module.exports = {
  createNewAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
};
