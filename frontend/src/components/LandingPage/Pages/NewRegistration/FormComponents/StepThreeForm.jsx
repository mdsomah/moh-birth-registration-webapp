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
import { LuAsterisk } from "react-icons/lu";
import { BsFillInfoCircleFill } from "react-icons/bs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import StepThreePhoneInputField from "../PhoneInputsField/StepThreePhoneInputField";
import { Country_Lists } from "./CountryLists/CountryLists";

//? Scroll to top of react route/page change
import ScrollToTop from "../../../../ScrollToTop/ScrollToTop";

const StepThreeForm = (props) => {
  //? Destructure props
  const { formik } = props;

  //? Handle Step Three Country Change
  const handleStepThreeCountryChange = (_e, newValue) => {
    const { label } = newValue || {};
    formik.setFieldValue("motherCountry", label);
  };

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
        sx={{
          mb: 3,
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        Mother's Information
      </Typography>
      <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Typography>
            Mother's Name
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
              id="motherName"
              name="motherName"
              type="text"
              value={formik.values.motherName.toUpperCase()}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.motherName && Boolean(formik.errors.motherName)
              }
              placeholder="Enter mother's name..."
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.motherName && formik.errors.motherName}
            </Typography>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Typography>
            Mother's Nationality
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
              id="motherNationality"
              name="motherNationality"
              type="text"
              value={formik.values.motherNationality.toUpperCase()}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.motherNationality &&
                Boolean(formik.errors.motherNationality)
              }
              placeholder="Enter mother's nationality..."
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.motherNationality &&
                formik.errors.motherNationality}
            </Typography>
          </FormControl>
        </Grid>
      </Box>
      <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Typography>
            Age When Child Was Born
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
              id="motherAge"
              name="motherAge"
              type="number"
              value={formik.values.motherAge}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.motherAge && Boolean(formik.errors.motherAge)
              }
              placeholder="Enter mother's age..."
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.motherAge && formik.errors.motherAge}
            </Typography>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Typography>
            Mother's Town/City
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
              id="motherTownOrCity"
              name="motherTownOrCity"
              type="text"
              value={formik.values.motherTownOrCity.toUpperCase()}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.motherTownOrCity &&
                Boolean(formik.errors.motherTownOrCity)
              }
              placeholder="Enter mother's town/city..."
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.motherTownOrCity &&
                formik.errors.motherTownOrCity}
            </Typography>
          </FormControl>
        </Grid>
      </Box>
      <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Typography>
            Mother's County
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
              id="motherCounty"
              name="motherCounty"
              type="text"
              value={formik.values.motherCounty.toUpperCase()}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.motherCounty &&
                Boolean(formik.errors.motherCounty)
              }
              placeholder="Enter mother's county..."
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.motherCounty && formik.errors.motherCounty}
            </Typography>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Typography>
            Mother's Country
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
          <FormControl fullWidth sx={{ mt: 2 }}>
            <Autocomplete
              id="motherCountry"
              value={formik.values.motherCountry.toUpperCase()}
              onChange={handleStepThreeCountryChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.motherCountry &&
                Boolean(formik.errors.motherCountry)
              }
              options={Country_Lists ?? []}
              filterSelectedOptions={true}
              isOptionEqualToValue={(option, value) =>
                option?.label === value?.label
              }
              autoHighlight
              getOptionLabel={(option) => option?.label ?? option}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                  key={option?.code}
                >
                  <img
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    alt="Country Flag"
                  />
                  {option?.label} {option?.code} +{option?.phone}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select mother's country..."
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "country",
                  }}
                />
              )}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.motherCountry && formik.errors.motherCountry}
            </Typography>
          </FormControl>
        </Grid>
      </Box>
      <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Typography sx={{ mt: 1 }}>
            Mother's County of Origin
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
              id="motherCountyOfOrigin"
              name="motherCountyOfOrigin"
              type="text"
              value={formik.values.motherCountyOfOrigin.toUpperCase()}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.motherCountyOfOrigin &&
                Boolean(formik.errors.motherCountyOfOrigin)
              }
              placeholder="Enter mother's county of origin..."
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.motherCountyOfOrigin &&
                formik.errors.motherCountyOfOrigin}
            </Typography>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Typography sx={{ mb: 1 }}>
            Mother's Occupation
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
              id="motherOccupation"
              name="motherOccupation"
              type="text"
              value={formik.values.motherOccupation.toUpperCase()}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.motherOccupation &&
                Boolean(formik.errors.motherOccupation)
              }
              placeholder="Enter mother's occupation..."
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.motherOccupation &&
                formik.errors.motherOccupation}
            </Typography>
          </FormControl>
        </Grid>
      </Box>
      <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Typography sx={{ mt: 1, mb: 2 }}>
            Mother's Date of Naturalization
          </Typography>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                value={dayjs(formik.values.motherDateOfNaturalization)}
                onChange={(newValue) => {
                  formik.setFieldValue("motherDateOfNaturalization", newValue);
                }}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Typography sx={{ mt: 1 }}>
            Is Mother Living? (YES or NO). If YES, please give father's present
            address and telephone number
            <span>
              <LuAsterisk size={10} color="#C41E3A" />
            </span>
          </Typography>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              id="isMotherLiving"
              name="isMotherLiving"
              value={formik.values.isMotherLiving}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.isMotherLiving &&
                Boolean(formik.errors.isMotherLiving)
              }
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
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.isMotherLiving && formik.errors.isMotherLiving}
            </Typography>
          </FormControl>
        </Grid>
        {/* <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Typography sx={{ mt: 3 }}>
            Is Mother Living? (YES or NO). If YES, please give father's present
            address and telephone number
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
              id="isMotherLiving"
              clearOnEscape
              value={formik.values.isMotherLiving}
              onBlur={formik.handleBlur}
              error={
                formik.touched.isMotherLiving &&
                Boolean(formik.errors.isMotherLiving)
              }
              onChange={(_event, newValue) => {
                formik.setFieldValue("isMotherLiving", newValue);
              }}
              options={["YES", "NO"]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  placeholder="Select YES or NO..."
                />
              )}
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.isMotherLiving && formik.errors.isMotherLiving}
            </Typography>
          </FormControl>
        </Grid> */}
      </Box>
      {formik.values.isMotherLiving === "YES" && (
        <Box sx={{ display: { md: "flex", lg: "flex" }, gap: 2, mt: 3 }}>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Typography sx={{ mt: 2 }}>
              Mother's Present Address
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
                id="motherPresentAddress"
                name="motherPresentAddress"
                type="text"
                value={formik.values.motherPresentAddress.toUpperCase()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.motherPresentAddress &&
                  Boolean(formik.errors.motherPresentAddress)
                }
                placeholder="Enter mother's present address..."
              />
              <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
                {formik.touched.motherPresentAddress &&
                  formik.errors.motherPresentAddress}
              </Typography>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Typography sx={{ mt: 2 }}>
              Mother's Telephone Number
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
                <StepThreePhoneInputField formik={formik} />
                <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
                  {formik.touched.motherTelephoneNumber &&
                    formik.errors.motherTelephoneNumber}
                </Typography>
              </FormControl>
            </FormControl>
          </Grid>
        </Box>
      )}
      <ScrollToTop />
    </React.Fragment>
  );
};

export default StepThreeForm;
