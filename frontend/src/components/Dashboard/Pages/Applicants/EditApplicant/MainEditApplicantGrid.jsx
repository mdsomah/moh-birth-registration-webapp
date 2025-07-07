import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Button,
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
import EditFatherPhoneInputField from "../PhoneInputsField/EditFatherPhoneInputField";
import EditMotherPhoneInputField from "../PhoneInputsField/EditMotherPhoneInputField";
import EditContactPhoneInputField from "../PhoneInputsField/EditContactPhoneInputField";
import EditContactNumberInputField from "../PhoneInputsField/EditContactNumberInputField";
import EditUploadApplicantPhoto from "../PhotosUpload/EditPhotosUpload/EditUploadApplicantPhoto/EditUploadApplicantPhoto";
import EditUploadGuardianPhoto from "../PhotosUpload/EditPhotosUpload/EditUploadGuardianPhoto/EditUploadGuardianPhoto";
import EditApplicantSignature from "../SignatureDialog/EditApplicantSignature";
import ButtonLoader from "../../../../ButtonLoader/ButtonLoader";
import { removeEditApplicant } from "../../../../../app/slices/applicantSlice";

//? React Responsive Media Queries
import { useMediaQuery } from "react-responsive";

//? Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";

//? Get Single Data
import GetSingleData from "../../../../../apis/GetSingleData";

//? Post Applicant Data
import UpdateApplicant from "../../../../../apis/UpdateApplicant";

//? Endpoints
const getApplicantURL = "/applicants";
const updateApplicantURL = "/applicants";

//? Validate Edit Applicant Schema
const validateEditApplicantSchema = Yup.object()
  .shape({
    applicantFirstName: Yup.string().required("Applicant first name required!"),
    applicantMiddleName: Yup.string().notRequired(),
    applicantLastName: Yup.string().required("Applicant last name required!"),
  })
  .required();

