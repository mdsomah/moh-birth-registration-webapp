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
} = require("../services/applicantsService");
const { encrypt } = require("../utils/encryptUtils");
const { decrypt } = require("../utils/decryptUtils");

//? Register New Applicant
const RegisterNewApplicant = asyncHandler(async (req, res, next) => {
  //? Destructure req.body
  const { encryptedData } = req.body;

  //? Decrypt the encryptedData
  const decryptedNewApplicant = decrypt(
    encryptedData,
    process.env.ENCRYPTION_KEY,
    process.env.ENCRYPTION_IV
  );

  //? Destructure decryptedNewApplicant data
  const {
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
    parentOrGuardianPhoto,
  } = decryptedNewApplicant;

  try {
    Logger.info("Registering New Applicant: Status success!");
    const newApplicant = await registerNewApplicant(
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
    //? Encrypt the newApplicant data
    const encryptedNewApplicant = encrypt(
      newApplicant,
      process.env.ENCRYPTION_KEY,
      process.env.ENCRYPTION_IV
    );
    return res.status(201).json({
      success: true,
      isAuthenticated: true,
      method: req.method,
      message: "Registration completed successfully!",
      encryptedNewApplicant: encryptedNewApplicant,
    });
  } catch (err) {
    Logger.error("Registering New Applicant: Status failed!");
    return next(HTTPErrors(500, `${err}`));
  }
});

//? Get All Applicants
const GetAllApplicants = asyncHandler(async (_req, res, next) => {
  try {
    Logger.info("Getting All Applicants: Status success!");
    const applicants = await getAllApplicants();
    //? Encrypt the applicants data
    const encryptedApplicants = encrypt(
      applicants,
      process.env.ENCRYPTION_KEY,
      process.env.ENCRYPTION_IV
    );
    return res.status(200).json(encryptedApplicants);
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
    //? Encrypt the applicant data
    const encryptedApplicant = encrypt(
      applicant,
      process.env.ENCRYPTION_KEY,
      process.env.ENCRYPTION_IV
    );
    return res.status(200).json(encryptedApplicant);
  } catch (err) {
    Logger.info("Getting Applicant ById: Status failed!");
    return next(HTTPErrors(404, `${err}`));
  }
});

//? Update Applicant ById
const UpdateApplicantById = asyncHandler(async (req, res, next) => {
  //? Destructure req.body
  const { encryptedData } = req.body;

  //? Decrypt the encryptedData
  const decryptedUpdateApplicant = decrypt(
    encryptedData,
    process.env.ENCRYPTION_KEY,
    process.env.ENCRYPTION_IV
  );

  //? Destructure decryptedUpdateApplicant data
  const {
    applicantFirstName,
    applicantMiddleName,
    applicantLastName,
    applicantSex,
  } = decryptedUpdateApplicant;

  //? Destructure id from req.params
  const { id } = req.params;

  try {
    Logger.info("Updating Applicant ById: Status success!");
    const updateApplicant = await updateApplicantById(
      id,
      applicantFirstName,
      applicantMiddleName,
      applicantLastName,
      applicantSex
    );
    //? Encrypt the updateApplicant data
    const encryptedUpdateApplicant = encrypt(
      updateApplicant,
      process.env.ENCRYPTION_KEY,
      process.env.ENCRYPTION_IV
    );
    return res.status(200).json({
      success: true,
      message: "Applicant updated successfully!",
      encryptedUpdateApplicant: encryptedUpdateApplicant,
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
    //? Encrypt the deleteApplicant data
    const encryptedDeleteApplicant = encrypt(
      deleteApplicant,
      process.env.ENCRYPTION_KEY,
      process.env.ENCRYPTION_IV
    );
    return res.status(200).json({
      success: true,
      message: "Applicant deleted successfully!",
      encryptedDeleteApplicant: encryptedDeleteApplicant,
    });
  } catch (err) {
    Logger.info("Deleting Applicant ById: Status failed!");
    return next(HTTPErrors(400, `${err}`));
  }
});

module.exports = {
  RegisterNewApplicant,
  GetAllApplicants,
  GetApplicantById,
  UpdateApplicantById,
  DeleteApplicantById,
};
