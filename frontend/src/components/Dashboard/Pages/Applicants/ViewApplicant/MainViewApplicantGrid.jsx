import React, { useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import ViewFatherPhoneInputField from "../PhoneInputsField/ViewFatherPhoneInputField";
import ViewMotherPhoneInputField from "../PhoneInputsField/ViewMotherPhoneInputField";
import ViewContactNumberInputField from "../PhoneInputsField/ViewContactNumberInputField";
import ViewContactPhoneInputField from "../PhoneInputsField/ViewContactPhoneInputField";
import { removeViewApplicant } from "../../../../../app/slices/applicantSlice";

//? React Responsive Media Queries
import { useMediaQuery } from "react-responsive";

//? Formik and Yup
import { useFormik } from "formik";

//? Get Single Data
import GetSingleData from "../../../../../apis/GetSingleData";

//? Endpoints
const getApplicantURL = "/applicants";

const MainViewApplicantGrid = () => {
  //? Tablet or Mobile Responsive Media Queries
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  //? useDispatch
  const dispatch = useDispatch();

  //? Destructure useSelector
  const { viewApplicant } = useSelector((state) => state.applicant);

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
      viewApplicant?.applicantPhoto ?? applicantData?.applicantPhoto,
    formNumber: () => viewApplicant?.formNumber ?? applicantData?.formNumber,
    applicantSex: () =>
      viewApplicant?.applicantSex ?? applicantData?.applicantSex,
    dateOfApplication: () =>
      viewApplicant?.dateOfApplication ?? applicantData?.dateOfApplication,
    applicantFirstName: () =>
      viewApplicant?.applicantFirstName ?? applicantData?.applicantFirstName,
    applicantMiddleName: () =>
      viewApplicant?.applicantMiddleName ?? applicantData?.applicantMiddleName,
    applicantLastName: () =>
      viewApplicant?.applicantLastName ?? applicantData?.applicantLastName,
    applicantFacility: () =>
      viewApplicant?.applicantFacility ?? applicantData?.applicantFacility,
    applicantTownOrCity: () =>
      viewApplicant?.applicantTownOrCity ?? applicantData?.applicantTownOrCity,
    applicantCounty: () =>
      viewApplicant?.applicantCounty ?? applicantData?.applicantCounty,
    applicantCountry: () =>
      viewApplicant?.applicantCountry ?? applicantData?.applicantCountry,
    applicantDateOfBirth: () =>
      viewApplicant?.applicantDateOfBirth ??
      applicantData?.applicantDateOfBirth,
    fatherName: () =>
      viewApplicant?.applicantFather?.fatherName ??
      applicantData?.applicantFather?.fatherName,
    fatherNationality: () =>
      viewApplicant?.applicantFather?.fatherNationality ??
      applicantData?.applicantFather?.applicantFather?.fatherNationality,
    fatherAge: () =>
      viewApplicant?.applicantFather?.fatherAge ??
      applicantData?.applicantFather?.fatherAge,
    fatherTownOrCity: () =>
      viewApplicant?.applicantFather?.fatherTownOrCity ??
      applicantData?.applicantFather?.fatherTownOrCity,
    fatherCounty: () =>
      viewApplicant?.applicantFather?.fatherCounty ??
      applicantData?.applicantFather?.fatherCounty,
    fatherCountry: () =>
      viewApplicant?.applicantFather?.fatherCountry ??
      applicantData?.applicantFather?.fatherCountry,
    fatherCountyOfOrigin: () =>
      viewApplicant?.applicantFather?.fatherCountyOfOrigin ??
      applicantData?.applicantFather?.fatherCountyOfOrigin,
    fatherOccupation: () =>
      viewApplicant?.applicantFather?.fatherOccupation ??
      applicantData?.applicantFather?.fatherOccupation,
    fatherDateOfNaturalization: () =>
      viewApplicant?.applicantFather?.fatherDateOfNaturalization ??
      applicantData?.applicantFather?.fatherDateOfNaturalization,
    isFatherLiving: () =>
      viewApplicant?.applicantFather?.sFatherLiving ??
      applicantData?.applicantFather?.sFatherLiving,
    fatherPresentAddress: () =>
      viewApplicant?.applicantFather?.fatherPresentAddress ??
      applicantData?.applicantFather?.fatherPresentAddress,
    fatherTelephoneNumber: () =>
      viewApplicant?.applicantFather?.fatherTelephoneNumber ??
      applicantData?.applicantFather?.fatherTelephoneNumber,
    motherName: () =>
      viewApplicant?.applicantMother?.motherName ??
      applicantData?.applicantMother?.motherName,
    motherNationality: () =>
      viewApplicant?.applicantMother?.motherNationality ??
      applicantData?.applicantMother?.motherNationality,
    motherAge: () =>
      viewApplicant?.applicantMother?.motherAge ??
      applicantData?.applicantMother?.motherAge,
    motherTownOrCity: () =>
      viewApplicant?.applicantMother?.motherTownOrCity ??
      applicantData?.applicantMother?.motherTownOrCity,
    motherCounty: () =>
      viewApplicant?.applicantMother?.motherCounty ??
      applicantData?.applicantMother?.motherCounty,
    motherCountry: () =>
      viewApplicant?.applicantMother?.motherCountry ??
      applicantData?.applicantMother?.motherCountry,
    motherCountyOfOrigin: () =>
      viewApplicant?.applicantMother?.motherCountyOfOrigin ??
      applicantData?.applicantMother?.motherCountyOfOrigin,
    motherOccupation: () =>
      viewApplicant?.applicantMother?.motherOccupation ??
      applicantData?.applicantMother?.motherOccupation,
    motherDateOfNaturalization: () =>
      viewApplicant?.applicantMother?.motherDateOfNaturalization ??
      applicantData?.applicantMother?.motherDateOfNaturalization,
    isMotherLiving: () =>
      viewApplicant?.applicantMother?.isMotherLiving ??
      applicantData?.applicantMother?.isMotherLiving,
    motherPresentAddress: () =>
      viewApplicant?.applicantMother?.motherPresentAddress ??
      applicantData?.applicantMother?.motherPresentAddress,
    motherTelephoneNumber: () =>
      viewApplicant?.applicantMother?.motherTelephoneNumber ??
      applicantData?.applicantMother?.motherTelephoneNumber,
    applicantSignature: () =>
      viewApplicant?.applicantSignature ?? applicantData?.applicantSignature,
    applicantContactNumber: () =>
      viewApplicant?.applicantContactNumber ??
      applicantData?.applicantContactNumber,
    fullName: () =>
      viewApplicant?.fullName ?? applicantData?.attestation?.fullName,
    city: () => viewApplicant?.city ?? applicantData?.attestation?.city,
    county: () => viewApplicant?.county ?? applicantData?.attestation?.county,
    motherFullName: () =>
      viewApplicant?.motherFullName ??
      applicantData?.attestation?.motherFullName,
    fatherFullName: () =>
      viewApplicant?.fatherFullName ??
      applicantData?.attestation?.fatherFullName,
    date: () => viewApplicant?.date ?? applicantData?.attestation?.date,
    cityOrTown: () =>
      viewApplicant?.cityOrTown ?? applicantData?.attestation?.cityOrTown,
    name: () => viewApplicant?.name ?? applicantData?.attestation?.name,
    address: () =>
      viewApplicant?.address ?? applicantData?.attestation?.address,
    relationship: () =>
      viewApplicant?.relationship ?? applicantData?.attestation?.relationship,
    contactNumber: () =>
      viewApplicant?.contactNumber ?? applicantData?.attestation?.contactNumber,
    parentOrGuardianPhoto: () =>
      viewApplicant?.parentOrGuardianPhoto ??
      applicantData?.attestation?.parentOrGuardianPhoto,
  };

  const handleCloseViewApplicant = () => {
    navigate("/all-applicants", { replace: true });
  };

  //? Formik View Applicant Form
  const formikViewApplicantForm = useFormik({
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
  });

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      {isTabletOrMobile && <NavbarBreadcrumbs />}
      <Typography
        component="h2"
        variant="h6"
        sx={{ mt: { xs: 3, md: 0 }, mb: 2 }}
      >
        View Applicant
      </Typography>
      <Grid
        component="form"
        noValidate
        autoComplete="on"
        encType="multipart/form-data"
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
                  Form No: {formikViewApplicantForm.values.formNumber}
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
                      value={formikViewApplicantForm.values.applicantSex}
                      options={["Male", "Female"]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled:hover": {
                              cursor: "not-allowed",
                            },
                          }}
                        />
                      )}
                    />
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
                        disablePast
                        disableFuture
                        value={dayjs(
                          formikViewApplicantForm.values.dateOfApplication
                        )}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled:hover": {
                            cursor: "not-allowed",
                          },
                        }}
                      />
                    </LocalizationProvider>
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
                      value={formikViewApplicantForm.values.applicantFirstName}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.applicantMiddleName}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
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
                      value={formikViewApplicantForm.values.applicantLastName}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.applicantFacility}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.applicantTownOrCity}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.applicantCounty}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.applicantCountry}
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
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled:hover": {
                              cursor: "not-allowed",
                            },
                          }}
                        />
                      )}
                    />
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
                          formikViewApplicantForm.values.applicantDateOfBirth
                        )}
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled:hover": {
                            cursor: "not-allowed",
                          },
                        }}
                      />
                    </LocalizationProvider>
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
                      value={formikViewApplicantForm.values.fatherName}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.fatherNationality}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.fatherAge}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.fatherTownOrCity}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.fatherCounty}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.fatherCountry}
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
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled:hover": {
                              cursor: "not-allowed",
                            },
                          }}
                        />
                      )}
                    />
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
                        formikViewApplicantForm.values.fatherCountyOfOrigin
                      }
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.fatherOccupation}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                          formikViewApplicantForm.values
                            .fatherDateOfNaturalization
                        )}
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
                      value={formikViewApplicantForm.values.isFatherLiving}
                    >
                      <FormControlLabel
                        disabled
                        value="YES"
                        control={
                          <Radio
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
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                {formikViewApplicantForm.values.isFatherLiving === "YES" && (
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
                            formikViewApplicantForm.values.fatherPresentAddress
                          }
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled:hover": {
                              cursor: "not-allowed",
                            },
                          }}
                        />
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
                        <ViewFatherPhoneInputField
                          formikViewApplicantForm={formikViewApplicantForm}
                        />
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
                      value={formikViewApplicantForm.values.motherName}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.motherNationality}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.motherAge}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.motherTownOrCity}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.motherCounty}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.motherCountry}
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
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled:hover": {
                              cursor: "not-allowed",
                            },
                          }}
                        />
                      )}
                    />
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
                        formikViewApplicantForm.values.motherCountyOfOrigin
                      }
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.motherOccupation}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                          formikViewApplicantForm.values
                            .motherDateOfNaturalization
                        )}
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
                      value={formikViewApplicantForm.values.isMotherLiving}
                    >
                      <FormControlLabel
                        disabled
                        value="YES"
                        control={
                          <Radio
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
                  </FormControl>
                </Grid>
              </Box>
              <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
                {formikViewApplicantForm.values.isMotherLiving === "YES" && (
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
                            formikViewApplicantForm.values.motherPresentAddress
                          }
                          sx={{
                            "& .MuiInputBase-input.Mui-disabled:hover": {
                              cursor: "not-allowed",
                            },
                          }}
                        />
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
                        <ViewMotherPhoneInputField
                          formikViewApplicantForm={formikViewApplicantForm}
                        />
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
                      <ViewContactNumberInputField
                        formikViewApplicantForm={formikViewApplicantForm}
                      />
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
                      value={formikViewApplicantForm.values.fullName}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.city}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.county}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.motherFullName}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.fatherFullName}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                        value={dayjs(formikViewApplicantForm.values.date)}
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
                      value={formikViewApplicantForm.values.cityOrTown}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.name}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.address}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      value={formikViewApplicantForm.values.relationship}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled:hover": {
                          cursor: "not-allowed",
                        },
                      }}
                    />
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
                      <ViewContactPhoneInputField
                        formikViewApplicantForm={formikViewApplicantForm}
                      />
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
                {formikViewApplicantForm.values.applicantPhoto !== "" && (
                  <Box>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      badgeContent={
                        <Tooltip title="Upload Photo" placement="right" arrow>
                          <IconButton>
                            <FaCamera size={30} />
                          </IconButton>
                        </Tooltip>
                      }
                    >
                      <Avatar
                        alt={formikViewApplicantForm.values.applicantFirstName}
                        src={
                          formikViewApplicantForm.values.applicantPhoto.preview
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
                  {formikViewApplicantForm.values.applicantSignature !== "" && (
                    <Box sx={{ mt: 1 }}>
                      <img
                        width={60}
                        height={60}
                        src={formikViewApplicantForm.values.applicantSignature}
                        alt="Applicant Signature"
                      />
                    </Box>
                  )}
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
                {formikViewApplicantForm.values.parentOrGuardianPhoto !==
                  "" && (
                  <Box>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      badgeContent={
                        <Tooltip title="Upload Photo" placement="right" arrow>
                          <IconButton>
                            <FaCamera size={30} />
                          </IconButton>
                        </Tooltip>
                      }
                    >
                      <Avatar
                        alt={formikViewApplicantForm.values.applicantFirstName}
                        src={`/uploads/${formikViewApplicantForm.values.parentOrGuardianPhoto}`}
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
                handleCloseViewApplicant();
                dispatch(removeViewApplicant());
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
};

export default MainViewApplicantGrid;
