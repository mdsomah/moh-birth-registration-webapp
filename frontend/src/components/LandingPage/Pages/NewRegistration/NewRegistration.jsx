import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link as URLLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
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
import {
  setIsCompleted,
  setStepOneForm,
  removeStepOneForm,
  setStepTwoForm,
  removeStepTwoForm,
  setStepThreeForm,
  removeStepThreeForm,
  setFinalStepForm,
  removeFinalStepForm,
} from "../../../../app/slices/newRegistrationSlice";

//? Scroll to top of react route/page change
import ScrollToTop from "../../../ScrollToTop/ScrollToTop";

//? Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";

//? Create Data
import CreateData from "../../../../apis/CreateData";

//? Images Import
import logo from "../../../../images/MOH_Logo/MOH-LOGO.png";

//? Registration Image
import registrationImageURL from "../../../../images/Registration-Image.jpg";

//? Form Components imports
import StepOneForm from "./FormComponents/StepOneForm";
import StepTwoForm from "./FormComponents/StepTwoForm";
import StepThreeForm from "./FormComponents/StepThreeForm";
import FinalStepForm from "./FormComponents/FinalStepForm";

//? Endpoints
const postApplicantURL = "/applicants/register-new-applicant";

//? Category Image upload formats
const SUPPORTED_FORMATS = ["image/jpeg, image/jpg, image/png, image/jif"];

//? Category Image upload size
const FILE_SIZE = 1024 * 1024 * 25;

//? Step One Form Schema
const StepOneFormSchema = Yup.object()
  .shape({
    formNumber: Yup.string().required("Applicant first name required!"),
    applicantSex: Yup.string().required("Applicant sex required!"),
    dateOfApplication: Yup.string().required("Applicant first name required!"),
    applicantPhoto: Yup.string().required("Applicant first name required!"),
    applicantFirstName: Yup.string().required("Applicant first name required!"),
    applicantMiddleName: Yup.string().notRequired(),
    applicantLastName: Yup.string().required("Applicant last name required!"),
    applicantFacility: Yup.string().required("Applicant facility required!"),
    applicantTownOrCity: Yup.string().required("Applicant facility required!"),
    applicantCounty: Yup.string().required("Applicant facility required!"),
    applicantCountry: Yup.string().required("Applicant facility required!"),
    applicantDateOfBirth: Yup.string().required("Applicant facility required!"),
  })
  .required();

//? Step Two Form Schema
const StepTwoFormSchema = Yup.object()
  .shape({
    fatherName: Yup.string().required("Father's name required!"),
    fatherNationality: Yup.string().required("Father's nationality required!"),
    fatherAge: Yup.number().required("Father's age required!"),
    fatherTownOrCity: Yup.string().required("Father's age required!"),
    fatherCounty: Yup.string().required("Father's age required!"),
    fatherCountry: Yup.string().required("Father's age required!"),
    fatherCountyOfOrigin: Yup.string().required("Father's age required!"),
    fatherOccupation: Yup.string().required("Father's age required!"),
    fatherDateOfNaturalization: Yup.string().required("Father's age required!"),
    isFatherLiving: Yup.string().required("Father's age required!"),
    fatherPresentAddress: Yup.string().required("Father's age required!"),
    fatherTelephoneNumber: Yup.string().required("Father's age required!"),
  })
  .required();

//? Step Three Form Schema
const StepThreeFormSchema = Yup.object()
  .shape({
    motherName: Yup.string().required("Mother's name required!"),
    motherNationality: Yup.string().required("Mother's nationality required!"),
    motherAge: Yup.number().required("Mother's age required!"),
    motherTownOrCity: Yup.string().required("Mother's age required!"),
    motherCounty: Yup.string().required("Mother's age required!"),
    motherCountry: Yup.string().required("Mother's age required!"),
    motherCountyOfOrigin: Yup.string().required("Mother's age required!"),
    motherOccupation: Yup.string().required("Mother's age required!"),
    motherDateOfNaturalization: Yup.string().required("Mother's age required!"),
    isMotherLiving: Yup.string().required("Mother's age required!"),
    motherPresentAddress: Yup.string().required("Mother's age required!"),
    motherTelephoneNumber: Yup.string().required("Mother's age required!"),
  })
  .required();

