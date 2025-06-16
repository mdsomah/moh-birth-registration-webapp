const Yup = require("yup");

//? Validate Register Applicant Schema
const validateRegisterApplicantSchema = Yup.object()
  .shape({
    applicantFirstName: Yup.string().required("Applicant first name required!"),
    applicantMiddleName: Yup.string().notRequired(),
    applicantLastName: Yup.string().required("Applicant last name required!"),
    applicantSex: Yup.string().required("Please choose one!"),
    applicantFacility: Yup.string().required("Facility required!"),
    applicantTownOrCity: Yup.string().required("Town or city required!"),
    applicantCounty: Yup.string().required("County required!"),
    applicantCountry: Yup.string().required("Country required!"),
    applicantDateOfBirth: Yup.string().required("Date of birth required!"),
    fatherName: Yup.string().required("Father name required!"),
    fatherNationality: Yup.string().required("Father nationality required!"),
    fatherAge: Yup.number().required("Father age required!"),
    fatherTownOrCity: Yup.string().required("Town or city required!"),
    fatherCounty: Yup.string().required("County required!"),
    fatherCountry: Yup.string().required("Country required!"),
    fatherCountyOfOrigin: Yup.string().required("County of origin required!"),
    fatherOccupation: Yup.string().required("Occupation required!"),
    fatherDateOfNaturalization: Yup.string().required(
      "Date of naturalization required!"
    ),
    isFatherLiving: Yup.string().required("Please select one!"),
    fatherPresentAddress: Yup.string().required("Present address required!"),
    fatherTelephoneNumber: Yup.string().required("Telephone number required!"),
    motherName: Yup.string().required("Mother name required!"),
    motherNationality: Yup.string().required("Mother nationality required!"),
    motherAge: Yup.number().required("Mother age required!"),
    motherTownOrCity: Yup.string().required("town or city required!"),
    motherCounty: Yup.string().required("County required!"),
    motherCountry: Yup.string().required("Country required!"),
    motherCountyOfOrigin: Yup.string().required("County of origin required!"),
    motherOccupation: Yup.string().required("Occupation required!"),
    motherDateOfNaturalization: Yup.string().required(
      "Date of naturalization required!"
    ),
    isMotherLiving: Yup.string().required("Select one!"),
    motherPresentAddress: Yup.string().required("Present address required!"),
    motherTelephoneNumber: Yup.string().required("Telephone number required!"),
    applicantSignature: Yup.string().required("Applicant signature required!"),
    applicantContactNumber: Yup.string().required(
      "Applicant contact required!"
    ),
    applicantPhoto: Yup.string().required("Applicant photo required!"),
    fullName: Yup.string().required("Full name required!"),
    city: Yup.string().required("City required!"),
    county: Yup.string().required("County required!"),
    motherFullName: Yup.string().required("Mother fullname required!"),
    fatherFullName: Yup.string().required("Father fullname required!"),
    date: Yup.string().required("Date required!"),
    cityOrTown: Yup.string().required("City or town required!"),
    name: Yup.string().required("Name required!"),
    address: Yup.string().required("Address required!"),
    relationship: Yup.string().required("Relationship required!"),
    contactNumber: Yup.string().required("Contact number required!"),
    dateOfApplication: Yup.string().required("Date of application required!"),
    parentOrGuardianPhoto: Yup.string().required(
      "Parent or guardian photo required!"
    ),
  })
  .required();

module.exports = { validateRegisterApplicantSchema };
