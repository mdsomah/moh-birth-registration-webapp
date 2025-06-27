import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import { paperClasses } from "@mui/material/Paper";
import { listClasses } from "@mui/material/List";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import MenuButton from "./MenuButton";
import ChangeProfilePasswordDialog from "../../Users/Profile/ChangeProfilePasswordDialog/ChangeProfilePasswordDialog";
import ChangeProfilePhotoDialog from "../../Users/Profile/ChangeProfilePhotoDialog/ChangeProfilePhotoDialog";

const MenuItem = styled(MuiMenuItem)({
  margin: "2px 0",
});

const CardAlert = (props) => {
  //? Destructure props
  const { formikViewUserProfileForm } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //? Change Password Dialog State
  const [openChangePassword, setOpenChangePassword] = useState(false);

  //? Change Password Dialog Functions
  const handleOpenChangePassword = () => {
    handleClose();
    setOpenChangePassword(true);
  };

  const handleCloseChangePassword = useCallback(() => {
    setOpenChangePassword(false);
  }, []);

  //? Change Photo Dialog State
  const [openChangePhoto, setOpenChangePhoto] = useState(false);

  //? Change Photo Dialog Functions
  const handleOpenChangePhoto = () => {
    handleClose();
    setOpenChangePhoto(true);
  };

  const handleCloseChangePhoto = useCallback(() => {
    setOpenChangePhoto(false);
  }, []);

  return (
    <React.Fragment>
      <Card variant="outlined" sx={{ m: 1.5, flexShrink: 0 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, lineHeight: "16px" }}
              >
                {formikViewUserProfileForm.values?.firstName}{" "}
                {formikViewUserProfileForm.values?.middleName.charAt(0)}{" "}
                {formikViewUserProfileForm.values?.lastName}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                {formikViewUserProfileForm.values?.role}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {formikViewUserProfileForm.values?.email}
              </Typography>
            </Box>
            <MenuButton
              aria-label="Open menu"
              onClick={handleClick}
              sx={{ borderColor: "transparent" }}
            >
              <MoreVertRoundedIcon />
            </MenuButton>
          </Box>
          {/* <Button variant="contained" size="small" fullWidth>
          Get the discount
        </Button> */}
        </CardContent>
      </Card>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          [`& .${listClasses.root}`]: {
            padding: "4px",
          },
          [`& .${paperClasses.root}`]: {
            padding: 0,
          },
          [`& .${dividerClasses.root}`]: {
            margin: "4px -4px",
          },
        }}
      >
        <Link
          to="/my-profile"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link
          to="/managed-account"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem onClick={handleClose}>Managed Account</MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={handleOpenChangePassword}>Change Password</MenuItem>
        <MenuItem onClick={handleOpenChangePhoto}>Change Photo</MenuItem>
      </Menu>

      {/* Start ChangeProfilePasswordDialog */}
      <ChangeProfilePasswordDialog
        open={openChangePassword}
        handleClose={handleCloseChangePassword}
      />
      {/* End ChangeProfilePasswordDialog */}

      {/* Start ChangeProfilePhotoDialog */}
      <ChangeProfilePhotoDialog
        open={openChangePhoto}
        handleClose={handleCloseChangePhoto}
      />
      {/* End ChangeProfilePhotoDialog */}
    </React.Fragment>
  );
};

export default CardAlert;
