import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  Autocomplete,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { LoadingButton } from "@mui/lab";
import { FaSearch } from "react-icons/fa";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Copyright from "../Dashboard/internals/components/Copyright";
import ReportsTable from "./ReportsTable/ReportsTable";
import ButtonLoader from "../../../ButtonLoader/ButtonLoader";
import NavbarBreadcrumbs from "../Dashboard/components/NavbarBreadcrumbs";
import { Country_Lists } from "./CountryLists/CountryLists";
import { County_Lists } from "./CountyLists/CountyLists";

//? Formik
import { useFormik } from "formik";

//? React Responsive Media Queries
import { useMediaQuery } from "react-responsive";

//? Generate Reports
import PostReport from "../../../../apis/PostReport";

//? Endpoints
const postReportURL = "/applicants/generate-reports";

//? React Sweet Alert Initialization
const MySwal = withReactContent(Swal);

//? Sweet Alert Error
const Error_Alert = (message) => {
  MySwal.fire({
    title: "ERROR...",
    text: `${message}`,
    icon: "error",
  });
};

const MainReportsGrid = () => {
  //? Tablet or Mobile Responsive Media Queries
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  //? Loading State
  const [loading, setLoading] = useState(false);

  //? Report Results State
  const [reportResults, setReportResults] = useState([]);

  //? Formik Reports Form
  const formikReportsForm = useFormik({
    initialValues: {
      nationalIDNumber: "",
      country: "",
      county: "",
      sex: "",
      dateOfBirth: "",
    },
    onSubmit: () => {
      postReportData();
    },
  });

  //? Handle Country Change
  const handleCountryChange = (_e, newValue) => {
    const { label } = newValue || {};
    formikReportsForm.setFieldValue("country", label);
  };

  //? Handle County Change
  const handleCountyChange = (_event, newValue) => {
    //? Destructure newValue
    const { countyName } = newValue || "";
    formikReportsForm.setFieldValue("county", countyName);
  };

  //? Handle Sex Change
  const handleSexChange = (_event, newValue) => {
    formikReportsForm.setFieldValue("sex", newValue);
  };

  //? Handle DoB Change
  const handleDoBChange = (newValue) => {
    formikReportsForm.setFieldValue("dateOfBirth", newValue);
  };

  //? Handle Submit Form
  const handleSubmitForm = async (e) => {
    if (Object.keys(ReportData).length === 0) {
      Error_Alert("Please enter at least one search field!");
      return;
    }
    e.preventDefault();
    formikReportsForm.handleSubmit();
  };

  //? Handle Reset Form
  const handleResetForm = () => {
    formikReportsForm.resetForm();
    setReportResults([]);
  };

  //? Report Data Object
  const ReportData = {};
  if (formikReportsForm.values.nationalIDNumber !== "") {
    ReportData.nationalIDNumber = formikReportsForm.values.nationalIDNumber;
  }
  if (formikReportsForm.values.country !== "") {
    ReportData.country = formikReportsForm.values.country;
  }
  if (formikReportsForm.values.county !== "") {
    ReportData.county = formikReportsForm.values.county;
  }
  if (formikReportsForm.values.sex !== "") {
    ReportData.sex = formikReportsForm.values.sex;
  }
  if (formikReportsForm.values.dateOfBirth !== "") {
    ReportData.dateOfBirth = formikReportsForm.values.dateOfBirth;
  }

  console.log(ReportData);

  //? Search Data
  const searchData = formikReportsForm.values;

  //? useQueryClient
  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: (newData) => PostReport(`${postReportURL}`, newData),
    onSuccess: (data) => {
      if (data) {
        console.log("Report Data: ", data);
        //? Applicant Filters
        const ApplicantFilters =
          data?.applicantReports?.filter(
            (applicant) =>
              (applicant?.ninNumber === searchData.nationalIDNumber &&
                searchData.nationalIDNumber !== "") ||
              (applicant?.applicantCountry === searchData.country &&
                searchData.country !== "") ||
              (applicant?.applicantCounty === searchData.county &&
                searchData.county !== "") ||
              (applicant?.applicantSex === searchData.sex &&
                searchData.sex !== "") ||
              (dayjs(applicant?.applicantDateOfBirth).format("MM/DD/YYYY") ===
                dayjs(searchData.dateOfBirth).format("MM/DD/YYYY") &&
                searchData.dateOfBirth !== "")
          ) ?? [];
        setReportResults(ApplicantFilters);
        queryClient.invalidateQueries({
          queryKey: ["applicantsData"],
        });
      }
      return data;
    },
    onError: (error) => {
      if (error) {
        console.log("Error: ", error);
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

  //? Post Report Data
  const postReportData = async () => {
    Mutation.mutate(ReportData);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      {isTabletOrMobile && <NavbarBreadcrumbs />}
      <Typography
        component="h2"
        variant="h6"
        sx={{ mt: { xs: 3, md: 0 }, mb: 2 }}
      >
        Reports
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ mt: 1 }}>
              <FormControl fullWidth sx={{ mb: 1 }}>
                <Typography>National ID Number</Typography>
                <TextField
                  margin="normal"
                  id="nationalIDNumber"
                  name="nationalIDNumber"
                  type="text"
                  value={formikReportsForm.values.nationalIDNumber}
                  onChange={formikReportsForm.handleChange}
                  placeholder="Enter national id number..."
                />
              </FormControl>
            </Box>
            <Box
              sx={{ display: { xs: "block", lg: "flex" }, gap: "1rem", mt: 1 }}
            >
              <FormControl fullWidth sx={{ mb: 1 }}>
                <Typography sx={{ mb: 2 }}>Country</Typography>
                <Autocomplete
                  id="country"
                  value={formikReportsForm.values.country}
                  onChange={handleCountryChange}
                  options={Country_Lists ?? []}
                  filterSelectedOptions={true}
                  isOptionEqualToValue={(option, value) =>
                    option?.label === value?.label
                  }
                  autoHighlight
                  getOptionLabel={(option) => option?.label || option}
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
              </FormControl>
              <FormControl fullWidth sx={{ mb: 1 }}>
                <Typography sx={{ mb: 2 }}>County</Typography>
                <Autocomplete
                  id="county"
                  value={formikReportsForm.values.county}
                  onChange={handleCountyChange}
                  autoHighlight
                  options={County_Lists ?? []}
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
                          src={option?.countyFlag}
                          alt={`${option?.countyName} Flag`}
                        />
                        {option?.countyName}
                      </Box>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField placeholder="Select county..." {...params} />
                  )}
                />
              </FormControl>
            </Box>
            <Box
              sx={{ display: { xs: "block", lg: "flex" }, gap: "1rem", mt: 1 }}
            >
              <FormControl fullWidth>
                <Typography sx={{ mb: 2 }}>Sex</Typography>
                <Autocomplete
                  id="sex"
                  value={formikReportsForm.values.sex}
                  onChange={handleSexChange}
                  options={["Male", "Female"] ?? []}
                  autoHighlight
                  renderInput={(params) => (
                    <TextField placeholder="Select sex..." {...params} />
                  )}
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 1 }}>
                <Typography sx={{ mb: 2 }}>DoB</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disableFuture
                    value={dayjs(formikReportsForm.values.dateOfBirth)}
                    onChange={handleDoBChange}
                  />
                </LocalizationProvider>
              </FormControl>
            </Box>
            <Box sx={{ mt: 1 }}>
              <LoadingButton
                variant="contained"
                fullWidth
                size="large"
                loading={loading}
                loadingIndicator={<ButtonLoader />}
                onClick={handleSubmitForm}
                loadingPosition="end"
                endIcon={<FaSearch size={20} color="#fff" />}
                sx={{ mt: 3, mb: 2, color: "#fff" }}
              >
                {loading ? (
                  <span style={{ color: "#fff" }}>Generating</span>
                ) : (
                  <span>Generate</span>
                )}
              </LoadingButton>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={handleResetForm}
              >
                Reset
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, lg: 12 }}>
          <ReportsTable reportResults={reportResults} />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
};

export default MainReportsGrid;
