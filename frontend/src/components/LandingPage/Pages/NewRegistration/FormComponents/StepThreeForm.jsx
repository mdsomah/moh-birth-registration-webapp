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
import { BsFillInfoCircleFill } from "react-icons/bs";
import { LuAsterisk } from "react-icons/lu";
import StepThreePhoneInputField from "../PhoneInputsField/StepThreePhoneInputField";

//? Scroll to top of react route/page change
import ScrollToTop from "../../../../ScrollToTop/ScrollToTop";

const StepThreeForm = (props) => {
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
            value={formik.values.motherName}
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
      <Grid item xs={12} sm={12} md={12} lg={12}>
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
            value={formik.values.motherNationality}
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
            id="motherAge"
            name="motherAge"
            type="number"
            value={formik.values.motherAge}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.motherAge && Boolean(formik.errors.motherAge)}
            placeholder="Enter age..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.motherAge && formik.errors.motherAge}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
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
            value={formik.values.motherTownOrCity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.motherTownOrCity &&
              Boolean(formik.errors.motherTownOrCity)
            }
            placeholder="Enter facility..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.motherTownOrCity && formik.errors.motherTownOrCity}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
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
            value={formik.values.motherCounty}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.motherCounty && Boolean(formik.errors.motherCounty)
            }
            placeholder="Enter county..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.motherCounty && formik.errors.motherCounty}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
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
        <FormControl fullWidth>
          <TextField
            margin="normal"
            id="motherCountry"
            name="motherCountry"
            type="text"
            value={formik.values.motherCountry}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.motherCountry &&
              Boolean(formik.errors.motherCountry)
            }
            placeholder="Enter country..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.motherCountry && formik.errors.motherCountry}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
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
            value={formik.values.motherCountyOfOrigin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.motherCountyOfOrigin &&
              Boolean(formik.errors.motherCountyOfOrigin)
            }
            placeholder="Enter county of origin..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.motherCountyOfOrigin &&
              formik.errors.motherCountyOfOrigin}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
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
            value={formik.values.motherOccupation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.motherOccupation &&
              Boolean(formik.errors.motherOccupation)
            }
            placeholder="Enter occupation..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.motherOccupation && formik.errors.motherOccupation}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>Mother's Date of Naturalization</Typography>
        <FormControl fullWidth>
          <TextField
            margin="normal"
            id="motherDateOfNaturalization"
            name="motherDateOfNaturalization"
            type="text"
            value={formik.values.motherDateOfNaturalization}
            onChange={formik.handleChange}
            placeholder="Enter date of naturalization"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
          Is Mother Living?
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
              <TextField {...params} variant="standard" />
            )}
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.isMotherLiving && formik.errors.isMotherLiving}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
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
            value={formik.values.motherPresentAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.motherPresentAddress &&
              Boolean(formik.errors.motherPresentAddress)
            }
            placeholder="Enter present address..."
          />
          <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
            {formik.touched.motherPresentAddress &&
              formik.errors.motherPresentAddress}
          </Typography>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography>
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
      <ScrollToTop />
    </React.Fragment>
  );
};

export default StepThreeForm;
