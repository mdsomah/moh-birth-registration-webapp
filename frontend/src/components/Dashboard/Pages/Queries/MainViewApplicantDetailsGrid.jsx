import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Avatar, Button, Badge } from "@mui/material";
import Grid from "@mui/material/Grid";
import { MdCancel } from "react-icons/md";
import Copyright from "../Dashboard/internals/components/Copyright";
import ApplicantDetailsSection from "./ApplicantDetailsSection/ApplicantDetailsSection";
import NavbarBreadcrumbs from "../Dashboard/components/NavbarBreadcrumbs";
import { Row_Data } from "./QueriesTable/QueriesTable";
import { useSelector, useDispatch } from "react-redux";
// import { removeViewApplicant } from "../../../../app/slices/querySlice";

//? Formik and Yup
import { useFormik } from "formik";

//? React Responsive Media Queries
import { useMediaQuery } from "react-responsive";

const MainViewApplicantDetailsGrid = () => {
  //? Tablet or Mobile Responsive Media Queries
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  //? useDispatch
  const dispatch = useDispatch();

  //? useNavigate
  const navigate = useNavigate();

  //? Destructure useSelector
  const { query } = useSelector((state) => state.queryApplicant);

  //? Applicant Object
  const ApplicantOBJ = {
    Surname: () => query?.Surname ?? Row_Data?.original?.Surname,
    FirstName: () => query?.FirstName ?? Row_Data?.original?.FirstName,
    MiddleName: () => query?.MiddleName ?? Row_Data?.original?.MiddleName,
    NINNumber: () => query?.NINNumber ?? Row_Data?.original?.NINNumber,
    Height: () => query?.Height ?? Row_Data?.original?.Height,
    SignatureBase64: () =>
      query?.SignatureBase64 ?? Row_Data?.original?.SignatureBase64,
    PhotoBase64: () => query?.PhotoBase64 ?? Row_Data?.original?.PhotoBase64,
    CardType: () => query?.CardType ?? Row_Data?.original?.CardType,
    MobileNumber: () => query?.MobileNumber ?? Row_Data?.original?.MobileNumber,
    DateOfBirth: () => query?.DateOfBirth ?? Row_Data?.original?.DateOfBirth,
    GenderName: () => query?.GenderName ?? Row_Data?.original?.GenderName,
    EnrollmentDate: () =>
      query?.EnrollmentDate ?? Row_Data?.original?.EnrollmentDate,
    EnrollmentId: () => query?.EnrollmentId ?? Row_Data?.original?.EnrollmentId,
    address: {
      Street_CurrentAddress: () =>
        query?.Street_CurrentAddress ??
        Row_Data?.original?.Street_CurrentAddress,
    },
    // otherDetails: {
    //   fatherName: () => Row_Data?.original?.otherDetails.fatherName,
    //   motherName: () => Row_Data?.original?.otherDetails.motherName,
    //   fatherNationality: () =>
    //     Row_Data?.original?.otherDetails.fatherNationality,
    //   motherNationality: () =>
    //     Row_Data?.original?.otherDetails.motherNationality,
    //   maritalStatus: () => Row_Data?.original?.otherDetails.maritalStatus,
    // },
    rightBiometric: {
      FP_RT: () => query?.FP_RT ?? Row_Data?.original?.FP_RT,
      FP_RI: () => query?.FP_RI ?? Row_Data?.original?.FP_RI,
      FP_RM: () => query?.FP_RM ?? Row_Data?.original?.FP_RM,
      FP_RR: () => query?.FP_RR ?? Row_Data?.original?.FP_RR,
      FP_RL: () => query?.FP_RL ?? Row_Data?.original?.FP_RL,
    },
    leftBiometric: {
      FP_LT: () => query?.FP_LT ?? Row_Data?.original?.FP_LT,
      FP_LI: () => query?.FP_LI ?? Row_Data?.original?.FP_LI,
      FP_LM: () => query?.FP_LM ?? Row_Data?.original?.FP_LM,
      FP_LR: () => query?.FP_LR ?? Row_Data?.original?.FP_LR,
      FP_LL: () => query?.FP_LL ?? Row_Data?.original?.FP_LL,
    },
    FP_Exception: () => query?.FP_Exception ?? Row_Data?.original?.FP_Exception,
  };

  //? Formik View Applicant Details Form
  const formikViewApplicantDetailsForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      Surname: `${ApplicantOBJ.Surname()}`,
      FirstName: `${ApplicantOBJ.FirstName()}`,
      MiddleName: `${ApplicantOBJ.MiddleName()}`,
      Height: `${ApplicantOBJ.Height()}`,
      SignatureBase64: `${ApplicantOBJ.SignatureBase64()}`,
      PhotoBase64: `${ApplicantOBJ.PhotoBase64()}`,
      CardType: `${ApplicantOBJ.CardType()}`,
      MobileNumber: `${ApplicantOBJ.MobileNumber()}`,
      DateOfBirth: `${ApplicantOBJ.DateOfBirth()}`,
      GenderName: `${ApplicantOBJ.GenderName()}`,
      EnrollmentDate: `${ApplicantOBJ.EnrollmentDate()}`,
      EnrollmentId: `${ApplicantOBJ.EnrollmentId()}`,
      address: {
        Street_CurrentAddress: `${ApplicantOBJ.address.Street_CurrentAddress()}`,
      },
      // otherDetails: {
      //   FatherName: `${ApplicantOBJ.otherDetails.FatherName()}`,
      //   MotherName: `${ApplicantOBJ.otherDetails.MotherName()}`,
      //   FatherNationality: `${ApplicantOBJ.otherDetails.FatherNationality()}`,
      //   MotherNationality: `${ApplicantOBJ.otherDetails.MotherNationality()}`,
      //   MaritalStatus: `${ApplicantOBJ.otherDetails.MaritalStatus()}`,
      // },
      rightBiometric: {
        FP_RT: `${ApplicantOBJ.rightBiometric.FP_RT()}`,
        FP_RI: `${ApplicantOBJ.rightBiometric.FP_RI()}`,
        FP_RM: `${ApplicantOBJ.rightBiometric.FP_RM()}`,
        FP_RR: `${ApplicantOBJ.rightBiometric.FP_RR()}`,
        FP_RL: `${ApplicantOBJ.rightBiometric.FP_RL()}`,
      },
      leftBiometric: {
        FP_LT: `${ApplicantOBJ.leftBiometric.FP_LT()}`,
        FP_LI: `${ApplicantOBJ.leftBiometric.FP_LI()}`,
        FP_LM: `${ApplicantOBJ.leftBiometric.FP_LM()}`,
        FP_LR: `${ApplicantOBJ.leftBiometric.FP_LR()}`,
        FP_LL: `${ApplicantOBJ.leftBiometric.FP_LL()}`,
      },
      FP_Exception: `${ApplicantOBJ.FP_Exception()}`,
    },
  });

  //? Handle Close Applicant Details Function
  const handleCloseApplicantDetails = () => {
    // dispatch(removeViewApplicant());
    navigate("/all-queries", { replace: true });
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      {isTabletOrMobile && <NavbarBreadcrumbs />}
      <Typography
        component="h2"
        variant="h6"
        sx={{ mt: { xs: 3, md: 0 }, mb: 2 }}
      >
        Applicant Details
      </Typography>
      <Box noValidate sx={{ mb: 16 }}>
        <Grid
          container
          spacing={2}
          columns={12}
          sx={{ mb: (theme) => theme.spacing(2) }}
        >
          {/* Start Profile Photo Update */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper sx={{ pt: 2, pb: 3, pl: 2, pr: 2 }}>
              <Box
                sx={{
                  display: "block",
                  textAlign: "center",
                }}
              >
                {formikViewApplicantDetailsForm.values?.PhotoBase64 !== "" && (
                  <Badge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <Avatar
                      src={`data:image/jpeg;base64,${formikViewApplicantDetailsForm.values?.PhotoBase64}`}
                      alt={`${formikViewApplicantDetailsForm.values?.FirstName} Pic`}
                      sx={{
                        display: "inline-block",
                        width: 200,
                        height: 200,
                        aspectRatio: 16 / 9,
                      }}
                      slotProps={{
                        img: { loading: "lazy" },
                      }}
                    />
                  </Badge>
                )}

                {formikViewApplicantDetailsForm.values?.PhotoBase64 === "" && (
                  <Avatar
                    sx={{
                      display: "inline-block",
                      width: 200,
                      height: 200,
                      aspectRatio: 16 / 9,
                    }}
                  >
                    <Typography
                      sx={{
                        position: "relative",
                        top: 50,
                        fontSize: "3rem",
                      }}
                    >
                      {`${formikViewApplicantDetailsForm.values?.FirstName.charAt(
                        0
                      )}${formikViewApplicantDetailsForm.values?.MiddleName.charAt(
                        0
                      )}${formikViewApplicantDetailsForm.values?.LastName.charAt(
                        0
                      )}`}
                    </Typography>
                  </Avatar>
                )}
                <Box sx={{ mt: 3 }}>
                  <Typography
                    sx={{
                      color: "#d4bf79",
                      fontWeight: 600,
                      fontSize: "1.6rem",
                    }}
                  >
                    {formikViewApplicantDetailsForm.values?.FirstName}{" "}
                    {formikViewApplicantDetailsForm.values?.MiddleName}{" "}
                    {formikViewApplicantDetailsForm.values?.Surname}
                  </Typography>
                  <Typography sx={{ color: "#787878", fontSize: "1rem" }}>
                    {formikViewApplicantDetailsForm.values?.Height}
                  </Typography>
                  <Typography
                    sx={{ color: "#111", fontWeight: 700, fontSize: "1.2rem" }}
                  >
                    {formikViewApplicantDetailsForm.values?.CardType}
                  </Typography>
                  <img
                    src={`data:image/jpeg;base64,${formikViewApplicantDetailsForm.values?.SignatureBase64}`}
                    alt={`${formikViewApplicantDetailsForm.values?.FirstName} Signature`}
                    style={{
                      display: "inline-block",
                      width: 100,
                      height: 100,
                      aspectRatio: 16 / 9,
                      background: "none",
                      // backgroundColor: "#F5F6FA",
                      // opacity: 0.5,
                      mixBlendMode: "multiply",
                    }}
                    // slotProps={{
                    //   img: { loading: "lazy" },
                    // }}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
          {/* End Profile Photo Update  */}

          {/* Start Applicant Details */}
          <Grid size={{ xs: 12, lg: 12 }}>
            <Paper sx={{ pt: 2, pb: 3, pl: 2, pr: 2 }}>
              <ApplicantDetailsSection
                formikViewApplicantDetailsForm={formikViewApplicantDetailsForm}
              />
            </Paper>
          </Grid>
          {/* End Applicant Details */}
        </Grid>
      </Box>
      <hr style={{ marginTop: 30 }} />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              mb: 2,
              mr: 2,
              bgcolor: "#acb5c3",
              color: "#d4bf79",
            }}
            endIcon={<MdCancel size={20} color="#d4bf79" />}
            onClick={() => {
              handleCloseApplicantDetails();
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
};

export default MainViewApplicantDetailsGrid;
