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
  Autocomplete,
} from "@mui/material";
import { LuAsterisk } from "react-icons/lu";
import { BsFillInfoCircleFill } from "react-icons/bs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import StepTwoPhoneInputField from "../PhoneInputsField/StepTwoPhoneInputField";
import { Country_Lists } from "./CountryLists/CountryLists";

//? Scroll to top of react route/page change
import ScrollToTop from "../../../../ScrollToTop/ScrollToTop";

const StepTwoForm = (props) => {
  //? Destructure props
  const { formik } = props;

  //? Handle Step Two Country Change
  const handleStepTwoCountryChange = (_e, newValue) => {
    const { label } = newValue || {};
    formik.setFieldValue("fatherCountry", label);
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
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Father's Name
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
            id="fatherName"
            name="fatherName"
            type="text"
            value={formik.values.fatherName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.fatherName && Boolean(formik.errors.fatherName)
            }
            placeholder="Enter father's name..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.fatherName && formik.errors.fatherName}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Father's Nationality
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
            id="fatherNationality"
            name="fatherNationality"
            type="text"
            value={formik.values.fatherNationality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.fatherNationality &&
              Boolean(formik.errors.fatherNationality)
            }
            placeholder="Enter father's nationality..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.fatherNationality &&
              formik.errors.fatherNationality}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
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
            id="fatherAge"
            name="fatherAge"
            type="number"
            value={formik.values.fatherAge}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fatherAge && Boolean(formik.errors.fatherAge)}
            placeholder="Enter father's age..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.fatherAge && formik.errors.fatherAge}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Father's Town/City
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
            id="fatherTownOrCity"
            name="fatherTownOrCity"
            type="text"
            value={formik.values.fatherTownOrCity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.fatherTownOrCity &&
              Boolean(formik.errors.fatherTownOrCity)
            }
            placeholder="Enter father's town/city..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.fatherTownOrCity && formik.errors.fatherTownOrCity}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Father's County
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
            id="fatherCounty"
            name="fatherCounty"
            type="text"
            value={formik.values.fatherCounty}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.fatherCounty && Boolean(formik.errors.fatherCounty)
            }
            placeholder="Enter father's county..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.fatherCounty && formik.errors.fatherCounty}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Father's Country
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
            id="fatherCountry"
            value={formik.values.fatherCountry}
            onChange={handleStepTwoCountryChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.fatherCountry &&
              Boolean(formik.errors.fatherCountry)
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
                placeholder="Select father's country..."
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "country",
                }}
              />
            )}
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.fatherCountry && formik.errors.fatherCountry}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography sx={{ mt: 1 }}>
          Father's County of Origin
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
            id="fatherCountyOfOrigin"
            name="fatherCountyOfOrigin"
            type="text"
            value={formik.values.fatherCountyOfOrigin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.fatherCountyOfOrigin &&
              Boolean(formik.errors.fatherCountyOfOrigin)
            }
            placeholder="Enter father's county of origin..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.fatherCountyOfOrigin &&
              formik.errors.fatherCountyOfOrigin}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Father's Occupation
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
            id="fatherOccupation"
            name="fatherOccupation"
            type="text"
            value={formik.values.fatherOccupation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.fatherOccupation &&
              Boolean(formik.errors.fatherOccupation)
            }
            placeholder="Enter father's occupation..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.fatherOccupation && formik.errors.fatherOccupation}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography sx={{ mt: 1, mb: 2 }}>
          Father's Date of Naturalization
        </Typography>
        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
              value={dayjs(formik.values.fatherDateOfNaturalization)}
              onChange={(newValue) => {
                formik.setFieldValue("fatherDateOfNaturalization", newValue);
              }}
            />
          </LocalizationProvider>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography sx={{ mt: 3 }}>
          Is Father Living? (YES or NO). If YES, please give father's present
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
            id="isFatherLiving"
            clearOnEscape
            value={formik.values.isFatherLiving}
            onBlur={formik.handleBlur}
            error={
              formik.touched.isFatherLiving &&
              Boolean(formik.errors.isFatherLiving)
            }
            onChange={(_event, newValue) => {
              formik.setFieldValue("isFatherLiving", newValue);
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
            {formik.touched.isFatherLiving && formik.errors.isFatherLiving}
          </Typography>
        </FormControl>
      </Grid>
      {formik.values.isFatherLiving === "YES" && (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography sx={{ mt: 2 }}>
            Father's Present Address
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
              id="fatherPresentAddress"
              name="fatherPresentAddress"
              type="text"
              value={formik.values.fatherPresentAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.fatherPresentAddress &&
                Boolean(formik.errors.fatherPresentAddress)
              }
              placeholder="Enter father's present address..."
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formik.touched.fatherPresentAddress &&
                formik.errors.fatherPresentAddress}
            </Typography>
          </FormControl>
        </Grid>
      )}
      {formik.values.isFatherLiving === "YES" && (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography>
            Father's Telephone Number
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
              <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
                {formik.touched.fatherTelephoneNumber &&
                  formik.errors.fatherTelephoneNumber}
              </Typography>
            </FormControl>
          </FormControl>
        </Grid>
      )}
      <ScrollToTop />
    </React.Fragment>
  );
};

export default StepTwoForm;
