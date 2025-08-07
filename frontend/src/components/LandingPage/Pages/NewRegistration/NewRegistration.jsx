import React, { useState, useEffect, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes, { object } from "prop-types";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import Check from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
import Person4Icon from "@mui/icons-material/Person4";
import Person2Icon from "@mui/icons-material/Person2";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { FaCamera } from "react-icons/fa";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ButtonLoader from "../../../ButtonLoader/ButtonLoader";
import CopyRights from "../../CopyRights/CopyRights";
import { responsiveTheme } from "../../../../utils/muiUtils";
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
import { removeApplicant } from "../../../../app/slices/querySlice";

//? React Responsive Media Queries
import { useMediaQuery } from "react-responsive";

//? Upload Applicant Photo
import UploadApplicantPhoto from "./UploadApplicantPhoto/UploadApplicantPhoto";

//? Scroll to top of react route/page change
import ScrollToTop from "../../../ScrollToTop/ScrollToTop";

//? Images Import
import MOH_Logo from "../../../../images/MOH_Logo/MOH-LOGO.png";
import Liberia_Seal from "../../../../images/MOH_Logo/Liberia-Seal.png";

//? Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";

//? Post Applicant Data
import PostApplicant from "../../../../apis/PostApplicant";

//? Form Components imports
import StepOneForm from "./FormComponents/StepOneForm";
import StepTwoForm from "./FormComponents/StepTwoForm";
import StepThreeForm from "./FormComponents/StepThreeForm";
import FinalStepForm from "./FormComponents/FinalStepForm";
import { Avatar, TextField, Toolbar, Typography } from "@mui/material";

//? Endpoints
const postApplicantURL = "/applicants/register-new-applicant";

//? Photo upload formats
// const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png", "image/jif"];

//? Photo upload size
// const FILE_SIZE = 1024 * 1024 * 25;

//? Meme Types
const MemeTypes = ["image/jpeg", "image/jpg", "image/png", "image/jif"];

//? Validate Step One Form Schema
const validateStepOneFormSchema = Yup.object()
  .shape({
    ninNumber: Yup.string().notRequired(),
    // applicantPhoto: Yup.mixed()
    //   .required("Please select a photo!")
    //   .test(
    //     "fileFormat",
    //     "File type not supported! Supported types: (.jpeg, .jpg, .png or .jif)",
    //     (value) =>
    //       !value || ((value) => value && SUPPORTED_FORMATS.includes(value.type))
    //   )
    //   .test(
    //     "fileSize",
    //     "File is too large! Supported size: (2MB)",
    //     (value) => !value || (value && value.size <= FILE_SIZE)
    //   ),
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
  })
  .required();

//? Validate Step Two Form Schema
const validateStepTwoFormSchema = Yup.object()
  .shape({
    fatherName: Yup.string().required("Father name required!"),
    fatherNationality: Yup.string().required("Father nationality required!"),
    fatherAge: Yup.number().required("Father age required!"),
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
  })
  .required();

//? Validate Step Three Form Schema
const validateStepThreeFormSchema = Yup.object()
  .shape({
    motherName: Yup.string().required("Mother name required!"),
    motherNationality: Yup.string().required("Mother nationality required!"),
    motherAge: Yup.number().required("Mother age required!"),
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
  })
  .required();

//? Validate Final Step Form Schema
const validateFinalStepFormSchema = Yup.object()
  .shape({
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
    // parentOrGuardianPhoto: Yup.mixed()
    //   .required("Please select a photo!")
    //   .test(
    //     "fileFormat",
    //     "File type not supported! Supported types: (.jpeg, .jpg, .png or .jif)",
    //     (value) =>
    //       !value || ((value) => value && SUPPORTED_FORMATS.includes(value.type))
    //   )
    //   .test(
    //     "fileSize",
    //     "File is too large! Supported size: (2MB)",
    //     (value) => !value || (value && value.size <= FILE_SIZE)
    //   ),
  })
  .required();

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#4169E1",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#4169E1",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
    ...theme.applyStyles("dark", {
      borderColor: theme.palette.grey[800],
    }),
  },
}));

