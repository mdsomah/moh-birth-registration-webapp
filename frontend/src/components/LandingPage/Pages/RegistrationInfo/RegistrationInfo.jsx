import React, { useEffect } from "react";
import { Link as URLLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import {
  Paper,
  FormControl,
  Typography,
  Alert,
  AlertTitle,
  Button,
  CssBaseline,
  Box,
  Grid,
  Autocomplete,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import { LuAsterisk } from "react-icons/lu";
import { BsFillInfoCircleFill } from "react-icons/bs";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { ThemeProvider } from "@mui/material/styles";
import { responsiveTheme } from "../../../../utils/muiUtils";
import {
  setIsCompleted,
  setRegistrationType,
} from "../../../../app/slices/newRegistrationSlice";

// Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

// Registration Type Schema
const RegistrationTypeSchema = Yup.object()
  .shape({
    registrationType: Yup.string().required("Registration type require!"),
  })
  .required();

const RegistrationInfo = () => {
  // useDispatch
  const dispatch = useDispatch();

  // useNavigate
  const navigate = useNavigate();

  // Destructure useSelector
  const { registrationType } = useSelector((state) => state.newRegistration);

  // Handle RegistrationType Change
  const handleRegistrationTypeChange = (_event, newValue) => {
    formikRegistrationTypeForm.setFieldValue("registrationType", newValue);
  };

  // Registration Types
  const RegistrationTypes = ["New Registration", "Renewal"];

  // Formik Registration Type Form
  const formikRegistrationTypeForm = useFormik({
    initialValues: {
      registrationType: `${registrationType !== null ? registrationType : ""}`,
    },
    validationSchema: RegistrationTypeSchema,
    onSubmit: () => {
      handleContinued();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formikRegistrationTypeForm.handleSubmit();
  };

  // Continue to Registration or Renewal Form
  const handleContinued = () => {
    if (
      formikRegistrationTypeForm.values.registrationType === "New Registration"
    ) {
      dispatch(setIsCompleted(false));
      dispatch(
        setRegistrationType(formikRegistrationTypeForm.values.registrationType)
      );
      navigate("/verify-institution", { replace: true });
    } else if (
      formikRegistrationTypeForm.values.registrationType === "Renewal"
    ) {
      dispatch(setIsCompleted(false));
      dispatch(
        setRegistrationType(formikRegistrationTypeForm.values.registrationType)
      );
      navigate("/renewal", { replace: true });
    } else {
      console.log("Select One!");
    }
  };

  // Scroll to error input on form submit
  useEffect(() => {
    if (!formikRegistrationTypeForm.isSubmitting) return;
    if (Object.keys(formikRegistrationTypeForm.errors).length > 0) {
      document
        .getElementsByName(Object.keys(formikRegistrationTypeForm.errors)[0])
        .forEach((error) => error.focus());
    }
  }, [formikRegistrationTypeForm]);

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Registration Info | MICAT online registration web software.
        </title>
      </Helmet>
      <ThemeProvider theme={responsiveTheme}>
        <CssBaseline />
        <Paper
          sx={{
            width: "80%",
            p: 5,
            mt: 3,
            position: "fixed",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Alert severity="info" sx={{ p: 5 }}>
            <AlertTitle sx={{ fontSize: 20, mb: 5 }}>
              Welcome to the{" "}
              <strong>
                National Communications Bureau Annual Registration System
              </strong>
            </AlertTitle>
            <Typography sx={{ mb: 2 }}>
              BY COMPLETING THE RIGISTRATION, YOU DO HEREBY CERTIFY THAT
              INFORMATION PROVIDED ABOVED BY INSTITUTION IN THEW FOREGOING
              QUESTIONNAIRE ARE TRU/ CORRECT TO THE BEST OF MY KNOWLEDGE AND ANY
              MISINFORMATION, MISREPRESENTATION OF MATERIALS OMISSION ON THIS
              REGISTRATION FORM OR OTHER HEREWITH ATTACHED RENDER AS APPLICANT
              INELIGIBLE FOR REGISTRATION.
            </Typography>
            <p>
              To Register, Please select the registration type below and click
              Continue!
            </p>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography sx={{ mb: 2 }}>
                Registration Type
                <span>
                  <LuAsterisk size={10} color="#C41E3A" />
                </span>
                <Tooltip title="This field required!" placement="bottom" arrow>
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
              <FormControl fullWidth sx={{ width: 300 }}>
                <Autocomplete
                  id="registrationType"
                  value={formikRegistrationTypeForm.values.registrationType}
                  onChange={handleRegistrationTypeChange}
                  onBlur={formikRegistrationTypeForm.handleBlur}
                  autoHighlight
                  options={RegistrationTypes ?? []}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select registration type..."
                      error={
                        formikRegistrationTypeForm.touched.registrationType &&
                        Boolean(
                          formikRegistrationTypeForm.errors.registrationType
                        )
                      }
                    />
                  )}
                />
                <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
                  {formikRegistrationTypeForm.touched.registrationType &&
                    formikRegistrationTypeForm.errors.registrationType}
                </Typography>
              </FormControl>
            </Grid>
            <Box sx={{ mt: 4 }}>
              <URLLink to="/">
                <Button variant="outlined" sx={{ mr: 2, color: "#008080" }}>
                  Back To Home
                </Button>
              </URLLink>
              <Button
                variant="contained"
                sx={{ bgcolor: "buttonBGColor.main" }}
                endIcon={<ArrowRightAltIcon />}
                onClick={handleSubmit}
              >
                Continue
              </Button>
            </Box>
          </Alert>
        </Paper>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default RegistrationInfo;
