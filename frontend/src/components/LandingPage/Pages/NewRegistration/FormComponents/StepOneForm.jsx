import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Grid,
  TextField,
  IconButton,
  Button,
  Tooltip,
  FormControl,
  Autocomplete,
  Chip,
} from "@mui/material";
import { LuAsterisk } from "react-icons/lu";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import StepOnePhoneInputField from "../PhoneInputsField/StepOnePhoneInputField";

//? Scroll to top of react route/page change
import ScrollToTop from "../../../../ScrollToTop/ScrollToTop";

//? Sweet Alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

//? Formik and Yup
import { FormikProvider, FieldArray } from "formik";

// Get All Data
import GetAllData from "../../../../../apis/GetAllData";

// Endpoints
const getAllBusinessOwnershipsURL = "/business-ownerships";
const getAllCountiesURL = "/counties";
const getAllMediaTypesURL = "/media-types";
const getAllEducationLevelsURL = "/education-levels";

//? React Sweet Alert Initialization
const MySwal = withReactContent(Swal);

// Sweet Alert Error
const Error_Alert = (message) => {
  MySwal.fire({
    title: "INFO...",
    text: `${message}`,
    icon: "info",
  });
};

const StepOneForm = (props) => {
  // Destructure props
  const { formik } = props;

  // Destructure useQuery
  const { data: businessOwnershipsData } = useQuery({
    queryKey: ["businessOwnershipsData"],
    queryFn: () => GetAllData(`${getAllBusinessOwnershipsURL}`),
  });

  const { data: countiesData } = useQuery({
    queryKey: ["countiesData"],
    queryFn: () => GetAllData(`${getAllCountiesURL}`),
  });

  const { data: mediaTypesData } = useQuery({
    queryKey: ["mediaTypesData"],
    queryFn: () => GetAllData(`${getAllMediaTypesURL}`),
  });

  const { data: educationLevelsData } = useQuery({
    queryKey: ["educationLevelsData"],
    queryFn: () => GetAllData(`${getAllEducationLevelsURL}`),
  });

  // County Capitals
  const [countyCapitals, setCountyCapitals] = useState([]);

  // Handle Business Ownership Change
  const handleBusinessOwnershipChange = (_event, newValue) => {
    const { ownershipName } = newValue ?? "";

    // BusinessOwnershipID
    const businessOwnershipID = businessOwnershipsData?.find(
      (ownership) => ownership?.ownershipName === ownershipName
    );

    formik.setFieldValue("businessOwnership.ownershipName", ownershipName);
    formik.setFieldValue(
      "businessOwnership.businessOwnershipID",
      businessOwnershipID?.id
    );
  };

  // Handle Media Type Change
  const handleMediaTypeChange = (_event, newValue) => {
    const { mediaType } = newValue ?? "";

    // TypeOfMediaID
    const typeOfMediaID = mediaTypesData?.find(
      (media) => media?.mediaType === mediaType
    );

    formik.setFieldValue("typeOfMedia.mediaType", mediaType);
    formik.setFieldValue("typeOfMedia.typeOfMediaID", typeOfMediaID?.id);
  };

  // Handle Education Level Change
  const handleEducationLevelChage = (_event, newValue) => {
    const { educationLevelOfManager } = newValue ?? "";

    // EducationLevelID
    const educationLevelID = educationLevelsData?.find(
      (education) =>
        education?.educationLevelOfManager === educationLevelOfManager
    );

    formik.setFieldValue(
      "educationLevel.educationLevelOfManager",
      educationLevelOfManager
    );
    formik.setFieldValue(
      "educationLevel.educationLevelID",
      educationLevelID?.id
    );
  };

  // Scroll to error input on form submit
  useEffect(() => {
    if (!formik.isSubmitting) return;
    if (Object.keys(formik.errors).length > 0) {
      document
        .getElementsByName(Object.keys(formik.errors)[0])
        .forEach((error) => error.focus());
    }
  }, [formik]);

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography>
            Name of Institution
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
            <Tooltip title="This field is required!" placement="bottom" arrow>
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
              id="institutionName"
              name="institutionName"
              type="text"
              value={formik.values.institutionName}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              error={
                formik.touched.institutionName &&
                Boolean(formik.errors.institutionName)
              }
              placeholder="Enter institution name..."
            />
            <Typography variant="inherit" color="error.main">
              {formik.touched.institutionName && formik.errors.institutionName}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography>
            Business TIN
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
            <Tooltip title="This field is required!" placement="bottom" arrow>
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
              id="businessTIN"
              name="businessTIN"
              type="number"
              value={formik.values.businessTIN}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              error={
                formik.touched.businessTIN && Boolean(formik.errors.businessTIN)
              }
              placeholder="Enter institution name..."
            />
            <Typography variant="inherit" color="error.main">
              {formik.touched.businessTIN && formik.errors.businessTIN}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography sx={{ mb: 2 }}>
            Business Ownership
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
            <Tooltip title="This field is required!" placement="bottom" arrow>
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
          {/* <FormControl fullWidth>
            <Autocomplete
              id="businessOwnership.ownershipName"
              value={formik.values.businessOwnership.ownershipName}
              onChange={handleBusinessOwnershipChange}
              onBlur={formik.handleBlur}
              options={businessOwnershipsData ?? []}
              getOptionLabel={(option) => option?.ownershipName || option}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <Box
                    key={key}
                    component="li"
                    sx={{
                      "& > img": { mr: 2, flexShrink: 0 },
                    }}
                    {...optionProps}
                  >
                    {option?.ownershipName}
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select business ownership..."
                  error={
                    formik?.touched?.businessOwnership?.ownershipName &&
                    Boolean(formik?.errors?.businessOwnership?.ownershipName)
                  }
                />
              )}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik?.touched?.businessOwnership?.ownershipName &&
                formik?.errors?.businessOwnership?.ownershipName}
            </Typography>
          </FormControl> */}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography>
            Current Address
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
            <Tooltip title="This field is required!" placement="bottom" arrow>
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
              id="currentAddress"
              name="currentAddress"
              type="text"
              value={formik.values.currentAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.currentAddress &&
                Boolean(formik.errors.currentAddress)
              }
              placeholder="Enter current address..."
            />
            <Typography variant="inherit" color="error.main">
              {formik.touched.currentAddress && formik.errors.currentAddress}
            </Typography>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography sx={{ mb: 2, color: "#4169E1" }}>
            Locations
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormikProvider value={formik}>
            <FieldArray
              name="counties"
              render={(arrayHelpers) => {
                return (
                  <React.Fragment>
                    {formik.values.counties &&
                      formik.values.counties.map((_, index) => (
                        <Box
                          sx={{
                            display: "flex",
                            gap: "1rem",
                            mb: 3,
                          }}
                          key={index}
                        >
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Typography sx={{ mb: 2 }}>
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
                                  <BsFillInfoCircleFill
                                    size={14}
                                    color="#acb5c3"
                                  />
                                </IconButton>
                              </Tooltip>
                            </Typography>
                            <FormControl fullWidth>
                              <Autocomplete
                                id={`counties[${index}].countyName`}
                                value={formik.values.counties[index].countyName}
                                onChange={(_event, newValue) => {
                                  const { countyName } = newValue ?? "";

                                  // CountyID
                                  const countyID = countiesData?.find(
                                    (county) =>
                                      county?.countyName === countyName
                                  );

                                  // County Capitals
                                  const CountyCapitalNames = countiesData?.find(
                                    (county) =>
                                      county?.countyName === countyName ||
                                      county?.countyName !== countyName
                                  );

                                  // County Already Exist
                                  const countyAlreadyExist =
                                    formik.values.counties?.find(
                                      (county) =>
                                        county?.countyName === countyName
                                    );

                                  if (
                                    CountyCapitalNames &&
                                    formik.values.counties.length === 1
                                  ) {
                                    formik.setFieldValue(
                                      `counties[${index}].countyCapitals`,
                                      []
                                    );
                                    formik.setFieldValue(
                                      `counties[${index}].countyName`,
                                      countyName
                                    );
                                    formik.setFieldValue(
                                      `counties[${index}].countyID`,
                                      countyID?.id
                                    );
                                    setCountyCapitals(newValue?.countyCapitals);
                                  } else if (
                                    CountyCapitalNames &&
                                    formik.values.counties.length > 1 &&
                                    !countyAlreadyExist
                                  ) {
                                    formik.setFieldValue(
                                      `counties[${index}].countyCapitals`,
                                      []
                                    );
                                    formik.setFieldValue(
                                      `counties[${index}].countyName`,
                                      countyName
                                    );
                                    formik.setFieldValue(
                                      `counties[${index}].countyID`,
                                      countyID?.id
                                    );
                                    setCountyCapitals(newValue?.countyCapitals);
                                  } else if (countyAlreadyExist) {
                                    Error_Alert(
                                      `${countyName} already selected! Select another county!`
                                    );
                                  } else {
                                    setCountyCapitals(newValue?.countyCapitals);
                                  }
                                }}
                                onBlur={formik.handleBlur}
                                autoHighlight
                                options={countiesData ?? []}
                                getOptionLabel={(option) =>
                                  option?.countyName || option
                                }
                                renderOption={(props, option) => {
                                  const { key, ...optionProps } = props;
                                  return (
                                    <Box
                                      key={key}
                                      component="li"
                                      sx={{
                                        "& > img": { mr: 2, flexShrink: 0 },
                                      }}
                                      {...optionProps}
                                    >
                                      <img
                                        loading="lazy"
                                        width="20"
                                        src={`/images/county-flags/${option?.countyFlag}`}
                                        alt="County Flag"
                                      />
                                      {option?.countyName}
                                    </Box>
                                  );
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    placeholder="Select county..."
                                    error={
                                      formik?.touched?.counties?.[index]
                                        ?.countyName &&
                                      Boolean(
                                        formik?.errors?.counties?.[index]
                                          ?.countyName
                                      )
                                    }
                                  />
                                )}
                              />
                              <Typography
                                variant="inherit"
                                color="error.main"
                                sx={{ mt: 1 }}
                              >
                                {formik?.touched?.counties?.[index]
                                  ?.countyName &&
                                  formik?.errors?.counties?.[index]?.countyName}
                              </Typography>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Typography sx={{ mb: 2 }}>
                              Location(s)
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
                                  <BsFillInfoCircleFill
                                    size={14}
                                    color="#acb5c3"
                                  />
                                </IconButton>
                              </Tooltip>
                            </Typography>
                            <FormControl fullWidth>
                              <Autocomplete
                                id={`counties[${index}].countyCapitals`}
                                value={
                                  formik.values.counties[index].countyCapitals
                                }
                                onChange={(_event, newValue) => {
                                  formik.setFieldValue(
                                    `counties[${index}].countyCapitals`,
                                    newValue
                                  );
                                }}
                                onBlur={formik.handleBlur}
                                multiple
                                limitTags={2}
                                autoHighlight
                                options={countyCapitals ?? []}
                                renderTags={(value, getTagProps) =>
                                  value?.map((option, index) => {
                                    const { key, ...tagProps } = getTagProps({
                                      index,
                                    });
                                    return (
                                      <Chip
                                        variant="outlined"
                                        label={option}
                                        key={key}
                                        {...tagProps}
                                      />
                                    );
                                  })
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    placeholder="Select one or more location(s)..."
                                    error={
                                      formik?.touched?.counties?.[index]
                                        ?.countyCapitals &&
                                      Boolean(
                                        formik?.errors?.counties?.[index]
                                          ?.countyCapitals
                                      )
                                    }
                                  />
                                )}
                              />
                              <Typography
                                variant="inherit"
                                color="error.main"
                                sx={{ mt: 1 }}
                              >
                                {formik?.touched?.counties?.[index]
                                  ?.countyCapitals &&
                                  formik?.errors?.counties?.[index]
                                    ?.countyCapitals}
                              </Typography>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={1}>
                            <FormControl sx={{ position: "relative", mt: 6 }}>
                              <Tooltip title="Remove">
                                <IconButton
                                  aria-label="remove"
                                  onClick={() => {
                                    arrayHelpers.remove(index);
                                  }}
                                  sx={{
                                    color: (theme) => theme.palette.grey[500],
                                  }}
                                >
                                  <MdDelete size={20} color="#acb5c3" />
                                </IconButton>
                              </Tooltip>
                            </FormControl>
                          </Grid>
                        </Box>
                      ))}
                    {formik.values.counties &&
                      formik.values.counties.length < 4 && (
                        <Button
                          variant="outlined"
                          sx={{ color: "#fff", bgcolor: "buttonBGColor.main" }}
                          onClick={() =>
                            arrayHelpers.push({
                              countyName: "",
                              countyCapitals: [],
                              countyFlag: "",
                            })
                          }
                        >
                          Add County
                        </Button>
                      )}
                  </React.Fragment>
                );
              }}
            />
          </FormikProvider>
        </Grid> */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography>
            Phone Number
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
            <Tooltip title="This field is required!" placement="bottom" arrow>
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
          <FormControl sx={{ width: "100%" }}>
            <StepOnePhoneInputField formik={formik} />
            <Typography variant="inherit" color="error.main">
              {formik.touched.primaryContact && formik.errors.primaryContact}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography>
            Email Address
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
            <Tooltip title="This field is required!" placement="bottom" arrow>
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
              id="emailAddress"
              name="emailAddress"
              type="emailAddress"
              value={formik.values.emailAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.emailAddress &&
                Boolean(formik.errors.emailAddress)
              }
              placeholder="Enter email address..."
            />
            <Typography variant="inherit" color="error.main">
              {formik.touched.emailAddress && formik.errors.emailAddress}
            </Typography>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 1 }}>
          <Typography sx={{ mb: 2 }}>
            Type Of Media For Which Registration Is Requested
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
            <Tooltip title="This field is required!" placement="bottom" arrow>
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
              id="typeOfMedia.mediaType"
              value={formik.values.typeOfMedia.mediaType}
              onChange={handleMediaTypeChange}
              onBlur={formik.handleBlur}
              options={mediaTypesData ?? []}
              getOptionLabel={(option) => option?.mediaType || option}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <Box
                    key={key}
                    component="li"
                    sx={{
                      "& > img": { mr: 2, flexShrink: 0 },
                    }}
                    {...optionProps}
                  >
                    {option?.mediaType}
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select media type..."
                  error={
                    formik?.touched?.typeOfMedia?.mediaType &&
                    Boolean(formik?.errors?.typeOfMedia?.mediaType)
                  }
                />
              )}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik?.touched?.typeOfMedia?.mediaType &&
                formik?.errors?.typeOfMedia?.mediaType}
            </Typography>
          </FormControl>
        </Grid> */}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography>
            Name Of Publisher/ Manager/ Proprietor
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
            <Tooltip title="This field is required!" placement="bottom" arrow>
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
              id="nameOfManager"
              name="nameOfManager"
              type="text"
              value={formik.values.nameOfManager}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.nameOfManager &&
                Boolean(formik.errors.nameOfManager)
              }
              placeholder="Enter name of publisher/manager/proprietor..."
            />
            <Typography variant="inherit" color="error.main">
              {formik.touched.nameOfManager && formik.errors.nameOfManager}
            </Typography>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography sx={{ mb: 2 }}>
            Education Level
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
            <Tooltip title="This field is required!" placement="bottom" arrow>
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
              id="educationLevel.educationLevelOfManager"
              value={formik.values.educationLevel.educationLevelOfManager}
              onChange={handleEducationLevelChage}
              onBlur={formik.handleBlur}
              options={educationLevelsData ?? []}
              getOptionLabel={(option) =>
                option?.educationLevelOfManager || option
              }
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <Box
                    key={key}
                    component="li"
                    sx={{
                      "& > img": { mr: 2, flexShrink: 0 },
                    }}
                    {...optionProps}
                  >
                    {option?.educationLevelOfManager}
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select education level..."
                  error={
                    formik?.touched?.educationLevel?.educationLevelOfManager &&
                    Boolean(
                      formik?.errors?.educationLevel?.educationLevelOfManager
                    )
                  }
                />
              )}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik?.touched?.educationLevel?.educationLevelOfManager &&
                formik?.errors?.educationLevel?.educationLevelOfManager}
            </Typography>
          </FormControl>
        </Grid> */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography>
            Year Of Experience
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
            <Tooltip title="This field is required!" placement="bottom" arrow>
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
              id="yearOfExperienceOfManager"
              name="yearOfExperienceOfManager"
              type="number"
              value={formik.values.yearOfExperienceOfManager}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.yearOfExperienceOfManager &&
                Boolean(formik.errors.yearOfExperienceOfManager)
              }
              placeholder="Enter year of experience..."
            />
            <Typography variant="inherit" color="error.main">
              {formik.touched.yearOfExperienceOfManager &&
                formik.errors.yearOfExperienceOfManager}
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
      <ScrollToTop />
    </React.Fragment>
  );
};

export default StepOneForm;
