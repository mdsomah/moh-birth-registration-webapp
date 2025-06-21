import React, { useEffect } from "react";
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
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

//? Scroll to top of react route/page change
import ScrollToTop from "../../../../ScrollToTop/ScrollToTop";

const StepOneForm = (props) => {
  //? Destructure props
  const { formik } = props;

  //? Scroll to error input on form submit
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
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          First Name
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
            id="applicantFirstName"
            name="applicantFirstName"
            type="text"
            value={formik.values.applicantFirstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.applicantFirstName &&
              Boolean(formik.errors.applicantFirstName)
            }
            placeholder="Enter first name..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.applicantFirstName &&
              formik.errors.applicantFirstName}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography sx={{ mt: 2 }}>Middle Name</Typography>
        <FormControl fullWidth>
          <TextField
            margin="normal"
            id="applicantMiddleName"
            name="applicantMiddleName"
            type="text"
            value={formik.values.applicantMiddleName}
            onChange={formik.handleChange}
            placeholder="Enter middle name..."
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Last Name
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
            id="applicantLastName"
            name="applicantLastName"
            type="text"
            value={formik.values.applicantLastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.applicantLastName &&
              Boolean(formik.errors.applicantLastName)
            }
            placeholder="Enter last name..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.applicantLastName &&
              formik.errors.applicantLastName}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Facility
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
            id="applicantFacility"
            name="applicantFacility"
            type="text"
            value={formik.values.applicantFacility}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.applicantFacility &&
              Boolean(formik.errors.applicantFacility)
            }
            placeholder="Enter facility..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.applicantFacility &&
              formik.errors.applicantFacility}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Town/City
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
            id="applicantTownOrCity"
            name="applicantTownOrCity"
            type="text"
            value={formik.values.applicantTownOrCity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.applicantTownOrCity &&
              Boolean(formik.errors.applicantTownOrCity)
            }
            placeholder="Enter town/city..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.applicantTownOrCity &&
              formik.errors.applicantTownOrCity}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          County
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
            id="applicantCounty"
            name="applicantCounty"
            type="text"
            value={formik.values.applicantCounty}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.applicantCounty &&
              Boolean(formik.errors.applicantCounty)
            }
            placeholder="Enter county..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.applicantCounty && formik.errors.applicantCounty}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Country
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
            id="applicantCountry"
            name="applicantCountry"
            type="text"
            value={formik.values.applicantCountry}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.applicantCountry &&
              Boolean(formik.errors.applicantCountry)
            }
            placeholder="Enter country..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.applicantCountry && formik.errors.applicantCountry}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Date of Birth
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
              disableFuture
              value={dayjs(formik.values.applicantDateOfBirth)}
              onChange={(newValue) => {
                formik.setFieldValue("applicantDateOfBirth", newValue);
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.applicantDateOfBirth &&
                Boolean(formik.errors.applicantDateOfBirth)
              }
            />
          </LocalizationProvider>
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.applicantDateOfBirth &&
              formik.errors.applicantDateOfBirth}
          </Typography>
        </FormControl>
      </Grid>
      <ScrollToTop />
    </React.Fragment>
  );
};

export default StepOneForm;
