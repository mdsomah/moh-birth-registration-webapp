import React from "react";
import { Box, Typography, Paper, FormControl, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

const AddressSection = ({ formikViewApplicantDetailsForm }) => {
  return (
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{ mb: (theme) => theme.spacing(2) }}
    >
      <Grid size={{ xs: 12, lg: 9 }}>
        <Paper sx={{ pt: 2, pb: 3, pl: 2, pr: 2 }}>
          <Typography
            sx={{
              color: "#00A4EF",
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            Address
          </Typography>
          <Box
            sx={{
              display: { xs: "block", lg: "flex" },
              gap: "1rem",
              mt: { lg: 3 },
            }}
          >
            <FormControl fullWidth>
              <Typography>Street</Typography>
              <TextField
                margin="normal"
                id="address.Street_CurrentAddress"
                name="address.Street_CurrentAddress"
                type="text"
                variant="filled"
                value={
                  formikViewApplicantDetailsForm.values.address
                    .Street_CurrentAddress
                }
                disabled
                sx={{
                  "& .MuiInputBase-input.Mui-disabled:hover": {
                    cursor: "not-allowed",
                  },
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography>Town / Village</Typography>
              <TextField
                margin="normal"
                id="address.townOrVillage"
                name="address.townOrVillage"
                type="text"
                variant="filled"
                value={
                  formikViewApplicantDetailsForm.values.address.townOrVillage
                }
                disabled
                sx={{
                  "& .MuiInputBase-input.Mui-disabled:hover": {
                    cursor: "not-allowed",
                  },
                }}
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: { xs: "block", lg: "flex" },
              gap: "1rem",
              mt: { lg: 3 },
            }}
          >
            <FormControl fullWidth>
              <Typography>City</Typography>
              <TextField
                margin="normal"
                id="address.city"
                name="address.city"
                type="text"
                variant="filled"
                value={formikViewApplicantDetailsForm.values.address.city}
                disabled
                sx={{
                  "& .MuiInputBase-input.Mui-disabled:hover": {
                    cursor: "not-allowed",
                  },
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography>County</Typography>
              <TextField
                margin="normal"
                id="address.county"
                name="address.county"
                type="text"
                variant="filled"
                value={formikViewApplicantDetailsForm.values.address.county}
                disabled
                sx={{
                  "& .MuiInputBase-input.Mui-disabled:hover": {
                    cursor: "not-allowed",
                  },
                }}
              />
            </FormControl>
          </Box>
          <Box sx={{ mt: 3 }}>
            <FormControl fullWidth>
              <Typography>Voting Center</Typography>
              <TextField
                margin="normal"
                id="address.votingCenter"
                name="address.votingCenter"
                type="text"
                variant="filled"
                value={
                  formikViewApplicantDetailsForm.values.address.votingCenter
                }
                disabled
                sx={{
                  "& .MuiInputBase-input.Mui-disabled:hover": {
                    cursor: "not-allowed",
                  },
                }}
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: { xs: "block", lg: "flex" },
              gap: "1rem",
              mt: { lg: 3 },
            }}
          >
            <FormControl fullWidth>
              <Typography>Nationality</Typography>
              <TextField
                margin="normal"
                id="address.nationality"
                name="address.nationality"
                type="text"
                variant="filled"
                value={
                  formikViewApplicantDetailsForm.values.address.nationality
                }
                disabled
                sx={{
                  "& .MuiInputBase-input.Mui-disabled:hover": {
                    cursor: "not-allowed",
                  },
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography>Place of Birth</Typography>
              <TextField
                margin="normal"
                id="address.placeOfBirth"
                name="address.placeOfBirth"
                type="text"
                variant="filled"
                value={
                  formikViewApplicantDetailsForm.values.address.placeOfBirth
                }
                disabled
                sx={{
                  "& .MuiInputBase-input.Mui-disabled:hover": {
                    cursor: "not-allowed",
                  },
                }}
              />
            </FormControl>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddressSection;
