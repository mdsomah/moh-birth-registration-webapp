import React, { useEffect } from "react";
import {
  Typography,
  Grid,
  Box,
  TextField,
  IconButton,
  Tooltip,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { LuAsterisk } from "react-icons/lu";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import StepTwoPhoneInputField from "../PhoneInputsField/StepTwoPhoneInputField";

// Scroll to top of react route/page change
import ScrollToTop from "../../../../ScrollToTop/ScrollToTop";

// Formik and Yup
import { FormikProvider, FieldArray } from "formik";

const StepTwoForm = (props) => {
  // Destructure props
  const { formik } = props;

  // Handle Date Of Establishment
  const handleDateOfExtablishment = (newValue) => {
    formik.setFieldValue("dateOfEstablishment", newValue);
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
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography sx={{ mb: 2 }}>
            Date Of Establishment
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
                value={dayjs(formik.values.dateOfEstablishment)}
                onChange={handleDateOfExtablishment}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography>
            Are You A Member Of The Press Union Of Liberia? If NO, State The
            Reason
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
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              id="isMemberOfPUL"
              name="isMemberOfPUL"
              value={formik.values.isMemberOfPUL}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="YES"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 28,
                      },
                    }}
                  />
                }
                label="YES"
              />
              <FormControlLabel
                value="NO"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 28,
                      },
                    }}
                  />
                }
                label="NO"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {formik.values.isMemberOfPUL === "NO" && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography>
              Reason
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
                id="ifNoStateReason"
                name="ifNoStateReason"
                type="text"
                value={formik.values.ifNoStateReason}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.ifNoStateReason &&
                  Boolean(formik.errors.ifNoStateReason)
                }
                placeholder="Enter reason..."
              />
              <Typography variant="inherit" color="error.main">
                {formik.touched.ifNoStateReason &&
                  formik.errors.ifNoStateReason}
              </Typography>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography>
            Name Of Editor - In - Chief / Manager
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
              id="nameOfEditorInChief"
              name="nameOfEditorInChief"
              type="text"
              value={formik.values.nameOfEditorInChief}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.nameOfEditorInChief &&
                Boolean(formik.errors.nameOfEditorInChief)
              }
              placeholder="Enter name of editor - in - chief/manager..."
            />
            <Typography variant="inherit" color="error.main">
              {formik.touched.nameOfEditorInChief &&
                formik.errors.nameOfEditorInChief}
            </Typography>
          </FormControl>
        </Grid>
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
          <FormControl fullWidth>
            <FormControl sx={{ width: "100%" }}>
              <StepTwoPhoneInputField formik={formik} />
              <Typography variant="inherit" color="error.main">
                {formik.touched.phoneNumberOfEditorInChief &&
                  formik.errors.phoneNumberOfEditorInChief}
              </Typography>
            </FormControl>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography>
            Job Experience
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
              id="jobExperienceOfEditorInChief"
              name="jobExperienceOfEditorInChief"
              type="number"
              value={formik.values.jobExperienceOfEditorInChief}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.jobExperienceOfEditorInChief &&
                Boolean(formik.errors.jobExperienceOfEditorInChief)
              }
              placeholder="Enter job experience..."
            />
            <Typography variant="inherit" color="error.main">
              {formik.touched.jobExperienceOfEditorInChief &&
                formik.errors.jobExperienceOfEditorInChief}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography sx={{ mb: 2, color: "#4169E1" }}>
            Name Of Essential Staff And Positions
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormikProvider value={formik}>
            <FieldArray
              name="essentialStaffs"
              render={(arrayHelpers) => {
                return (
                  <React.Fragment>
                    {formik.values.essentialStaffs &&
                      formik.values.essentialStaffs.map((_, index) => (
                        <Box
                          sx={{
                            display: "flex",
                            gap: "1rem",
                            mb: 3,
                          }}
                          key={index}
                        >
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Typography>
                              Full Name
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
                              <TextField
                                margin="normal"
                                id={`essentialStaffs[${index}].fullName`}
                                name={`essentialStaffs[${index}].fullName`}
                                type="text"
                                value={
                                  formik.values.essentialStaffs[index].fullName
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                  formik?.touched?.essentialStaffs?.[index]
                                    ?.fullName &&
                                  Boolean(
                                    formik?.errors?.essentialStaffs?.[index]
                                      ?.fullName
                                  )
                                }
                                placeholder="Enter full name..."
                              />
                              <Typography variant="inherit" color="error.main">
                                {formik?.touched?.essentialStaffs?.[index]
                                  ?.fullName &&
                                  formik?.errors?.essentialStaffs?.[index]
                                    ?.fullName}
                              </Typography>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Typography>
                              Position
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
                              <TextField
                                margin="normal"
                                id={`essentialStaffs[${index}].position`}
                                name={`essentialStaffs[${index}].position`}
                                type="text"
                                value={
                                  formik.values.essentialStaffs[index].position
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                  formik?.touched?.essentialStaffs?.[index]
                                    ?.position &&
                                  Boolean(
                                    formik?.errors?.essentialStaffs?.[index]
                                      ?.position
                                  )
                                }
                                placeholder="Enter position..."
                              />
                              <Typography variant="inherit" color="error.main">
                                {formik?.touched?.essentialStaffs?.[index]
                                  ?.position &&
                                  formik?.errors?.essentialStaffs?.[index]
                                    ?.position}
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
                    {formik.values.essentialStaffs &&
                      formik.values.essentialStaffs.length < 4 && (
                        <Button
                          variant="outlined"
                          sx={{ color: "#fff", bgcolor: "buttonBGColor.main" }}
                          onClick={() =>
                            arrayHelpers.push({
                              fullName: "",
                              position: "",
                            })
                          }
                        >
                          Add Staff
                        </Button>
                      )}
                  </React.Fragment>
                );
              }}
            />
          </FormikProvider>
        </Grid>
      </Grid>
      <ScrollToTop />
    </React.Fragment>
  );
};

export default StepTwoForm;