const MainEditApplicantGrid = () => {
  //? Tablet or Mobile Responsive Media Queries
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  //? useDispatch
  const dispatch = useDispatch();

  //? Destructure useSelector
  const { editApplicant } = useSelector((state) => state.applicant);

  //? useNavigate
  const navigate = useNavigate();

  //? useQueryClient
  const queryClient = useQueryClient();

  //? useSearchParams
  const [searchParams] = useSearchParams();
  const applicantId = searchParams.get("id");

  //? Destructure useQuery
  const { data: applicantData } = useQuery({
    queryKey: ["applicantData", applicantId],
    queryFn: ({ queryKey }) =>
      GetSingleData(`${getApplicantURL}/${queryKey[1]}`),
    initialData: () => {
      return queryClient
        .getQueryData(["applicantsData"])
        ?.find((applicant) => applicant.id === applicantId);
    },
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["applicantsData"])?.dataUpdatedAt,
    enabled: Boolean(applicantId),
  });

  //? Applicant Object
  const ApplicantOBJ = {
    applicantPhoto: () =>
      editApplicant?.applicantPhoto ?? applicantData?.applicantPhoto,
    formNumber: () => editApplicant?.formNumber ?? applicantData?.formNumber,
    applicantSex: () =>
      editApplicant?.applicantSex ?? applicantData?.applicantSex,
    dateOfApplication: () =>
      editApplicant?.dateOfApplication ?? applicantData?.dateOfApplication,
    applicantFirstName: () =>
      editApplicant?.applicantFirstName ?? applicantData?.applicantFirstName,
    applicantMiddleName: () =>
      editApplicant?.applicantMiddleName ?? applicantData?.applicantMiddleName,
    applicantLastName: () =>
      editApplicant?.applicantLastName ?? applicantData?.applicantLastName,
    applicantFacility: () =>
      editApplicant?.applicantFacility ?? applicantData?.applicantFacility,
    applicantTownOrCity: () =>
      editApplicant?.applicantTownOrCity ?? applicantData?.applicantTownOrCity,
    applicantCounty: () =>
      editApplicant?.applicantCounty ?? applicantData?.applicantCounty,
    applicantCountry: () =>
      editApplicant?.applicantCountry ?? applicantData?.applicantCountry,
    applicantDateOfBirth: () =>
      editApplicant?.applicantDateOfBirth ??
      applicantData?.applicantDateOfBirth,
    fatherName: () =>
      editApplicant?.applicantFather?.fatherName ??
      applicantData?.applicantFather?.fatherName,
    fatherNationality: () =>
      editApplicant?.applicantFather?.fatherNationality ??
      applicantData?.applicantFather?.fatherNationality,
    fatherAge: () =>
      editApplicant?.applicantFather?.fatherAge ??
      applicantData?.applicantFather?.fatherAge,
    fatherTownOrCity: () =>
      editApplicant?.applicantFather?.fatherTownOrCity ??
      applicantData?.applicantFather?.fatherTownOrCity,
    fatherCounty: () =>
      editApplicant?.applicantFather?.fatherCounty ??
      applicantData?.applicantFather?.fatherCounty,
    fatherCountry: () =>
      editApplicant?.applicantFather?.fatherCountry ??
      applicantData?.applicantFather?.fatherCountry,
    fatherCountyOfOrigin: () =>
      editApplicant?.applicantFather?.fatherCountyOfOrigin ??
      applicantData?.applicantFather?.fatherCountyOfOrigin,
    fatherOccupation: () =>
      editApplicant?.applicantFather?.fatherOccupation ??
      applicantData?.applicantFather?.fatherOccupation,
    fatherDateOfNaturalization: () =>
      editApplicant?.applicantFather?.fatherDateOfNaturalization ??
      applicantData?.applicantFather?.fatherDateOfNaturalization,
    isFatherLiving: () =>
      editApplicant?.applicantFather?.isFatherLiving ??
      applicantData?.applicantFather?.isFatherLiving,
    fatherPresentAddress: () =>
      editApplicant?.applicantFather?.fatherPresentAddress ??
      applicantData?.applicantFather?.fatherPresentAddress,
    fatherTelephoneNumber: () =>
      editApplicant?.applicantFather?.fatherTelephoneNumber ??
      applicantData?.applicantFather?.fatherTelephoneNumber,
    motherName: () =>
      editApplicant?.applicantMother?.motherName ??
      applicantData?.applicantMother?.motherName,
    motherNationality: () =>
      editApplicant?.applicantMother?.motherNationality ??
      applicantData?.applicantMother?.motherNationality,
    motherAge: () =>
      editApplicant?.applicantMother?.motherAge ??
      applicantData?.applicantMother?.motherAge,
    motherTownOrCity: () =>
      editApplicant?.applicantMother?.motherTownOrCity ??
      applicantData?.applicantMother?.motherTownOrCity,
    motherCounty: () =>
      editApplicant?.applicantMother?.motherCounty ??
      applicantData?.applicantMother?.motherCounty,
    motherCountry: () =>
      editApplicant?.applicantMother?.motherCountry ??
      applicantData?.applicantMother?.motherCountry,
    motherCountyOfOrigin: () =>
      editApplicant?.applicantMother?.motherCountyOfOrigin ??
      applicantData?.applicantMother?.motherCountyOfOrigin,
    motherOccupation: () =>
      editApplicant?.applicantMother?.motherOccupation ??
      applicantData?.applicantMother?.motherOccupation,
    motherDateOfNaturalization: () =>
      editApplicant?.applicantMother?.motherDateOfNaturalization ??
      applicantData?.applicantMother?.motherDateOfNaturalization,
    isMotherLiving: () =>
      editApplicant?.applicantMother?.isMotherLiving ??
      applicantData?.applicantMother?.isMotherLiving,
    motherPresentAddress: () =>
      editApplicant?.applicantMother?.motherPresentAddress ??
      applicantData?.applicantMother?.motherPresentAddress,
    motherTelephoneNumber: () =>
      editApplicant?.applicantMother?.motherTelephoneNumber ??
      applicantData?.applicantMother?.motherTelephoneNumber,
    applicantSignature: () =>
      editApplicant?.applicantSignature ?? applicantData?.applicantSignature,
    applicantContactNumber: () =>
      editApplicant?.applicantContactNumber ??
      applicantData?.applicantContactNumber,
    fullName: () =>
      editApplicant?.fullName ?? applicantData?.attestation?.fullName,
    city: () => editApplicant?.city ?? applicantData?.attestation?.city,
    county: () => editApplicant?.county ?? applicantData?.attestation?.county,
    motherFullName: () =>
      editApplicant?.motherFullName ??
      applicantData?.attestation?.motherFullName,
    fatherFullName: () =>
      editApplicant?.fatherFullName ??
      applicantData?.attestation?.fatherFullName,
    date: () => editApplicant?.date ?? applicantData?.attestation?.date,
    cityOrTown: () =>
      editApplicant?.cityOrTown ?? applicantData?.attestation?.cityOrTown,
    name: () => editApplicant?.name ?? applicantData?.attestation?.name,
    address: () =>
      editApplicant?.address ?? applicantData?.attestation?.address,
    relationship: () =>
      editApplicant?.relationship ?? applicantData?.attestation?.relationship,
    contactNumber: () =>
      editApplicant?.contactNumber ?? applicantData?.attestation?.contactNumber,
    parentOrGuardianPhoto: () =>
      editApplicant?.parentOrGuardianPhoto ??
      applicantData?.parentOrGuardianPhoto,
  };

  //? Loading State
  const [loading, setLoading] = useState(false);

  const handleCloseEditApplicant = () => {
    navigate("/all-applicants", { replace: true });
  };

  //? Applicant Photo State
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

  //? Formik Edit Applicant Form
  const formikEditApplicantForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      applicantPhoto: `${ApplicantOBJ.applicantPhoto()}`,
      formNumber: `${ApplicantOBJ.formNumber()}`,
      applicantSex: `${ApplicantOBJ.applicantSex()}`,
      dateOfApplication: `${ApplicantOBJ.dateOfApplication()}`,
      applicantFirstName: `${ApplicantOBJ.applicantFirstName()}`,
      applicantMiddleName: `${ApplicantOBJ.applicantMiddleName()}`,
      applicantLastName: `${ApplicantOBJ.applicantLastName()}`,
      applicantFacility: `${ApplicantOBJ.applicantFacility()}`,
      applicantTownOrCity: `${ApplicantOBJ.applicantTownOrCity()}`,
      applicantCounty: `${ApplicantOBJ.applicantCounty()}`,
      applicantCountry: `${ApplicantOBJ.applicantCountry()}`,
      applicantDateOfBirth: `${ApplicantOBJ.applicantDateOfBirth()}`,
      fatherName: `${ApplicantOBJ.fatherName()}`,
      fatherNationality: `${ApplicantOBJ.fatherNationality()}`,
      fatherAge: ApplicantOBJ.fatherAge(),
      fatherTownOrCity: `${ApplicantOBJ.fatherTownOrCity()}`,
      fatherCounty: `${ApplicantOBJ.fatherCounty()}`,
      fatherCountry: `${ApplicantOBJ.fatherCountry()}`,
      fatherCountyOfOrigin: `${ApplicantOBJ.fatherCountyOfOrigin()}`,
      fatherOccupation: `${ApplicantOBJ.fatherOccupation()}`,
      fatherDateOfNaturalization: `${ApplicantOBJ.fatherDateOfNaturalization()}`,
      isFatherLiving: `${ApplicantOBJ.isFatherLiving()}`,
      fatherPresentAddress: `${ApplicantOBJ.fatherPresentAddress()}`,
      fatherTelephoneNumber: `${ApplicantOBJ.fatherTelephoneNumber()}`,
      motherName: `${ApplicantOBJ.motherName()}`,
      motherNationality: `${ApplicantOBJ.motherNationality()}`,
      motherAge: ApplicantOBJ.motherAge(),
      motherTownOrCity: `${ApplicantOBJ.motherTownOrCity()}`,
      motherCounty: `${ApplicantOBJ.motherCounty()}`,
      motherCountry: `${ApplicantOBJ.motherCountry()}`,
      motherCountyOfOrigin: `${ApplicantOBJ.motherCountyOfOrigin()}`,
      motherOccupation: `${ApplicantOBJ.motherOccupation()}`,
      motherDateOfNaturalization: `${ApplicantOBJ.motherDateOfNaturalization()}`,
      isMotherLiving: `${ApplicantOBJ.isMotherLiving()}`,
      motherPresentAddress: `${ApplicantOBJ.motherPresentAddress()}`,
      motherTelephoneNumber: `${ApplicantOBJ.motherTelephoneNumber()}`,
      applicantSignature: `${ApplicantOBJ.applicantSignature()}`,
      applicantContactNumber: `${ApplicantOBJ.applicantContactNumber()}`,
      fullName: `${ApplicantOBJ.fullName()}`,
      city: `${ApplicantOBJ.city()}`,
      county: `${ApplicantOBJ.county()}`,
      motherFullName: `${ApplicantOBJ.motherFullName()}`,
      fatherFullName: `${ApplicantOBJ.fatherFullName()}`,
      date: `${ApplicantOBJ.date()}`,
      cityOrTown: `${ApplicantOBJ.cityOrTown()}`,
      name: `${ApplicantOBJ.name()}`,
      address: `${ApplicantOBJ.address()}`,
      relationship: `${ApplicantOBJ.relationship()}`,
      contactNumber: `${ApplicantOBJ.contactNumber()}`,
      parentOrGuardianPhoto: `${ApplicantOBJ.parentOrGuardianPhoto()}`,
    },
    validationSchema: validateEditApplicantSchema,
    onSubmit: () => {
      updateApplicant();
    },
  });

  //? Handle Submit Form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    formikEditApplicantForm.handleSubmit();
  };

  //? Handle Reset Form
  const handleResetForm = (e) => {
    e.preventDefault();
    formikEditApplicantForm.handleReset();
  };

  //? Handle Applicant Country Change
  const handleApplicantCountryChange = (_e, newValue) => {
    const { label } = newValue || {};
    formikEditApplicantForm.setFieldValue("applicantCountry", label);
  };

  //? Handle Father Country Change
  const handleFatherCountryChange = (_e, newValue) => {
    const { label } = newValue || {};
    formikEditApplicantForm.setFieldValue("fatherCountry", label);
  };

  //? Handle Mother Country Change
  const handleMotherCountryChange = (_e, newValue) => {
    const { label } = newValue || {};
    formikEditApplicantForm.setFieldValue("motherCountry", label);
  };

  //? Applicant Data
  const ApplicantData = {
    applicantFirstName: formikEditApplicantForm.values.applicantFirstName,
    applicantMiddleName: formikEditApplicantForm.values.applicantMiddleName,
    applicantLastName: formikEditApplicantForm.values.applicantLastName,
  };

  console.log(ApplicantData);

  const Mutation = useMutation({
    mutationFn: (updatedData) =>
      UpdateApplicant(`${updateApplicantURL}/${applicantId}`, updatedData),
    onSuccess: (data) => {
      if (data) {
        handleCloseEditApplicant();
        handleResetForm();
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

  //? Update Applicant
  const updateApplicant = async () => {
    Mutation.mutate(ApplicantData);
  };

  //? Scroll to error input on form submit
  useEffect(() => {
    if (!formikEditApplicantForm.isSubmitting) return;
    if (Object.keys(formikEditApplicantForm.errors).length > 0) {
      document
        .getElementsByName(Object.keys(formikEditApplicantForm.errors)[0])
        .forEach((error) => error.focus());
    }
  }, [formikEditApplicantForm]);

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      {isTabletOrMobile && <NavbarBreadcrumbs />}
      <Typography
        component="h2"
        variant="h6"
        sx={{ mt: { xs: 3, md: 0 }, mb: 2 }}
      >
        Edit Applicant
      </Typography>
      <Grid
        component="form"
        noValidate
        autoComplete="on"
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 9, lg: 9 }}>
          {/* Start Applicant Information */}
          <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  display: { md: "flex", lg: "flex" },
                  justifyContent: "space-between",
                }}
              >
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
                <Typography
                  sx={{
                    color: "#000",
                    fontWeight: "bold",
                    mt: { xs: 2, sm: 2, md: 0, lg: 0 },
                  }}
                >
                  Form No: {formikEditApplicantForm.values.formNumber}
                </Typography>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography sx={{ mb: 2 }}>
                    Sex
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
                    <Autocomplete
                      id="applicantSex"
                      disabled
                      clearOnEscape
                      value={formikEditApplicantForm.values.applicantSex}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // onChange={(_event, newValue) => {
                      //   formikEditApplicantForm.setFieldValue(
                      //     "applicantSex",
                      //     newValue
                      //   );
                      // }}
                      // error={
                      //   formikEditApplicantForm.touched.applicantSex &&
                      //   Boolean(formikEditApplicantForm.errors.applicantSex)
                      // }
                      options={["Male", "Female"]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select sex..."
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled:hover": {
                              cursor: "not-allowed",
                            },
                          }}
                        />
                      )}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.applicantSex &&
                        formikEditApplicantForm.errors.applicantSex}
                    </Typography> */}
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography sx={{ mb: 2 }}>
                    Application Date
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
                        disabled
                        disablePast
                        disableFuture
                        value={dayjs(
                          formikEditApplicantForm.values.dateOfApplication
                        )}
                        // onChange={(newValue) => {
                        //   formikEditApplicantForm.setFieldValue(
                        //     "dateOfApplication",
                        //     newValue
                        //   );
                        // }}
                        // onBlur={formikEditApplicantForm.handleBlur}
                        // error={
                        //   formikEditApplicantForm.touched.dateOfApplication &&
                        //   Boolean(
                        //     formikEditApplicantForm.errors.dateOfApplication
                        //   )
                        // }
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled:hover": {
                            cursor: "not-allowed",
                          },
                        }}
                      />
                    </LocalizationProvider>
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.dateOfApplication &&
                        formikEditApplicantForm.errors.dateOfApplication}
                    </Typography> */}
                  </FormControl>
                </Grid>
              </Box>
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
                      value={formikEditApplicantForm.values.applicantFirstName}
                      onChange={formikEditApplicantForm.handleChange}
                      onBlur={formikEditApplicantForm.handleBlur}
                      error={
                        formikEditApplicantForm.touched.applicantFirstName &&
                        Boolean(
                          formikEditApplicantForm.errors.applicantFirstName
                        )
                      }
                      placeholder="Enter first name..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.applicantFirstName &&
                        formikEditApplicantForm.errors.applicantFirstName}
                    </Typography>
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
                      value={formikEditApplicantForm.values.applicantMiddleName}
                      onChange={formikEditApplicantForm.handleChange}
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
                      value={formikEditApplicantForm.values.applicantLastName}
                      onChange={formikEditApplicantForm.handleChange}
                      onBlur={formikEditApplicantForm.handleBlur}
                      error={
                        formikEditApplicantForm.touched.applicantLastName &&
                        Boolean(
                          formikEditApplicantForm.errors.applicantLastName
                        )
                      }
                      placeholder="Enter last name..."
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.applicantLastName &&
                        formikEditApplicantForm.errors.applicantLastName}
                    </Typography>
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
                      disabled
                      value={formikEditApplicantForm.values.applicantFacility}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.applicantFacility &&
                      //   Boolean(
                      //     formikEditApplicantForm.errors.applicantFacility
                      //   )
                      // }
                      placeholder="Enter facility..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.applicantFacility &&
                        formikEditApplicantForm.errors.applicantFacility}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.applicantTownOrCity}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.applicantTownOrCity &&
                      //   Boolean(
                      //     formikEditApplicantForm.errors.applicantTownOrCity
                      //   )
                      // }
                      placeholder="Enter town/city..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.applicantTownOrCity &&
                        formikEditApplicantForm.errors.applicantTownOrCity}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.applicantCounty}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.applicantCounty &&
                      //   Boolean(formikEditApplicantForm.errors.applicantCounty)
                      // }
                      placeholder="Enter county..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.applicantCounty &&
                        formikEditApplicantForm.errors.applicantCounty}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.applicantCountry}
                      // onChange={handleApplicantCountryChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.applicantCountry &&
                      //   Boolean(formikEditApplicantForm.errors.applicantCountry)
                      // }
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
                          disabled
                          placeholder="Select country..."
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "country",
                          }}
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled:hover": {
                              cursor: "not-allowed",
                            },
                          }}
                        />
                      )}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.applicantCountry &&
                        formikEditApplicantForm.errors.applicantCountry}
                    </Typography> */}
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <Typography sx={{ mb: 2 }}>
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
                        disabled
                        disableFuture
                        value={dayjs(
                          formikEditApplicantForm.values.applicantDateOfBirth
                        )}
                        // onChange={(newValue) => {
                        //   formikEditApplicantForm.setFieldValue(
                        //     "applicantDateOfBirth",
                        //     newValue
                        //   );
                        // }}
                        // onBlur={formikEditApplicantForm.handleBlur}
                        // error={
                        //   formikEditApplicantForm.touched
                        //     .applicantDateOfBirth &&
                        //   Boolean(
                        //     formikEditApplicantForm.errors.applicantDateOfBirth
                        //   )
                        // }
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled:hover": {
                            cursor: "not-allowed",
                          },
                        }}
                      />
                    </LocalizationProvider>
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.applicantDateOfBirth &&
                        formikEditApplicantForm.errors.applicantDateOfBirth}
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
                      disabled
                      value={formikEditApplicantForm.values.fatherName}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.fatherName &&
                      //   Boolean(formikEditApplicantForm.errors.fatherName)
                      // }
                      placeholder="Enter father's name..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.fatherName &&
                        formikEditApplicantForm.errors.fatherName}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.fatherNationality}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.fatherNationality &&
                      //   Boolean(
                      //     formikEditApplicantForm.errors.fatherNationality
                      //   )
                      // }
                      placeholder="Enter father's nationality..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.fatherNationality &&
                        formikEditApplicantForm.errors.fatherNationality}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.fatherAge}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.fatherAge &&
                      //   Boolean(formikEditApplicantForm.errors.fatherAge)
                      // }
                      placeholder="Enter father's age..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.fatherAge &&
                        formikEditApplicantForm.errors.fatherAge}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.fatherTownOrCity}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.fatherTownOrCity &&
                      //   Boolean(formikEditApplicantForm.errors.fatherTownOrCity)
                      // }
                      placeholder="Enter father's town/city..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.fatherTownOrCity &&
                        formikEditApplicantForm.errors.fatherTownOrCity}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.fatherCounty}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.fatherCounty &&
                      //   Boolean(formikEditApplicantForm.errors.fatherCounty)
                      // }
                      placeholder="Enter father's county..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.fatherCounty &&
                        formikEditApplicantForm.errors.fatherCounty}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.fatherCountry}
                      // onChange={handleFatherCountryChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.fatherCountry &&
                      //   Boolean(formikEditApplicantForm.errors.fatherCountry)
                      // }
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
                          disabled
                          placeholder="Select father's country..."
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "country",
                          }}
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled:hover": {
                              cursor: "not-allowed",
                            },
                          }}
                        />
                      )}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.fatherCountry &&
                        formikEditApplicantForm.errors.fatherCountry}
                    </Typography> */}
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
                      disabled
                      value={
                        formikEditApplicantForm.values.fatherCountyOfOrigin
                      }
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.fatherCountyOfOrigin &&
                      //   Boolean(
                      //     formikEditApplicantForm.errors.fatherCountyOfOrigin
                      //   )
                      // }
                      placeholder="Enter father's county of origin..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.fatherCountyOfOrigin &&
                        formikEditApplicantForm.errors.fatherCountyOfOrigin}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.fatherOccupation}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.fatherOccupation &&
                      //   Boolean(formikEditApplicantForm.errors.fatherOccupation)
                      // }
                      placeholder="Enter father's occupation..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.fatherOccupation &&
                        formikEditApplicantForm.errors.fatherOccupation}
                    </Typography> */}
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
                        disabled
                        disableFuture
                        value={dayjs(
                          formikEditApplicantForm.values
                            .fatherDateOfNaturalization
                        )}
                        // onChange={(newValue) => {
                        //   formikEditApplicantForm.setFieldValue(
                        //     "fatherDateOfNaturalization",
                        //     newValue
                        //   );
                        // }}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled:hover": {
                            cursor: "not-allowed",
                          },
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
                      value={formikEditApplicantForm.values.isFatherLiving}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.isFatherLiving &&
                      //   Boolean(formikEditApplicantForm.errors.isFatherLiving)
                      // }
                    >
                      <FormControlLabel
                        disabled
                        value="YES"
                        control={
                          <Radio
                            disabled
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 28,
                              },
                              "& .MuiInputBase-input.Mui-disabled:hover": {
                                cursor: "not-allowed",
                              },
                            }}
                          />
                        }
                        label="YES"
                      />
                      <FormControlLabel
                        disabled
                        value="NO"
                        control={
                          <Radio
                            disabled
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 28,
                              },
                              "& .MuiInputBase-input.Mui-disabled:hover": {
                                cursor: "not-allowed",
                              },
                            }}
                          />
                        }
                        label="NO"
                      />
                    </RadioGroup>
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.isFatherLiving &&
                        formikEditApplicantForm.errors.isFatherLiving}
                    </Typography> */}
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                {formikEditApplicantForm.values.isFatherLiving === "YES" && (
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
                          disabled
                          value={
                            formikEditApplicantForm.values.fatherPresentAddress
                          }
                          // onChange={formikEditApplicantForm.handleChange}
                          // onBlur={formikEditApplicantForm.handleBlur}
                          // error={
                          //   formikEditApplicantForm.touched
                          //     .fatherPresentAddress &&
                          //   Boolean(
                          //     formikEditApplicantForm.errors
                          //       .fatherPresentAddress
                          //   )
                          // }
                          placeholder="Enter father's present address..."
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled:hover": {
                              cursor: "not-allowed",
                            },
                          }}
                        />
                        {/* <Typography
                          variant="inherit"
                          color="error.main"
                          sx={{ mt: 1 }}
                        >
                          {formikEditApplicantForm.touched
                            .fatherPresentAddress &&
                            formikEditApplicantForm.errors.fatherPresentAddress}
                        </Typography> */}
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
                        <EditFatherPhoneInputField
                          formikEditApplicantForm={formikEditApplicantForm}
                        />
                        {/* <Typography
                          variant="inherit"
                          color="error.main"
                          sx={{ mt: 1 }}
                        >
                          {formikEditApplicantForm.touched
                            .fatherTelephoneNumber &&
                            formikEditApplicantForm.errors
                              .fatherTelephoneNumber}
                        </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.motherName}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.motherName &&
                      //   Boolean(formikEditApplicantForm.errors.motherName)
                      // }
                      placeholder="Enter mother's name..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.motherName &&
                        formikEditApplicantForm.errors.motherName}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.motherNationality}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.motherNationality &&
                      //   Boolean(
                      //     formikEditApplicantForm.errors.motherNationality
                      //   )
                      // }
                      placeholder="Enter mother's nationality..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.motherNationality &&
                        formikEditApplicantForm.errors.motherNationality}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.motherAge}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.motherAge &&
                      //   Boolean(formikEditApplicantForm.errors.motherAge)
                      // }
                      placeholder="Enter mother's age..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.motherAge &&
                        formikEditApplicantForm.errors.motherAge}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.motherTownOrCity}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.motherTownOrCity &&
                      //   Boolean(formikEditApplicantForm.errors.motherTownOrCity)
                      // }
                      placeholder="Enter mother's town/city..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.motherTownOrCity &&
                        formikEditApplicantForm.errors.motherTownOrCity}
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
                      disabled
                      value={formikEditApplicantForm.values.motherCounty}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.motherCounty &&
                      //   Boolean(formikEditApplicantForm.errors.motherCounty)
                      // }
                      placeholder="Enter mother's county..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.motherCounty &&
                        formikEditApplicantForm.errors.motherCounty}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.motherCountry}
                      // onChange={handleMotherCountryChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.motherCountry &&
                      //   Boolean(formikEditApplicantForm.errors.motherCountry)
                      // }
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
                          disabled
                          placeholder="Select mother's country..."
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "country",
                          }}
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled:hover": {
                              cursor: "not-allowed",
                            },
                          }}
                        />
                      )}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.motherCountry &&
                        formikEditApplicantForm.errors.motherCountry}
                    </Typography> */}
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
                      disabled
                      value={
                        formikEditApplicantForm.values.motherCountyOfOrigin
                      }
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.motherCountyOfOrigin &&
                      //   Boolean(
                      //     formikEditApplicantForm.errors.motherCountyOfOrigin
                      //   )
                      // }
                      placeholder="Enter mother's county of origin..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.motherCountyOfOrigin &&
                        formikEditApplicantForm.errors.motherCountyOfOrigin}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.motherOccupation}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.motherOccupation &&
                      //   Boolean(formikEditApplicantForm.errors.motherOccupation)
                      // }
                      placeholder="Enter mother's occupation..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.motherOccupation &&
                        formikEditApplicantForm.errors.motherOccupation}
                    </Typography> */}
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
                        disabled
                        disableFuture
                        value={dayjs(
                          formikEditApplicantForm.values
                            .motherDateOfNaturalization
                        )}
                        // onChange={(newValue) => {
                        //   formikEditApplicantForm.setFieldValue(
                        //     "motherDateOfNaturalization",
                        //     newValue
                        //   );
                        // }}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled:hover": {
                            cursor: "not-allowed",
                          },
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
                      value={formikEditApplicantForm.values.isMotherLiving}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.isMotherLiving &&
                      //   Boolean(formikEditApplicantForm.errors.isMotherLiving)
                      // }
                    >
                      <FormControlLabel
                        disabled
                        value="YES"
                        control={
                          <Radio
                            disabled
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 28,
                              },
                              "& .MuiInputBase-input.Mui-disabled:hover": {
                                cursor: "not-allowed",
                              },
                            }}
                          />
                        }
                        label="YES"
                      />
                      <FormControlLabel
                        disabled
                        value="NO"
                        control={
                          <Radio
                            disabled
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 28,
                              },
                              "& .MuiInputBase-input.Mui-disabled:hover": {
                                cursor: "not-allowed",
                              },
                            }}
                          />
                        }
                        label="NO"
                      />
                    </RadioGroup>
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.isMotherLiving &&
                        formikEditApplicantForm.errors.isMotherLiving}
                    </Typography> */}
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                {formikEditApplicantForm.values.isMotherLiving === "YES" && (
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
                          disabled
                          value={
                            formikEditApplicantForm.values.motherPresentAddress
                          }
                          // onChange={formikEditApplicantForm.handleChange}
                          // onBlur={formikEditApplicantForm.handleBlur}
                          // error={
                          //   formikEditApplicantForm.touched
                          //     .motherPresentAddress &&
                          //   Boolean(
                          //     formikEditApplicantForm.errors
                          //       .motherPresentAddress
                          //   )
                          // }
                          placeholder="Enter mother's present address..."
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled:hover": {
                              cursor: "not-allowed",
                            },
                          }}
                        />
                        {/* <Typography
                          variant="inherit"
                          color="error.main"
                          sx={{ mt: 1 }}
                        >
                          {formikEditApplicantForm.touched
                            .motherPresentAddress &&
                            formikEditApplicantForm.errors.motherPresentAddress}
                        </Typography> */}
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
                        <EditMotherPhoneInputField
                          formikEditApplicantForm={formikEditApplicantForm}
                        />
                        {/* <Typography
                          variant="inherit"
                          color="error.main"
                          sx={{ mt: 1 }}
                        >
                          {formikEditApplicantForm.touched
                            .motherTelephoneNumber &&
                            formikEditApplicantForm.errors
                              .motherTelephoneNumber}
                        </Typography> */}
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
                      <EditContactPhoneInputField
                        formikEditApplicantForm={formikEditApplicantForm}
                      />
                      {/* <Typography
                        variant="inherit"
                        color="error.main"
                        sx={{ mt: 1 }}
                      >
                        {formikEditApplicantForm.touched
                          .applicantContactNumber &&
                          formikEditApplicantForm.errors.applicantContactNumber}
                      </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.fullName}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.fullName &&
                      //   Boolean(formikEditApplicantForm.errors.fullName)
                      // }
                      placeholder="Enter full name..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.fullName &&
                        formikEditApplicantForm.errors.fullName}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.city}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.city &&
                      //   Boolean(formikEditApplicantForm.errors.city)
                      // }
                      placeholder="Enter city..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.city &&
                        formikEditApplicantForm.errors.city}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.county}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.county &&
                      //   Boolean(formikEditApplicantForm.errors.county)
                      // }
                      placeholder="Enter county..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.county &&
                        formikEditApplicantForm.errors.county}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.motherFullName}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.motherFullName &&
                      //   Boolean(formikEditApplicantForm.errors.motherFullName)
                      // }
                      placeholder="Enter mother's full name..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.motherFullName &&
                        formikEditApplicantForm.errors.motherFullName}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.fatherFullName}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.fatherFullName &&
                      //   Boolean(formikEditApplicantForm.errors.fatherFullName)
                      // }
                      placeholder="Enter father's full name..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.fatherFullName &&
                        formikEditApplicantForm.errors.fatherFullName}
                    </Typography> */}
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
                        disabled
                        disablePast
                        disableFuture
                        value={dayjs(formikEditApplicantForm.values.date)}
                        // onChange={(newValue) => {
                        //   formikEditApplicantForm.setFieldValue(
                        //     "date",
                        //     newValue
                        //   );
                        // }}
                        // onBlur={formikEditApplicantForm.handleBlur}
                        // error={
                        //   formikEditApplicantForm.touched.date &&
                        //   Boolean(formikEditApplicantForm.errors.date)
                        // }
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled:hover": {
                            cursor: "not-allowed",
                          },
                        }}
                      />
                    </LocalizationProvider>
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.date &&
                        formikEditApplicantForm.errors.date}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.cityOrTown}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.cityOrTown &&
                      //   Boolean(formikEditApplicantForm.errors.cityOrTown)
                      // }
                      placeholder="Enter city/town"
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.cityOrTown &&
                        formikEditApplicantForm.errors.cityOrTown}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.name}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.name &&
                      //   Boolean(formikEditApplicantForm.errors.name)
                      // }
                      placeholder="Enter name..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.name &&
                        formikEditApplicantForm.errors.name}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.address}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.address &&
                      //   Boolean(formikEditApplicantForm.errors.address)
                      // }
                      placeholder="Enter address..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.address &&
                        formikEditApplicantForm.errors.address}
                    </Typography> */}
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
                      disabled
                      value={formikEditApplicantForm.values.relationship}
                      // onChange={formikEditApplicantForm.handleChange}
                      // onBlur={formikEditApplicantForm.handleBlur}
                      // error={
                      //   formikEditApplicantForm.touched.relationship &&
                      //   Boolean(formikEditApplicantForm.errors.relationship)
                      // }
                      placeholder="Enter relationship..."
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
                    {/* <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikEditApplicantForm.touched.relationship &&
                        formikEditApplicantForm.errors.relationship}
                    </Typography> */}
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
                      <EditContactNumberInputField
                        formikEditApplicantForm={formikEditApplicantForm}
                      />
                      {/* <Typography
                        variant="inherit"
                        color="error.main"
                        sx={{ mt: 1 }}
                      >
                        {formikEditApplicantForm.touched.contactNumber &&
                          formikEditApplicantForm.errors.contactNumber}
                      </Typography> */}
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
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Avatar
                  alt={formikEditApplicantForm.values.applicantFirstName}
                  src={`/uploads/${formikEditApplicantForm.values.applicantPhoto}`}
                  variant="square"
                  sx={{
                    width: 130,
                    height: 130,
                    display: "inline-block",
                  }}
                  slotProps={{
                    img: { loading: "lazy" },
                  }}
                />
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
                  {/* <EditApplicantSignature
                    formikEditApplicantForm={formikEditApplicantForm}
                  /> */}
                  {formikEditApplicantForm.values.applicantSignature !== "" && (
                    <Box sx={{ mt: 1 }}>
                      <img
                        width={60}
                        height={60}
                        src={formikEditApplicantForm.values.applicantSignature}
                        alt={`${formikEditApplicantForm.values.applicantFirstName} Signature`}
                      />
                    </Box>
                  )}
                  <Typography
                    variant="inherit"
                    color="error.main"
                    sx={{ mt: 1 }}
                  >
                    {formikEditApplicantForm.touched.applicantSignature &&
                      formikEditApplicantForm.errors.applicantSignature}
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
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Avatar
                  alt="Parent or Guardian Photo"
                  src={`/uploads/${formikEditApplicantForm.values.parentOrGuardianPhoto}`}
                  variant="square"
                  sx={{
                    width: 130,
                    height: 130,
                    display: "inline-block",
                  }}
                  slotProps={{
                    img: { loading: "lazy" },
                  }}
                />
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
                // bgcolor: "#acb5c3",
                // color: "#fff",
              }}
              endIcon={<MdCancel size={20} />}
              onClick={() => {
                handleCloseEditApplicant();
                dispatch(removeEditApplicant());
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              loading={loading}
              loadingIndicator={<ButtonLoader />}
              onClick={handleSubmitForm}
              loadingPosition="end"
              endIcon={<IoMdSave size={20} color="#fff" />}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <span style={{ color: "#fff" }}>Saving</span>
              ) : (
                <span>Save</span>
              )}
            </Button>
          </Box>
        </Box>
      </Grid>
      <Copyright sx={{ my: 4 }} />

      {/* Start EditUploadApplicantPhoto Dialog */}
      <EditUploadApplicantPhoto
        open={openApplicantPhoto}
        handleClose={handleCloseApplicantPhoto}
        formikEditApplicantForm={formikEditApplicantForm}
      />
      {/* End EditUploadApplicantPhoto Dialog */}

      {/* Start EditUploadGuardianPhoto Dialog */}
      <EditUploadGuardianPhoto
        open={openGuardianPhoto}
        handleClose={handleCloseGuardianPhoto}
        formikEditApplicantForm={formikEditApplicantForm}
      />
      {/* End EditUploadGuardianPhoto Dialog */}
    </Box>
  );
};

export default MainEditApplicantGrid;
