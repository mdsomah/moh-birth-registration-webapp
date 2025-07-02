import React, { useState, useEffect, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Container,
  CssBaseline,
  Paper,
  Toolbar,
  FormGroup,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Button,
  Checkbox,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Chip,
  Autocomplete,
  Tooltip,
  IconButton,
  Badge,
  Avatar,
} from "@mui/material";
import { LuAsterisk } from "react-icons/lu";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Country_Lists } from "../CountryLists/CountryLists";
import Copyright from "../../Dashboard/internals/components/Copyright";
import NavbarBreadcrumbs from "../../Dashboard/components/NavbarBreadcrumbs";
import FatherPhoneInputField from "../PhoneInputsField/FatherPhoneInputField";
import MotherPhoneInputField from "../PhoneInputsField/MotherPhoneInputField";
import ContactPhoneInputField from "../PhoneInputsField/ContactPhoneInputField";
import ContactNumberInputField from "../PhoneInputsField/ContactNumberInputField";
import AddUploadApplicantPhoto from "../PhotosUpload/AddPhotosUpload/AddUploadApplicantPhoto/AddUploadApplicantPhoto";
import AddUploadGuardianPhoto from "../PhotosUpload/AddPhotosUpload/AddUploadGuardianPhoto/AddUploadGuardianPhoto";
import AddApplicantSignature from "../SignatureDialog/AddApplicantSignature";
import ButtonLoader from "../../../../ButtonLoader/ButtonLoader";

//? React Responsive Media Queries
import { useMediaQuery } from "react-responsive";

//? Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";

//? Post Applicant Data
import PostApplicant from "../../../../../apis/PostApplicant";

//? Endpoints
const postApplicantURL = "/applicants/register-new-applicant";

//? Photo upload formats
const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png", "image/jif"];

//? Photo upload size
const FILE_SIZE = 1024 * 1024 * 25;

//? Validate Applicant Schema
const validateApplicantSchema = Yup.object()
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

