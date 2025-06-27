import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { LoadingButton } from "@mui/lab";
import { FaSearch } from "react-icons/fa";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Copyright from "../Dashboard/internals/components/Copyright";
import QueriesTable from "./QueriesTable/QueriesTable";
import ButtonLoader from "../../../ButtonLoader/ButtonLoader";
import NavbarBreadcrumbs from "../Dashboard/components/NavbarBreadcrumbs";
import { encrypt } from "../../../../utils/encrypt";
import { decrypt } from "../../../../utils/decrypt";

//? Formik
import { useFormik } from "formik";

//? React Responsive Media Queries
import { useMediaQuery } from "react-responsive";

//? Post NIR Applicant Details
import PostApplicantData from "../../../../apis/NIR-APIs/PostApplicantData";

//? NIR APIs Endpoint
const postApplicantDetailsURL = "/api/ApplicantDetails/search";

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

const MainUsersGrid = () => {
  //? Tablet or Mobile Responsive Media Queries
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  //? Loading State
  const [loading, setLoading] = useState(false);

  //? Enable Fetch Query State
  // const [enabled, setEnabled] = useState(false);

  //? Applicant Search Results State
  const [applicantSearchResults, setApplicantSearchResults] = useState([]);
  console.log(applicantSearchResults);

  //? Destructure useQuery
  // const {
  //   isLoading: queriesLoading,
  //   data: queriesData,
  //   error: queriesError,
  //   refetch: queriesRefetch,
  //   isRefetching: queriesRefetching,
  // } = useQuery({
  //   queryKey: ["queriesData"],
  //   queryFn: () => GetApplicantDetails(`${getApplicantDetails}`),
  //   enabled: enabled,
  // });

  //? Formik Applicant Query Form
  const formikApplicantQueryForm = useFormik({
    // enableReinitialize: true,
    initialValues: {
      NIN: "",
      FirstName: "",
      LastName: "",
      MobileNumber: "",
      DateOfBirth: "",
      PageNumber: 1,
      PageSize: 50,
    },
    onSubmit: () => {
      postApplicantDetails();
    },
  });

  //? Handle Date of Birth Change
  const handleDateOfBirthChange = (newValue) => {
    formikApplicantQueryForm.setFieldValue("DateOfBirth", `${newValue}`);
  };

  //? Handle Submit
  const handleSubmit = async (e) => {
    // await queriesRefetch();
    if (Object.keys(ApplicantData).length === 0) {
      Error_Alert("Please enter at least one search field!");
      return;
    }
    e.preventDefault();
    formikApplicantQueryForm.handleSubmit();
    // setEnabled(true);
  };

  //? Handle Reset Form
  const handleResetForm = () => {
    formikApplicantQueryForm.resetForm();
    setApplicantSearchResults([]);
    // setEnabled(false);
  };

  //? Applicant Data Object
  const ApplicantData = {};
  if (formikApplicantQueryForm.values.NIN !== "") {
    ApplicantData.NIN = encrypt(formikApplicantQueryForm.values.NIN);
  }
  if (formikApplicantQueryForm.values.FirstName !== "") {
    ApplicantData.FirstName = encrypt(
      formikApplicantQueryForm.values.FirstName
    );
  }
  if (formikApplicantQueryForm.values.LastName !== "") {
    ApplicantData.LastName = encrypt(formikApplicantQueryForm.values.LastName);
  }
  if (formikApplicantQueryForm.values.MobileNumber !== "") {
    ApplicantData.MobileNumber = encrypt(
      formikApplicantQueryForm.values.MobileNumber
    );
  }
  if (formikApplicantQueryForm.values.DateOfBirth !== "") {
    ApplicantData.DateOfBirth = encrypt(
      formikApplicantQueryForm.values.DateOfBirth
    );
  }
  console.log(ApplicantData);

  //? Search Data
  const searchData = formikApplicantQueryForm.values;

  //? useQueryClient
  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: (newData) =>
      PostApplicantData(`${postApplicantDetailsURL}`, newData),
    onSuccess: (data) => {
      if (data) {
        const cipherText = data;
        const decryptedData = decrypt(
          cipherText.encryptedPayload,
          cipherText.encryptedSessionKey
        );
        //? Check if applicant available
        if (decryptedData?.TotalCount === 0) {
          return Error_Alert("No Applicant found!");
        }
        //? Handle Applicant Filters
        const ApplicantFilters =
          decryptedData.Data?.filter(
            (applicant) =>
              (applicant?.NINNumber === searchData.NIN &&
                searchData.NIN !== "") ||
              (applicant?.FirstName.toLowerCase().includes(
                searchData.FirstName.toLowerCase()
              ) &&
                searchData.FirstName !== "") ||
              (applicant?.Surname.toLowerCase().includes(
                searchData.LastName.toLowerCase()
              ) &&
                searchData.LastName !== "") ||
              (applicant?.MobileNumber === searchData.MobileNumber &&
                searchData.MobileNumber !== "") ||
              (dayjs(applicant?.DateOfBirth).format("MM/DD/YYYY") ===
                dayjs(searchData.DateOfBirth).format("MM/DD/YYYY") &&
                searchData.DateOfBirth !== "")
          ) ?? [];
        setApplicantSearchResults(ApplicantFilters);
        queryClient.invalidateQueries({
          queryKey: ["queriesData"],
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

  //? Fetching Data Effect
  // useEffect(() => {
  //   if (enabled) {
  //     setApplicantSearchResults(ApplicantFilters);
  //   }
  // }, [enabled]);

  //? Loading Effect
  useEffect(() => {
    if (Mutation.isPending) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [Mutation]);

  //? Payload
  const payload = {
    ...ApplicantData,
    PageNumber: formikApplicantQueryForm.values.PageNumber,
    PageSize: formikApplicantQueryForm.values.PageSize,
  };

  console.log(payload);

  //? Post Applicant Details
  const postApplicantDetails = async () => {
    Mutation.mutate(payload);
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
        Queries
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ mt: 1 }}>
              <FormControl fullWidth>
                <Typography>NIN</Typography>
                <TextField
                  margin="normal"
                  id="NIN"
                  name="NIN"
                  type="text"
                  placeholder="search with NIN..."
                  variant="outlined"
                  value={formikApplicantQueryForm.values.NIN}
                  onChange={formikApplicantQueryForm.handleChange}
                />
              </FormControl>
            </Box>
            <Box sx={{ display: { lg: "flex" }, gap: "1rem", mt: 1 }}>
              <FormControl fullWidth>
                <Typography>First Name</Typography>
                <TextField
                  margin="normal"
                  id="FirstName"
                  name="FirstName"
                  type="text"
                  placeholder="search with First Name..."
                  variant="outlined"
                  value={formikApplicantQueryForm.values.FirstName}
                  onChange={formikApplicantQueryForm.handleChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <Typography>Last Name</Typography>
                <TextField
                  margin="normal"
                  id="LastName"
                  name="LastName"
                  type="text"
                  placeholder="search with Last Name..."
                  variant="outlined"
                  value={formikApplicantQueryForm.values.LastName}
                  onChange={formikApplicantQueryForm.handleChange}
                />
              </FormControl>
            </Box>
            <Box sx={{ display: { lg: "flex" }, gap: "1rem", mt: 1 }}>
              <FormControl fullWidth>
                <Typography>Mobile Number</Typography>
                <TextField
                  margin="normal"
                  id="MobileNumber"
                  name="MobileNumber"
                  type="text"
                  placeholder="search with Mobile Number..."
                  variant="outlined"
                  value={formikApplicantQueryForm.values.MobileNumber}
                  onChange={formikApplicantQueryForm.handleChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <Typography sx={{ mb: 2 }}>Date of Birth</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    // disableFuture
                    value={dayjs(formikApplicantQueryForm.values.DateOfBirth)}
                    onChange={handleDateOfBirthChange}
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
                onClick={handleSubmit}
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
          <QueriesTable
            // queriesLoading={queriesLoading}
            // queriesError={queriesError}
            // queriesRefetch={queriesRefetch}
            // queriesRefetching={queriesRefetching}
            applicantSearchResults={applicantSearchResults}
          />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
};

export default MainUsersGrid;
