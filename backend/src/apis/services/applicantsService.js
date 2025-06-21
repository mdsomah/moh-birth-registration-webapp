const { customAlphabet } = require("nanoid");
const { prisma } = require("../models/db/database");

//? Generate NanoId for Form_Number
const nanoidFormNumber = customAlphabet("0123456789", 4);
const Form_Number = () => nanoidFormNumber();

//? Register New Applicant
const registerNewApplicant = async (
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
) => {
  const newApplicant = await prisma.applicant.create({
    data: {
      applicantPhoto: applicantPhoto.trim(),
      formNumber:
        formNumber === "" ? `MOH-${Form_Number()}` : formNumber.trim(),
      applicantSex: applicantSex.trim(),
      dateOfApplication: dateOfApplication.trim(),
      applicantFirstName: applicantFirstName.trim(),
      applicantMiddleName: applicantMiddleName.trim(),
      applicantLastName: applicantLastName.trim(),
      applicantFacility: applicantFacility.trim(),
      applicantTownOrCity: applicantTownOrCity.trim(),
      applicantCounty: applicantCounty.trim(),
      applicantCountry: applicantCountry.trim(),
      applicantDateOfBirth: applicantDateOfBirth.trim(),
      applicantFather: {
        create: {
          fatherName: fatherName.trim(),
          fatherNationality: fatherNationality.trim(),
          fatherAge: fatherAge,
          fatherTownOrCity: fatherTownOrCity.trim(),
          fatherCounty: fatherCounty.trim(),
          fatherCountry: fatherCountry.trim(),
          fatherCountyOfOrigin: fatherCountyOfOrigin.trim(),
          fatherOccupation: fatherOccupation.trim(),
          fatherDateOfNaturalization: fatherDateOfNaturalization.trim(),
          isFatherLiving: isFatherLiving.trim(),
          fatherPresentAddress: fatherPresentAddress.trim(),
          fatherTelephoneNumber: fatherTelephoneNumber.trim(),
        },
      },
      applicantMother: {
        create: {
          motherName: motherName.trim(),
          motherNationality: motherNationality.trim(),
          motherAge: motherAge,
          motherTownOrCity: motherTownOrCity.trim(),
          motherCounty: motherCounty.trim(),
          motherCountry: motherCountry.trim(),
          motherCountyOfOrigin: motherCountyOfOrigin.trim(),
          motherOccupation: motherOccupation.trim(),
          motherDateOfNaturalization: motherDateOfNaturalization.trim(),
          isMotherLiving: isMotherLiving.trim(),
          motherPresentAddress: motherPresentAddress.trim(),
          motherTelephoneNumber: motherTelephoneNumber.trim(),
        },
      },
      applicantSignature: applicantSignature.trim(),
      applicantContactNumber: applicantContactNumber.trim(),
      attestation: {
        create: {
          fullName: fullName.trim(),
          city: city.trim(),
          county: county.trim(),
          motherFullName: motherFullName.trim(),
          fatherFullName: fatherFullName.trim(),
          date: date.trim(),
          cityOrTown: cityOrTown.trim(),
          name: name.trim(),
          address: address.trim(),
          relationship: relationship.trim(),
          contactNumber: contactNumber.trim(),
        },
      },
      parentOrGuardianPhoto: parentOrGuardianPhoto.trim(),
    },
    include: {
      applicantFather: true,
      applicantMother: true,
      attestation: true,
    },
  });

  return newApplicant;
};

//? Get All Applicants
const getAllApplicants = async () => {
  const applicants = await prisma.applicant.findMany({
    include: {
      applicantFather: true,
      applicantMother: true,
      attestation: true,
    },
  });
  if (!applicants) {
    throw new Error("Applicants not found!");
  }

  return applicants;
};

//? Get Applicant ById
const getApplicantById = async (id) => {
  const applicant = await prisma.applicant.findFirst({
    where: { id: id },
    include: {
      applicantFather: true,
      applicantMother: true,
      attestation: true,
    },
  });
  if (!applicant) {
    throw new Error(`Applicant with this id: ${id} not found!`);
  }

  return applicant;
};

//? Update Applicant ById
const updateApplicantById = async (
  id,
  applicantFirstName,
  applicantMiddleName,
  applicantLastName,
  applicantSex
) => {
  const updateApplicant = await prisma.applicant.update({
    where: { id: id },
    data: {
      applicantFirstName: applicantFirstName.trim(),
      applicantMiddleName: applicantMiddleName.trim(),
      applicantLastName: applicantLastName.trim(),
      applicantSex: applicantSex.trim(),
    },
    include: {
      applicantFather: true,
      applicantMother: true,
      attestation: true,
    },
  });
  if (!updateApplicant) {
    throw new Error(`Applicant with this id: ${id} not found!`);
  }

  return updateApplicant;
};

//? Delete Applicant ById
const deleteApplicantById = async (id) => {
  const deleteApplicant = await prisma.applicant.delete({
    where: { id: id },
    include: {
      applicantFather: true,
      applicantMother: true,
      attestation: true,
    },
  });
  if (!deleteApplicant) {
    throw new Error(`Applicant with this id: ${id} not found!`);
  }

  return deleteApplicant;
};

module.exports = {
  registerNewApplicant,
  getAllApplicants,
  getApplicantById,
  updateApplicantById,
  deleteApplicantById,
};
