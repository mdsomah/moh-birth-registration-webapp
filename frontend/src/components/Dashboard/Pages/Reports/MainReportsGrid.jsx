import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
import Copyright from "../Dashboard/internals/components/Copyright";
// import ReactDateRange from "./ReactDateRange/ReactDateRange";
import ReportsTable from "./ReportsTable/ReportsTable";
import ButtonLoader from "../../../ButtonLoader/ButtonLoader";
import NavbarBreadcrumbs from "../Dashboard/components/NavbarBreadcrumbs";

//? Formik
import { useFormik } from "formik";

//? County Flag
import bomiFlag from "../../../../images/Counties-Flags/Flag_of_Bomi_County.svg.png";
import bongFlag from "../../../../images/Counties-Flags/Flag_of_Bong_County.svg.png";
import gbarpoluFlag from "../../../../images/Counties-Flags/Flag_of_Gbarpolu_County.svg.png";
import grandBassFlag from "../../../../images/Counties-Flags/Flag_of_Grand_Bassa_County.svg.png";
import grandCapeMountFlag from "../../../../images/Counties-Flags/Flag_of_Grand_Cape_Mount_County.svg.png";
import grandGedehFlag from "../../../../images/Counties-Flags/Flag_of_Grand_Gedeh_County.svg.png";
import grandKruFlag from "../../../../images/Counties-Flags/Flag_of_Grand_Kru_County.svg.png";
import lofaFlag from "../../../../images/Counties-Flags/Flag_of_Lofa_County.svg.png";
import margibiFlag from "../../../../images/Counties-Flags/Flag_of_Margibi_County.svg.png";
import marylandFlag from "../../../../images/Counties-Flags/Flag_of_Maryland_County.svg.png";
import montserradoFlag from "../../../../images/Counties-Flags/Flag_of_Montserrado_County.svg.png";
import nimbaFlag from "../../../../images/Counties-Flags/Flag_of_Nimba_County.svg.png";
import rivergeeFlag from "../../../../images/Counties-Flags/Flag_of_River_Gee_County.svg.png";
import rivercessFlag from "../../../../images/Counties-Flags/Flag_of_Rivercess_County.svg.png";
import sinoeFlag from "../../../../images/Counties-Flags/Flag_of_Sinoe_County.svg.png";

//? React Responsive Media Queries
import { useMediaQuery } from "react-responsive";

//? Get All NIR Data
import GetALLNIRData from "../../../../apis/NIR-APIs/GetAllApplicants";

//? NIR APIs Endpoints
const getAllReportsURL = "/applicants";

