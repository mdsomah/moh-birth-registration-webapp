import React from "react";
import "react-international-phone/style.css";
import {
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";

const FinalStepPhoneInputField = (props) => {
  //? Destructure props
  const { formik } = props;

  //? Handle Phone Input Change
  const handlePhoneInputChange = (event) => {
    formik.setFieldValue("applicantContactNumber", event);
  };

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: "lr",
      value: formik.values.applicantContactNumber,
      countries: defaultCountries,
      onChange: (data) => handlePhoneInputChange(data?.phone),
    });

  return (
    <TextField
      margin="normal"
      id="applicantContactNumber"
      name="applicantContactNumber"
      type="tel"
      placeholder="Enter contact..."
      value={inputValue}
      onChange={handlePhoneValueChange}
      onBlur={formik.handleBlur}
      error={
        formik.touched.applicantContactNumber &&
        Boolean(formik.errors.applicantContactNumber)
      }
      inputRef={inputRef}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            style={{ marginRight: "2px", marginLeft: "-8px" }}
          >
            <Select
              MenuProps={{
                style: {
                  height: "300px",
                  width: "360px",
                  top: "10px",
                  left: "-34px",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
              }}
              sx={{
                width: "max-content",
                // Remove default outline (display only on focus)
                fieldset: {
                  display: "none",
                },
                '&.Mui-focused:has(div[aria-expanded="false"])': {
                  fieldset: {
                    display: "block",
                  },
                },
                // Update default spacing
                ".MuiSelect-select": {
                  padding: "8px",
                  paddingRight: "24px !important",
                },
                svg: {
                  right: 0,
                },
              }}
              value={country.iso2}
              onChange={(e) => setCountry(e.target.value)}
              renderValue={(value) => (
                <FlagImage iso2={value} style={{ display: "flex" }} />
              )}
            >
              {defaultCountries
                .filter((c) => {
                  const country = parseCountry(c);
                  return country.name === "Liberia";
                })
                .map((c) => {
                  const country = parseCountry(c);
                  return (
                    <MenuItem key={country.iso2} value={country.iso2}>
                      <FlagImage
                        iso2={country.iso2}
                        style={{ marginRight: "8px" }}
                      />
                      <Typography marginRight="8px">{country.name}</Typography>
                      <Typography color="gray">+{country.dialCode}</Typography>
                    </MenuItem>
                  );
                })}
            </Select>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default FinalStepPhoneInputField;
