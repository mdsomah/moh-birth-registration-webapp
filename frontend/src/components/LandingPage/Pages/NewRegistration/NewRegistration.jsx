import React, { useState, useEffect, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
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
import CopyRights from "../../CopyRights/CopyRights";
import { responsiveTheme } from "../../../../utils/muiUtils";
import {
  setIsCompleted,
  // removeRegistrationType,
  setStepOneForm,
  removeStepOneForm,
  setStepTwoForm,
  removeStepTwoForm,
  setStepThreeForm,
  removeStepThreeForm,
  setFinalStepForm,
  removeFinalStepForm,
} from "../../../../app/slices/newRegistrationSlice";

//? Upload Applicant Photo
import UploadApplicantPhoto from "./UploadApplicantPhoto/UploadApplicantPhoto";

//? Scroll to top of react route/page change
import ScrollToTop from "../../../ScrollToTop/ScrollToTop";

// Images Import
import MOH_Logo from "../../../../images/MOH_Logo/MOH-LOGO.png";
import Liberia_Seal from "../../../../images/MOH_Logo/Liberia-Seal.png";

//? Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";

//? Create Data
import CreateData from "../../../../apis/CreateData";

//? Form Components imports
import StepOneForm from "./FormComponents/StepOneForm";
import StepTwoForm from "./FormComponents/StepTwoForm";
import StepThreeForm from "./FormComponents/StepThreeForm";
import FinalStepForm from "./FormComponents/FinalStepForm";
import { Avatar, TextField, Toolbar, Typography } from "@mui/material";

//? Endpoints
const postApplicantURL = "/institutions/create-new-institution";

//? Category Image upload formats
const SUPPORTED_FORMATS = ["image/jpeg, image/jpg, image/png, image/jif"];

//? Category Image upload size
const FILE_SIZE = 1024 * 1024 * 25;

//? Step One Form Schema
const StepOneFormSchema = Yup.object()
  .shape({
    applicantFirstName: Yup.string().required("First name require!"),
    applicantMiddleName: Yup.string().notRequired(),
    registrationType: Yup.string().required("Registration type require!"),
    institutionName: Yup.string().required("Institution name require!"),
    businessTIN: Yup.number()
      .required("Business TIN required!")
      .positive()
      .integer()
      .min(9, "Invalid business TIN!"),
    // .max(9, "Business TIN cannot exceed 9 digits!"),
    businessOwnership: Yup.object().shape({
      ownershipName: Yup.string().required("Please select business ownership!"),
    }),
    currentAddress: Yup.string().required("Current address required!"),
    counties: Yup.array().of(
      Yup.object().shape({
        countyID: Yup.string().notRequired(),
        countyName: Yup.string().required("County name required!"),
        countyCapitals: Yup.array()
          .of(Yup.string())
          .min(1, "Please select at least one location!"),
        countyFlag: Yup.string().notRequired(),
      })
    ),
    primaryContact: Yup.string()
      .phone(null, "Please enter a valid phone number!")
      .required("Primary contact required!"),
    secondaryContact: Yup.string().notRequired(),
    emailAddress: Yup.string()
      .required("Email address required!")
      .email("Email address is invalid!"),
    typeOfMedia: Yup.object().shape({
      typeOfMediaID: Yup.string().notRequired(),
      mediaType: Yup.string().required("Please select media type!"),
      sourceCode: Yup.string().notRequired(),
      codeFee: Yup.string().notRequired(),
      amount: Yup.number().notRequired(),
      amountCurrency: Yup.string().notRequired(),
    }),
    nameOfManager: Yup.string().required("Name of manager required!"),
    educationLevel: Yup.object().shape({
      educationLevelOfManager: Yup.string().required(
        "Please select education level!"
      ),
    }),
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
    equipments: Yup.array()
      .of(Yup.string())
      .min(1, "Please select at least one equipment type!"),
    typeOfEquipments: Yup.array().of(
      Yup.object().shape({
        typeOfEquipmentID: Yup.string().notRequired(),
        equipmentType: Yup.string().notRequired(),
      })
    ),
    typeOfFrequency: Yup.object().shape({
      frequencyType: Yup.string().required("Please select frequency type!"),
    }),
    typeOfCommunicationEngage: Yup.object().shape({
      communicationType: Yup.string().required(
        "Please select one engagement type!"
      ),
    }),
    programGuide: Yup.object().shape({
      programGudieName: Yup.string().required(
        "Please select one program guide!"
      ),
    }),
    comments: Yup.string().notRequired(),
    publicationSchedule: Yup.object().shape({
      scheduleName: Yup.string().required("Please select one schedule!"),
    }),
    other: Yup.string().notRequired(),
    kindOfPublication: Yup.object().shape({
      publicationName: Yup.string().required("Please select one publication!"),
    }),
    institutionPolicy: Yup.string().required("Institution policy required!"),
    documentTypeIds: Yup.lazy((val) =>
      Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string()
    ),
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
  // useDispatch
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Applicant's Info",
    "Father's Info",
    "Mother's Info",
    "Attestation",
  ];
  const isLastStep = activeStep === steps.length - 1;

  //? Loading State
  const [loading, setLoading] = useState(false);

  //? Applicant Photo Edit State
  const [openApplicantPhoto, setOpenApplicantPhoto] = useState(false);

  //? Applicant Photo Dialog Functions
  const handleOpenApplicantPhoto = () => {
    setOpenApplicantPhoto(true);
  };

  const handleCloseApplicantPhoto = useCallback(() => {
    setOpenApplicantPhoto(false);
  }, []);

  //? Step One Initial Values
  const StepOneInitialValues = {
    applicantPhoto: "",
    formNumber: "",
    applicantSex: "",
    dateOfApplication: dayjs(new Date()),
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
    initialValues: StepOneInitialValues,
    // validationSchema: StepOneFormSchema,
    onSubmit: (values) => {
      handleNext();
      // dispatch(setStepOneForm(values));
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
    initialValues: StepTwoInitialValues,
    // validationSchema: StepTwoFormSchema,
    onSubmit: (values) => {
      handleNext();
      // dispatch(setStepTwoForm(values));
    },
  });

  //? Step Three Initial Values
  const StepThreeInitialValues = {
    motherName: "",
    motherNationality: "",
    motherAge: 35,
    motherTownOrCity: "",
    motherCounty: "",
    motherCountry: "",
    motherCountyOfOrigin: "",
    motherOccupation: "",
    motherDateOfNaturalization: "",
    isMotherLiving: "",
    motherPresentAddress: "",
    motherTelephoneNumber: "",
    applicantSignature: "",
    applicantContactNumber: "",
  };

  //? Formik Step Three Form
  const formikStepThreeForm = useFormik({
    initialValues: StepThreeInitialValues,
    // validationSchema: StepThreeFormSchema,
    onSubmit: (values) => {
      handleNext();
      // dispatch(setStepThreeForm(values));
    },
  });

  //? Final Step Initial Values
  const FinalStepInitialValues = {
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
    initialValues: FinalStepInitialValues,
    // validationSchema: FinalStepFormSchema,
    onSubmit: (values) => {
      registerApplicant();
      // dispatch(setFinalStepForm(values));
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

  //? Applicant Data
  const ApplicantData = {
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
    mutationFn: (newData) => CreateData(`${postApplicantURL}`, newData),
    onSuccess: (data) => {
      if (isLastStep && data) {
        dispatch(setIsCompleted(true));
        // dispatch(removeRegistrationType());
        dispatch(removeStepOneForm());
        dispatch(removeStepTwoForm());
        dispatch(removeStepThreeForm());
        dispatch(removeFinalStepForm());
        // dispatch(removeInstitution());
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
  const registerApplicant = async () => {
    //? Destructure ApplicantData
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
    } = ApplicantData;

    //? Create FormData
    const formData = new FormData();
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

  return (
    <React.Fragment>
      <ThemeProvider theme={responsiveTheme}>
        {/* <Toolbar /> */}
        <Container maxWidth="md" sx={{ mt: 3, mb: 3 }}>
          <Paper sx={{ padding: 5, bgcolor: "#fff" }} elevation={4}>
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
                  <img src={MOH_Logo} width="100" alt="MOH Logo" />
                  <Box>
                    <Typography>REPUBLIC OF LIBERIA</Typography>
                    <Typography>BUREAU OF VITAL & HEALTH STATISTICS</Typography>
                    <Typography sx={{ fontSize: 20, fontWeight: "bolder" }}>
                      MINISTRY OF HEALTH
                    </Typography>
                    <Typography>MONROVIA, LIBERIA</Typography>
                  </Box>
                  <img src={Liberia_Seal} width="100" alt="Liberia Seal" />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  {formikStepOneForm.values.applicantPhoto !== "" && (
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
                          src={formikStepOneForm.values.applicantPhoto.preview}
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
                            }}
                          >
                            APPLICANT PHOTO
                          </Typography>
                        </Avatar>
                      </Badge>
                    </Box>
                  )}
                  <Box>
                    <Typography sx={{ color: "#000", fontWeight: "bold" }}>
                      Form No: MOH-1001-2025-20-06
                    </Typography>
                    <Box>
                      <Autocomplete
                        id="applicantSex"
                        clearOnEscape
                        value={formikStepOneForm.values.applicantSex}
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
                      />
                    </Box>
                    <Box>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          disablePast
                          disableFuture
                          label="Date:"
                          value={formikStepOneForm.values.dateOfApplication}
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
              <Box
                component="form"
                noValidate
                autoComplete="on"
                encType="multipart/form-data"
                sx={{ mt: 4 }}
              >
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
                      loadingPosition="end"
                      endIcon={<SendIcon />}
                      sx={{ mt: 3, ml: 1, bgcolor: "primary.main" }}
                      onClick={handleSubmit}
                    >
                      <span>Submit</span>
                    </LoadingButton>
                  ) : (
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ mt: 3, ml: 1, bgcolor: "primary.main" }}
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
            </Stack>
          </Paper>
        </Container>
      </ThemeProvider>

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