const MainReportsGrid = () => {
  //? Tablet or Mobile Responsive Media Queries
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  //? Card Types Array
  const Card_Types = ["Citizen Card", "Resident Card", "ECOWAS Card"];

  //? Application Types Array
  const Application_Types = ["New", "Renewal", "Replacement"];

  //? Genders Array
  const Genders = ["Male", "Female"];

  //? Counties Array
  const Counties = [
    { countyName: "Bomi", countyFlag: `${bomiFlag}` },
    { countyName: "Bong", countyFlag: `${bongFlag}` },
    { countyName: "Gbarpolu", countyFlag: `${gbarpoluFlag}` },
    { countyName: "Grand Bassa", countyFlag: `${grandBassFlag}` },
    { countyName: "Grand Cape Mount", countyFlag: `${grandCapeMountFlag}` },
    { countyName: "Grand Gedeh", countyFlag: `${grandGedehFlag}` },
    { countyName: "Grand Kru", countyFlag: `${grandKruFlag}` },
    { countyName: "Lofa", countyFlag: `${lofaFlag}` },
    { countyName: "Margibi", countyFlag: `${margibiFlag}` },
    { countyName: "Maryland", countyFlag: `${marylandFlag}` },
    { countyName: "Montserrado", countyFlag: `${montserradoFlag}` },
    { countyName: "Nimba", countyFlag: `${nimbaFlag}` },
    { countyName: "River Gee", countyFlag: `${rivergeeFlag}` },
    { countyName: "Rivercess", countyFlag: `${rivercessFlag}` },
    { countyName: "Sinoe", countyFlag: `${sinoeFlag}` },
  ];

  //? Loading State
  const [loading, setLoading] = useState(false);

  //? Enable Fetch Query State
  const [enabled, setEnabled] = useState(false);

  //? Generate Applicants Reports State
  const [generateReports, setGenerateReports] = useState([]);

  //? Destructure useQuery
  const {
    isLoading: reportsLoading,
    data: reportsData,
    error: reportsError,
    refetch: reportsRefetch,
    isRefetching: reportsRefetching,
  } = useQuery({
    queryKey: ["reportsData"],
    queryFn: () => GetALLNIRData(`${getAllReportsURL}`),
    enabled: enabled,
  });

  //? Formik Reports Form
  const formikReportsForm = useFormik({
    initialValues: {
      cardType: "",
      applicationType: "",
      countyName: "",
      gender: "",
      applicationDate: "",
    },
  });

  //? Handle Card Type Change
  const handleCardTypeChange = (_event, newValue) => {
    formikReportsForm.setFieldValue("cardType", newValue);
  };

  //? Handle Application Type Change
  const handleApplicationTypeChange = (_event, newValue) => {
    formikReportsForm.setFieldValue("applicationType", newValue);
  };

  //? Handle County Change
  const handleCountyChange = (_event, newValue) => {
    //? Destructure newValue
    const { countyName } = newValue;
    formikReportsForm.setFieldValue("countyName", countyName);
  };

  //? Handle Gender Change
  const handleGenderChange = (_event, newValue) => {
    formikReportsForm.setFieldValue("gender", newValue);
  };

  //? Handle Application Date Change
  const handleApplicationDateChange = (newValue) => {
    formikReportsForm.setFieldValue("applicationDate", newValue);
  };

  //? Handle Generate Reports
  const handleGenerateReports = async () => {
    await reportsRefetch();
    setEnabled(true);
  };

  //? Handle Reset Form
  const handleResetForm = () => {
    formikReportsForm.resetForm();
    setGenerateReports([]);
    setEnabled(false);
  };

  //? Search Data
  const searchData = formikReportsForm.values;

  //? Handle Reports Filters
  const ReportsFilters =
    reportsData?.filter(
      (report) =>
        (report?.cardType === searchData.cardType &&
          searchData.cardType !== "") ||
        (report?.applicationType === searchData.applicationType &&
          searchData.applicationType !== "") ||
        (report?.countyName === searchData.countyName &&
          searchData.countyName !== "") ||
        (report?.gender === searchData.gender && searchData.gender !== "") ||
        (report?.applicationDate ===
          dayjs(searchData.applicationDate).format("MM/DD/YYYY") &&
          searchData.applicationDate !== "")
    ) ?? [];

  //? Fetching Data Effect
  useEffect(() => {
    if (enabled) {
      setGenerateReports(ReportsFilters);
    }
  }, [enabled]);

  //? Loading Effect
  useEffect(() => {
    if (reportsLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [reportsLoading]);

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
            <Box
              sx={{ display: { xs: "block", lg: "flex" }, gap: "1rem", mt: 1 }}
            >
              <FormControl fullWidth sx={{ mb: 1 }}>
                <Typography sx={{ mb: 2 }}>Card Type</Typography>
                <Autocomplete
                  id="cardType"
                  value={formikReportsForm.values.cardType}
                  onChange={handleCardTypeChange}
                  options={Card_Types ?? []}
                  autoHighlight
                  renderInput={(params) => (
                    <TextField placeholder="Select card type..." {...params} />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <Typography sx={{ mb: 2 }}>Application Type</Typography>
                <Autocomplete
                  id="applicationType"
                  value={formikReportsForm.values.applicationType}
                  onChange={handleApplicationTypeChange}
                  options={Application_Types ?? []}
                  autoHighlight
                  renderInput={(params) => (
                    <TextField
                      placeholder="Select application type..."
                      {...params}
                    />
                  )}
                />
              </FormControl>
            </Box>
            <Box
              sx={{ display: { xs: "block", lg: "flex" }, gap: "1rem", mt: 1 }}
            >
              <FormControl fullWidth sx={{ mb: 1 }}>
                <Typography sx={{ mb: 2 }}>County</Typography>
                <Autocomplete
                  id="countyName"
                  value={formikReportsForm.values.countyName}
                  onChange={handleCountyChange}
                  autoHighlight
                  options={Counties ?? []}
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
              <FormControl fullWidth>
                <Typography sx={{ mb: 2 }}>Gender</Typography>
                <Autocomplete
                  id="gender"
                  value={formikReportsForm.values.gender}
                  onChange={handleGenderChange}
                  options={Genders ?? []}
                  autoHighlight
                  renderInput={(params) => (
                    <TextField placeholder="Select gender..." {...params} />
                  )}
                />
              </FormControl>
            </Box>
            {/* <Box sx={{ mt: 1 }}>
              <FormControl fullWidth sx={{ mb: 1 }}>
                <Typography sx={{ mb: 2 }}>Application Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateRangePicker
                    value={dayjs(formikReportsForm.values.applicationDate)}
                    onChange={handleApplicationDateChange}
                    localeText={{ start: "From", end: "To" }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Box> */}
            <Box sx={{ mt: 1 }}>
              <LoadingButton
                disabled={true}
                variant="contained"
                fullWidth
                size="large"
                loading={loading}
                loadingIndicator={<ButtonLoader />}
                onClick={() => handleGenerateReports()}
                loadingPosition="end"
                endIcon={<FaSearch size={20} color="#d4bf79" />}
                sx={{ mt: 3, mb: 2, color: "#d4bf79" }}
              >
                {loading ? (
                  <span style={{ color: "#d4bf79" }}>Searching</span>
                ) : (
                  <spa>Search</spa>
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
          <ReportsTable
            reportsLoading={reportsLoading}
            reportsError={reportsError}
            reportsRefetch={reportsRefetch}
            reportsRefetching={reportsRefetching}
            generateReports={generateReports}
          />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
};

export default MainReportsGrid;
