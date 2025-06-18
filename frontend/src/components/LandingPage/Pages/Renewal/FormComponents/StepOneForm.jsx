import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  Autocomplete,
  Chip,
} from "@mui/material";
import { LuAsterisk } from "react-icons/lu";
import StepOnePhoneInputField from "../PhoneInputsField/StepOnePhoneInputField";

// Scroll to top of react route/page change
import ScrollToTop from "../../../../ScrollToTop/ScrollToTop";

// Counties Flags Import
// import BomiFlag from "../../../../../images/Counties_Flags/Flag_of_Bomi_County.svg.png";
// import BongFlag from "../../../../../images/Counties_Flags/Flag_of_Bong_County.svg.png";
// import GbarpoluFlag from "../../../../../images/Counties_Flags/Flag_of_Gbarpolu_County.svg.png";
// import GrandBassaFlag from "../../../../../images/Counties_Flags/Flag_of_Grand_Bassa_County.svg.png";
// import GrandCapeMountFlag from "../../../../../images/Counties_Flags/Flag_of_Grand_Cape_Mount_County.svg.png";
// import GrandGedehFlag from "../../../../../images/Counties_Flags/Flag_of_Grand_Gedeh_County.svg.png";
// import GrandKruFlag from "../../../../../images/Counties_Flags/Flag_of_Grand_Kru_County.svg.png";
// import LofaFlag from "../../../../../images/Counties_Flags/Flag_of_Lofa_County.svg.png";
// import MargibiFlag from "../../../../../images/Counties_Flags/Flag_of_Margibi_County.svg.png";
// import MarylandFlag from "../../../../../images/Counties_Flags/Flag_of_Maryland_County.svg.png";
// import MontserradoFlag from "../../../../../images/Counties_Flags/Flag_of_Montserrado_County.svg.png";
// import NimbaFlag from "../../../../../images/Counties_Flags/Flag_of_Nimba_County.svg.png";
// import RivercessFlag from "../../../../../images/Counties_Flags/Flag_of_Rivercess_County.svg.png";
// import RiverGeeFlag from "../../../../../images/Counties_Flags/Flag_of_River_Gee_County.svg.png";
// import SinoeFlag from "../../../../../images/Counties_Flags/Flag_of_Sinoe_County.svg.png";

// Get All Counties
import GetAllData from "../../../../../apis/GetAllData";

// Endpoints
const getAllCountiesURL = "/counties";

