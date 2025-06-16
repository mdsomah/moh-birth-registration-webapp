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

const StepOnePhoneInputField = (props) => {
  // Destructure props
  const { formik } = props;

  // Handle Primary Contact Change
  const handlePrimaryContactChange = (event) => {
    formik.setFieldValue("primaryContact", event);
  };

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: "lr",
      value: formik.values.primaryContact,
      onChange: (data) => handlePrimaryContactChange(data?.phone),
      countries: defaultCountries,
    });

  return (
    <TextField
      margin="normal"
      id="primaryContact"
      name="primaryContact"
      type="tel"
      placeholder="Enter phone number..."
      value={inputValue}
      onChange={handlePhoneValueChange}
      onBlur={formik.handleBlur}
      error={
        formik.touched.primaryContact && Boolean(formik.errors.primaryContact)
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

export default StepOnePhoneInputField;