const QontoStepIconRoot = styled("div")(({ theme }) => ({
  color: "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  "& .QontoStepIcon-completedIcon": {
    color: "#4169E1",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  ...theme.applyStyles("dark", {
    color: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        color: "#4169E1",
      },
    },
  ],
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundImage:
          "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundImage:
          "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      },
    },
  ],
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PersonIcon />,
    2: <Person4Icon />,
    3: <Person2Icon />,
    4: <HowToRegIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const NewRegistration = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  // const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  // const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  //? useDispatch
  const dispatch = useDispatch();

  //? Destructure useSelector
  const { stepOneForm, stepTwoForm, stepThreeForm, finalStepForm } =
    useSelector((state) => state.newRegistration);

  const {
    query: [
      {
        PhotoBase64,
        NINNumber,
        GenderName,
        FirstName,
        MiddleName,
        Surname,
        DateOfBirth,
        SignatureBase64,
      },
    ],
  } = useSelector((state) => state.queryApplicant);

  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Applicant's Info",
    "Father's Info",
    "Mother's Info",
    "Attestation",
  ];
  const isLastStep = activeStep === steps.length - 1;

  //? useNavigate
  const navigate = useNavigate();

  //? Loading State
  const [loading, setLoading] = useState(false);

  //? Handle Close New Registration
  const handleCloseNewRegistration = () => {
    navigate("/validate-new-applicant", { replace: true });
  };

  //? Applicant Photo Edit State
  const [openApplicantPhoto, setOpenApplicantPhoto] = useState(false);

  //? Applicant Photo Dialog Functions
  const handleOpenApplicantPhoto = () => {
    setOpenApplicantPhoto(true);
  };

  const handleCloseApplicantPhoto = useCallback(() => {
    setOpenApplicantPhoto(false);
  }, []);

  //? Applicant Query Object
  const ApplicantQueryOBJ = {
    ninNumber: () => NINNumber,
    applicantPhoto: () => PhotoBase64,
    formNumber: () => NINNumber,
    applicantSex: () => GenderName,
    applicantFirstName: () => FirstName,
    applicantMiddleName: () => MiddleName,
    applicantLastName: () => Surname,
    applicantDateOfBirth: () => DateOfBirth,
    applicantSignature: () => SignatureBase64,
  };

  //? Step One Initial Values
  const StepOneInitialValues = {
    ninNumber: `${ApplicantQueryOBJ.ninNumber()}`,
    applicantPhoto: `${ApplicantQueryOBJ.applicantPhoto()}`,
    formNumber: `MOH-${ApplicantQueryOBJ.formNumber()}`,
    applicantSex: `${ApplicantQueryOBJ.applicantSex()}`,
    dateOfApplication: dayjs(new Date()),
    applicantFirstName: `${ApplicantQueryOBJ.applicantFirstName()}`,
    applicantMiddleName: `${ApplicantQueryOBJ.applicantMiddleName()}`,
    applicantLastName: `${ApplicantQueryOBJ.applicantLastName()}`,
    applicantFacility: "",
    applicantTownOrCity: "",
    applicantCounty: "",
    applicantCountry: "",
    applicantDateOfBirth: dayjs(
      ApplicantQueryOBJ.applicantDateOfBirth()
    ).format("MM/DD/YYYY"),
  };

  //? Formik Step One Form
  const formikStepOneForm = useFormik({
    initialValues: stepOneForm !== null ? stepOneForm : StepOneInitialValues,
    validationSchema: validateStepOneFormSchema,
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
    validationSchema: validateStepTwoFormSchema,
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
    validationSchema: validateStepThreeFormSchema,
    onSubmit: (values) => {
      handleNext();
      dispatch(setStepThreeForm(values));
    },
  });

  //? Final Step Initial Values
  const FinalStepInitialValues = {
    applicantSignature: `${ApplicantQueryOBJ.applicantSignature()}`,
    applicantContactNumber: "",
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
    parentOrGuardianPhoto: "",
  };

  //? Formik Final Step Form
  const formikFinalStepForm = useFormik({
    initialValues:
      finalStepForm !== null ? finalStepForm : FinalStepInitialValues,
    validationSchema: validateFinalStepFormSchema,
    onSubmit: (values) => {
      registerNewApplicant();
      dispatch(setFinalStepForm(values));
    },
  });

  //? Handle Submit Form
  const handleSubmitForm = (e) => {
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

  //? Handle Reset Form
  const handleResetForm = (e) => {
    e.preventDefault();
    formikFinalStepForm.handleReset();
  };

  const handleCancel = () => {
    dispatch(setIsCompleted(false));
    dispatch(removeStepOneForm());
    dispatch(removeStepTwoForm());
    dispatch(removeStepThreeForm());
    dispatch(removeFinalStepForm());
    dispatch(removeApplicant());
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
        return (
          <FinalStepForm
            formik={formikFinalStepForm}
            ApplicantQueryOBJ={ApplicantQueryOBJ}
          />
        );
      default:
        throw new Error("Unknown form step!");
    }
  };

  //? Applicant Data
  const ApplicantData = {
    ninNumber: formikStepOneForm.values.ninNumber,
    applicantPhoto: formikStepOneForm.values.applicantPhoto,
    formNumber: formikStepOneForm.values.formNumber,
    applicantSex: formikStepOneForm.values.applicantSex,
    dateOfApplication: formikStepOneForm.values.dateOfApplication,
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
    motherCountry: formikStepThreeForm.values.motherCounty,
    motherCountyOfOrigin: formikStepThreeForm.values.motherCountyOfOrigin,
    motherOccupation: formikStepThreeForm.values.motherOccupation,
    motherDateOfNaturalization:
      formikStepThreeForm.values.motherDateOfNaturalization,
    isMotherLiving: formikStepThreeForm.values.isMotherLiving,
    motherPresentAddress: formikStepThreeForm.values.motherPresentAddress,
    motherTelephoneNumber: formikStepThreeForm.values.motherTelephoneNumber,
    applicantSignature: formikFinalStepForm.values.applicantSignature,
    applicantContactNumber: formikFinalStepForm.values.applicantContactNumber,
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
    parentOrGuardianPhoto: formikFinalStepForm.values.parentOrGuardianPhoto,
  };

  console.log(ApplicantData);

  //? useQueryClient
  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: (newData) => PostApplicant(`${postApplicantURL}`, newData),
    onSuccess: (data) => {
      if (isLastStep && data && data.success === true) {
        dispatch(setIsCompleted(true));
        dispatch(removeStepOneForm());
        dispatch(removeStepTwoForm());
        dispatch(removeStepThreeForm());
        dispatch(removeFinalStepForm());
        dispatch(removeApplicant());
        handleResetForm();
        handleCloseNewRegistration();
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
      parentOrGuardianPhoto,
    } = ApplicantData;

    //? Create FormData
    const formData = new FormData();
    formData.append("ninNumber", ninNumber);
    formData.append("applicantPhoto", applicantPhoto);
    formData.append("formNumber", formNumber);
    formData.append("applicantSex", applicantSex);
    formData.append("dateOfApplication", dateOfApplication);
    formData.append("applicantFirstName", applicantFirstName);
    formData.append("applicantMiddleName", applicantMiddleName);
    formData.append("applicantLastName", applicantLastName);
    formData.append("applicantFacility", applicantFacility);
    formData.append("applicantTownOrCity", applicantTownOrCity);
    formData.append("applicantCounty", applicantCounty);
    formData.append("applicantCountry", applicantCountry);
    formData.append("applicantDateOfBirth", applicantDateOfBirth);
    formData.append("fatherName", fatherName);
    formData.append("fatherNationality", fatherNationality);
    formData.append("fatherAge", JSON.stringify(fatherAge));
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
    formData.append("motherAge", JSON.stringify(motherAge));
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
    formData.append("parentOrGuardianPhoto", parentOrGuardianPhoto);

    if (isLastStep) {
      Mutation.mutate(formData);
    }
  };

  //? Scroll to error input on form submit
  useEffect(() => {
    if (!formikStepOneForm.isSubmitting) return;
    if (Object.keys(formikStepOneForm.errors).length > 0) {
      document
        .getElementsByName(Object.keys(formikStepOneForm.errors)[0])
        .forEach((error) => error.focus());
    }
  }, [formikStepOneForm]);

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Register New Applicant | Ministry of Health (MOH) Online Delayed Birth
          Registration System
        </title>
      </Helmet>
      <ThemeProvider theme={responsiveTheme}>
        {/* <Toolbar /> */}
        <Grid
          component="form"
          noValidate
          autoComplete="off"
          encType="multipart/form-data"
          container
          spacing={2}
          // columns={12}
          sx={{ mb: (theme) => theme.spacing(2) }}
        >
          <Paper
            component="form"
            noValidate
            autoComplete="on"
            encType="multipart/form-data"
            sx={{
              padding: 5,
              bgcolor: "#fff",
              width: { md: "70%", lg: "70%" },
              ml: { md: "auto", lg: "auto" },
              mr: { md: "auto", lg: "auto" },
            }}
            elevation={4}
          >
            <CssBaseline />
            <Stack spacing={4}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    mb: 3,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {isBigScreen && (
                    <img
                      src={MOH_Logo}
                      alt="MOH Logo"
                      width="150"
                      height="150"
                    />
                  )}
                  {isDesktopOrLaptop && (
                    <img
                      src={MOH_Logo}
                      alt="MOH Logo"
                      width="100"
                      height="100"
                    />
                  )}
                  {isTabletOrMobile && (
                    <img src={MOH_Logo} alt="MOH Logo" width="50" height="50" />
                  )}
                  <Box>
                    <Typography>REPUBLIC OF LIBERIA</Typography>
                    <Typography>BUREAU OF VITAL & HEALTH STATISTICS</Typography>
                    <Typography sx={{ fontSize: 20, fontWeight: "bolder" }}>
                      MINISTRY OF HEALTH
                    </Typography>
                    <Typography>MONROVIA, LIBERIA</Typography>
                  </Box>
                  {isBigScreen && (
                    <img
                      src={Liberia_Seal}
                      alt="Liberia Seal"
                      width="150"
                      height="150"
                    />
                  )}
                  {isDesktopOrLaptop && (
                    <img
                      src={Liberia_Seal}
                      alt="Liberia Seal"
                      width="100"
                      height="100"
                    />
                  )}
                  {isTabletOrMobile && (
                    <img
                      src={Liberia_Seal}
                      alt="Liberia Seal"
                      width="50"
                      height="50"
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    display: {
                      xs: "block",
                      sm: "block",
                      md: "block",
                      lg: "flex",
                    },
                    justifyContent: "space-between",
                  }}
                >
                  {MemeTypes.includes(
                    formikStepOneForm.values.applicantPhoto.type
                  ) &&
                    formikStepOneForm.values.applicantPhoto !== "" && (
                      <Box>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          badgeContent={
                            <Tooltip
                              title="Upload Photo"
                              placement="right"
                              arrow
                            >
                              <IconButton onClick={handleOpenApplicantPhoto}>
                                <FaCamera size={30} />
                              </IconButton>
                            </Tooltip>
                          }
                        >
                          <Avatar
                            alt={`${formikStepTwoForm.values.applicantFirstName} Photo`}
                            // src={`data:image/jpeg;base64,${stepOneForm.applicantPhoto.preview}`}
                            src={
                              formikStepOneForm.values.applicantPhoto.preview
                            }
                            variant="square"
                            sx={{
                              width: 130,
                              height: 130,
                            }}
                            slotProps={{
                              img: { loading: "lazy" },
                            }}
                          />
                        </Badge>
                      </Box>
                    )}

                  {!formikStepOneForm.values.applicantPhoto.type &&
                    !MemeTypes.includes(
                      formikStepOneForm.values.applicantPhoto
                    ) &&
                    formikStepOneForm.values.applicantPhoto !== "" && (
                      <Box>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          badgeContent={
                            <Tooltip
                              title="Upload Photo"
                              placement="right"
                              arrow
                            >
                              <IconButton onClick={handleOpenApplicantPhoto}>
                                <FaCamera size={30} />
                              </IconButton>
                            </Tooltip>
                          }
                        >
                          <Avatar
                            alt={`${formikStepTwoForm.values.applicantFirstName} Photo`}
                            src={`data:image/jpeg;base64,${formikStepOneForm.values.applicantPhoto}`}
                            variant="square"
                            sx={{
                              width: 130,
                              height: 130,
                            }}
                            slotProps={{
                              img: { loading: "lazy" },
                            }}
                          />
                        </Badge>
                      </Box>
                    )}

                  {formikStepOneForm.values.applicantPhoto === "" && (
                    <Box>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent={
                          <Tooltip title="Upload Photo" placement="right" arrow>
                            <IconButton onClick={handleOpenApplicantPhoto}>
                              <FaCamera size={30} />
                            </IconButton>
                          </Tooltip>
                        }
                      >
                        <Avatar
                          alt=""
                          src=""
                          variant="square"
                          sx={{
                            width: 130,
                            height: 130,
                          }}
                          slotProps={{
                            img: { loading: "lazy" },
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 17,
                              fontWeight: 500,
                              color: "#fff",
                              textAlign: "center",
                            }}
                          >
                            APPLICANT PHOTO
                          </Typography>
                        </Avatar>
                      </Badge>
                      <Typography
                        variant="inherit"
                        color="error.main"
                        sx={{ mt: 1 }}
                      >
                        {formikStepOneForm.touched.applicantPhoto &&
                          formikStepOneForm.errors.applicantPhoto}
                      </Typography>
                    </Box>
                  )}
                  <Box>
                    <Typography sx={{ color: "#000", fontWeight: "bold" }}>
                      NIN: {formikStepOneForm.values.ninNumber}
                    </Typography>
                    <Typography>
                      Form No: {formikStepOneForm.values.formNumber}
                    </Typography>
                    <Box sx={{ width: 100 }}>
                      <TextField
                        id="applicantSex"
                        name="applicantSex"
                        label="Sex:"
                        variant="standard"
                        value={formikStepOneForm.values.applicantSex.toUpperCase()}
                      />
                      {/* <Autocomplete
                        id="applicantSex"
                        clearOnEscape
                        value={formikStepOneForm.values.applicantSex}
                        onBlur={formikStepOneForm.handleBlur}
                        error={
                          formikStepOneForm.touched.applicantSex &&
                          Boolean(formikStepOneForm.errors.applicantSex)
                        }
                        onChange={(_event, newValue) => {
                          formikStepOneForm.setFieldValue(
                            "applicantSex",
                            newValue
                          );
                        }}
                        options={["Male", "Female"]}
                        // sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Sex:"
                            variant="standard"
                          />
                        )}
                      /> */}
                      {/* <Typography
                        variant="inherit"
                        color="error.main"
                        sx={{ mt: 1 }}
                      >
                        {formikStepOneForm.touched.applicantSex &&
                          formikStepOneForm.errors.applicantSex}
                      </Typography> */}
                    </Box>
                    <Box sx={{ width: 173, mt: 1 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          disablePast
                          disableFuture
                          label="Date:"
                          value={dayjs(
                            formikStepOneForm.values.dateOfApplication
                          )}
                          onChange={(newValue) => {
                            formikStepOneForm.setFieldValue(
                              "dateOfApplication",
                              newValue
                            );
                          }}
                          slotProps={{ textField: { variant: "standard" } }}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography>
                    APPLICATION FOR DELAYED REGISTRATION OF BIRTH
                  </Typography>
                </Box>
              </Box>
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<QontoConnector />}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={QontoStepIcon}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector />}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Box sx={{ mt: 4 }}>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ mt: 3, ml: 1, bgcolor: "#ccc" }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  {activeStep !== 0 && (
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ mt: 3, ml: 1, bgcolor: "primary.main" }}
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
                      loadingIndicator={<ButtonLoader />}
                      loadingPosition="end"
                      endIcon={<SendIcon />}
                      sx={{ mt: 3, ml: 1, bgcolor: "primary.main" }}
                      onClick={handleSubmitForm}
                    >
                      {loading ? (
                        <span style={{ color: "#fff" }}>Submitting</span>
                      ) : (
                        <spa>Submit</spa>
                      )}
                    </LoadingButton>
                  ) : (
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ mt: 3, ml: 1, bgcolor: "primary.main" }}
                      onClick={handleSubmitForm}
                    >
                      Next
                    </Button>
                  )}
                </Box>
                <Grid container justifyContent="center" sx={{ mt: 6 }}>
                  <CopyRights />
                </Grid>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </ThemeProvider>
      <ScrollToTop />

      {/* Start UploadApplicantPhoto Dialog */}
      <UploadApplicantPhoto
        open={openApplicantPhoto}
        handleClose={handleCloseApplicantPhoto}
        formikStepOneForm={formikStepOneForm}
      />
      {/* End UploadApplicantPhoto Dialog */}
    </React.Fragment>
  );
};

export default NewRegistration;
