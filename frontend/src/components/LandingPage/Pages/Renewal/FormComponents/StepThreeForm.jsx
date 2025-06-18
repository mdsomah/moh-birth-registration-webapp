import React, { useEffect } from "react";
import {
  Typography,
  Grid,
  Box,
  TextField,
  IconButton,
  Tooltip,
  Button,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Chip,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import { LuAsterisk } from "react-icons/lu";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import CommentsEditor from "./FormEditors/CommentsEditor";
import PoliciesEditor from "./FormEditors/PoliciesEditor";

// Scroll to top of react route/page change
import ScrollToTop from "../../../../ScrollToTop/ScrollToTop";

// Formik and Yup
import { FormikProvider, FieldArray } from "formik";

const StepThreeForm = (props) => {
  // Destructure props
  const { formik } = props;

  // Document Types
  const DocumentTypes = [
    "Articles of Incorporation",
    "Business Registration",
    "Revenue Tax Receipt",
  ];

  // Equipment Types
  const EquiptmentTypes = [
    "Radio Station",
    "Television Station",
    "Satellite TV Cable",
  ];

  // Handle Date Of Last Registration
  const handleDateOfLastRegistration = (newValue) => {
    formik.setFieldValue("dateOfLastRegistration", newValue);
  };

  // Handle Document Type Change
  const handleEquipmentTypesChange = (_event, newValue) => {
    formik.setFieldValue("typeOfEquipments", newValue);
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
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography sx={{ mb: 2 }}>
            Give The Ministries And Agencies You Have Already Obtained Your
            Documents From
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormikProvider value={formik}>
            <FieldArray
              name="documents"
              render={(arrayHelpers) => {
                return (
                  <React.Fragment>
                    {formik.values.documents &&
                      formik.values.documents.map((_, index) => (
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
                              Type Of Document
                              <span>
                                <LuAsterisk size={10} color="#C41E3A" />
                              </span>
                            </Typography>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                              <Autocomplete
                                id={`documents[${index}].documentType`}
                                value={
                                  formik.values.documents[index].documentType
                                }
                                onChange={(_event, newValue) => {
                                  formik.setFieldValue(
                                    `documents[${index}].documentType`,
                                    newValue
                                  );
                                }}
                                onBlur={formik.handleBlur}
                                options={DocumentTypes}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    placeholder="Select document type..."
                                    error={
                                      formik?.touched?.documents?.[index]
                                        ?.documentType &&
                                      Boolean(
                                        formik?.errors?.documents?.[index]
                                          ?.documentType
                                      )
                                    }
                                  />
                                )}
                              />
                              <Typography
                                variant="inherit"
                                color="error.main"
                                sx={{ mt: 1 }}
                              >
                                {formik?.touched?.documents?.[index]
                                  ?.documentType &&
                                  formik?.errors?.documents?.[index]
                                    ?.documentType}
                              </Typography>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Typography>
                              Document Name
                              <span>
                                <LuAsterisk size={10} color="#C41E3A" />
                              </span>
                            </Typography>
                            <FormControl fullWidth>
                              <TextField
                                margin="normal"
                                id={`documents[${index}].documentName`}
                                name={`documents[${index}].documentName`}
                                type="file"
                                slotProps={{
                                  htmlInput: {
                                    accept: [
                                      "image/jpeg, image/jpg, image/png, image/jif",
                                    ],
                                  },
                                }}
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    `documents[${index}].documentName`,
                                    e.target.files[0]
                                  );
                                }}
                                onBlur={formik.handleBlur}
                                error={
                                  formik?.touched?.documents?.[index]
                                    ?.documentName &&
                                  Boolean(
                                    formik?.errors?.documents?.[index]
                                      ?.documentName
                                  )
                                }
                              />
                              <Typography variant="inherit" color="error.main">
                                {formik?.touched?.documents?.[index]
                                  ?.documentName &&
                                  formik?.errors?.documents?.[index]
                                    ?.documentName}
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
                    {formik.values.documents &&
                      formik.values.documents.length < 3 && (
                        <Button
                          variant="outlined"
                          sx={{ color: "#fff", bgcolor: "#DC143C" }}
                          onClick={() =>
                            arrayHelpers.push({
                              documentType: "",
                              documentName: "",
                            })
                          }
                        >
                          Add Document
                        </Button>
                      )}
                  </React.Fragment>
                );
              }}
            />
          </FormikProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography>
            Current Workforce
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              id="currentWorkForce"
              name="currentWorkForce"
              type="number"
              value={formik.values.currentWorkForce}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.currentWorkForce &&
                Boolean(formik.errors.currentWorkForce)
              }
              placeholder="Enter current workforce..."
            />
            <Typography variant="inherit" color="error.main">
              {formik.touched.currentWorkForce &&
                formik.errors.currentWorkForce}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography>
            Have You Register Your Institution With MICAT Before? If YES, Give
            The Date Of Your Last Registration The Reason
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              id="isInstitutionAlreadyRegister"
              name="isInstitutionAlreadyRegister"
              value={formik.values.isInstitutionAlreadyRegister}
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
        {formik.values.isInstitutionAlreadyRegister === "YES" && (
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography sx={{ mb: 2 }}>
              Date Of Last Registration
              <span>
                <LuAsterisk size={10} color="#C41E3A" />
              </span>
            </Typography>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(formik.values.dateOfLastRegistration)}
                  onChange={handleDateOfLastRegistration}
                />
              </LocalizationProvider>
              <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
                {formik.touched.dateOfLastRegistration &&
                  formik.errors.dateOfLastRegistration}
              </Typography>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography>
            Type Of Equipments
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Autocomplete
              id="typeOfEquipments"
              value={formik.values.typeOfEquipments}
              onChange={handleEquipmentTypesChange}
              onBlur={formik.handleBlur}
              multiple
              limitTags={2}
              autoHighlight
              options={EquiptmentTypes ?? []}
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
                  placeholder="Select one or more euipment type(s)..."
                  error={
                    formik.touched.typeOfEquipments &&
                    Boolean(formik.errors.typeOfEquipments)
                  }
                />
              )}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.typeOfEquipments &&
                formik.errors.typeOfEquipments}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography>
            Types of Frequency
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              id="typeOfFrequency"
              name="typeOfFrequency"
              type="text"
              value={formik.values.typeOfFrequency}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.typeOfFrequency &&
                Boolean(formik.errors.typeOfFrequency)
              }
              placeholder="Enter frequency type..."
            />
            <Typography variant="inherit" color="error.main">
              {formik.touched.typeOfFrequency && formik.errors.typeOfFrequency}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography>
            Type Of Communication Engaged
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              id="typeOfCommunicationEngaged"
              name="typeOfCommunicationEngaged"
              type="text"
              value={formik.values.typeOfCommunicationEngaged}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.typeOfCommunicationEngaged &&
                Boolean(formik.errors.typeOfCommunicationEngaged)
              }
              placeholder="Enter frequency type..."
            />
            <Typography variant="inherit" color="error.main">
              {formik.touched.typeOfCommunicationEngaged &&
                formik.errors.typeOfCommunicationEngaged}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography>
            Program Guide
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              id="programGuide"
              name="programGuide"
              type="text"
              value={formik.values.programGuide}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.programGuide &&
                Boolean(formik.errors.programGuide)
              }
              placeholder="Enter frequency type..."
            />
            <Typography variant="inherit" color="error.main">
              {formik.touched.programGuide && formik.errors.programGuide}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 7 }}>
          <Typography sx={{ mb: 2 }}>
            Comments
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormControl fullWidth>
            <CommentsEditor
              value={formik.values.comments}
              onChange={(event) => {
                formik.setFieldValue("comments", event);
              }}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 7 }}>
              {formik.touched.comments && formik.errors.comments}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography>
            Anticipated Rated
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              id="anticipatedRated"
              name="anticipatedRated"
              type="text"
              value={formik.values.anticipatedRated}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.anticipatedRated &&
                Boolean(formik.errors.anticipatedRated)
              }
              placeholder="Enter anticipated rated..."
            />
            <Typography variant="inherit" color="error.main">
              {formik.touched.anticipatedRated &&
                formik.errors.anticipatedRated}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography>
            Publication Schedule
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              id="publicationSchedule"
              name="publicationSchedule"
              type="text"
              value={formik.values.publicationSchedule}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.publicationSchedule &&
                Boolean(formik.errors.publicationSchedule)
              }
              placeholder="Enter publication schedule..."
            />
            <Typography variant="inherit" color="error.main">
              {formik.touched.publicationSchedule &&
                formik.errors.publicationSchedule}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography>Other</Typography>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              id="other"
              name="other"
              type="text"
              value={formik.values.other}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter frequency type..."
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography>
            What Kind Of Publication
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              id="kindOfPublication"
              name="kindOfPublication"
              type="text"
              value={formik.values.kindOfPublication}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.kindOfPublication &&
                Boolean(formik.errors.kindOfPublication)
              }
              placeholder="Enter frequency type..."
            />
            <Typography variant="inherit" color="error.main">
              {formik.touched.kindOfPublication &&
                formik.errors.kindOfPublication}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 7 }}>
          <Typography sx={{ mb: 2 }}>
            Briefly Comment On Your Institution Policy
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormControl fullWidth>
            <PoliciesEditor
              value={formik.values.institutionPolicy}
              onChange={(event) => {
                formik.setFieldValue("institutionPolicy", event);
              }}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 7 }}>
              {formik.touched.institutionPolicy &&
                formik.errors.institutionPolicy}
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
      <ScrollToTop />
    </React.Fragment>
  );
};

export default StepThreeForm;
