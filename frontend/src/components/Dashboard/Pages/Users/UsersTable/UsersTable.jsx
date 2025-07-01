import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, createSearchParams } from "react-router-dom";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Avatar,
  Button,
  IconButton,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { LuRefreshCw } from "react-icons/lu";
import { ImEye } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AddUserDialog from "../UsersDialog/AddUserDialog/AddUserDialog";
import ViewUserDialog from "../UsersDialog/ViewUserDialog/ViewUserDialog";
import EditUserDialog from "../UsersDialog/EditUserDialog/EditUserDialog";

//? React Responsive Media Queries
import { useMediaQuery } from "react-responsive";

//? Get All Data
import GetAllData from "../../../../../apis/GetAllData";

//? Delete Single Data
import DeleteSingleData from "../../../../../apis/DeleteSingleData";

//? React Sweet Alert Initialization
const MySwal = withReactContent(Swal);

//? Endpoints
const getAllUsersURL = "/users";
const deleteUserURL = "/users";

export let Row_Data;
export let Close_Menu;

const UsersTable = () => {
  //? Desktop or Laptop Responsive Media Queries
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  //? Tablet or Mobile Responsive Media Queries
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  //? useNavigate
  const navigate = useNavigate();

  //? Destructure useQuery
  const {
    isLoading: usersLoading,
    data: usersData,
    error: usersError,
    refetch: usersRefetch,
    isRefetching: usersRefetching,
  } = useQuery({
    queryKey: ["usersData"],
    queryFn: () => GetAllData(`${getAllUsersURL}`),
  });

  //? Add User State
  const [openAddUser, setOpenAddUser] = useState(false);

  //? Add User Function
  const handleOpenAddUser = () => {
    navigate("/all-users/add", { replace: true });
    setOpenAddUser(true);
  };

  const handleCloseAddUser = () => {
    navigate("/all-users", { replace: true });
    setOpenAddUser(false);
  };

  //? View User State
  const [openViewUser, setOpenViewUser] = useState(false);

  //? View User Function
  const handleOpenViewUser = (userId) => {
    if (userId) {
      navigate(
        {
          pathname: "/all-users/view",
          search: createSearchParams({ id: `${userId}` }).toString(),
        },
        { replace: true }
      );
      setOpenViewUser(true);
    }
  };

  const handleCloseViewUser = () => {
    navigate("/all-users", { replace: true });
    setOpenViewUser(false);
  };

  //? Edit User State
  const [openEditUser, setOpenEditUser] = useState(false);

  //? Edit User Function
  const handleOpenEditUser = (userId) => {
    if (userId) {
      navigate(
        {
          pathname: "/all-users/edit",
          search: createSearchParams({ id: `${userId}` }).toString(),
        },
        { replace: true }
      );
      setOpenEditUser(true);
    }
  };

  const handleCloseEditUser = () => {
    navigate("/all-users", { replace: true });
    setOpenEditUser(false);
  };

  //? Data Definition
  const data = useMemo(
    () =>
      usersData
        ?.filter(
          (user) =>
            user?.role !== "SuperAdmin" && user?.role !== "Administrator"
        )
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) return -1;
          if (a.createdAt < b.createdAt) return 1;
          return 0;
        }) ?? [],
    [usersData]
  );

  //? Delete User
  const deleteUser = async (id) => {
    return await MySwal.fire({
      title: "Are You Sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC143C",
      cancelButtonColor: "#acb5c3",
      confirmButtonText: "Yes",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        return DeleteSingleData(`${deleteUserURL}/${id}`);
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        return MySwal.fire({
          title: "Cancelled...",
          text: "No Data Deleted!",
          icon: "error",
        });
      }
    });
  };

  //? useQueryClient
  const queryClient = useQueryClient();

  const Mutation = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["usersData"],
        });
      }
      return data;
    },
    onError: (error) => {
      if (error) {
        return error;
      }
    },
  });

  //? Columns Definition
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => `${row?.displayName}`,
        id: "displayName",
        header: "Full Name",
        size: 180,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Avatar
              alt={`${row?.original?.displayName} Photo`}
              src={`/images/${row?.original?.photo}`}
              sx={{
                width: 50,
                height: 50,
              }}
              slotProps={{
                img: { loading: "lazy" },
              }}
            />
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 140,
      },
      {
        accessorKey: "primaryPhoneNumber",
        header: "Phone",
        size: 140,
      },
      {
        accessorKey: "userName",
        header: "User Name",
        size: 140,
      },
      {
        accessorKey: "userRole.roleName",
        header: "Role",
        size: 140,
      },
    ],
    []
  );

  //? Table Definition
  const table = useMaterialReactTable({
    columns: columns,
    data: data,
    enableColumnOrdering: true,
    enableRowActions: true,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "top",
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
    renderRowActionMenuItems: ({ row, closeMenu }) => {
      return [
        <>
          <Box sx={{ display: "flex", gap: 2 }}>
            <MenuItem>
              <Tooltip arrow placement="bottom" title="View">
                <IconButton
                  color="default"
                  sx={{ mr: 1 }}
                  onClick={() => {
                    handleOpenViewUser(row?.original?.id);
                  }}
                >
                  <ImEye color="#acb5c3" size={20} />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="bottom" title="Edit">
                <IconButton
                  color="secondary"
                  sx={{ mr: 1 }}
                  onClick={() => {
                    handleOpenEditUser(row?.original?.id);
                  }}
                >
                  <FaEdit color="#00A4EF" size={20} />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="bottom" title="Delete">
                <IconButton
                  color="primary"
                  onClick={() => {
                    closeMenu();
                    Mutation.mutate(row?.original?.id);
                  }}
                >
                  <MdDelete color="#DC143C" size={20} />
                </IconButton>
              </Tooltip>
            </MenuItem>
          </Box>

          {/* Start ViewUserDialog */}
          <ViewUserDialog
            open={openViewUser}
            handleClose={handleCloseViewUser}
            row={row}
          />
          {/* End ViewUserDialog */}

          {/* Start EditUserDialog */}
          <EditUserDialog
            open={openEditUser}
            handleClose={handleCloseEditUser}
            row={row}
            closeMenu={closeMenu}
          />
          {/* End EditUserDialog */}
        </>,
      ];
    },
    muiToolbarAlertBannerProps: () => {
      return usersError
        ? {
            color: "error",
            children: "Error Loading Data!",
          }
        : undefined;
    },
    renderTopToolbarCustomActions: ({ table }) => {
      return (
        <>
          <Box
            sx={{
              display: "flex",
              gap: "0.5rem",
            }}
          >
            {/* Start Desktop & LaptopView */}
            {isDesktopOrLaptop && (
              <Button
                variant="contained"
                size="large"
                sx={{ color: "#d4bf79" }}
                onClick={() => handleOpenAddUser()}
                endIcon={<IoMdPersonAdd />}
              >
                Add User
              </Button>
            )}
            {/*End Desktop & Laptop View */}

            {/* Start Table & Mobile View */}
            {isTabletOrMobile && (
              <Tooltip arrow placement="bottom" title="Add User">
                <IconButton
                  sx={{ bgcolor: "#000", color: "#d4bf79" }}
                  onClick={() => handleOpenAddUser()}
                >
                  <IoMdPersonAdd />
                </IconButton>
              </Tooltip>
            )}
            {/*End Table & Mobile View */}
            <Tooltip arrow placement="bottom" title="Refresh Data">
              <IconButton onClick={() => usersRefetch()}>
                <LuRefreshCw color="#acb5c3" size={20} />
              </IconButton>
            </Tooltip>
          </Box>
          {/* Start AddUserDialog */}
          <AddUserDialog open={openAddUser} handleClose={handleCloseAddUser} />
          {/* End AddUserDialog */}
        </>
      );
    },
    state: {
      isLoading: usersLoading,
      showAlertBanner: usersError,
      showProgressBars: usersLoading ? usersLoading : usersRefetching,
    },
  });

  return (
    <React.Fragment>
      <MaterialReactTable table={table} />
    </React.Fragment>
  );
};

export default UsersTable;
