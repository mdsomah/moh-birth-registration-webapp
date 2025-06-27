import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import { paperClasses } from "@mui/material/Paper";
import { listClasses } from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon, { listItemIconClasses } from "@mui/material/ListItemIcon";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MenuButton from "./MenuButton";
import ChangeProfilePasswordDialog from "../../Users/Profile/ChangeProfilePasswordDialog/ChangeProfilePasswordDialog";
import ChangeProfilePhotoDialog from "../../Users/Profile/ChangeProfilePhotoDialog/ChangeProfilePhotoDialog";

//? React Sweet Alert Initialization
const MySwal = withReactContent(Swal);

const MenuItem = styled(MuiMenuItem)({
  margin: "2px 0",
});

const OptionsMenu = ({ handleLogout }) => {
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

  const logoutCurrentUser = async () => {
    return await MySwal.fire({
      title: "Confirm Logout",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC143C",
      cancelButtonColor: "#acb5c3",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        return handleLogout();
      }
    });
  };

  return (
    <React.Fragment>
      <MenuButton
        aria-label="Open menu"
        onClick={handleClick}
        sx={{ borderColor: "transparent" }}
      >
        <MoreVertRoundedIcon />
      </MenuButton>
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
        <Divider />
        <MenuItem
          onClick={handleClose}
          sx={{
            [`& .${listItemIconClasses.root}`]: {
              ml: "auto",
              minWidth: 0,
            },
          }}
        >
          <ListItemText onClick={logoutCurrentUser}>Logout</ListItemText>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
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

export default OptionsMenu;
