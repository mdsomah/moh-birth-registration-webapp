import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link as URLLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  FormControl,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import { setInstitution } from "../../../../app/slices/verifyInstitutionSlice";
import { encrypt } from "../../../../utils/encrypt";
import { decrypt } from "../../../../utils/decrypt";

//? Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

//? MOH Logo
import MOHLogo from "../../../../images/MOH_Logo/MOH-LOGO.png";

//? Post NIR Applicant Details
import PostApplicantData from "../../../../apis/NIR-APIs/PostApplicantData";

//? NIR APIs Endpoint
const postApplicantDetailsURL = "/api/ApplicantDetails/search";

//? Validate Applicant Schema
const validateApplicantSchema = Yup.object()
  .shape({
    NIN: Yup.string().required("NIN required!"),
  })
  .required();

// Author.propTypes = {
//   authors: PropTypes.arrayOf(
//     PropTypes.shape({
//       avatar: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };

//? React Sweet Alert Initialization
const MySwal = withReactContent(Swal);

//? Sweet Alert Error
const Error_Alert = (message) => {
  MySwal.fire({
    title: "ERROR...",
    text: `${message}`,
    icon: "error",
  });
};

const ValidateNewApplicantContent = () => {
  //? useDispatch
  const dispatch = useDispatch();

  //? useNavigate
  const navigate = useNavigate();

  //? Loading State
  const [loading, setLoading] = useState(false);

  //? Applicant Search Results State
  const [applicantSearchResults, setApplicantSearchResults] = useState([]);
  console.log(applicantSearchResults);

  //? Formik Validate Applicant Form
  const formikValidateApplicantForm = useFormik({
    initialValues: {
      NIN: "",
      PageNumber: 1,
      PageSize: 50,
    },
    validationSchema: validateApplicantSchema,
    onSubmit: () => {
      handleValidateApplicant();
    },
  });

  //? Handle Submit
  const handleSubmit = (e) => {
    // if (Object.keys(ValidateApplicantData).length === 0) {
    //   Error_Alert("Please enter at least one search field!");
    //   return;
    // }
    e.preventDefault();
    formikValidateApplicantForm.handleSubmit();
  };

  //? Handle Reset Form
  const handleResetForm = () => {
    formikValidateApplicantForm.resetForm();
    setApplicantSearchResults([]);
    // setEnabled(false);
  };

  //? Validate Applicant Data
  const ValidateApplicantData = {};
  if (formikValidateApplicantForm.values.NIN !== "") {
    ValidateApplicantData.NIN = encrypt(formikValidateApplicantForm.values.NIN);
  }
  console.log(ValidateApplicantData);

  //? Search Data
  const searchData = formikValidateApplicantForm.values;

  //? useQueryClient
  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: (newData) =>
      PostApplicantData(`${postApplicantDetailsURL}`, newData),
    onSuccess: (data) => {
      if (data) {
        const cipherText = data;
        const decryptedData = decrypt(
          cipherText.encryptedPayload,
          cipherText.encryptedSessionKey
        );
        //? Check if applicant available
        if (decryptedData?.TotalCount === 0) {
          return Error_Alert("No Applicant found!");
        }
        //? Handle Applicant Filters
        const ApplicantFilters =
          decryptedData.Data?.filter(
            (applicant) =>
              applicant?.NINNumber === searchData.NIN && searchData.NIN !== ""
          ) ?? [];
        setApplicantSearchResults(ApplicantFilters);
        queryClient.invalidateQueries({
          queryKey: ["applicantsData"],
        });
      }
      return data;
    },
    onError: (error) => {
      if (error) {
        console.log("Error: ", error);
      }
      return error;
    },
  });

  //? Loading Effect
  useEffect(() => {
    if (Mutation.isPending) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [Mutation]);

  //? Handle Validate Applicant
  const handleValidateApplicant = () => {
    Mutation.mutate(ValidateApplicantData);
  };

  //? Scroll to error input on form submit
  useEffect(() => {
    if (!formikValidateApplicantForm.isSubmitting) return;
    if (Object.keys(formikValidateApplicantForm.errors).length > 0) {
      document
        .getElementsByName(Object.keys(formikValidateApplicantForm.errors)[0])
        .forEach((error) => error.focus());
    }
  }, [formikValidateApplicantForm]);

  return (
    <Paper sx={{ width: 500, ml: "auto", mr: "auto", pt: 3, pb: 3 }}>
      <Box
        sx={{
          my: 1.8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <URLLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <img src={MOHLogo} alt="MOH Logo" width="100" />
        </URLLink>
        <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
          Validate Applicant?
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <span style={{ color: "#4169E1" }}>
            Enter your National Identification Number (NIN) to validate.
          </span>
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          sx={{ mt: 4 }}
        >
          <FormControl variant="outlined" fullWidth>
            <Typography>
              National ID Number
              <span>
                <LuAsterisk size={10} color="#C41E3A" />
              </span>
              <Tooltip title="This field required!" placement="bottom" arrow>
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
            <TextField
              margin="normal"
              id="NIN"
              name="NIN"
              type="text"
              // slotProps={{
              //   htmlInput: {
              //     type: "number",
              //     min: 10,
              //     max: 10,
              //   },
              // }}
              placeholder="Enter your NIN..."
              value={formikValidateApplicantForm.values.NIN}
              onChange={formikValidateApplicantForm.handleChange}
              onBlur={formikValidateApplicantForm.handleBlur}
              error={
                formikValidateApplicantForm.touched.NIN &&
                Boolean(formikValidateApplicantForm.errors.NIN)
              }
            />
            <Typography variant="inherit" color="error.main" sx={{ mt: 1 }}>
              {formikValidateApplicantForm.touched.NIN &&
                formikValidateApplicantForm.errors.NIN}
            </Typography>
          </FormControl>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={loading}
            loadingPosition="end"
            endIcon={<IoMdCheckmarkCircleOutline size={20} color="#fff" />}
            sx={{ mt: 3, mb: 2, bgcolor: "buttonBGColor.main" }}
          >
            <span>Validate</span>
          </LoadingButton>
          <URLLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Button
              sx={{ p: 1, mt: 1, color: "#4169E1" }}
              startIcon={<FaArrowLeft size={20} color="#4169E1" />}
            >
              Back To Home
            </Button>
          </URLLink>
        </Box>
      </Box>
    </Paper>
  );
};

export default ValidateNewApplicantContent;
