import React, { useState, useEffect, useCallback } from "react";
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
  Badge,
  Avatar,
} from "@mui/material";
import { LuAsterisk } from "react-icons/lu";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ApplicantSignature from "./SignatureDialog/ApplicantSignature";
import FinalStepPhoneInputField from "../PhoneInputsField/FinalStepPhoneInputField";
import FinalStepContactPhoneInputField from "../PhoneInputsField/FinalStepContactPhoneInputField";

//? Upload Guardian Photo
import UploadGuardianPhoto from "../UploadGuardianPhoto/UploadGuardianPhoto";

//? Scroll to top of react route/page change
import ScrollToTop from "../../../../ScrollToTop/ScrollToTop";

const FinalStepForm = (props) => {
  //? Destructure props
  const { formik } = props;

  //? Guardian Photo State
  const [openGuardianPhoto, setOpenGuardianPhoto] = useState(false);

  //? Guardian Photo Dialog Functions
  const handleOpenGuardianPhoto = () => {
    setOpenGuardianPhoto(true);
  };

  const handleCloseGuardianPhoto = useCallback(() => {
    setOpenGuardianPhoto(false);
  }, []);

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
      <Typography
        sx={{ mb: 3, textAlign: "center", fontSize: 18, fontWeight: 700 }}
      >
        ATTESTATION
      </Typography>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
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
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.applicantSignature &&
              formik.errors.applicantSignature}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Contact Number
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
          <FormControl sx={{ width: "100%" }}>
            <FinalStepPhoneInputField formik={formik} />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.applicantContactNumber &&
                formik.errors.applicantContactNumber}
            </Typography>
          </FormControl>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Full Name
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
            id="fullName"
            name="fullName"
            type="text"
            value={formik.values.fullName.toUpperCase()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            placeholder="Enter full name..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.fullName && formik.errors.fullName}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          City
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
            id="city"
            name="city"
            type="text"
            value={formik.values.city.toUpperCase()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && Boolean(formik.errors.city)}
            placeholder="Enter city..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.city && formik.errors.city}
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
            id="county"
            name="county"
            type="text"
            value={formik.values.county.toUpperCase()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.county && Boolean(formik.errors.county)}
            placeholder="Enter county..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.county && formik.errors.county}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Mother Name
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
            id="motherFullName"
            name="motherFullName"
            type="text"
            value={formik.values.motherFullName.toUpperCase()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.motherFullName &&
              Boolean(formik.errors.motherFullName)
            }
            placeholder="Enter mother's full name..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.motherFullName && formik.errors.motherFullName}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Father Name
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
            id="fatherFullName"
            name="fatherFullName"
            type="text"
            value={formik.values.fatherFullName.toUpperCase()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.fatherFullName &&
              Boolean(formik.errors.fatherFullName)
            }
            placeholder="Enter father's full name..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.fatherFullName && formik.errors.fatherFullName}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
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
              value={dayjs(formik.values.date)}
              onChange={(newValue) => {
                formik.setFieldValue("date", newValue);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.date && Boolean(formik.errors.date)}
            />
          </LocalizationProvider>
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.date && formik.errors.date}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          City/Town
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
            id="cityOrTown"
            name="cityOrTown"
            type="text"
            value={formik.values.cityOrTown.toUpperCase()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.cityOrTown && Boolean(formik.errors.cityOrTown)
            }
            placeholder="Enter city/town"
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.cityOrTown && formik.errors.cityOrTown}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Name
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
            id="name"
            name="name"
            type="text"
            value={formik.values.name.toUpperCase()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            placeholder="Enter name..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.name && formik.errors.name}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Address
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
            id="address"
            name="address"
            type="text"
            value={formik.values.address.toUpperCase()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && Boolean(formik.errors.address)}
            placeholder="Enter address..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.address && formik.errors.address}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Relationship
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
            id="relationship"
            name="relationship"
            type="text"
            value={formik.values.relationship.toUpperCase()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.relationship && Boolean(formik.errors.relationship)
            }
            placeholder="Enter relationship..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.relationship && formik.errors.relationship}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Contact
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
          <FormControl sx={{ width: "100%" }}>
            <FinalStepContactPhoneInputField formik={formik} />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.contactNumber && formik.errors.contactNumber}
            </Typography>
          </FormControl>
        </FormControl>
      </Grid>
      {formik.values.parentOrGuardianPhoto !== "" && (
        <Box sx={{ mt: 3 }}>
          <Badge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <Tooltip title="Upload Photo" placement="right" arrow>
                <IconButton onClick={handleOpenGuardianPhoto}>
                  <FaCamera size={30} />
                </IconButton>
              </Tooltip>
            }
          >
            <Avatar
              alt=""
              src={formik.values.parentOrGuardianPhoto.preview}
              variant="square"
              sx={{
                width: 140,
                height: 140,
              }}
              slotProps={{
                img: { loading: "lazy" },
              }}
            />
          </Badge>
        </Box>
      )}

      {formik.values.parentOrGuardianPhoto === "" && (
        <Box sx={{ mt: 3 }}>
          <Badge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <Tooltip title="Upload Photo" placement="right" arrow>
                <IconButton onClick={handleOpenGuardianPhoto}>
                  <FaCamera size={30} />
                </IconButton>
              </Tooltip>
            }
          >
            <Avatar
              alt=""
              src=""
              variant="square"
              sx={{
                width: 200,
                height: 200,
              }}
              slotProps={{
                img: { loading: "lazy" },
              }}
            >
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 500,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                PHOTO OF PARENT OR GUARDIAN
              </Typography>
            </Avatar>
          </Badge>
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.parentOrGuardianPhoto &&
              formik.errors.parentOrGuardianPhoto}
          </Typography>
        </Box>
      )}
      <ScrollToTop />
      {/* Start UploadApplicantPhoto Dialog */}
      <UploadGuardianPhoto
        open={openGuardianPhoto}
        handleClose={handleCloseGuardianPhoto}
        formik={formik}
      />
      {/* End UploadApplicantPhoto Dialog */}
    </React.Fragment>
  );
};

export default FinalStepForm;
