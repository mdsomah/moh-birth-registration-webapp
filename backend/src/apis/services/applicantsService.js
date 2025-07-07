const dayjs = require("dayjs");
const { customAlphabet } = require("nanoid");
const { prisma } = require("../models/db/database");

//? Generate NanoId for Form_Number
const nanoidFormNumber = customAlphabet("0123456789", 10);
const Form_Number = () => nanoidFormNumber();

//? Register New Applicant
const registerNewApplicant = async (
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
) => {
  const newApplicant = await prisma.applicant.create({
    data: {
      ninNumber: ninNumber.trim(),
      applicantPhoto: applicantPhoto.trim(),
      formNumber:
        formNumber === "" ? `MOH-${Form_Number()}` : formNumber.trim(),
      applicantSex: applicantSex.trim(),
      dateOfApplication: dayjs(dateOfApplication).format("MM/DD/YYYY").trim(),
      applicantFirstName: applicantFirstName.trim(),
      applicantMiddleName: applicantMiddleName.trim(),
      applicantLastName: applicantLastName.trim(),
      applicantFacility: applicantFacility.trim(),
      applicantTownOrCity: applicantTownOrCity.trim(),
      applicantCounty: applicantCounty.trim(),
      applicantCountry: applicantCountry.trim(),
      applicantDateOfBirth: dayjs(applicantDateOfBirth)
        .format("MM/DD/YYYY")
        .trim(),
      applicantFather: {
        create: {
          fatherName: fatherName.trim(),
          fatherNationality: fatherNationality.trim(),
          fatherAge: JSON.parse(fatherAge),
          fatherTownOrCity: fatherTownOrCity.trim(),
          fatherCounty: fatherCounty.trim(),
          fatherCountry: fatherCountry.trim(),
          fatherCountyOfOrigin: fatherCountyOfOrigin.trim(),
          fatherOccupation: fatherOccupation.trim(),
          fatherDateOfNaturalization:
            fatherDateOfNaturalization !== ""
              ? dayjs(fatherDateOfNaturalization).format("MM/DD/YYYY").trim()
              : fatherDateOfNaturalization,
          isFatherLiving: isFatherLiving.trim(),
          fatherPresentAddress: fatherPresentAddress.trim(),
          fatherTelephoneNumber: fatherTelephoneNumber.trim(),
        },
      },
      applicantMother: {
        create: {
          motherName: motherName.trim(),
          motherNationality: motherNationality.trim(),
          motherAge: JSON.parse(motherAge),
          motherTownOrCity: motherTownOrCity.trim(),
          motherCounty: motherCounty.trim(),
          motherCountry: motherCountry.trim(),
          motherCountyOfOrigin: motherCountyOfOrigin.trim(),
          motherOccupation: motherOccupation.trim(),
          motherDateOfNaturalization:
            motherDateOfNaturalization !== ""
              ? dayjs(motherDateOfNaturalization).format("MM/DD/YYYY").trim()
              : motherDateOfNaturalization,
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
          date: dayjs(date).format("MM/DD/YYYY").trim(),
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
      appointments: true,
      payments: true,
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
      appointments: true,
      payments: true,
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
      appointments: true,
      payments: true,
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
  applicantLastName
) => {
  const updateApplicant = await prisma.applicant.update({
    where: { id: id },
    data: {
      applicantFirstName: applicantFirstName.trim(),
      applicantMiddleName: applicantMiddleName.trim(),
      applicantLastName: applicantLastName.trim(),
    },
    include: {
      applicantFather: true,
      applicantMother: true,
      attestation: true,
      appointments: true,
      payments: true,
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
      appointments: true,
      payments: true,
    },
  });
  if (!deleteApplicant) {
    throw new Error(`Applicant with this id: ${id} not found!`);
  }

  return deleteApplicant;
};

//? Generate Applicant Reports
const generateApplicantReports = async (
  nationalIDNumber,
  country,
  county,
  sex,
  dateOfBirth
) => {
  const applicantReports = await prisma.applicant.findMany({
    where: {
      OR: [
        { ninNumber: nationalIDNumber },
        { applicantCountry: country },
        { applicantCounty: county },
        { applicantSex: sex },
        {
          applicantDateOfBirth: dayjs(dateOfBirth).format("MM/DD/YYYY").trim(),
        },
      ],
    },
    include: {
      applicantFather: true,
      applicantMother: true,
      attestation: true,
      appointments: true,
      payments: true,
    },
  });
  if (applicantReports.length === 0) {
    throw new Error("No applicant(s) found!");
  }

  return applicantReports;
};

module.exports = {
  registerNewApplicant,
  getAllApplicants,
  getApplicantById,
  updateApplicantById,
  deleteApplicantById,
  generateApplicantReports,
};
