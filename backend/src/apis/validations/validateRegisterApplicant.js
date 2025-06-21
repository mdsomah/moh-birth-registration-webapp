const Yup = require("yup");

//? Photo upload formats
const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png", "image/jif"];

//? Photo upload size
const FILE_SIZE = 1024 * 1024 * 25;

//? Validate Register Applicant Schema
const validateRegisterApplicantSchema = Yup.object()
  .shape({
    applicantPhoto: Yup.mixed()
      .required("Please select a photo!")
      .test(
        "fileFormat",
        "File type not supported! Supported types: (.jpeg, .jpg, .png or .jif)",
        (value) =>
          !value || ((value) => value && SUPPORTED_FORMATS.includes(value.type))
      )
      .test(
        "fileSize",
        "File is too large! Supported size: (2MB)",
        (value) => !value || (value && value.size <= FILE_SIZE)
      ),
    formNumber: Yup.string().notRequired(),
    applicantSex: Yup.mixed()
      .required("Please select one!")
      .oneOf(["Male", "Female"]),
    dateOfApplication: Yup.string().required("Application date required!"),
    applicantFirstName: Yup.string().required("Applicant first name required!"),
    applicantMiddleName: Yup.string().notRequired(),
    applicantLastName: Yup.string().required("Applicant last name required!"),
    applicantFacility: Yup.string().required("Applicant facility required!"),
    applicantTownOrCity: Yup.string().required(
      "Applicant town or city required!"
    ),
    applicantCounty: Yup.string().required("Applicant county required!"),
    applicantCountry: Yup.string().required("Applicant country required!"),
    applicantDateOfBirth: Yup.string().required(
      "Applicant date of birth required!"
    ),
    fatherName: Yup.string().required("Father name required!"),
    fatherNationality: Yup.string().required("Father nationality required!"),
    fatherAge: Yup.number()
      .required("Father age required!")
      .positive()
      .integer(),
    fatherTownOrCity: Yup.string().required("Father town or city required!"),
    fatherCounty: Yup.string().required("Father county required!"),
    fatherCountry: Yup.string().required("Father country required!"),
    fatherCountyOfOrigin: Yup.string().required(
      "Father county of origin required!"
    ),
    fatherOccupation: Yup.string().required("Father occupation required!"),
    fatherDateOfNaturalization: Yup.string().notRequired(),
    isFatherLiving: Yup.mixed()
      .required("Please select one!")
      .oneOf(["YES", "NO"]),
    fatherPresentAddress: Yup.string().when("isFatherLiving", {
      is: (val) => val === "YES",
      then: () => Yup.string().required("Father present address required!"),
      otherwise: () => Yup.string().notRequired(),
    }),
    fatherTelephoneNumber: Yup.string().when("isFatherLiving", {
      is: (val) => val === "YES",
      then: () =>
        Yup.string()
          .phone(null, "Please enter a valid phone number!")
          .required("Father telephone number required!"),
      otherwise: () => Yup.string().notRequired(),
    }),
    motherName: Yup.string().required("Mother name required!"),
    motherNationality: Yup.string().required("Mother nationality required!"),
    motherAge: Yup.number()
      .required("Mother age required!")
      .positive()
      .integer(),
    motherTownOrCity: Yup.string().required("Mother town or city required!"),
    motherCounty: Yup.string().required("Mother county required!"),
    motherCountry: Yup.string().required("Mother country required!"),
    motherCountyOfOrigin: Yup.string().required(
      "Mother county of origin required!"
    ),
    motherOccupation: Yup.string().required("Mother occupation required!"),
    motherDateOfNaturalization: Yup.string().notRequired(),
    isMotherLiving: Yup.mixed()
      .required("Please select one!")
      .oneOf(["YES", "NO"]),
    motherPresentAddress: Yup.string().when("isMotherLiving", {
      is: (val) => val === "YES",
      then: () => Yup.string().required("Mother present address required!"),
      otherwise: () => Yup.string().notRequired(),
    }),
    motherTelephoneNumber: Yup.string().when("isMotherLiving", {
      is: (val) => val === "YES",
      then: () =>
        Yup.string()
          .phone(null, "Please enter a valid phone number!")
          .required("Mother telephone number required!"),
      otherwise: () => Yup.string().notRequired(),
    }),
    applicantSignature: Yup.string().required("Applicant signature required!"),
    applicantContactNumber: Yup.string()
      .phone(null, "Please enter a valid phone number!")
      .required("Applicant contact number required!"),
    fullName: Yup.string().required("Full name required!"),
    city: Yup.string().required("City required!"),
    county: Yup.string().required("County required!"),
    motherFullName: Yup.string().required("Mother full name required!"),
    fatherFullName: Yup.string().required("Father full name required!"),
    date: Yup.string().required("Date required!"),
    cityOrTown: Yup.string().required("City or town required!"),
    name: Yup.string().required("Name required!"),
    address: Yup.string().required("Address required!"),
    relationship: Yup.string().required("Relationship required!"),
    contactNumber: Yup.string()
      .phone(null, "Please enter a valid phone number!")
      .required("Contact number required!"),
    parentOrGuardianPhoto: Yup.mixed()
      .required("Please select a photo!")
      .test(
        "fileFormat",
        "File type not supported! Supported types: (.jpeg, .jpg, .png or .jif)",
        (value) =>
          !value || ((value) => value && SUPPORTED_FORMATS.includes(value.type))
      )
      .test(
        "fileSize",
        "File is too large! Supported size: (2MB)",
        (value) => !value || (value && value.size <= FILE_SIZE)
      ),
  })
  .required();

module.exports = { validateRegisterApplicantSchema };
