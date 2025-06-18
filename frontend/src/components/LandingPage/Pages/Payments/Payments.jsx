import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link as URLLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "@mui/material/styles";
import { responsiveTheme } from "../../../../utils/muiUtils";
import {
  CssBaseline,
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  FormControl,
  Button,
  Autocomplete,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MdOutlinePayments } from "react-icons/md";
import { BiMailSend } from "react-icons/bi";
import { LuAsterisk } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import CopyRights from "../../CopyRights/CopyRights";
import { setInstitution } from "../../../../app/slices/trackInstitutionSlice";

// Scroll to top of react route/page change
import ScrollToTop from "../../../ScrollToTop/ScrollToTop";

// Formik and Yup
import { useFormik } from "formik";
import * as Yup from "yup";

// J-Singh Logo
import logo from "../../../../images/MICAT_Logo/MICAT-LOGO.png";

// Registration Image
import registrationImageURL from "../../../../images/Registration-Image.jpg";

// Get All Datas
import GetAllData from "../../../../apis/GetAllData";

// Update Data
import CreateData from "../../../../apis/CreateData";

// Endpoints
const getAllPaymentMehtodsURL = "/payment-methods";
const postPaymentURL = "/payments/make-new-payment";

// Validate Payment Schema
const ValidatePaymentSchema = Yup.object()
  .shape({
    paymentMethod: Yup.object().shape({
      paymentName: Yup.string().required("Please select payment method!"),
    }),
  })
  .required();

const Payments = () => {
  // useDispatch
  const dispatch = useDispatch();

  // useNavigate
  const navigate = useNavigate();

  // Destructure useQuery
  const { data: paymentMethodsData } = useQuery({
    queryKey: ["paymentMethodsData"],
    queryFn: () => GetAllData(`${getAllPaymentMehtodsURL}`),
  });

  // Loading State
  const [loading, setLoading] = useState(false);

  // Handle Payment Method Change
  const handlePaymentMethodChange = (_event, newValue) => {
    const { paymentName } = newValue ?? "";
    // PaymentMethodID
    const paymentMethodID = paymentMethodsData?.find(
      (payment) => payment?.paymentName === paymentName
    );
    formikPaymentForm.setFieldValue("paymentMethod.paymentName", paymentName);
    formikPaymentForm.setFieldValue(
      "paymentMethod.paymentMethodID",
      paymentMethodID?.id
    );
  };

  // Formik Payment Form
  const formikPaymentForm = useFormik({
    initialValues: {
      paymentMethod: {
        paymentMethodID: "",
        paymentName: "",
      },
    },
    validationSchema: ValidatePaymentSchema,
    onSubmit: (values) => {
      console.log(values);
      handleMakePayment();
    },
  });

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    formikPaymentForm.handleSubmit();
  };

  // Payment Data
  const PaymentData = {
    paymentMethod: formikPaymentForm.values.paymentMethod,
  };

  console.log(PaymentData);

  // useQueryClient
  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: (newData) => CreateData(`${postPaymentURL}`, newData),
    onSuccess: (data) => {
      if (data) {
        dispatch(setInstitution(data));
        navigate("/track-application-successful", { replace: true });
        queryClient.invalidateQueries({
          queryKey: ["paymentsData"],
        });
      }
      return data;
    },
    onError: (error) => {
      return error;
    },
  });

  // Loading Effect
  useEffect(() => {
    if (Mutation.isPending) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [Mutation]);

  // Handle Make Payment
  const handleMakePayment = () => {
    Mutation.mutate(PaymentData);
  };

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Payments | MICAT online registration web software.</title>
      </Helmet>
      <ThemeProvider theme={responsiveTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={5}
            md={5}
            lg={5}
            sx={{
              display: { xs: "none", lg: "block" },
              bgcolor: "#4169E1",
              textAlign: "center",
              p: 3,
            }}
          >
            <Box sx={{ mt: 14 }}>
              <Typography
                variant="h3"
                sx={{ mt: 3, color: "#fff", fontWeight: "bolder" }}
              >
                MICAT
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      color: "#fff",
                    }}
                  >
                    Nation Communications Bereau Annual Registration System
                  </Typography>
                  <Typography sx={{ color: "#F5F5DC", fontSize: 16, mt: 1 }}>
                    Complete your Institution registration process in four (4)
                    steps
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundImage: `url(${registrationImageURL})`,
                    height: 400,
                  }}
                ></Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={7}
            lg={7}
            component={Paper}
            elevation={6}
            square
          >
            <Paper
              sx={{ width: 500, ml: "auto", mr: "auto", pt: 3, pb: 3, mt: 3 }}
            >
              <Box
                sx={{
                  my: 1.8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <URLLink
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img src={logo} alt="MICAT Logo" width="100" />
                </URLLink>
                <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
                  Pay Your Fees?
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  <span style={{ color: "#4169E1" }}>
                    Select payment method from the dropdown and make your
                    payment
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
                    <Typography sx={{ mb: 2 }}>
                      Payment Methods
                      <span>
                        <LuAsterisk size={10} color="#C41E3A" />
                      </span>
                    </Typography>
                    <Autocomplete
                      id="paymentMethod.paymentName"
                      value={formikPaymentForm.values.paymentMethod.paymentName}
                      onChange={handlePaymentMethodChange}
                      onBlur={formikPaymentForm.handleBlur}
                      autoHighlight
                      options={paymentMethodsData ?? []}
                      getOptionLabel={(option) => option?.paymentName || option}
                      renderOption={(props, option) => {
                        const { key, ...optionProps } = props;
                        return (
                          <Box
                            key={key}
                            component="li"
                            sx={{
                              "& > img": { mr: 2, flexShrink: 0 },
                            }}
                            {...optionProps}
                          >
                            {option?.paymentName}
                          </Box>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select payment method..."
                          error={
                            formikPaymentForm?.touched?.paymentMethod
                              ?.paymentName &&
                            Boolean(
                              formikPaymentForm?.errors?.paymentMethod
                                ?.paymentName
                            )
                          }
                        />
                      )}
                    />
                    <Typography
                      variant="inherit"
                      color="error.main"
                      sx={{ mt: 1 }}
                    >
                      {formikPaymentForm?.touched?.paymentMethod?.paymentName &&
                        formikPaymentForm?.errors?.paymentMethod?.paymentName}
                    </Typography>
                  </FormControl>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={loading}
                    loadingPosition="end"
                    endIcon={<MdOutlinePayments size={20} color="#fff" />}
                    sx={{ mt: 3, mb: 2, bgcolor: "buttonBGColor.main" }}
                  >
                    <span>Make Payment</span>
                  </LoadingButton>
                  <URLLink
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      sx={{ p: 1, mt: 1, color: "#008080" }}
                      startIcon={<FaArrowLeft size={20} color="#008080" />}
                    >
                      Back To Home
                    </Button>
                  </URLLink>
                </Box>
              </Box>
            </Paper>
            <Box
              sx={{ width: 500, ml: "auto", mr: "auto", pt: 3, pb: 3, mt: 3 }}
            >
              <CopyRights />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <ScrollToTop />
    </React.Fragment>
  );
};

export default Payments;