const StepOneForm = (props) => {
  // Destructure props
  const { formik } = props;

  // Destructure useQuery
  const { data: countiesData } = useQuery({
    queryKey: ["countiesData"],
    queryFn: () => GetAllData(`${getAllCountiesURL}`),
  });

  // County Capitals
  const [countyCapitals, setCountyCapitals] = useState([]);

  // Institution Types
  const InstitutionsTypes = ["Liberian Insttitution", "Foreign Insttitution"];

  // Counties & Cities Types
  // const CountiesCitiesTypes = [
  //   {
  //     countyName: "Bomi",
  //     cityNames: ["Tubmanburg"],
  //     flag: `${BomiFlag}`,
  //   },
  //   {
  //     countyName: "Bong",
  //     cityNames: ["Gbarnga"],
  //     flag: `${BongFlag}`,
  //   },
  //   {
  //     countyName: "Gbarpolu",
  //     cityNames: ["Bopolu"],
  //     flag: `${GbarpoluFlag}`,
  //   },
  //   {
  //     countyName: "Grand Bassa",
  //     cityNames: ["Buchanan"],
  //     flag: `${GrandBassaFlag}`,
  //   },
  //   {
  //     countyName: "Grand Cape Mount",
  //     cityNames: ["Robertsport"],
  //     flag: `${GrandCapeMountFlag}`,
  //   },
  //   {
  //     countyName: "Grand Gedeh",
  //     cityNames: ["Zwedru"],
  //     flag: `${GrandGedehFlag}`,
  //   },
  //   {
  //     countyName: "Grand Kru",
  //     cityNames: ["Barclayville"],
  //     flag: `${GrandKruFlag}`,
  //   },
  //   {
  //     countyName: "Lofa",
  //     cityNames: ["Voinjama"],
  //     flag: `${LofaFlag}`,
  //   },
  //   {
  //     countyName: "Margibi",
  //     cityNames: ["Kakata"],
  //     flag: `${MargibiFlag}`,
  //   },
  //   {
  //     countyName: "Maryland",
  //     cityNames: ["Harper"],
  //     flag: `${MarylandFlag}`,
  //   },
  //   {
  //     countyName: "Montserrado",
  //     cityNames: ["Bensonville"],
  //     flag: `${MontserradoFlag}`,
  //   },
  //   {
  //     countyName: "Nimba",
  //     cityNames: ["Sanniquellie"],
  //     flag: `${NimbaFlag}`,
  //   },
  //   {
  //     countyName: "River Gee",
  //     cityNames: ["Fish Town"],
  //     flag: `${RiverGeeFlag}`,
  //   },
  //   {
  //     countyName: "Rivercess",
  //     cityNames: ["Cesstos"],
  //     flag: `${RivercessFlag}`,
  //   },
  //   {
  //     countyName: "Sinoe",
  //     cityNames: ["Greenville"],
  //     flag: `${SinoeFlag}`,
  //   },
  // ];

  // Media Types
  const MediaTypes = [
    "Newspaper, Magazine, Newletter, Other publication",
    "Radio Station (FM, Non Commercial Station)",
    "Radio Station (FM, Commercial Station)",
    "Television Station",
  ];

  // College Levels
  const CollegeLevels = [
    "High School Diploma",
    "BSc",
    "Master",
    "PHD",
    "Certificate",
  ];

  // Handle Business Ownership Change
  const handleBusinessOwnershipChange = (_event, newValue) => {
    formik.setFieldValue("businessOwnership", newValue);
  };

  // Handle County Change
  const handleCountyChange = (_event, newValue) => {
    const { countyName } = newValue ?? "";
    const CountyCapitalNames = countiesData?.find(
      (county) =>
        county?.countyName === countyName || county?.countyName !== countyName
    );
    if (CountyCapitalNames) {
      formik.setFieldValue("countyCapitalNames", []);
    }
    formik.setFieldValue("countyName", countyName);
    setCountyCapitals(newValue?.countyCapitals);
  };

  // Handle County Capitals Change Change
  const handleCountyCapitalsChange = (_event, newValue) => {
    formik.setFieldValue("countyCapitalNames", newValue);
  };

  // Handle Media Type Change
  const handleMediaTypeChange = (_event, newValue) => {
    formik.setFieldValue("typeOfMedia", newValue);
  };

  // Handle Education Level Change
  const handleEducationLevelChage = (_event, newValue) => {
    formik.setFieldValue("educationLevelOfManager", newValue);
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
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography>
            Name of Institution
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              id="institutionName"
              name="institutionName"
              type="text"
              value={formik.values.institutionName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography sx={{ mb: 2 }}>
            Business Ownership
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormControl fullWidth>
            <Autocomplete
              id="businessOwnership"
              value={formik.values.businessOwnership}
              onChange={handleBusinessOwnershipChange}
              onBlur={formik.handleBlur}
              options={InstitutionsTypes}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select business ownership..."
                  error={
                    formik.touched.businessOwnership &&
                    Boolean(formik.errors.businessOwnership)
                  }
                />
              )}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.businessOwnership &&
                formik.errors.businessOwnership}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography>
            Current Address
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
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
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography sx={{ mb: 2 }}>
            County
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormControl fullWidth>
            <Autocomplete
              id="countyName"
              value={formik.values.countyName}
              onChange={handleCountyChange}
              onBlur={formik.handleBlur}
              autoHighlight
              options={countiesData ?? []}
              getOptionLabel={(option) => option?.countyName || option}
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
                    formik.touched.countyName &&
                    Boolean(formik.errors.countyName)
                  }
                />
              )}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.countyName && formik.errors.countyName}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography sx={{ mb: 2 }}>
            County Capitals
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormControl fullWidth>
            <Autocomplete
              id="countyCapitalNames"
              value={formik.values.countyCapitalNames}
              onChange={handleCountyCapitalsChange}
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
                  placeholder="Select one or more county capital(s)..."
                  error={
                    formik.touched.countyCapitalNames &&
                    Boolean(formik.errors.countyCapitalNames)
                  }
                />
              )}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.countyCapitalNames &&
                formik.errors.countyCapitalNames}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography>
            Phone Number
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
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
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 1 }}>
          <Typography sx={{ mb: 2 }}>
            Type Of Media For Which Registration Is Requested
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormControl fullWidth>
            <Autocomplete
              id="typeOfMedia"
              value={formik.values.typeOfMedia}
              onChange={handleMediaTypeChange}
              onBlur={formik.handleBlur}
              options={MediaTypes}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select media type..."
                  error={
                    formik.touched.typeOfMedia &&
                    Boolean(formik.errors.typeOfMedia)
                  }
                />
              )}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.typeOfMedia && formik.errors.typeOfMedia}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography>
            Name Of Publisher/ Manager/ Proprietor
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
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
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography sx={{ mb: 2 }}>
            Education Level
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormControl fullWidth>
            <Autocomplete
              id="educationLevelOfManager"
              value={formik.values.educationLevelOfManager}
              onChange={handleEducationLevelChage}
              onBlur={formik.handleBlur}
              options={CollegeLevels}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select education level..."
                  error={
                    formik.touched.educationLevelOfManager &&
                    Boolean(formik.errors.educationLevelOfManager)
                  }
                />
              )}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.educationLevelOfManager &&
                formik.errors.educationLevelOfManager}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography>
            Year Of Experience
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
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
