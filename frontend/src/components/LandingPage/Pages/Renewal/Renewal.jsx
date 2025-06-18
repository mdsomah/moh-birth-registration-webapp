import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link as URLLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "@mui/material/styles";
import { responsiveTheme } from "../../../../utils/muiUtils";
import {
  CssBaseline,
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import CopyRights from "../../CopyRights/CopyRights";

// Scroll to top of react route/page change
import ScrollToTop from "../../../ScrollToTop/ScrollToTop";

// Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";

// Create Data
import CreateData from "../../../../apis/CreateData";

// Images Import
import logo from "../../../../images/MICAT_Logo/MICAT-LOGO.png";

// Registration Image
import registrationImageURL from "../../../../images/Registration-Image.jpg";

// Form Components imports
import StepOneForm from "./FormComponents/StepOneForm";
import StepTwoForm from "./FormComponents/StepTwoForm";
import StepThreeForm from "./FormComponents/StepThreeForm";
import FinalStepForm from "./FormComponents/FinalStepForm";

// Endpoints
const postInstitutionURL = "/institutions/create-new-institution";

// Category Image upload formats
const SUPPORTED_FORMATS = ["image/jpeg, image/jpg, image/png, image/jif"];

// Category Image upload size
const FILE_SIZE = 1024 * 1024 * 25;

// Step One Form Schema
const StepOneFormSchema = Yup.object()
  .shape({
    registrationType: Yup.string().required("Registration type require!"),
    institutionName: Yup.string().required("Institution name require!"),
    businessOwnership: Yup.string().required(
      "Please select business ownership!"
    ),
    currentAddress: Yup.string().required("Current address required!"),
    countyName: Yup.string().required("Please select county!"),
    countyCapitalNames: Yup.array()
      .of(Yup.string())
      .min(1, "Please select at least one county capital!"),
    primaryContact: Yup.string()
      .phone(null, "Please enter a valid phone number!")
      .required("Primary contact required!"),
    secondaryContact: Yup.string().notRequired(),
    emailAddress: Yup.string()
      .required("Email address required!")
      .email("Email address is invalid!"),
    typeOfMedia: Yup.string().required("Media type required!"),
    nameOfManager: Yup.string().required("Name of manager required!"),
    educationLevelOfManager: Yup.string().required(
      "Please select education level!"
    ),
    yearOfExperienceOfManager: Yup.number().required(
      "Year of experience required!"
    ),
  })
  .required();

// Step Two Form Schema
const StepTwoFormSchema = Yup.object()
  .shape({
    dateOfEstablishment: Yup.string().required(
      "Date of establishment required!"
    ),
    isMemberOfPUL: Yup.mixed()
      .required("Please select one!")
      .oneOf(["YES", "NO"]),
    ifNoStateReason: Yup.string().when("isMemberOfPUL", {
      is: (val) => val === "NO",
      then: () => Yup.string().required("Reason required!"),
      otherwise: () => Yup.string().notRequired(),
    }),
    nameOfEditorInChief: Yup.string().required(
      "Name of editor in chief required!"
    ),
    phoneNumberOfEditorInChief: Yup.string()
      .phone(null, "Please enter a valid phone number!")
      .required("Phone number required!"),
    jobExperienceOfEditorInChief: Yup.number().required(
      " Job experience required!"
    ),
    essentialStaffs: Yup.array().of(
      Yup.object().shape({
        fullName: Yup.string().required("Full name required!"),
        position: Yup.string().required("Position required!"),
      })
    ),
  })
  .required();

// Step Three Form Schema
const StepThreeFormSchema = Yup.object()
  .shape({
    documents: Yup.array().of(
      Yup.object().shape({
        documentType: Yup.string().required("Document type required!"),
        documentName: Yup.mixed()
          .required("Please select a file to upload")
          .test(
            "fileFormat",
            "File type not supported! Supported types: (.jpeg, .jpg, .png or .jif)",
            (value) =>
              !value ||
              ((value) => value && SUPPORTED_FORMATS.includes(value.type))
          )
          .test(
            "fileSize",
            "File is too large! Supported size: is (2MB)",
            (value) => !value || (value && value.size <= FILE_SIZE)
          ),
      })
    ),
    currentWorkForce: Yup.number().required("Current workforce required!"),
    isInstitutionAlreadyRegister: Yup.mixed()
      .required("Please select one!")
      .oneOf(["YES", "NO"]),
    dateOfLastRegistration: Yup.string().when("isInstitutionAlreadyRegister", {
      is: (val) => val === "YES",
      then: () => Yup.string().required("Date of last registration required!"),
      otherwise: () => Yup.string().notRequired(),
    }),
    typeOfEquipments: Yup.array()
      .of(Yup.string())
      .min(1, "Please select at least one equiptment type!"),
    typeOfFrequency: Yup.string().required("Frequency type required!"),
    typeOfCommunicationEngaged: Yup.string().required(
      "Communication type required!"
    ),
    programGuide: Yup.string().required("Program guide required!"),
    comments: Yup.string().required("Comments required!"),
    anticipatedRated: Yup.string().required("Anticipated F rated required!"),
    publicationSchedule: Yup.string().required(
      "Publication schedule required!"
    ),
    other: Yup.string().notRequired(),
    kindOfPublication: Yup.string().required("Kind of publication required!"),
    institutionPolicy: Yup.string().required("Institution policy required!"),
  })
  .required();

// Final Step Form Schema
const FinalStepFormSchema = Yup.object()
  .shape({
    applicantFullName: Yup.string().required("Applicant full name required!"),
    logo: Yup.mixed()
      .notRequired()
      .test(
        "fileFormat",
        "File type not supported! Supported types: (.jpeg, .jpg, .png or .jif)",
        (value) =>
          !value || ((value) => value && SUPPORTED_FORMATS.includes(value.type))
      )
      .test(
        "fileSize",
        "File is too large! Supported size: is (2MB)",
        (value) => !value || (value && value.size <= FILE_SIZE)
      ),
    applicantSignature: Yup.string().required("Applicant signature required!"),
    applicationDate: Yup.string().required("Application date required!"),
    termsOfConditions: Yup.boolean()
      .oneOf([true], "Terms of conditions is required!")
      .required("Terms of condition is required!"),
    rejectedOrAcceptedFor: Yup.string().notRequired(),
    rejectedOrAccepted: Yup.string().notRequired(),
    directorSignature: Yup.string().notRequired(),
    directorSignedDate: Yup.string().notRequired(),
  })
  .required();

const stepStyle = {
  boxShadow: 2,
  backgroundColor: "rgba(0,0,0,0.1)",
  paddingTop: 2,
  paddingBottom: 2,
  "& .Mui-active": {
    "&.MuiStepIcon-root": {
      color: "error.main",
      fontSize: "1.5rem",
    },
    "& .MuiStepConnector-line": {
      borderColor: "secondary",
    },
  },
  "& .Mui-completed": {
    "&.MuiStepIcon-root": {
      color: "secondary.main",
      fontSize: "1.5rem",
    },
    "& .MuiStepConnector-line": {
      borderColor: "secondary",
    },
  },
};

const Renewal = () => {
  // useNavigate
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Step One", "Step Two", "Step Three", "Final Step"];
  const isLastStep = activeStep === steps.length - 1;

  // Loading State
  const [loading, setLoading] = useState(false);

  // Formik Step One Form
  const formikStepOneForm = useFormik({
    initialValues: {
      registrationType: "",
      institutionName: "",
      businessOwnership: "",
      currentAddress: "",
      countyName: "",
      countyCapitalNames: [],
      primaryContact: "",
      secondaryContact: "",
      emailAddress: "",
      typeOfMedia: "",
      nameOfManager: "",
      educationLevelOfManager: "",
      yearOfExperienceOfManager: 0,
    },
    validationSchema: StepOneFormSchema,
    onSubmit: () => {
      handleNext();
    },
  });

  // Formik Step Two Form
  const formikStepTwoForm = useFormik({
    initialValues: {
      dateOfEstablishment: "",
      isMemberOfPUL: "",
      ifNoStateReason: "",
      nameOfEditorInChief: "",
      phoneNumberOfEditorInChief: "",
      jobExperienceOfEditorInChief: 0,
      essentialStaffs: [
        {
          fullName: "",
          position: "",
        },
      ],
    },
    validationSchema: StepTwoFormSchema,
    onSubmit: () => {
      handleNext();
    },
  });

  // Formik Step Three Form
  const formikStepThreeForm = useFormik({
    initialValues: {
      documents: [
        {
          documentType: "",
          documentName: "",
        },
      ],
      currentWorkForce: 0,
      isInstitutionAlreadyRegister: "",
      dateOfLastRegistration: "",
      typeOfEquipments: [],
      typeOfFrequency: "",
      typeOfCommunicationEngaged: "",
      programGuide: "",
      comments: "",
      anticipatedRated: "",
      publicationSchedule: "",
      other: "",
      kindOfPublication: "",
      institutionPolicy: "",
    },
    validationSchema: StepThreeFormSchema,
    onSubmit: () => {
      handleNext();
    },
  });

  // Formik Final Step Form
  const formikFinalStepForm = useFormik({
    initialValues: {
      applicantFullName: "",
      logo: "",
      applicantSignature: "",
      applicationDate: "",
      termsOfConditions: false,
      rejectedOrAcceptedFor: "",
      rejectedOrAccepted: "",
      directorSignature: "",
      directorSignedDate: "",
    },
    validationSchema: FinalStepFormSchema,
    onSubmit: (value) => {
      console.log(value);
      registerInstitution();
    },
  });

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    switch (activeStep) {
      case 0:
        formikStepOneForm.handleSubmit();
        break;
      case 1:
        formikStepTwoForm.handleSubmit();
        break;
      case 2:
        formikStepThreeForm.handleSubmit();
        break;
      case 3:
        formikFinalStepForm.handleSubmit();
        break;
      default:
        throw new Error("Unknown form step!");
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <StepOneForm formik={formikStepOneForm} />;
      case 1:
        return <StepTwoForm formik={formikStepTwoForm} />;
      case 2:
        return <StepThreeForm formik={formikStepThreeForm} />;
      case 3:
        return <FinalStepForm formik={formikFinalStepForm} />;
      default:
        throw new Error("Unknown form step!");
    }
  };

  // Institution Data
  const InstitutionData = {
    registrationType: formikStepOneForm.values.registrationType,
    institutionName: formikStepOneForm.values.institutionName,
    businessOwnership: formikStepOneForm.values.businessOwnership,
    currentAddress: formikStepOneForm.values.currentAddress,
    countyName: formikStepOneForm.values.countyName,
    countyCapitalNames: formikStepOneForm.values.countyCapitalNames,
    primaryContact: formikStepOneForm.values.primaryContact,
    secondaryContact: formikStepOneForm.values.secondaryContact,
    emailAddress: formikStepOneForm.values.emailAddress,
    typeOfMedia: formikStepOneForm.values.typeOfMedia,
    nameOfManager: formikStepOneForm.values.nameOfManager,
    educationLevelOfManager: formikStepOneForm.values.educationLevelOfManager,
    yearOfExperienceOfManager:
      formikStepOneForm.values.yearOfExperienceOfManager,
    dateOfEstablishment: formikStepTwoForm.values.dateOfEstablishment,
    isMemberOfPUL: formikStepTwoForm.values.isMemberOfPUL,
    ifNoStateReason: formikStepTwoForm.values.ifNoStateReason,
    nameOfEditorInChief: formikStepTwoForm.values.nameOfEditorInChief,
    phoneNumberOfEditorInChief:
      formikStepTwoForm.values.phoneNumberOfEditorInChief,
    jobExperienceOfEditorInChief:
      formikStepTwoForm.values.jobExperienceOfEditorInChief,
    essentialStaffs: formikStepTwoForm.values.essentialStaffs,
    documents: formikStepThreeForm.values.documents,
    currentWorkForce: formikStepThreeForm.values.currentWorkForce,
    isInstitutionAlreadyRegister:
      formikStepThreeForm.values.isInstitutionAlreadyRegister,
    dateOfLastRegistration: formikStepThreeForm.values.dateOfLastRegistration,
    typeOfEquipments: formikStepThreeForm.values.typeOfEquipments,
    typeOfFrequency: formikStepThreeForm.values.typeOfFrequency,
    typeOfCommunicationEngaged:
      formikStepThreeForm.values.typeOfCommunicationEngaged,
    programGuide: formikStepThreeForm.values.programGuide,
    comments: formikStepThreeForm.values.comments,
    anticipatedRated: formikStepThreeForm.values.anticipatedRated,
    publicationSchedule: formikStepThreeForm.values.publicationSchedule,
    other: formikStepThreeForm.values.other,
    kindOfPublication: formikStepThreeForm.values.kindOfPublication,
    institutionPolicy: formikStepThreeForm.values.institutionPolicy,
    applicantFullName: formikFinalStepForm.values.applicantFullName,
    logo: formikFinalStepForm.values.logo,
    applicantSignature: formikFinalStepForm.values.applicantSignature,
    applicationDate: formikFinalStepForm.values.applicationDate,
    termsOfConditions: formikFinalStepForm.values.termsOfConditions,
    rejectedOrAcceptedFor: formikFinalStepForm.values.rejectedOrAcceptedFor,
    rejectedOrAccepted: formikFinalStepForm.values.rejectedOrAccepted,
    directorSignature: formikFinalStepForm.values.directorSignature,
    directorSignedDate: formikFinalStepForm.values.directorSignedDate,
  };

  console.log(InstitutionData);

  // useQueryClient
  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: (newData) => CreateData(`${postInstitutionURL}`, newData),
    onSuccess: (data) => {
      if (isLastStep && data) {
        navigate(`/registration-successful`, { replace: true });
        queryClient.invalidateQueries({
          queryKey: ["institutionsData"],
        });
      }
      return data;
    },
    onError: (error) => {
      return error;
    },
  });

  // Loading Effect
  useEffect(() => {
    if (Mutation.isPending) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [Mutation]);

  // Register New Institution
  const registerInstitution = async () => {
    // Destructure InstitutionData
    const {
      registrationType,
      institutionName,
      institutionType,
      currentAddress,
      countyName,
      countyCapitalNames,
      primaryContact,
      secondaryContact,
      emailAddress,
      typeOfMedia,
      nameOfManager,
      educationLevelOfManager,
      yearOfExperienceOfManager,
      dateOfEstablishment,
      isMemberOfPUL,
      ifNoStateReason,
      nameOfEditorInChief,
      phoneNumberOfEditorInChief,
      jobExperienceOfEditorInChief,
      essentialStaffs,
      documents,
      currentWorkForce,
      isInstitutionAlreadyRegister,
      dateOfLastRegistration,
      typeOfEquipments,
      typeOfFrequency,
      typeOfCommunicationEngaged,
      programGuide,
      comments,
      anticipatedRated,
      publicationSchedule,
      other,
      kindOfPublication,
      institutionPolicy,
      applicantFullName,
      logo,
      applicantSignature,
      applicationDate,
      termsOfConditions,
      rejectedOrAcceptedFor,
      rejectedOrAccepted,
      directorSignature,
      directorSignedDate,
    } = InstitutionData;

    // Create FormData
    const formData = new FormData();
    formData.append("registrationType", registrationType);
    formData.append("institutionName", institutionName);
    formData.append("institutionType", institutionType);
    formData.append("currentAddress", currentAddress);
    formData.append("countyName", countyName);
    countyCapitalNames.forEach((countyCapitalName) =>
      formData.append("countyCapitalNames[]", countyCapitalName)
    );
    formData.append("primaryContact", primaryContact);
    formData.append("secondaryContact", secondaryContact);
    formData.append("emailAddress", emailAddress);
    formData.append("typeOfMedia", typeOfMedia);
    formData.append("nameOfManager", nameOfManager);
    formData.append("educationLevelOfManager", educationLevelOfManager);
    formData.append(
      "yearOfExperienceOfManager",
      JSON.stringify(yearOfExperienceOfManager)
    );
    formData.append("dateOfEstablishment", dateOfEstablishment);
    formData.append("isMemberOfPUL", isMemberOfPUL);
    formData.append("ifNoStateReason", ifNoStateReason);
    formData.append("nameOfEditorInChief", nameOfEditorInChief);
    formData.append("phoneNumberOfEditorInChief", phoneNumberOfEditorInChief);
    formData.append(
      "jobExperienceOfEditorInChief",
      JSON.stringify(jobExperienceOfEditorInChief)
    );
    formData.append("essentialStaffs", JSON.stringify(essentialStaffs));
    formData.append("documents", JSON.stringify(documents));
    formData.append("currentWorkForce", JSON.stringify(currentWorkForce));
    formData.append(
      "isInstitutionAlreadyRegister",
      isInstitutionAlreadyRegister
    );
    formData.append("dateOfLastRegistration", dateOfLastRegistration);
    typeOfEquipments.forEach((typeOfEquipment) =>
      formData.append("typeOfEquipments[]", typeOfEquipment)
    );
    formData.append("typeOfFrequency", typeOfFrequency);
    formData.append("typeOfCommunicationEngaged", typeOfCommunicationEngaged);
    formData.append("programGuide", programGuide);
    formData.append("comments", comments);
    formData.append("anticipatedRated", anticipatedRated);
    formData.append("publicationSchedule", publicationSchedule);
    formData.append("other", other);
    formData.append("kindOfPublication", kindOfPublication);
    formData.append("institutionPolicy", institutionPolicy);
    formData.append("applicantFullName", applicantFullName);
    formData.append("logo", logo);
    formData.append("applicantSignature", applicantSignature);
    formData.append("applicationDate", applicationDate);
    formData.append("termsOfConditions", JSON.stringify(termsOfConditions));
    formData.append("rejectedOrAcceptedFor", rejectedOrAcceptedFor);
    formData.append("rejectedOrAccepted", rejectedOrAccepted);
    formData.append("directorSignature", directorSignature);
    formData.append("directorSignedDate", directorSignedDate);

    if (isLastStep) {
      Mutation.mutate(formData);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Renewal | MICAT online registration web software.</title>
      </Helmet>
      <ThemeProvider theme={responsiveTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={5}
            md={5}
            lg={5}
            sx={{
              display: { xs: "none", lg: "block" },
              bgcolor: "#4169E1",
              textAlign: "center",
              p: 3,
            }}
          >
            <Box sx={{ mt: 14 }}>
              <Typography
                variant="h3"
                sx={{ mt: 3, color: "#fff", fontWeight: "bolder" }}
              >
                MICAT
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      color: "#fff",
                    }}
                  >
                    Nation Bureau of Communication Annual Registration Online
                    Web System
                  </Typography>
                  <Typography sx={{ color: "#F5F5DC", fontSize: 16, mt: 1 }}>
                    Complete your Institution registration process in four (4)
                    steps
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundImage: `url(${registrationImageURL})`,
                    height: 400,
                  }}
                ></Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={7}
            lg={7}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 1.8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <URLLink
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={logo} width="100" alt="eSalesPOS Logo" />
              </URLLink>
              <Typography component="h1" variant="h5" sx={{ mt: 3, mb: 2 }}>
                Register your Institution{" "}
                <span style={{ color: "#4169E1" }}>and pay your fees</span>
              </Typography>
              <Box
                // component="form"
                noValidate
                // encType="multipart/form-data"
                sx={{ mt: 1 }}
              >
                <Stepper activeStep={activeStep} sx={stepStyle}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Box
                  component="form"
                  noValidate
                  autoComplete="on"
                  encType="multipart/form-data"
                  sx={{ mt: 3 }}
                >
                  {getStepContent(activeStep)}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button
                        variant="contained"
                        size="large"
                        sx={{ mt: 3, ml: 1, bgcolor: "#40826D" }}
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                    )}
                    {isLastStep ? (
                      <LoadingButton
                        variant="contained"
                        size="large"
                        loading={loading}
                        loadingPosition="end"
                        endIcon={<SendIcon />}
                        sx={{ mt: 3, ml: 1, bgcolor: "#40826D" }}
                        onClick={handleSubmit}
                      >
                        <span>Submit</span>
                      </LoadingButton>
                    ) : (
                      <Button
                        variant="contained"
                        size="large"
                        sx={{ mt: 3, ml: 1, bgcolor: "#40826D" }}
                        onClick={handleSubmit}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                  <Grid container justifyContent="center" sx={{ mt: 6 }}>
                    <CopyRights />
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <ScrollToTop />
    </React.Fragment>
  );
};

export default Renewal;
