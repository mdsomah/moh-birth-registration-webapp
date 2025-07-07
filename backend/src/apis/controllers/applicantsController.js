require("dotenv").config();
const { Logger } = require("../libs/logger");
const asyncHandler = require("express-async-handler");
const { HTTPErrors } = require("../utils/errorUtils");
const {
  registerNewApplicant,
  getAllApplicants,
  getApplicantById,
  updateApplicantById,
  deleteApplicantById,
  generateApplicantReports,
} = require("../services/applicantsService");

//? Register New Applicant
const RegisterNewApplicant = asyncHandler(async (req, res, next) => {
  //? Destructure req.body
  const {
    ninNumber,
    formNumber,
    applicantSex,
    dateOfApplication,
    applicantFirstName,
    applicantMiddleName,
    applicantLastName,
    applicantFacility,
    applicantTownOrCity,
    applicantCounty,
    applicantCountry,
    applicantDateOfBirth,
    fatherName,
    fatherNationality,
    fatherAge,
    fatherTownOrCity,
    fatherCounty,
    fatherCountry,
    fatherCountyOfOrigin,
    fatherOccupation,
    fatherDateOfNaturalization,
    isFatherLiving,
    fatherPresentAddress,
    fatherTelephoneNumber,
    motherName,
    motherNationality,
    motherAge,
    motherTownOrCity,
    motherCounty,
    motherCountry,
    motherCountyOfOrigin,
    motherOccupation,
    motherDateOfNaturalization,
    isMotherLiving,
    motherPresentAddress,
    motherTelephoneNumber,
    applicantSignature,
    applicantContactNumber,
    fullName,
    city,
    county,
    motherFullName,
    fatherFullName,
    date,
    cityOrTown,
    name,
    address,
    relationship,
    contactNumber,
  } = req.body;

  //? Define Applicant & Guardian Photo
  const applicantPhoto = req.files.applicantPhoto[0].filename;

  const parentOrGuardianPhoto = req.files.parentOrGuardianPhoto[0].filename;

  try {
    Logger.info("Registering New Applicant: Status success!");
    const newApplicant = await registerNewApplicant(
      ninNumber,
      applicantPhoto,
      formNumber,
      applicantSex,
      dateOfApplication,
      applicantFirstName,
      applicantMiddleName,
      applicantLastName,
      applicantFacility,
      applicantTownOrCity,
      applicantCounty,
      applicantCountry,
      applicantDateOfBirth,
      fatherName,
      fatherNationality,
      fatherAge,
      fatherTownOrCity,
      fatherCounty,
      fatherCountry,
      fatherCountyOfOrigin,
      fatherOccupation,
      fatherDateOfNaturalization,
      isFatherLiving,
      fatherPresentAddress,
      fatherTelephoneNumber,
      motherName,
      motherNationality,
      motherAge,
      motherTownOrCity,
      motherCounty,
      motherCountry,
      motherCountyOfOrigin,
      motherOccupation,
      motherDateOfNaturalization,
      isMotherLiving,
      motherPresentAddress,
      motherTelephoneNumber,
      applicantSignature,
      applicantContactNumber,
      fullName,
      city,
      county,
      motherFullName,
      fatherFullName,
      date,
      cityOrTown,
      name,
      address,
      relationship,
      contactNumber,
      parentOrGuardianPhoto
    );
    return res.status(201).json({
      success: true,
      isAuthenticated: false,
      method: req.method,
      message: "Registration completed successfully!",
      newApplicant: newApplicant,
    });
  } catch (err) {
    Logger.error("Registering New Applicant: Status failed!");
    return next(HTTPErrors(400, `${err}`));
  }
});

//? Get All Applicants
const GetAllApplicants = asyncHandler(async (_req, res, next) => {
  try {
    Logger.info("Getting All Applicants: Status success!");
    const applicants = await getAllApplicants();
    return res.status(200).json(applicants);
  } catch (err) {
    Logger.info("Getting All Applicants: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Get Applicant ById
const GetApplicantById = asyncHandler(async (req, res, next) => {
  //? Destructure id from req.params
  const { id } = req.params;

  try {
    Logger.info("Getting Applicant ById: Status success!");
    const applicant = await getApplicantById(id);
    return res.status(200).json(applicant);
  } catch (err) {
    Logger.info("Getting Applicant ById: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Update Applicant ById
const UpdateApplicantById = asyncHandler(async (req, res, next) => {
  //? Destructure req.body
  const { applicantFirstName, applicantMiddleName, applicantLastName } =
    req.body;

  //? Destructure id from req.params
  const { id } = req.params;

  try {
    Logger.info("Updating Applicant ById: Status success!");
    const updateApplicant = await updateApplicantById(
      id,
      applicantFirstName,
      applicantMiddleName,
      applicantLastName
    );
    return res.status(200).json({
      success: true,
      isAuthenticated: false,
      method: req.method,
      message: "Applicant updated successfully!",
      updateApplicant: updateApplicant,
    });
  } catch (err) {
    Logger.info("Updating Applicant ById: Status failed!");
    return next(HTTPErrors(500, `${err}`));
  }
});

//? Delete Applicant ById
const DeleteApplicantById = asyncHandler(async (req, res, next) => {
  //? Destructure id from req.params
  const { id } = req.params;

  try {
    Logger.info("Deleting Applicant ById: Status success!");
    const deleteApplicant = await deleteApplicantById(id);
    return res.status(200).json({
      success: true,
      isAuthenticated: false,
      method: req.method,
      message: "Applicant deleted successfully!",
      deleteApplicant: deleteApplicant,
    });
  } catch (err) {
    Logger.info("Deleting Applicant ById: Status failed!");
    return next(HTTPErrors(400, `${err}`));
  }
});

//? Generate Applicant Reports
const GenerateApplicantReports = asyncHandler(async (req, res, next) => {
  //? Destructure req.body
  const { nationalIDNumber, country, county, sex, dateOfBirth } = req.body;

  try {
    Logger.info("Generating Applicant Reports: Status success!");
    const applicantReports = await generateApplicantReports(
      nationalIDNumber,
      country,
      county,
      sex,
      dateOfBirth
    );
    return res.status(200).json({
      success: true,
      isAuthenticated: false,
      method: req.method,
      message: "Report generated successfully!",
      applicantReports: applicantReports,
    });
  } catch (err) {
    Logger.error("Generating Applicant Reports: Status failed!");
    return next(HTTPErrors(500, `${err}`));
  }
});

module.exports = {
  RegisterNewApplicant,
  GetAllApplicants,
  GetApplicantById,
  UpdateApplicantById,
  DeleteApplicantById,
  GenerateApplicantReports,
};
