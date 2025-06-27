import React, { forwardRef } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  IconButton,
  Typography,
  Tooltip,
  Box,
  Paper,
  FormControl,
  TextField,
  Autocomplete,
} from "@mui/material";
import { MdCancel } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { LuAsterisk } from "react-icons/lu";
import ViewPrimaryPhoneInputField from "../../PhoneInputsField/ViewPrimaryPhoneInputField";

//? MUI Dialog Responsive Query
import useMediaQuery from "@mui/material/useMediaQuery";

//? Formik and Yup
import { useFormik } from "formik";

//? Dialog Transition
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//? Dialog Styles
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ViewUserDialog = ({ row, open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //? User Object
  const UserOBJ = {
    lastName: () => row?.original?.lastName,
    firstName: () => row?.original?.firstName,
    middleName: () => row?.original?.middleName,
    displayName: () => row?.original?.displayName,
    primaryPhoneNumber: () => row?.original?.primaryPhoneNumber,
    secondaryPhoneNumber: () => row?.original?.secondaryPhoneNumber,
    email: () => row?.original?.email,
    userName: () => row?.original?.userName,
    role: () => row?.original?.role,
  };

  //? Formik View User Form
  const formikViewUserForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      lastName: `${UserOBJ.lastName()}`,
      firstName: `${UserOBJ.firstName()}`,
      middleName: `${UserOBJ.middleName()}`,
      displayName: `${UserOBJ.displayName()}`,
      primaryPhoneNumber: `${UserOBJ.primaryPhoneNumber()}`,
      secondaryPhoneNumber: `${UserOBJ.secondaryPhoneNumber()}`,
      email: `${UserOBJ.email()}`,
      userName: `${UserOBJ.userName()}`,
      role: `${UserOBJ.role()}`,
    },
  });

  //? Handle Cancel
  const handleCancel = () => {
    handleClose();
    formikViewUserForm.resetForm();
  };

  return (
    <React.Fragment>
      {/* Start Dialog */}
      <BootstrapDialog
        // onClose={handleClose}
        // aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        open={open}
        fullScreen={fullScreen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography
            sx={{
              color: "#00A4EF",
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "uppercase",
            }}
          >
            View User
          </Typography>
        </DialogTitle>
        <Tooltip title="Close">
          <IconButton
            aria-label="close"
            onClick={handleCancel}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <IoMdClose size={20} color="#acb5c3" />
          </IconButton>
        </Tooltip>
        <DialogContent dividers>
          <Box component="form" noValidate>
            <Paper sx={{ p: 3 }}>
              <Box
                sx={{
                  display: { xs: "block", lg: "flex" },
                  gap: "1rem",
                  mt: { lg: 3 },
                }}
              >
                <FormControl fullWidth>
                  <Typography>
                    Last Name
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <TextField
                    margin="normal"
                    id="lastName"
                    name="lastName"
                    type="text"
                    variant="outlined"
                    value={formikViewUserForm.values.lastName}
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled:hover": {
                        cursor: "not-allowed",
                      },
                    }}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Typography>
                    First Name
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <TextField
                    margin="normal"
                    id="firstName"
                    name="firstName"
                    type="text"
                    variant="outlined"
                    value={formikViewUserForm.values.firstName}
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
                    id="middleName"
                    name="middleName"
                    type="text"
                    variant="outlined"
                    value={formikViewUserForm.values.middleName}
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled:hover": {
                        cursor: "not-allowed",
                      },
                    }}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Typography>
                    Display Name
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <TextField
                    margin="normal"
                    id="displayName"
                    name="displayName"
                    type="text"
                    variant="outlined"
                    value={formikViewUserForm.values.displayName}
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
                  <Typography>
                    Phone Number
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <ViewPrimaryPhoneInputField
                    formikViewUserForm={formikViewUserForm}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Typography>Secondary Phone</Typography>
                  <TextField
                    margin="normal"
                    id="secondaryPhoneNumber"
                    name="secondaryPhoneNumber"
                    type="text"
                    variant="outlined"
                    value={formikViewUserForm.values.secondaryPhoneNumber}
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled:hover": {
                        cursor: "not-allowed",
                      },
                    }}
                  />
                </FormControl>
              </Box>
              <Box sx={{ mt: { lg: 3 } }}>
                <FormControl fullWidth>
                  <Typography>
                    Email Address
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <TextField
                    margin="normal"
                    id="email"
                    name="email"
                    type="text"
                    variant="outlined"
                    value={formikViewUserForm.values.email}
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
                  <Typography>
                    User Name
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <TextField
                    margin="normal"
                    id="userName"
                    name="userName"
                    type="text"
                    variant="outlined"
                    value={formikViewUserForm.values.userName}
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled:hover": {
                        cursor: "not-allowed",
                      },
                    }}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Typography sx={{ mb: 2 }}>
                    User Role
                    <span>
                      <LuAsterisk size={10} color="#C41E3A" />
                    </span>
                  </Typography>
                  <Autocomplete
                    id="role"
                    value={formikViewUserForm.values.role}
                    disabled
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled:hover": {
                        cursor: "not-allowed",
                      },
                    }}
                    // options={
                    //   usersRolesData?.map((role) => role?.roleName) ?? []
                    // }
                    autoHighlight
                    renderInput={(params) => <TextField {...params} />}
                  />
                </FormControl>
              </Box>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="large"
            sx={{
              color: "#d4bf79",
            }}
            endIcon={<MdCancel size={20} color="#d4bf79" />}
            onClick={handleCancel}
          >
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
      {/* End Dialog */}
    </React.Fragment>
  );
};

export default React.memo(ViewUserDialog);