//? Final Step Form Schema
const FinalStepFormSchema = Yup.object()
  .shape({
    applicantSignature: Yup.string().required("Applicant full name required!"),
    applicantContactNumber: Yup.string().required(
      "Applicant full name required!"
    ),
    parentOrGuardianPhoto: Yup.string().required(
      "Applicant full name required!"
    ),
    fullName: Yup.string().required("Applicant full name required!"),
    city: Yup.string().required("Applicant full name required!"),
    county: Yup.string().required("Applicant full name required!"),
    motherFullName: Yup.string().required("Applicant full name required!"),
    fatherFullName: Yup.string().required("Applicant full name required!"),
    date: Yup.string().required("Applicant full name required!"),
    cityOrTown: Yup.string().required("Applicant full name required!"),
    name: Yup.string().required("Applicant full name required!"),
    address: Yup.string().required("Applicant full name required!"),
    relationship: Yup.string().required("Applicant full name required!"),
    contactNumber: Yup.string().required("Applicant full name required!"),
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

const NewRegistration = () => {
  //? useDispatch
  const dispatch = useDispatch();

  //? Destructure useSelector
  const { stepOneForm, stepTwoForm, stepThreeForm, finalStepForm } =
    useSelector((state) => state.newRegistration);

  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Applicant Info",
    "Father's Info",
    "Mother's Info",
    "Attestation",
  ];
  const isLastStep = activeStep === steps.length - 1;

  //? Loading State
  const [loading, setLoading] = useState(false);

  //? Step One Initial Values
  const StepOneInitialValues = {
    formNumber: "",
    applicantSex: "",
    dateOfApplication: "",
    applicantPhoto: "",
    applicantFirstName: "",
    applicantMiddleName: "",
    applicantLastName: "",
    applicantFacility: "",
    applicantTownOrCity: "",
    applicantCounty: "",
    applicantCountry: "",
    applicantDateOfBirth: "",
  };

  //? Formik Step One Form
  const formikStepOneForm = useFormik({
    initialValues: stepOneForm !== null ? stepOneForm : StepOneInitialValues,
    validationSchema: StepOneFormSchema,
    onSubmit: (values) => {
      handleNext();
      dispatch(setStepOneForm(values));
    },
  });

  //? Step Two Initial Values
  const StepTwoInitialValues = {
    fatherName: "",
    fatherNationality: "",
    fatherAge: 0,
    fatherTownOrCity: "",
    fatherCounty: "",
    fatherCountry: "",
    fatherCountyOfOrigin: "",
    fatherOccupation: "",
    fatherDateOfNaturalization: "",
    isFatherLiving: "",
    fatherPresentAddress: "",
    fatherTelephoneNumber: "",
  };

  //? Formik Step Two Form
  const formikStepTwoForm = useFormik({
    initialValues: stepTwoForm !== null ? stepTwoForm : StepTwoInitialValues,
    validationSchema: StepTwoFormSchema,
    onSubmit: (values) => {
      handleNext();
      dispatch(setStepTwoForm(values));
    },
  });

  //? Step Three Initial Values
  const StepThreeInitialValues = {
    motherName: "",
    motherNationality: "",
    motherAge: 0,
    motherTownOrCity: "",
    motherCounty: "",
    motherCountry: "",
    motherCountyOfOrigin: "",
    motherOccupation: "",
    motherDateOfNaturalization: "",
    isMotherLiving: "",
    motherPresentAddress: "",
    motherTelephoneNumber: "",
  };

  //? Formik Step Three Form
  const formikStepThreeForm = useFormik({
    initialValues:
      stepThreeForm !== null ? stepThreeForm : StepThreeInitialValues,
    validationSchema: StepThreeFormSchema,
    onSubmit: (values) => {
      handleNext();
      dispatch(setStepThreeForm(values));
    },
  });

  //? Final Step Initial Values
  const FinalStepInitialValues = {
    applicantSignature: "",
    applicantContactNumber: "",
    parentOrGuardianPhoto: "",
    fullName: "",
    city: "",
    county: "",
    motherFullName: "",
    fatherFullName: "",
    date: "",
    cityOrTown: "",
    name: "",
    address: "",
    relationship: "",
    contactNumber: "",
  };

  //? Formik Final Step Form
  const formikFinalStepForm = useFormik({
    initialValues:
      finalStepForm !== null ? finalStepForm : FinalStepInitialValues,
    validationSchema: FinalStepFormSchema,
    onSubmit: (values) => {
      registerNewApplicant();
      dispatch(setFinalStepForm(values));
    },
  });

  //? Handle Submit
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

  //? Applicant Data
  const ApplicantData = {
    formNumber: formikStepOneForm.values.formNumber,
    applicantSex: formikStepOneForm.values.applicantSex,
    dateOfApplication: formikStepOneForm.values.dateOfApplication,
    applicantPhoto: formikStepOneForm.values.applicantPhoto,
    applicantFirstName: formikStepOneForm.values.applicantFirstName,
    applicantMiddleName: formikStepOneForm.values.applicantMiddleName,
    applicantLastName: formikStepOneForm.values.applicantLastName,
    applicantFacility: formikStepOneForm.values.applicantFacility,
    applicantTownOrCity: formikStepOneForm.values.applicantTownOrCity,
    applicantCounty: formikStepOneForm.values.applicantCounty,
    applicantCountry: formikStepOneForm.values.applicantCountry,
    applicantDateOfBirth: formikStepOneForm.values.applicantDateOfBirth,
    fatherName: formikStepTwoForm.values.fatherName,
    fatherNationality: formikStepTwoForm.values.fatherNationality,
    fatherAge: formikStepTwoForm.values.fatherAge,
    fatherTownOrCity: formikStepTwoForm.values.fatherTownOrCity,
    fatherCounty: formikStepTwoForm.values.fatherCounty,
    fatherCountry: formikStepTwoForm.values.fatherCountry,
    fatherCountyOfOrigin: formikStepTwoForm.values.fatherCountyOfOrigin,
    fatherOccupation: formikStepTwoForm.values.fatherOccupation,
    fatherDateOfNaturalization:
      formikStepTwoForm.values.fatherDateOfNaturalization,
    isFatherLiving: formikStepTwoForm.values.isFatherLiving,
    fatherPresentAddress: formikStepTwoForm.values.fatherPresentAddress,
    fatherTelephoneNumber: formikStepTwoForm.values.fatherTelephoneNumber,
    motherName: formikStepThreeForm.values.motherName,
    motherNationality: formikStepThreeForm.values.motherNationality,
    motherAge: formikStepThreeForm.values.motherAge,
    motherTownOrCity: formikStepThreeForm.values.motherTownOrCity,
    motherCounty: formikStepThreeForm.values.motherCounty,
    motherCountry: formikStepThreeForm.values.motherCountry,
    motherCountyOfOrigin: formikStepThreeForm.values.motherCountyOfOrigin,
    motherOccupation: formikStepThreeForm.values.motherOccupation,
    motherDateOfNaturalization:
      formikStepThreeForm.values.motherDateOfNaturalization,
    isMotherLiving: formikStepThreeForm.values.isMotherLiving,
    motherPresentAddress: formikStepThreeForm.values.motherPresentAddress,
    motherTelephoneNumber: formikStepThreeForm.values.motherTelephoneNumber,
    applicantSignature: formikFinalStepForm.values.applicantSignature,
    applicantContactNumber: formikFinalStepForm.values.applicantContactNumber,
    parentOrGuardianPhoto: formikFinalStepForm.values.parentOrGuardianPhoto,
    fullName: formikFinalStepForm.values.fullName,
    city: formikFinalStepForm.values.city,
    county: formikFinalStepForm.values.county,
    motherFullName: formikFinalStepForm.values.motherFullName,
    fatherFullName: formikFinalStepForm.values.fatherFullName,
    date: formikFinalStepForm.values.date,
    cityOrTown: formikFinalStepForm.values.cityOrTown,
    name: formikFinalStepForm.values.name,
    address: formikFinalStepForm.values.address,
    relationship: formikFinalStepForm.values.relationship,
    contactNumber: formikFinalStepForm.values.contactNumber,
  };

  console.log(ApplicantData);

  //? useQueryClient
  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: (newData) => CreateData(`${postApplicantURL}`, newData),
    onSuccess: (data) => {
      if (isLastStep && data) {
        dispatch(setIsCompleted(true));
        dispatch(removeStepOneForm());
        dispatch(removeStepTwoForm());
        dispatch(removeStepThreeForm());
        dispatch(removeFinalStepForm());
        queryClient.invalidateQueries({
          queryKey: ["applicantsData"],
        });
      }
      return data;
    },
    onError: (error) => {
      if (error) {
        console.log(error);
      }
      return error;
    },
  });

  //? Loading Effect
  useEffect(() => {
    if (Mutation.isPending) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [Mutation]);

  //? Register New Applicant
  const registerNewApplicant = async () => {
    //? Destructure ApplicantData
    const {
      applicantFirstName,
      applicantMiddleName,
      applicantLastName,
      applicantSex,
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
      applicantPhoto,
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
      dateOfApplication,
      parentOrGuardianPhoto,
    } = ApplicantData;

    //? Create FormData
    const formData = new FormData();
    formData.append("applicantFirstName", applicantFirstName);
    formData.append("applicantMiddleName", applicantMiddleName);
    formData.append("applicantLastName", applicantLastName);
    formData.append("applicantSex", applicantSex);
    formData.append("applicantFacility", applicantFacility);
    formData.append("applicantTownOrCity", applicantTownOrCity);
    formData.append("applicantCounty", applicantCounty);
    formData.append("applicantCountry", applicantCountry);
    formData.append("applicantDateOfBirth", applicantDateOfBirth);
    formData.append("fatherName", fatherName);
    formData.append("fatherNationality", fatherNationality);
    formData.append("fatherAge", fatherAge);
    formData.append("fatherTownOrCity", fatherTownOrCity);
    formData.append("fatherCounty", fatherCounty);
    formData.append("fatherCountry", fatherCountry);
    formData.append("fatherCountyOfOrigin", fatherCountyOfOrigin);
    formData.append("fatherOccupation", fatherOccupation);
    formData.append("fatherDateOfNaturalization", fatherDateOfNaturalization);
    formData.append("isFatherLiving", isFatherLiving);
    formData.append("fatherPresentAddress", fatherPresentAddress);
    formData.append("fatherTelephoneNumber", fatherTelephoneNumber);
    formData.append("motherName", motherName);
    formData.append("motherNationality", motherNationality);
    formData.append("motherAge", motherAge);
    formData.append("motherTownOrCity", motherTownOrCity);
    formData.append("motherCounty", motherCounty);
    formData.append("motherCountry", motherCountry);
    formData.append("motherCountyOfOrigin", motherCountyOfOrigin);
    formData.append("motherOccupation", motherOccupation);
    formData.append("motherDateOfNaturalization", motherDateOfNaturalization);
    formData.append("isMotherLiving", isMotherLiving);
    formData.append("motherPresentAddress", motherPresentAddress);
    formData.append("motherTelephoneNumber", motherTelephoneNumber);
    formData.append("applicantSignature", applicantSignature);
    formData.append("applicantContactNumber", applicantContactNumber);
    formData.append("applicantPhoto", applicantPhoto);
    formData.append("fullName", fullName);
    formData.append("city", city);
    formData.append("county", county);
    formData.append("motherFullName", motherFullName);
    formData.append("fatherFullName", fatherFullName);
    formData.append("date", date);
    formData.append("cityOrTown", cityOrTown);
    formData.append("name", name);
    formData.append("address", address);
    formData.append("relationship", relationship);
    formData.append("contactNumber", contactNumber);
    formData.append("dateOfApplication", dateOfApplication);
    formData.append("parentOrGuardianPhoto", parentOrGuardianPhoto);

    if (isLastStep) {
      Mutation.mutate(formData);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          New Registration | Ministry of Health (MOH) Online Birth Registration
          System.
        </title>
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
                MOH
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
                    National Communications Bureau Annual Registration System
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
                <img src={logo} width="100" alt="MOH Logo" />
              </URLLink>
              <Typography component="h1" variant="h5" sx={{ mt: 3, mb: 2 }}>
                New Registration Form
              </Typography>
              <URLLink
                to="/registration-info"
                style={{
                  textDecoration: "none",
                  display: "inline-block",
                  justifyContent: "end",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    display: "inline-block",
                    mt: 1,
                    ml: 1,
                    bgcolor: "buttonBGColor.main",
                  }}
                >
                  Go Back
                </Button>
              </URLLink>
              <Typography component="h1" variant="h5" sx={{ mt: 2, mb: 2 }}>
                Register your Institution{" "}
                <span style={{ color: "#4169E1" }}>and pay your fees</span>
              </Typography>
              <Box noValidate sx={{ mt: 1 }}>
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
                        sx={{ mt: 3, ml: 1, bgcolor: "buttonBGColor.main" }}
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
                        sx={{ mt: 3, ml: 1, bgcolor: "buttonBGColor.main" }}
                        onClick={handleSubmit}
                      >
                        <span>Submit</span>
                      </LoadingButton>
                    ) : (
                      <Button
                        variant="contained"
                        size="large"
                        sx={{ mt: 3, ml: 1, bgcolor: "buttonBGColor.main" }}
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

export default NewRegistration;
