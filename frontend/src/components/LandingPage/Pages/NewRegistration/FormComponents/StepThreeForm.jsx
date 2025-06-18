import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { BsFillInfoCircleFill } from "react-icons/bs";
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

// Get All Datas
import GetAllData from "../../../../../apis/GetAllData";

// Endpoints
const getAllDocumentTypesURL = "/document-types";
const getAllEquipmentTypesURL = "/equipment-types";
const getAllFrrquencyTypesURL = "/frequency-types";
const getAllCommunicationTypesURL = "/communication-types";
const getAllProgramGuidesURL = "/program-guides";
const getAllPublicationSchedulesURL = "/publication-schedules";
const getAllPublicationsURL = "/publications";

const StepThreeForm = (props) => {
  // Destructure props
  const { formik, setTypeOfEquipments } = props;

  // Destructure useQuery
  const { data: documentTypesData } = useQuery({
    queryKey: ["documentTypesData"],
    queryFn: () => GetAllData(`${getAllDocumentTypesURL}`),
  });

  const { data: equipmentTypesData } = useQuery({
    queryKey: ["equpmentTypesData"],
    queryFn: () => GetAllData(`${getAllEquipmentTypesURL}`),
  });

  const { data: frequencyTypesData } = useQuery({
    queryKey: ["frequencyTypesData"],
    queryFn: () => GetAllData(`${getAllFrrquencyTypesURL}`),
  });

  const { data: communicationTypesData } = useQuery({
    queryKey: ["communicationTypesData"],
    queryFn: () => GetAllData(`${getAllCommunicationTypesURL}`),
  });

  const { data: programGuidesData } = useQuery({
    queryKey: ["programGuidesData"],
    queryFn: () => GetAllData(`${getAllProgramGuidesURL}`),
  });

  const { data: publicationSchedulesData } = useQuery({
    queryKey: ["publicationSchedulesData"],
    queryFn: () => GetAllData(`${getAllPublicationSchedulesURL}`),
  });

  const { data: publicationsData } = useQuery({
    queryKey: ["publicationsData"],
    queryFn: () => GetAllData(`${getAllPublicationsURL}`),
  });

  // Handle Date Of Last Registration
  const handleDateOfLastRegistration = (newValue) => {
    formik.setFieldValue("dateOfLastRegistration", newValue);
  };

  // Handle Document Type Change
  const handleEquipmentTypesChange = (_event, newValue) => {
    formik.setFieldValue("equipments", newValue);

    if (
      newValue.find((value) =>
        equipmentTypesData?.find(
          (equipment) => equipment?.equipmentType === value
        )
      )
    ) {
      setTypeOfEquipments(
        newValue.map((value) => {
          const typeOfEquipmentID = equipmentTypesData?.find(
            (equipment) => equipment?.equipmentType === value
          );

          return {
            typeOfEquipmentID: typeOfEquipmentID?.id,
            equipmentType: `${value}`,
          };
        })
      );
    } else {
      setTypeOfEquipments([]);
    }
  };

  // Handle Frequency Type Change
  const handleFrequencyTypeChange = (_event, newValue) => {
    const { frequencyType } = newValue ?? "";

    // TypeOfFrequencyID
    const typeOfFrequencyID = frequencyTypesData?.find(
      (frequency) => frequency?.frequencyType === frequencyType
    );

    formik.setFieldValue(
      "typeOfFrequency.typeOfFrequencyID",
      typeOfFrequencyID?.id
    );
    formik.setFieldValue("typeOfFrequency.frequencyType", frequencyType);
  };

  // Handle Communication Type Change
  const handleCommunicationTypeChange = (_event, newValue) => {
    const { communicationType } = newValue ?? "";

    // TypeOfCommunicationEngageID
    const typeOfCommunicationEngageID = communicationTypesData?.find(
      (communication) => communication?.communicationType === communicationType
    );

    formik.setFieldValue(
      "typeOfCommunicationEngage.typeOfCommunicationEngageID",
      typeOfCommunicationEngageID?.id
    );
    formik.setFieldValue(
      "typeOfCommunicationEngage.communicationType",
      communicationType
    );
  };

  // Handle Program Guide Change
  const handleProgramGuideChange = (_event, newValue) => {
    const { programGudieName } = newValue ?? "";

    // ProgramGuideID
    const programGuideID = programGuidesData?.find(
      (program) => program?.programGudieName === programGudieName
    );

    formik.setFieldValue("programGuide.programGuideID", programGuideID?.id);
    formik.setFieldValue("programGuide.programGudieName", programGudieName);
  };

  // Handle Publication Schedule Change
  const handlePublicationScheduleChange = (_event, newValue) => {
    const { scheduleName } = newValue ?? "";

    // PublicationScheduleID
    const publicationScheduleID = publicationSchedulesData?.find(
      (publication) => publication?.scheduleName === scheduleName
    );

    formik.setFieldValue(
      "publicationSchedule.publicationScheduleID",
      publicationScheduleID?.id
    );
    formik.setFieldValue("publicationSchedule.scheduleName", scheduleName);
  };

  // Handle Publication Change
  const handlePublicationChange = (_event, newValue) => {
    const { publicationName } = newValue ?? "";

    // KindOfPublicationID
    const kindOfPublicationID = publicationsData?.find(
      (publication) => publication?.publicationName === publicationName
    );

    formik.setFieldValue(
      "kindOfPublication.kindOfPublicationID",
      kindOfPublicationID?.id
    );
    formik.setFieldValue("kindOfPublication.publicationName", publicationName);
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
          <Typography sx={{ mb: 2, color: "#4169E1" }}>
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
                      formik.values.documents.map((document, index) => (
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
                            <FormControl fullWidth sx={{ mt: 2 }}>
                              <Autocomplete
                                id={`documents[${index}].documentType`}
                                value={
                                  formik.values.documents[index].documentType
                                }
                                onChange={(_event, newValue) => {
                                  const { documentType } = newValue ?? "";

                                  formik.setFieldValue(
                                    `documents[${index}].documentType`,
                                    documentType
                                  );

                                  const documentTypeId =
                                    documentTypesData?.find(
                                      (document) =>
                                        document?.documentType === documentType
                                    );

                                  formik.setFieldValue("documentTypeIds", [
                                    documentTypeId?.id,
                                  ]);
                                }}
                                onBlur={formik.handleBlur}
                                options={documentTypesData ?? []}
                                getOptionLabel={(option) =>
                                  option?.documentType || option
                                }
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
                                      {option?.documentType}
                                    </Box>
                                  );
                                }}
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
                          sx={{ color: "#fff", bgcolor: "buttonBGColor.main" }}
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
          <Typography sx={{ mb: 2 }}>
            Type Of Equipments
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
            <Autocomplete
              id="equipments"
              value={formik.values.equipments}
              onChange={handleEquipmentTypesChange}
              onBlur={formik.handleBlur}
              multiple
              limitTags={2}
              autoHighlight
              options={
                equipmentTypesData?.map(
                  (equipment) => equipment?.equipmentType
                ) ?? []
              }
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
                    formik?.touched?.equipments &&
                    Boolean(formik?.errors?.equipments)
                  }
                />
              )}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik?.touched?.equipments && formik?.errors?.equipments}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography sx={{ mb: 2 }}>
            Types of Frequency
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
            <Autocomplete
              id="typeOfFrequency.frequencyType"
              value={formik.values.typeOfFrequency.frequencyType}
              onChange={handleFrequencyTypeChange}
              onBlur={formik.handleBlur}
              options={frequencyTypesData ?? []}
              getOptionLabel={(option) => option?.frequencyType || option}
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
                    {option?.frequencyType}
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select frequency type..."
                  error={
                    formik?.touched?.typeOfFrequency?.frequencyType &&
                    Boolean(formik?.errors?.typeOfFrequency?.frequencyType)
                  }
                />
              )}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik?.touched?.typeOfFrequency?.frequencyType &&
                formik?.errors?.typeOfFrequency?.frequencyType}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography sx={{ mb: 2 }}>
            Type Of Communication Engaged
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
            <Autocomplete
              id="typeOfCommunicationEngage.communicationType"
              value={formik.values.typeOfCommunicationEngage.communicationType}
              onChange={handleCommunicationTypeChange}
              onBlur={formik.handleBlur}
              options={communicationTypesData ?? []}
              getOptionLabel={(option) => option?.communicationType || option}
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
                    {option?.communicationType}
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select communication engaged type..."
                  error={
                    formik?.touched?.typeOfCommunicationEngage
                      ?.communicationType &&
                    Boolean(
                      formik?.errors?.typeOfCommunicationEngage
                        ?.communicationType
                    )
                  }
                />
              )}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik?.touched?.typeOfCommunicationEngage?.communicationType &&
                formik?.errors?.typeOfCommunicationEngage?.communicationType}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography sx={{ mb: 2 }}>
            Program Guide
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
            <Autocomplete
              id="programGuide.programGudieName"
              value={formik.values.programGuide.programGudieName}
              onChange={handleProgramGuideChange}
              onBlur={formik.handleBlur}
              options={programGuidesData ?? []}
              getOptionLabel={(option) => option?.programGudieName || option}
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
                    {option?.programGudieName}
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select program guide..."
                  error={
                    formik?.touched?.programGuide?.programGudieName &&
                    Boolean(formik?.errors?.programGuide?.programGudieName)
                  }
                />
              )}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik?.touched?.programGuide?.programGudieName &&
                formik?.errors?.programGuide?.programGudieName}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 7 }}>
          <Typography sx={{ mb: 2 }}>Comments</Typography>
          <FormControl fullWidth>
            <CommentsEditor
              value={formik.values.comments}
              onChange={(event) => {
                formik.setFieldValue("comments", event);
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography sx={{ mb: 2 }}>
            Publication Schedule
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
            <Autocomplete
              id="publicationSchedule.scheduleName"
              value={formik.values.publicationSchedule.scheduleName}
              onChange={handlePublicationScheduleChange}
              onBlur={formik.handleBlur}
              options={publicationSchedulesData ?? []}
              getOptionLabel={(option) => option?.scheduleName || option}
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
                    {option?.scheduleName}
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select publication schedule..."
                  error={
                    formik?.touched?.publicationSchedule?.scheduleName &&
                    Boolean(formik?.errors?.publicationSchedule?.scheduleName)
                  }
                />
              )}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik?.touched?.publicationSchedule?.scheduleName &&
                formik?.errors?.publicationSchedule?.scheduleName}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Typography sx={{ mb: 1 }}>Other</Typography>
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
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography sx={{ mb: 2 }}>
            What Kind Of Publication
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
            <Autocomplete
              id="kindOfPublication.publicationName"
              value={formik.values.kindOfPublication.publicationName}
              onChange={handlePublicationChange}
              onBlur={formik.handleBlur}
              options={publicationsData ?? []}
              getOptionLabel={(option) => option?.publicationName || option}
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
                    {option?.publicationName}
                  </Box>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select publication..."
                  error={
                    formik?.touched?.kindOfPublication?.publicationName &&
                    Boolean(formik?.errors?.kindOfPublication?.publicationName)
                  }
                />
              )}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik?.touched?.kindOfPublication?.publicationName &&
                formik?.errors?.kindOfPublication?.publicationName}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 7 }}>
          <Typography sx={{ mb: 2 }}>
            Briefly Comment On Your Institution Policy
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
