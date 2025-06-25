import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link as URLLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "@mui/material/styles";
import { responsiveTheme } from "../../../../utils/muiUtils";
import {
  CssBaseline,
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  FormControl,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import CopyRights from "../../CopyRights/CopyRights";
// import { setInstitution } from "../../../../app/slices/verifyInstitutionSlice";

// Scroll to top of react route/page change
import ScrollToTop from "../../../ScrollToTop/ScrollToTop";

// Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

// J-Singh Logo
import logo from "../../../../images/MOH_Logo/MOH-LOGO.png";

// Registration Image
import registrationImageURL from "../../../../images/Registration-Image.jpg";

// LRA GET Data
// import lraTaxpayerKYC from "../../../../apis/LRA-LITAS-APIS/lraTaxpayerKYC";

// Endpoints
// const verifyInstitutionURL = "/api/inter";
const verifyInstitutionURL = "/lra-taxpayer-kyc/verify-business-tin";

// Validate Verify Institution Schema
const ValidateVerifyInstitutionSchema = Yup.object()
  .shape({
    businessTIN: Yup.number()
      .required("Business TIN required!")
      .positive()
      .integer()
      .min(9, "Invalid business TIN!"),
    // .max(9, "Business TIN cannot exceed 9 digits!"),
  })
  .required();

const ValidateApplicant = () => {
  // useDispatch
  const dispatch = useDispatch();

  // useNavigate
  const navigate = useNavigate();

  // Loading State
  const [loading, setLoading] = useState(false);

  // Formik Verify Institution Form
  const formikVerifyInstitutionForm = useFormik({
    initialValues: {
      businessTIN: 0,
    },
    validationSchema: ValidateVerifyInstitutionSchema,
    onSubmit: (values) => {
      console.log(values);
      handleVerifyInstitution();
    },
  });

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    formikVerifyInstitutionForm.handleSubmit();
  };

  // Query Params Data
  const TIN = formikVerifyInstitutionForm.values.businessTIN;

  // Verify Institution Data
  const VerifyInstitutionData = {
    businessTIN: formikVerifyInstitutionForm.values.businessTIN,
  };

  console.log(VerifyInstitutionData);

  // useQueryClient
  const queryClient = useQueryClient();

  // const Mutation = useMutation({
  //   mutationFn: () =>
  //     lraTaxpayerKYC(`${verifyInstitutionURL}?businessTIN=${TIN}`),
  //    onSuccess: (data) => {
  //     if (data) {
  //       dispatch(setInstitution(data));
  //       navigate("/new-registration", { replace: true });
  //       queryClient.invalidateQueries({
  //         queryKey: ["institutionsData"],
  //       });
  //     }
  //     return data;
  //   },
  //   onError: (error) => {
  //     return error;
  //   },
  // });

  // Loading Effect
  // useEffect(() => {
  //   if (Mutation.isPending) {
  //     setLoading(true);
  //   } else {
  //     setLoading(false);
  //   }
  // }, [Mutation]);

  // Handle Verify Institution
  const handleVerifyInstitution = () => {
    // Mutation.mutate(VerifyInstitutionData);
  };

  // Scroll to error input on form submit
  useEffect(() => {
    if (!formikVerifyInstitutionForm.isSubmitting) return;
    if (Object.keys(formikVerifyInstitutionForm.errors).length > 0) {
      document
        .getElementsByName(Object.keys(formikVerifyInstitutionForm.errors)[0])
        .forEach((error) => error.focus());
    }
  }, [formikVerifyInstitutionForm]);

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Verify Institution | MICAT online registration web software.
        </title>
      </Helmet>
      <ThemeProvider theme={responsiveTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={5}
            md={5}
            lg={5}
            sx={{
              display: { xs: "none", lg: "block" },
              bgcolor: "#4169E1",
              textAlign: "center",
              p: 3,
            }}
          >
            <Box sx={{ mt: 14 }}>
              <Typography
                variant="h3"
                sx={{ mt: 3, color: "#fff", fontWeight: "bolder" }}
              >
                MICAT
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      color: "#fff",
                    }}
                  >
                    Nation Communications Bereau Annual Registration System
                  </Typography>
                  <Typography sx={{ color: "#F5F5DC", fontSize: 16, mt: 1 }}>
                    Enter your Business LRA Tax Indentification Nunber (TIN) and
                    verify
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundImage: `url(${registrationImageURL})`,
                    height: 400,
                  }}
                ></Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={7}
            lg={7}
            component={Paper}
            elevation={6}
            square
          >
            <Paper
              sx={{ width: 500, ml: "auto", mr: "auto", pt: 3, pb: 3, mt: 3 }}
            >
              <Box
                sx={{
                  my: 1.8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <URLLink
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img src={logo} alt="MICAT Logo" width="100" />
                </URLLink>
                <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
                  Verify Institution?
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  <span style={{ color: "#4169E1" }}>
                    Enter your business TIN to verify.
                  </span>
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  autoComplete="off"
                  sx={{ mt: 4 }}
                >
                  <FormControl variant="outlined" fullWidth>
                    <Typography>
                      Business TIN
                      <span>
                        <LuAsterisk size={10} color="#C41E3A" />
                      </span>
                      <Tooltip
                        title="This field required!"
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
                    <TextField
                      margin="normal"
                      id="businessTIN"
                      name="businessTIN"
                      type="number"
                      slotProps={{
                        htmlInput: {
                          type: "number",
                          min: 9,
                          max: 9,
                        },
                      }}
                      placeholder="Enter your business TIN..."
                      value={formikVerifyInstitutionForm.values.businessTIN}
                      onChange={formikVerifyInstitutionForm.handleChange}
                      onBlur={formikVerifyInstitutionForm.handleBlur}
                      error={
                        formikVerifyInstitutionForm.touched.businessTIN &&
                        Boolean(formikVerifyInstitutionForm.errors.businessTIN)
                      }
                    />
                    <Typography variant="inherit" color="error.main">
                      {formikVerifyInstitutionForm.touched.businessTIN &&
                        formikVerifyInstitutionForm.errors.businessTIN}
                    </Typography>
                  </FormControl>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={loading}
                    loadingPosition="end"
                    endIcon={
                      <IoMdCheckmarkCircleOutline size={20} color="#fff" />
                    }
                    sx={{ mt: 3, mb: 2, bgcolor: "buttonBGColor.main" }}
                  >
                    <span>Verify</span>
                  </LoadingButton>
                  <URLLink
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      sx={{ p: 1, mt: 1, color: "#008080" }}
                      startIcon={<FaArrowLeft size={20} color="#008080" />}
                    >
                      Back To Home
                    </Button>
                  </URLLink>
                </Box>
              </Box>
            </Paper>
            <Box
              sx={{ width: 500, ml: "auto", mr: "auto", pt: 3, pb: 3, mt: 3 }}
            >
              <CopyRights />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <ScrollToTop />
    </React.Fragment>
  );
};

export default ValidateApplicant;
