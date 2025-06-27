import React from "react";
import { Box, Typography, Paper, FormControl, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

const OtherDetailsSection = ({ formikViewApplicantDetailsForm }) => {
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
            Other Details
          </Typography>
          <Box
            sx={{
              display: { xs: "block", lg: "flex" },
              gap: "1rem",
              mt: { lg: 3 },
            }}
          >
            <FormControl fullWidth>
              <Typography>Father Name</Typography>
              <TextField
                margin="normal"
                id="otherDetails.fatherName"
                name="otherDetails.fatherName"
                type="text"
                variant="filled"
                value={
                  formikViewApplicantDetailsForm.values.otherDetails.fatherName
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
              <Typography>Mother Name</Typography>
              <TextField
                margin="normal"
                id="otherDetails.motherName"
                name="otherDetails.motherName"
                type="text"
                variant="filled"
                value={
                  formikViewApplicantDetailsForm.values.otherDetails.motherName
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
              <Typography>Father Nationality</Typography>
              <TextField
                margin="normal"
                id="otherDetails.fatherNationality"
                name="otherDetails.fatherNationality"
                type="text"
                variant="filled"
                value={
                  formikViewApplicantDetailsForm.values.otherDetails
                    .fatherNationality
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
              <Typography>Mother Nationality</Typography>
              <TextField
                margin="normal"
                id="otherDetails.motherNationality"
                name="otherDetails.motherNationality"
                type="text"
                variant="filled"
                value={
                  formikViewApplicantDetailsForm.values.otherDetails
                    .motherNationality
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
          <Box sx={{ mt: 3 }}>
            <FormControl fullWidth>
              <Typography>Marital Status</Typography>
              <TextField
                margin="normal"
                id="otherDetails.maritalStatus"
                name="otherDetails.maritalStatus"
                type="text"
                variant="filled"
                value={
                  formikViewApplicantDetailsForm.values.otherDetails
                    .maritalStatus
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

export default OtherDetailsSection;
