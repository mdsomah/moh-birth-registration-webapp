import React from "react";
import { Box, Typography, Paper, FormControl, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";

const ProfileSection = ({ formikViewApplicantDetailsForm }) => {
  return (
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{ mb: (theme) => theme.spacing(2) }}
    >
      {/* Start Info Section */}
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
            Profile
          </Typography>
          <Box
            sx={{
              display: { xs: "block", lg: "flex" },
              gap: "1rem",
              mt: { lg: 3 },
            }}
          >
            <FormControl fullWidth>
              <Typography>Last Name</Typography>
              <TextField
                margin="normal"
                id="Surname"
                name="Surname"
                type="text"
                variant="filled"
                value={formikViewApplicantDetailsForm.values.Surname}
                disabled
                sx={{
                  "& .MuiInputBase-input.Mui-disabled:hover": {
                    cursor: "not-allowed",
                  },
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography>First Name</Typography>
              <TextField
                margin="normal"
                id="FirstName"
                name="FirstName"
                type="text"
                variant="filled"
                value={formikViewApplicantDetailsForm.values.FirstName}
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
              <Typography>Middle Name</Typography>
              <TextField
                margin="normal"
                id="MiddleName"
                name="MiddleName"
                type="text"
                variant="filled"
                value={formikViewApplicantDetailsForm.values.MiddleName}
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
              <Typography>Card Type</Typography>
              <TextField
                margin="normal"
                id="CardType"
                name="CardType"
                type="text"
                variant="filled"
                value={formikViewApplicantDetailsForm.values.CardType}
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
              <Typography>Mobile Number</Typography>
              <TextField
                margin="normal"
                id="MobileNumber"
                name="MobileNumber"
                type="text"
                variant="filled"
                value={formikViewApplicantDetailsForm.values.MobileNumber}
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
              <Typography>Date of Birth</Typography>
              <TextField
                margin="normal"
                id="DateOfBirth"
                name="DateOfBirth"
                type="text"
                variant="filled"
                value={dayjs(
                  formikViewApplicantDetailsForm.values.DateOfBirth
                ).format("MM/DD/YYYY")}
                disabled
                sx={{
                  "& .MuiInputBase-input.Mui-disabled:hover": {
                    cursor: "not-allowed",
                  },
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography>Gender</Typography>
              <TextField
                margin="normal"
                id="GenderName"
                name="GenderName"
                type="text"
                variant="filled"
                value={formikViewApplicantDetailsForm.values.GenderName}
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
              <Typography>Enrollment Date</Typography>
              <TextField
                margin="normal"
                id="EnrollmentDate"
                name="EnrollmentDate"
                type="text"
                variant="filled"
                value={formikViewApplicantDetailsForm.values.EnrollmentDate}
                disabled
                sx={{
                  "& .MuiInputBase-input.Mui-disabled:hover": {
                    cursor: "not-allowed",
                  },
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography>Enrollment ID</Typography>
              <TextField
                margin="normal"
                id="EnrollmentId"
                name="EnrollmentId"
                type="text"
                variant="filled"
                value={formikViewApplicantDetailsForm.values.EnrollmentId}
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
      {/* End Info Section */}

      {/* Start Biometric Fingerprints Section */}
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
            Fingerprints
          </Typography>
          {/* Start Right Fingerprints */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography sx={{ mb: 1 }}>Right Thumb</Typography>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#fff",
                  border: "1px solid #787878",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${formikViewApplicantDetailsForm.values.rightBiometric.FP_RT}`}
                  alt={`${formikViewApplicantDetailsForm.values?.FirstName} Right Thumb`}
                  style={{
                    display: "inline-block",
                    width: 100,
                    height: 100,
                    aspectRatio: 16 / 9,
                    // background: "none",
                    // backgroundColor: "#F5F6FA",
                    // opacity: 0.5,
                    mixBlendMode: "multiply",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: "#008000",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    1
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 26,
                    height: 20,
                    bgcolor: "#50C878",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    85
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ mb: 1 }}>Right Index</Typography>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#fff",
                  border: "1px solid #787878",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${formikViewApplicantDetailsForm.values.rightBiometric.FP_RI}`}
                  alt={`${formikViewApplicantDetailsForm.values?.FirstName} Right Index`}
                  style={{
                    display: "inline-block",
                    width: 100,
                    height: 100,
                    aspectRatio: 16 / 9,
                    // background: "none",
                    // backgroundColor: "#F5F6FA",
                    // opacity: 0.5,
                    mixBlendMode: "multiply",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: "#008000",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    1
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 26,
                    height: 20,
                    bgcolor: "#50C878",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    85
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ mb: 1 }}>Right Middle</Typography>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#fff",
                  border: "1px solid #787878",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${formikViewApplicantDetailsForm.values.rightBiometric.FP_RM}`}
                  alt={`${formikViewApplicantDetailsForm.values?.FirstName} Right Middle`}
                  style={{
                    display: "inline-block",
                    width: 100,
                    height: 100,
                    aspectRatio: 16 / 9,
                    // background: "none",
                    // backgroundColor: "#F5F6FA",
                    // opacity: 0.5,
                    mixBlendMode: "multiply",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: "#008000",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    1
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 26,
                    height: 20,
                    bgcolor: "#50C878",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    85
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ mb: 1 }}>Right Ring</Typography>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#fff",
                  border: "1px solid #787878",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${formikViewApplicantDetailsForm.values.rightBiometric.FP_RR}`}
                  alt={`${formikViewApplicantDetailsForm.values?.FirstName} Right Ring`}
                  style={{
                    display: "inline-block",
                    width: 100,
                    height: 100,
                    aspectRatio: 16 / 9,
                    // background: "none",
                    // backgroundColor: "#F5F6FA",
                    // opacity: 0.5,
                    mixBlendMode: "multiply",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: "#008000",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    1
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 26,
                    height: 20,
                    bgcolor: "#50C878",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    85
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ mb: 1 }}>Right Little</Typography>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#fff",
                  border: "1px solid #787878",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${formikViewApplicantDetailsForm.values.rightBiometric.FP_RL}`}
                  alt={`${formikViewApplicantDetailsForm.values?.FirstName} Right Little`}
                  style={{
                    display: "inline-block",
                    width: 100,
                    height: 100,
                    aspectRatio: 16 / 9,
                    // background: "none",
                    // backgroundColor: "#F5F6FA",
                    // opacity: 0.5,
                    mixBlendMode: "multiply",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: "#008000",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    1
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 26,
                    height: 20,
                    bgcolor: "#50C878",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    85
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          {/* End Right Fingerprints */}

          {/* Start Left Fingerprints */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 8 }}>
            <Box>
              <Typography sx={{ mb: 1 }}>Left Thumb</Typography>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#fff",
                  border: "1px solid #787878",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${formikViewApplicantDetailsForm.values.leftBiometric.FP_LT}`}
                  alt={`${formikViewApplicantDetailsForm.values?.FirstName} Left Thumb`}
                  style={{
                    display: "inline-block",
                    width: 100,
                    height: 100,
                    aspectRatio: 16 / 9,
                    // background: "none",
                    // backgroundColor: "#F5F6FA",
                    // opacity: 0.5,
                    mixBlendMode: "multiply",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: "#008000",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    1
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 26,
                    height: 20,
                    bgcolor: "#50C878",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    85
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ mb: 1 }}>Left Index</Typography>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#fff",
                  border: "1px solid #787878",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${formikViewApplicantDetailsForm.values.leftBiometric.FP_LI}`}
                  alt={`${formikViewApplicantDetailsForm.values?.FirstName} Left Index`}
                  style={{
                    display: "inline-block",
                    width: 100,
                    height: 100,
                    aspectRatio: 16 / 9,
                    // background: "none",
                    // backgroundColor: "#F5F6FA",
                    // opacity: 0.5,
                    mixBlendMode: "multiply",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: "#008000",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    1
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 26,
                    height: 20,
                    bgcolor: "#50C878",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    85
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ mb: 1 }}>Left Middle</Typography>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#fff",
                  border: "1px solid #787878",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${formikViewApplicantDetailsForm.values.leftBiometric.FP_LM}`}
                  alt={`${formikViewApplicantDetailsForm.values?.FirstName} Left Middle`}
                  style={{
                    display: "inline-block",
                    width: 100,
                    height: 100,
                    aspectRatio: 16 / 9,
                    // background: "none",
                    // backgroundColor: "#F5F6FA",
                    // opacity: 0.5,
                    mixBlendMode: "multiply",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: "#008000",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    1
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 26,
                    height: 20,
                    bgcolor: "#50C878",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    85
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ mb: 1 }}>Left Ring</Typography>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#fff",
                  border: "1px solid #787878",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${formikViewApplicantDetailsForm.values.leftBiometric.FP_LR}`}
                  alt={`${formikViewApplicantDetailsForm.values?.FirstName} Left Ring`}
                  style={{
                    display: "inline-block",
                    width: 100,
                    height: 100,
                    aspectRatio: 16 / 9,
                    // background: "none",
                    // backgroundColor: "#F5F6FA",
                    // opacity: 0.5,
                    mixBlendMode: "multiply",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: "#008000",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    1
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 26,
                    height: 20,
                    bgcolor: "#50C878",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    85
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ mb: 1 }}>Left Little</Typography>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#fff",
                  border: "1px solid #787878",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img
                  src={`data:image/jpeg;base64,${formikViewApplicantDetailsForm.values.leftBiometric.FP_LL}`}
                  alt={`${formikViewApplicantDetailsForm.values?.FirstName} Left Little`}
                  style={{
                    display: "inline-block",
                    width: 100,
                    height: 100,
                    aspectRatio: 16 / 9,
                    // background: "none",
                    // backgroundColor: "#F5F6FA",
                    // opacity: 0.5,
                    mixBlendMode: "multiply",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: "#008000",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    1
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 26,
                    height: 20,
                    bgcolor: "#50C878",
                    mt: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontWeight: "bold" }}>
                    85
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          {/* End Left Fingerprints */}
        </Paper>
      </Grid>
      {/* End Biometric Fingerprints Section */}

      {/* Start Fingerprint Exception Image Section */}
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
            Fingerprint Exception Image
          </Typography>
          {formikViewApplicantDetailsForm.values.FP_Exception !== "null" && (
            <img
              src={`data:image/jpeg;base64,${formikViewApplicantDetailsForm.values?.FP_Exception}`}
              alt={`${formikViewApplicantDetailsForm.values?.FirstName} Exception Pic`}
              style={{
                width: "100%",
                height: "80%",
                aspectRatio: 16 / 9,
                mixBlendMode: "multiply",
              }}
            />
          )}
        </Paper>
      </Grid>
      {/* End Fingerprint Exception Image Section*/}
    </Grid>
  );
};

export default ProfileSection;