const MainAddApplicantGrid = () => {
  //? Tablet or Mobile Responsive Media Queries
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  //? useNavigate
  const navigate = useNavigate();

  //? Loading State
  const [loading, setLoading] = useState(false);

  const handleCloseAddApplicant = () => {
    navigate("/all-applicants", { replace: true });
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

  //? Guardian Photo State
  const [openGuardianPhoto, setOpenGuardianPhoto] = useState(false);

  //? Guardian Photo Dialog Functions
  const handleOpenGuardianPhoto = () => {
    setOpenGuardianPhoto(true);
  };

  const handleCloseGuardianPhoto = useCallback(() => {
    setOpenGuardianPhoto(false);
  }, []);

  //? Formik Applicant Form
  const formikApplicantForm = useFormik({
    initialValues: {
      applicantPhoto: "",
      formNumber: "",
      applicantSex: "",
      dateOfApplication: "",
      applicantFirstName: "",
      applicantMiddleName: "",
      applicantLastName: "",
      applicantFacility: "",
      applicantTownOrCity: "",
      applicantCounty: "",
      applicantCountry: "",
      applicantDateOfBirth: "",
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
      applicantSignature: "",
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
    },
    validationSchema: validateApplicantSchema,
    onSubmit: () => {
      registerNewApplicant();
    },
  });

  //? Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    formikApplicantForm.handleSubmit();
  };

  //? Handle Applicant Country Change
  const handleApplicantCountryChange = (_e, newValue) => {
    const { label } = newValue || {};
    formikApplicantForm.setFieldValue("applicantCountry", label);
  };

  //? Handle Father Country Change
  const handleFatherCountryChange = (_e, newValue) => {
    const { label } = newValue || {};
    formikApplicantForm.setFieldValue("fatherCountry", label);
  };

  //? Handle Mother Country Change
  const handleMotherCountryChange = (_e, newValue) => {
    const { label } = newValue || {};
    formikApplicantForm.setFieldValue("motherCountry", label);
  };

  //? Applicant Data
  const ApplicantData = {
    applicantPhoto: formikApplicantForm.values.applicantPhoto,
    formNumber: formikApplicantForm.values.formNumber,
    applicantSex: formikApplicantForm.values.applicantSex,
    dateOfApplication: formikApplicantForm.values.dateOfApplication,
    applicantFirstName: formikApplicantForm.values.applicantFirstName,
    applicantMiddleName: formikApplicantForm.values.applicantMiddleName,
    applicantLastName: formikApplicantForm.values.applicantLastName,
    applicantFacility: formikApplicantForm.values.applicantFacility,
    applicantTownOrCity: formikApplicantForm.values.applicantTownOrCity,
    applicantCounty: formikApplicantForm.values.applicantCounty,
    applicantCountry: formikApplicantForm.values.applicantCountry,
    applicantDateOfBirth: formikApplicantForm.values.applicantDateOfBirth,
    fatherName: formikApplicantForm.values.fatherName,
    fatherNationality: formikApplicantForm.values.fatherNationality,
    fatherAge: formikApplicantForm.values.fatherAge,
    fatherTownOrCity: formikApplicantForm.values.fatherTownOrCity,
    fatherCounty: formikApplicantForm.values.fatherCounty,
    fatherCountry: formikApplicantForm.values.fatherCountry,
    fatherCountyOfOrigin: formikApplicantForm.values.fatherCountyOfOrigin,
    fatherOccupation: formikApplicantForm.values.fatherOccupation,
    fatherDateOfNaturalization:
      formikApplicantForm.values.fatherDateOfNaturalization,
    isFatherLiving: formikApplicantForm.values.isFatherLiving,
    fatherPresentAddress: formikApplicantForm.values.fatherPresentAddress,
    fatherTelephoneNumber: formikApplicantForm.values.fatherTelephoneNumber,
    motherName: formikApplicantForm.values.motherName,
    motherNationality: formikApplicantForm.values.motherNationality,
    motherAge: formikApplicantForm.values.motherAge,
    motherTownOrCity: formikApplicantForm.values.motherTownOrCity,
    motherCounty: formikApplicantForm.values.motherCounty,
    motherCountry: formikApplicantForm.values.motherCounty,
    motherCountyOfOrigin: formikApplicantForm.values.motherCountyOfOrigin,
    motherOccupation: formikApplicantForm.values.motherOccupation,
    motherDateOfNaturalization:
      formikApplicantForm.values.motherDateOfNaturalization,
    isMotherLiving: formikApplicantForm.values.isMotherLiving,
    motherPresentAddress: formikApplicantForm.values.motherPresentAddress,
    motherTelephoneNumber: formikApplicantForm.values.motherTelephoneNumber,
    applicantSignature: formikApplicantForm.values.applicantSignature,
    applicantContactNumber: formikApplicantForm.values.applicantContactNumber,
    fullName: formikApplicantForm.values.fullName,
    city: formikApplicantForm.values.city,
    county: formikApplicantForm.values.county,
    motherFullName: formikApplicantForm.values.motherFullName,
    fatherFullName: formikApplicantForm.values.fatherFullName,
    date: formikApplicantForm.values.date,
    cityOrTown: formikApplicantForm.values.cityOrTown,
    name: formikApplicantForm.values.name,
    address: formikApplicantForm.values.address,
    relationship: formikApplicantForm.values.relationship,
    contactNumber: formikApplicantForm.values.contactNumber,
    parentOrGuardianPhoto: formikApplicantForm.values.parentOrGuardianPhoto,
  };

  console.log(ApplicantData);

  //? useQueryClient
  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: (newData) => PostApplicant(`${postApplicantURL}`, newData),
    onSuccess: (data) => {
      if (data) {
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

    Mutation.mutate(formData);
  };

  //? Scroll to error input on form submit
  useEffect(() => {
    if (!formikApplicantForm.isSubmitting) return;
    if (Object.keys(formikApplicantForm.errors).length > 0) {
      document
        .getElementsByName(Object.keys(formikApplicantForm.errors)[0])
        .forEach((error) => error.focus());
    }
  }, [formikApplicantForm]);

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      {isTabletOrMobile && <NavbarBreadcrumbs />}
      <Typography
        component="h2"
        variant="h6"
        sx={{ mt: { xs: 3, md: 0 }, mb: 2 }}
      >
        Add Applicant
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 9, lg: 9 }}>
          {/* Start Applicant Information */}
          <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  color: "#4169E1",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                }}
              >
                Applicant Information
              </Typography>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    First Name
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="applicantFirstName"
                      name="applicantFirstName"
                      type="text"
                      value={formikApplicantForm.values.applicantFirstName}
                      // onChange={formik.handleChange}
                      // onBlur={formik.handleBlur}
                      // error={
                      //   formik.touched.applicantFirstName &&
                      //   Boolean(formik.errors.applicantFirstName)
                      // }
                      placeholder="Enter first name..."
                    />
                    {/* <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
                          {formik.touched.applicantFirstName &&
                            formik.errors.applicantFirstName}
                        </Typography> */}
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography sx={{ mt: 2 }}>Middle Name</Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="applicantMiddleName"
                      name="applicantMiddleName"
                      type="text"
                      value={formikApplicantForm.values.applicantMiddleName}
                      // onChange={formik.handleChange}
                      placeholder="Enter middle name..."
                    />
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Last Name
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="applicantLastName"
                      name="applicantLastName"
                      type="text"
                      value={formikApplicantForm.values.applicantLastName}
                      // onChange={formik.handleChange}
                      // onBlur={formik.handleBlur}
                      // error={
                      //   formik.touched.applicantLastName &&
                      //   Boolean(formik.errors.applicantLastName)
                      // }
                      placeholder="Enter last name..."
                    />
                    {/* <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
                           {formik.touched.applicantLastName &&
                             formik.errors.applicantLastName}
                         </Typography> */}
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Facility
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="applicantFacility"
                      name="applicantFacility"
                      type="text"
                      value={formikApplicantForm.values.applicantFacility}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.applicantFacility &&
                        Boolean(formikApplicantForm.errors.applicantFacility)
                      }
                      placeholder="Enter facility..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.applicantFacility &&
                        formikApplicantForm.errors.applicantFacility}
                    </Typography>
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Town/City
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="applicantTownOrCity"
                      name="applicantTownOrCity"
                      type="text"
                      value={formikApplicantForm.values.applicantTownOrCity}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.applicantTownOrCity &&
                        Boolean(formikApplicantForm.errors.applicantTownOrCity)
                      }
                      placeholder="Enter town/city..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.applicantTownOrCity &&
                        formikApplicantForm.errors.applicantTownOrCity}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    County
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="applicantCounty"
                      name="applicantCounty"
                      type="text"
                      value={formikApplicantForm.values.applicantCounty}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.applicantCounty &&
                        Boolean(formikApplicantForm.errors.applicantCounty)
                      }
                      placeholder="Enter county..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.applicantCounty &&
                        formikApplicantForm.errors.applicantCounty}
                    </Typography>
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Country
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <Autocomplete
                      id="applicantCountry"
                      value={formikApplicantForm.values.applicantCountry}
                      onChange={handleApplicantCountryChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.applicantCountry &&
                        Boolean(formikApplicantForm.errors.applicantCountry)
                      }
                      options={Country_Lists ?? []}
                      filterSelectedOptions={true}
                      isOptionEqualToValue={(option, value) =>
                        option?.label === value?.label
                      }
                      autoHighlight
                      getOptionLabel={(option) => option?.label ?? option}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                          key={option?.code}
                        >
                          <img
                            loading="lazy"
                            width="20"
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            alt="Country Flag"
                          />
                          {option?.label} {option?.code} +{option?.phone}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select country..."
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "country",
                          }}
                        />
                      )}
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.applicantCountry &&
                        formikApplicantForm.errors.applicantCountry}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography sx={{ mt: 1, mb: 2 }}>
                    Date of Birth
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disableFuture
                        value={dayjs(
                          formikApplicantForm.values.applicantDateOfBirth
                        )}
                        // onChange={(newValue) => {
                        //   formikApplicantForm.setFieldValue("applicantDateOfBirth", newValue);
                        // }}
                        // onBlur={formikApplicantForm.handleBlur}
                        // error={
                        //   formikApplicantForm.touched.applicantDateOfBirth &&
                        //   Boolean(formikApplicantForm.errors.applicantDateOfBirth)
                        // }
                      />
                    </LocalizationProvider>
                    {/* <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
                            {formikApplicantForm.touched.applicantDateOfBirth &&
                              formikApplicantForm.errors.applicantDateOfBirth}
                          </Typography> */}
                  </FormControl>
                </Grid>
              </Box>
            </Box>
          </Paper>
          {/* End Applicant Information */}

          {/* Start Father's Information */}
          <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2, mt: 4 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  color: "#4169E1",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                }}
              >
                Father's Information
              </Typography>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Father's Name
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="fatherName"
                      name="fatherName"
                      type="text"
                      value={formikApplicantForm.values.fatherName}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.fatherName &&
                        Boolean(formikApplicantForm.errors.fatherName)
                      }
                      placeholder="Enter father's name..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.fatherName &&
                        formikApplicantForm.errors.fatherName}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Father's Nationality
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="fatherNationality"
                      name="fatherNationality"
                      type="text"
                      value={formikApplicantForm.values.fatherNationality}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.fatherNationality &&
                        Boolean(formikApplicantForm.errors.fatherNationality)
                      }
                      placeholder="Enter father's nationality..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.fatherNationality &&
                        formikApplicantForm.errors.fatherNationality}
                    </Typography>
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Age When Child Was Born
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="fatherAge"
                      name="fatherAge"
                      type="number"
                      value={formikApplicantForm.values.fatherAge}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.fatherAge &&
                        Boolean(formikApplicantForm.errors.fatherAge)
                      }
                      placeholder="Enter father's age..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.fatherAge &&
                        formikApplicantForm.errors.fatherAge}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Father's Town/City
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="fatherTownOrCity"
                      name="fatherTownOrCity"
                      type="text"
                      value={formikApplicantForm.values.fatherTownOrCity}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.fatherTownOrCity &&
                        Boolean(formikApplicantForm.errors.fatherTownOrCity)
                      }
                      placeholder="Enter father's town/city..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.fatherTownOrCity &&
                        formikApplicantForm.errors.fatherTownOrCity}
                    </Typography>
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Father's County
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="fatherCounty"
                      name="fatherCounty"
                      type="text"
                      value={formikApplicantForm.values.fatherCounty}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.fatherCounty &&
                        Boolean(formikApplicantForm.errors.fatherCounty)
                      }
                      placeholder="Enter father's county..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.fatherCounty &&
                        formikApplicantForm.errors.fatherCounty}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Father's Country
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <Autocomplete
                      id="fatherCountry"
                      value={formikApplicantForm.values.fatherCountry}
                      onChange={handleFatherCountryChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.fatherCountry &&
                        Boolean(formikApplicantForm.errors.fatherCountry)
                      }
                      options={Country_Lists ?? []}
                      filterSelectedOptions={true}
                      isOptionEqualToValue={(option, value) =>
                        option?.label === value?.label
                      }
                      autoHighlight
                      getOptionLabel={(option) => option?.label ?? option}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                          key={option?.code}
                        >
                          <img
                            loading="lazy"
                            width="20"
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            alt="Country Flag"
                          />
                          {option?.label} {option?.code} +{option?.phone}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select father's country..."
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "country",
                          }}
                        />
                      )}
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.fatherCountry &&
                        formikApplicantForm.errors.fatherCountry}
                    </Typography>
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography sx={{ mt: 1 }}>
                    Father's County of Origin
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="fatherCountyOfOrigin"
                      name="fatherCountyOfOrigin"
                      type="text"
                      value={formikApplicantForm.values.fatherCountyOfOrigin}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.fatherCountyOfOrigin &&
                        Boolean(formikApplicantForm.errors.fatherCountyOfOrigin)
                      }
                      placeholder="Enter father's county of origin..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.fatherCountyOfOrigin &&
                        formikApplicantForm.errors.fatherCountyOfOrigin}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography sx={{ mt: 1 }}>
                    Father's Occupation
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="fatherOccupation"
                      name="fatherOccupation"
                      type="text"
                      value={formikApplicantForm.values.fatherOccupation}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.fatherOccupation &&
                        Boolean(formikApplicantForm.errors.fatherOccupation)
                      }
                      placeholder="Enter father's occupation..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.fatherOccupation &&
                        formikApplicantForm.errors.fatherOccupation}
                    </Typography>
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography sx={{ mt: 1, mb: 2 }}>
                    Father's Date of Naturalization
                  </Typography>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disableFuture
                        value={dayjs(
                          formikApplicantForm.values.fatherDateOfNaturalization
                        )}
                        onChange={(newValue) => {
                          formikApplicantForm.setFieldValue(
                            "fatherDateOfNaturalization",
                            newValue
                          );
                        }}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography sx={{ mt: 1 }}>
                    Is Father Living? (YES or NO). If YES, please give father's
                    present address and telephone number
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      id="isFatherLiving"
                      name="isFatherLiving"
                      value={formikApplicantForm.values.isFatherLiving}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.isFatherLiving &&
                        Boolean(formikApplicantForm.errors.isFatherLiving)
                      }
                    >
                      <FormControlLabel
                        value="YES"
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 28,
                              },
                            }}
                          />
                        }
                        label="YES"
                      />
                      <FormControlLabel
                        value="NO"
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 28,
                              },
                            }}
                          />
                        }
                        label="NO"
                      />
                    </RadioGroup>
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.isFatherLiving &&
                        formikApplicantForm.errors.isFatherLiving}
                    </Typography>
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                {formikApplicantForm.values.isFatherLiving === "YES" && (
                  <>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                      <Typography sx={{ mt: 2 }}>
                        Father's Present Address
                        <span>
                          <LuAsterisk size={10} color="#C41E3A" />
                        </span>
                        <Tooltip
                          title="This field is required!"
                          placement="bottom"
                          arrow
                        >
                          <IconButton
                            sx={{
                              cursor: "default",
                              position: "relative",
                              bottom: 2,
                            }}
                          >
                            <BsFillInfoCircleFill size={14} color="#acb5c3" />
                          </IconButton>
                        </Tooltip>
                      </Typography>
                      <FormControl fullWidth>
                        <TextField
                          margin="normal"
                          id="fatherPresentAddress"
                          name="fatherPresentAddress"
                          type="text"
                          value={
                            formikApplicantForm.values.fatherPresentAddress
                          }
                          onChange={formikApplicantForm.handleChange}
                          onBlur={formikApplicantForm.handleBlur}
                          error={
                            formikApplicantForm.touched.fatherPresentAddress &&
                            Boolean(
                              formikApplicantForm.errors.fatherPresentAddress
                            )
                          }
                          placeholder="Enter father's present address..."
                        />
                        <Typography
                          variant="inherit"
                          color="error.main"
                          sx={{ mt: 1 }}
                        >
                          {formikApplicantForm.touched.fatherPresentAddress &&
                            formikApplicantForm.errors.fatherPresentAddress}
                        </Typography>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                      <Typography>
                        Father's Telephone Number
                        <span>
                          <LuAsterisk size={10} color="#C41E3A" />
                        </span>
                        <Tooltip
                          title="This field is required!"
                          placement="bottom"
                          arrow
                        >
                          <IconButton
                            sx={{
                              cursor: "default",
                              position: "relative",
                              bottom: 2,
                            }}
                          >
                            <BsFillInfoCircleFill size={14} color="#acb5c3" />
                          </IconButton>
                        </Tooltip>
                      </Typography>
                      <FormControl fullWidth sx={{ mt: 2 }}>
                        <FatherPhoneInputField formik={formikApplicantForm} />
                        <Typography
                          variant="inherit"
                          color="error.main"
                          sx={{ mt: 1 }}
                        >
                          {formikApplicantForm.touched.fatherTelephoneNumber &&
                            formikApplicantForm.errors.fatherTelephoneNumber}
                        </Typography>
                      </FormControl>
                    </Grid>
                  </>
                )}
              </Box>
            </Box>
          </Paper>
          {/* End Father's Information */}

          {/* Start Mother's Information */}
          <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2, mt: 4 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  color: "#4169E1",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                }}
              >
                Mother's Information
              </Typography>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Mother's Name
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="motherName"
                      name="motherName"
                      type="text"
                      value={formikApplicantForm.values.motherName}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.motherName &&
                        Boolean(formikApplicantForm.errors.motherName)
                      }
                      placeholder="Enter mother's name..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.motherName &&
                        formikApplicantForm.errors.motherName}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Mother's Nationality
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="motherNationality"
                      name="motherNationality"
                      type="text"
                      value={formikApplicantForm.values.motherNationality}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.motherNationality &&
                        Boolean(formikApplicantForm.errors.motherNationality)
                      }
                      placeholder="Enter mother's nationality..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.motherNationality &&
                        formikApplicantForm.errors.motherNationality}
                    </Typography>
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Age When Child Was Born
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="motherAge"
                      name="motherAge"
                      type="number"
                      value={formikApplicantForm.values.motherAge}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.motherAge &&
                        Boolean(formikApplicantForm.errors.motherAge)
                      }
                      placeholder="Enter mother's age..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.motherAge &&
                        formikApplicantForm.errors.motherAge}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Mother's Town/City
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="motherTownOrCity"
                      name="motherTownOrCity"
                      type="text"
                      value={formikApplicantForm.values.motherTownOrCity}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.motherTownOrCity &&
                        Boolean(formikApplicantForm.errors.motherTownOrCity)
                      }
                      placeholder="Enter mother's town/city..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.motherTownOrCity &&
                        formikApplicantForm.errors.motherTownOrCity}
                    </Typography>
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Mother's County
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="motherCounty"
                      name="motherCounty"
                      type="text"
                      value={formikApplicantForm.values.motherCounty}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.motherCounty &&
                        Boolean(formikApplicantForm.errors.motherCounty)
                      }
                      placeholder="Enter mother's county..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.motherCounty &&
                        formikApplicantForm.errors.motherCounty}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Mother's Country
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <Autocomplete
                      id="motherCountry"
                      value={formikApplicantForm.values.motherCountry}
                      onChange={handleMotherCountryChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.motherCountry &&
                        Boolean(formikApplicantForm.errors.motherCountry)
                      }
                      options={Country_Lists ?? []}
                      filterSelectedOptions={true}
                      isOptionEqualToValue={(option, value) =>
                        option?.label === value?.label
                      }
                      autoHighlight
                      getOptionLabel={(option) => option?.label ?? option}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                          key={option?.code}
                        >
                          <img
                            loading="lazy"
                            width="20"
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            alt="Country Flag"
                          />
                          {option?.label} {option?.code} +{option?.phone}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select mother's country..."
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "country",
                          }}
                        />
                      )}
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.motherCountry &&
                        formikApplicantForm.errors.motherCountry}
                    </Typography>
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography sx={{ mt: 1 }}>
                    Mother's County of Origin
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="motherCountyOfOrigin"
                      name="motherCountyOfOrigin"
                      type="text"
                      value={formikApplicantForm.values.motherCountyOfOrigin}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.motherCountyOfOrigin &&
                        Boolean(formikApplicantForm.errors.motherCountyOfOrigin)
                      }
                      placeholder="Enter mother's county of origin..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.motherCountyOfOrigin &&
                        formikApplicantForm.errors.motherCountyOfOrigin}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography sx={{ mt: 1 }}>
                    Mother's Occupation
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="motherOccupation"
                      name="motherOccupation"
                      type="text"
                      value={formikApplicantForm.values.motherOccupation}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.motherOccupation &&
                        Boolean(formikApplicantForm.errors.motherOccupation)
                      }
                      placeholder="Enter mother's occupation..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.motherOccupation &&
                        formikApplicantForm.errors.motherOccupation}
                    </Typography>
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography sx={{ mt: 1, mb: 2 }}>
                    Mother's Date of Naturalization
                  </Typography>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disableFuture
                        value={dayjs(
                          formikApplicantForm.values.motherDateOfNaturalization
                        )}
                        onChange={(newValue) => {
                          formikApplicantForm.setFieldValue(
                            "motherDateOfNaturalization",
                            newValue
                          );
                        }}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography sx={{ mt: 1 }}>
                    Is Mother Living? (YES or NO). If YES, please give father's
                    present address and telephone number
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      id="isMotherLiving"
                      name="isMotherLiving"
                      value={formikApplicantForm.values.isMotherLiving}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.isMotherLiving &&
                        Boolean(formikApplicantForm.errors.isMotherLiving)
                      }
                    >
                      <FormControlLabel
                        value="YES"
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 28,
                              },
                            }}
                          />
                        }
                        label="YES"
                      />
                      <FormControlLabel
                        value="NO"
                        control={
                          <Radio
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 28,
                              },
                            }}
                          />
                        }
                        label="NO"
                      />
                    </RadioGroup>
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.isMotherLiving &&
                        formikApplicantForm.errors.isMotherLiving}
                    </Typography>
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                {formikApplicantForm.values.isMotherLiving === "YES" && (
                  <>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                      <Typography sx={{ mt: 2 }}>
                        Mother's Present Address
                        <span>
                          <LuAsterisk size={10} color="#C41E3A" />
                        </span>
                        <Tooltip
                          title="This field is required!"
                          placement="bottom"
                          arrow
                        >
                          <IconButton
                            sx={{
                              cursor: "default",
                              position: "relative",
                              bottom: 2,
                            }}
                          >
                            <BsFillInfoCircleFill size={14} color="#acb5c3" />
                          </IconButton>
                        </Tooltip>
                      </Typography>
                      <FormControl fullWidth>
                        <TextField
                          margin="normal"
                          id="motherPresentAddress"
                          name="motherPresentAddress"
                          type="text"
                          value={
                            formikApplicantForm.values.motherPresentAddress
                          }
                          onChange={formikApplicantForm.handleChange}
                          onBlur={formikApplicantForm.handleBlur}
                          error={
                            formikApplicantForm.touched.motherPresentAddress &&
                            Boolean(
                              formikApplicantForm.errors.motherPresentAddress
                            )
                          }
                          placeholder="Enter mother's present address..."
                        />
                        <Typography
                          variant="inherit"
                          color="error.main"
                          sx={{ mt: 1 }}
                        >
                          {formikApplicantForm.touched.motherPresentAddress &&
                            formikApplicantForm.errors.motherPresentAddress}
                        </Typography>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                      <Typography>
                        Mother's Telephone Number
                        <span>
                          <LuAsterisk size={10} color="#C41E3A" />
                        </span>
                        <Tooltip
                          title="This field is required!"
                          placement="bottom"
                          arrow
                        >
                          <IconButton
                            sx={{
                              cursor: "default",
                              position: "relative",
                              bottom: 2,
                            }}
                          >
                            <BsFillInfoCircleFill size={14} color="#acb5c3" />
                          </IconButton>
                        </Tooltip>
                      </Typography>
                      <FormControl fullWidth sx={{ mt: 2 }}>
                        <MotherPhoneInputField formik={formikApplicantForm} />
                        <Typography
                          variant="inherit"
                          color="error.main"
                          sx={{ mt: 1 }}
                        >
                          {formikApplicantForm.touched.motherTelephoneNumber &&
                            formikApplicantForm.errors.motherTelephoneNumber}
                        </Typography>
                      </FormControl>
                    </Grid>
                  </>
                )}
              </Box>
            </Box>
          </Paper>
          {/* End Mother's Information */}

          {/* Start Attestation */}
          <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2, mt: 4 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  color: "#4169E1",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                }}
              >
                Attestation
              </Typography>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Contact Number
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <FormControl sx={{ width: "100%" }}>
                      <ContactPhoneInputField
                        formikApplicantForm={formikApplicantForm}
                      />
                      <Typography
                        variant="inherit"
                        color="error.main"
                        sx={{ mt: 1 }}
                      >
                        {formikApplicantForm.touched.applicantContactNumber &&
                          formikApplicantForm.errors.applicantContactNumber}
                      </Typography>
                    </FormControl>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Full Name
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formikApplicantForm.values.fullName}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.fullName &&
                        Boolean(formikApplicantForm.errors.fullName)
                      }
                      placeholder="Enter full name..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.fullName &&
                        formikApplicantForm.errors.fullName}
                    </Typography>
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    City
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="city"
                      name="city"
                      type="text"
                      value={formikApplicantForm.values.city}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.city &&
                        Boolean(formikApplicantForm.errors.city)
                      }
                      placeholder="Enter city..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.city &&
                        formikApplicantForm.errors.city}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    County
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="county"
                      name="county"
                      type="text"
                      value={formikApplicantForm.values.county}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.county &&
                        Boolean(formikApplicantForm.errors.county)
                      }
                      placeholder="Enter county..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.county &&
                        formikApplicantForm.errors.county}
                    </Typography>
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Mother Name
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="motherFullName"
                      name="motherFullName"
                      type="text"
                      value={formikApplicantForm.values.motherFullName}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.motherFullName &&
                        Boolean(formikApplicantForm.errors.motherFullName)
                      }
                      placeholder="Enter mother's full name..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.motherFullName &&
                        formikApplicantForm.errors.motherFullName}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Father Name
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="fatherFullName"
                      name="fatherFullName"
                      type="text"
                      value={formikApplicantForm.values.fatherFullName}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.fatherFullName &&
                        Boolean(formikApplicantForm.errors.fatherFullName)
                      }
                      placeholder="Enter father's full name..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.fatherFullName &&
                        formikApplicantForm.errors.fatherFullName}
                    </Typography>
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography sx={{ mb: 2 }}>
                    Date
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disablePast
                        disableFuture
                        value={dayjs(formikApplicantForm.values.date)}
                        onChange={(newValue) => {
                          formikApplicantForm.setFieldValue("date", newValue);
                        }}
                        onBlur={formikApplicantForm.handleBlur}
                        error={
                          formikApplicantForm.touched.date &&
                          Boolean(formikApplicantForm.errors.date)
                        }
                      />
                    </LocalizationProvider>
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.date &&
                        formikApplicantForm.errors.date}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    City/Town
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="cityOrTown"
                      name="cityOrTown"
                      type="text"
                      value={formikApplicantForm.values.cityOrTown}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.cityOrTown &&
                        Boolean(formikApplicantForm.errors.cityOrTown)
                      }
                      placeholder="Enter city/town"
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.cityOrTown &&
                        formikApplicantForm.errors.cityOrTown}
                    </Typography>
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Name
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="name"
                      name="name"
                      type="text"
                      value={formikApplicantForm.values.name}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.name &&
                        Boolean(formikApplicantForm.errors.name)
                      }
                      placeholder="Enter name..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.name &&
                        formikApplicantForm.errors.name}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Address
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="address"
                      name="address"
                      type="text"
                      value={formikApplicantForm.values.address}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.address &&
                        Boolean(formikApplicantForm.errors.address)
                      }
                      placeholder="Enter address..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.address &&
                        formikApplicantForm.errors.address}
                    </Typography>
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Relationship
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      margin="normal"
                      id="relationship"
                      name="relationship"
                      type="text"
                      value={formikApplicantForm.values.relationship}
                      onChange={formikApplicantForm.handleChange}
                      onBlur={formikApplicantForm.handleBlur}
                      error={
                        formikApplicantForm.touched.relationship &&
                        Boolean(formikApplicantForm.errors.relationship)
                      }
                      placeholder="Enter relationship..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.relationship &&
                        formikApplicantForm.errors.relationship}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography>
                    Contact
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                    <Tooltip
                      title="This field is required!"
                      placement="bottom"
                      arrow
                    >
                      <IconButton
                        sx={{
                          cursor: "default",
                          position: "relative",
                          bottom: 2,
                        }}
                      >
                        <BsFillInfoCircleFill size={14} color="#acb5c3" />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <FormControl fullWidth>
                    <FormControl sx={{ width: "100%" }}>
                      <ContactNumberInputField
                        formikApplicantForm={formikApplicantForm}
                      />
                      <Typography
                        variant="inherit"
                        color="error.main"
                        sx={{ mt: 1 }}
                      >
                        {formikApplicantForm.touched.contactNumber &&
                          formikApplicantForm.errors.contactNumber}
                      </Typography>
                    </FormControl>
                  </FormControl>
                </Grid>
              </Box>
            </Box>
          </Paper>
          {/* End Attestation */}
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
          {/* Start Applicant Photo */}
          <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
            <Box sx={{ mb: 3, textAlign: "center" }}>
              <Typography
                sx={{
                  color: "#4169E1",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                }}
              >
                Applicant Photo
              </Typography>
              <Box sx={{ mt: 4 }}>
                {formikApplicantForm.values.applicantPhoto !== "" && (
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
                        alt={formikApplicantForm.values.applicantFirstName}
                        src={formikApplicantForm.values.applicantPhoto.preview}
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

                {formikApplicantForm.values.applicantPhoto === "" && (
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
                            textTransform: "uppercase",
                          }}
                        >
                          Applicant Photo
                        </Typography>
                      </Avatar>
                    </Badge>
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.applicantPhoto &&
                        formikApplicantForm.errors.applicantPhoto}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
          {/* End Applicant Photo */}

          {/* Start Applicant Signature */}
          <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2, mt: 4 }}>
            <Box sx={{ mb: 3, textAlign: "center" }}>
              <Typography
                sx={{
                  color: "#4169E1",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                }}
              >
                Applicant Signature
              </Typography>
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <Typography sx={{ mt: 4 }}>
                  Applicant Signature
                  <span>
                    <LuAsterisk size={10} color="#C41E3A" />
                  </span>
                  <Tooltip
                    title="This field is required!"
                    placement="bottom"
                    arrow
                  >
                    <IconButton
                      sx={{
                        cursor: "default",
                        position: "relative",
                        bottom: 2,
                      }}
                    >
                      <BsFillInfoCircleFill size={14} color="#acb5c3" />
                    </IconButton>
                  </Tooltip>
                </Typography>
                <FormControl fullWidth>
                  <AddApplicantSignature
                    formikApplicantForm={formikApplicantForm}
                  />
                  {formikApplicantForm.values.applicantSignature !== "" && (
                    <Box sx={{ mt: 1 }}>
                      <img
                        width={60}
                        height={60}
                        src={formikApplicantForm.values.applicantSignature}
                        alt="Applicant Signature"
                      />
                    </Box>
                  )}
                  <Typography
                    variant="inherit"
                    color="error.main"
                    sx={{ mt: 1 }}
                  >
                    {formikApplicantForm.touched.applicantSignature &&
                      formikApplicantForm.errors.applicantSignature}
                  </Typography>
                </FormControl>
              </Grid>
            </Box>
          </Paper>
          {/* End Applicant Signature */}

          {/* Start Parent or Guardian Photo */}
          <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2, mt: 4 }}>
            <Box sx={{ mb: 3, textAlign: "center" }}>
              <Typography
                sx={{
                  color: "#4169E1",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                }}
              >
                Parent or Guardian Photo
              </Typography>
              <Box sx={{ mt: 4 }}>
                {formikApplicantForm.values.parentOrGuardianPhoto !== "" && (
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
                        alt={formikApplicantForm.values.applicantFirstName}
                        src={
                          formikApplicantForm.values.parentOrGuardianPhoto
                            .preview
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

                {formikApplicantForm.values.parentOrGuardianPhoto === "" && (
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
                            textTransform: "uppercase",
                          }}
                        >
                          Parent or Guardian Photo
                        </Typography>
                      </Avatar>
                    </Badge>
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikApplicantForm.touched.parentOrGuardianPhoto &&
                        formikApplicantForm.errors.parentOrGuardianPhoto}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
          {/* End Parent or Guardian Photo */}
        </Grid>
        <hr style={{ marginTop: 30, color: "#000" }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box>
            <Button
              size="large"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                mr: 2,
                bgcolor: "#acb5c3",
                color: "#fff",
              }}
              endIcon={<MdCancel size={20} />}
              onClick={() => {
                handleCloseAddApplicant();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              loading={loading}
              loadingIndicator={<ButtonLoader />}
              onClick={handleSubmit}
              loadingPosition="end"
              endIcon={<IoMdSave size={20} color="#fff" />}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <span style={{ color: "#fff" }}>Saving</span>
              ) : (
                <spa>Save</spa>
              )}
            </Button>
          </Box>
        </Box>
      </Grid>
      <Copyright sx={{ my: 4 }} />

      {/* Start AddUploadApplicantPhoto Dialog */}
      <AddUploadApplicantPhoto
        open={openApplicantPhoto}
        handleClose={handleCloseApplicantPhoto}
        formikApplicantForm={formikApplicantForm}
      />
      {/* End AddUploadApplicantPhoto Dialog */}

      {/* Start AddUploadGuardianPhoto Dialog */}
      <AddUploadGuardianPhoto
        open={openApplicantPhoto}
        handleClose={handleCloseApplicantPhoto}
        formikApplicantForm={formikApplicantForm}
      />
      {/* End AddUploadGuardianPhoto Dialog */}
    </Box>
  );
};

export default MainAddApplicantGrid;
