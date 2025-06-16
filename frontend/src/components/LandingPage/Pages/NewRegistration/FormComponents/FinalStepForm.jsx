import React, { useEffect } from "react";
import { Link as URLLink } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";
import { LuAsterisk } from "react-icons/lu";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import ApplicantSignature from "./SignatureDialog/ApplicantSignature";

// Scroll to top of react route/page change
import ScrollToTop from "../../../../ScrollToTop/ScrollToTop";

const FinalStepForm = (props) => {
  // Destructure props
  const { formik } = props;

  // Handle Application Date
  const handleApplicationDate = (newValue) => {
    formik.setFieldValue("applicationDate", newValue);
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
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 8 }}>
          <Typography>
            Enter Your Full Name All In Capital Letters To Prove Eligibility
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
              id="applicantFullName"
              name="applicantFullName"
              type="text"
              variant="standard"
              value={formik.values.applicantFullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.applicantFullName &&
                Boolean(formik.errors.applicantFullName)
              }
              placeholder="Enter your full name here..."
            />
            <Typography variant="inherit" color="error.main" sx={{ mb: 1 }}>
              {formik.touched.applicantFullName &&
                formik.errors.applicantFullName}
            </Typography>
            <Typography
              sx={{ mt: 1, fontWeight: "Bolder", textAlign: "center" }}
            >
              THE UNDERSIGNED CERTIFY THAT INFORMATION PROVIDED ABOVE BY
              INSTITUTION IN THE FOREGOING QUESTIONNAIRE ARE TRUE/CORRECT TO THE
              BEST OF MY KNOWLEDGE AND ANY MISINFORMATION, MISREPRESENTATION OF
              MATERIALS OMISSION ON THIS REGISTRATION FORM OR OTHER HEREWITH
              ATTACHED RENDER AS APPLICANT INELIGIBLE FOR REGISTRATION.
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography sx={{ mb: 2 }}>
            Applicant Signature
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
            <ApplicantSignature formik={formik} />
            {formik.values.applicantSignature !== "" && (
              <Box sx={{ mt: 1 }}>
                <img
                  width={60}
                  height={60}
                  src={formik.values.applicantSignature}
                  alt="Applicant Signature"
                />
              </Box>
            )}
            <Typography variant="inherit" color="error.main">
              {formik.touched.applicantSignature &&
                formik.errors.applicantSignature}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography sx={{ mb: 2 }}>
            Date
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disablePast
                disableFuture
                value={dayjs(formik.values.applicationDate)}
                onChange={handleApplicationDate}
              />
            </LocalizationProvider>
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.applicationDate && formik.errors.applicationDate}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 1, mb: 2 }}>
          <Typography>
            Terms of Conditions
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
          <FormControl sx={{ mt: 1 }}>
            <FormControlLabel
              id="termsOfConditions"
              name="termsOfConditions"
              control={
                <Checkbox
                  checked={formik.values.termsOfConditions}
                  onChange={formik.handleChange}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 28,
                    },
                  }}
                />
              }
              label={
                <Typography>
                  I agree to MICAT{" "}
                  <URLLink
                    to="/terms-of-conditions"
                    variant="body2"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span
                      style={{
                        color: "#00A4EF",
                      }}
                    >
                      Terms of Conditions
                    </span>
                  </URLLink>{" "}
                  and have read and acknowledged{" "}
                  <URLLink
                    to="/privacy-policy"
                    variant="body2"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <span
                      style={{
                        color: "#00A4EF",
                      }}
                    >
                      Privacy Policy
                    </span>
                  </URLLink>
                </Typography>
              }
            />
            <Typography variant="inherit" color="error.main">
              {formik.touched.termsOfConditions &&
                formik.errors.termsOfConditions}
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
      <ScrollToTop />
    </React.Fragment>
  );
};

export default FinalStepForm;
