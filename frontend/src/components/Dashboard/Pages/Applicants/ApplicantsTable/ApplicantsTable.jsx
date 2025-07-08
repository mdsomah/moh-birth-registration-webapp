import React, { useMemo } from "react";
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

//? React Responsive Media Queries
import { useMediaQuery } from "react-responsive";

//? Get All Data
import GetAllData from "../../../../../apis/GetAllData";

//? Delete Single Data
import DeleteSingleData from "../../../../../apis/DeleteSingleData";

//? React Sweet Alert Initialization
const MySwal = withReactContent(Swal);

//? Endpoints
const getAllApplicantsURL = "/applicants";
const deleteApplicantURL = "/applicants";

export let Row_Data;
export let Close_Menu;

//? Meme Types
const MemeTypesJPEG = ".jpeg";
const MemeTypesJPG = ".jpeg";
const MemeTypesPNG = ".jpeg";
const MemeTypesJIFF = ".jpeg";

const MemeTypes =
  MemeTypesJPEG || MemeTypesJPG || MemeTypesPNG || MemeTypesJIFF;

const ApplicantsTable = () => {
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
    isLoading: applicantsLoading,
    data: applicantsData,
    error: applicantsError,
    refetch: applicantsRefetch,
    isRefetching: applicantsRefetching,
  } = useQuery({
    queryKey: ["applicantsData"],
    queryFn: () => GetAllData(`${getAllApplicantsURL}`),
  });

  //? Add Applicant Function
  const handleOpenAddApplicant = () => {
    navigate("/all-applicants/add", { replace: true });
  };

  //? View Applicant Function
  const handleOpenViewApplicant = (applicantId) => {
    if (applicantId) {
      navigate(
        {
          pathname: "/all-applicants/view",
          search: createSearchParams({ id: `${applicantId}` }).toString(),
        },
        { replace: true }
      );
    }
  };

  //? Edit Applicant Function
  const handleOpenEditApplicant = (applicantId) => {
    if (applicantId) {
      navigate(
        {
          pathname: "/all-applicants/edit",
          search: createSearchParams({ id: `${applicantId}` }).toString(),
        },
        { replace: true }
      );
    }
  };

  //? Data Definition
  const data = useMemo(
    () =>
      applicantsData?.sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        return 0;
      }) ?? [],
    [applicantsData]
  );

  //? Delete Applicant
  const deleteApplicant = async (id) => {
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
        return DeleteSingleData(`${deleteApplicantURL}/${id}`);
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
    mutationFn: (id) => deleteApplicant(id),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["applicantsData"],
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
        accessorFn: (row) => `${row?.applicantFirstName}`,
        id: "applicantFirstName",
        header: "Full Name",
        size: 180,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {row?.original?.applicantPhoto.includes(".jpg") && (
              <Avatar
                alt={`${row?.original?.applicantFirstName} Photo`}
                src={`/uploads/${row?.original?.applicantPhoto}`}
                sx={{
                  width: 50,
                  height: 50,
                }}
                slotProps={{
                  img: { loading: "lazy" },
                }}
              />
            )}

            {!row?.original?.applicantPhoto.includes(".jpg") && (
              <Avatar
                alt={`${row?.original?.applicantFirstName} Photo`}
                src={`data:image/jpeg;base64,${row?.original?.applicantPhoto}`}
                sx={{
                  width: 50,
                  height: 50,
                }}
                slotProps={{
                  img: { loading: "lazy" },
                }}
              />
            )}
            <span>
              {row?.original?.applicantFirstName}{" "}
              {row?.original?.applicantMiddleName}{" "}
              {row?.original?.applicantLastName}
            </span>
          </Box>
        ),
      },
      {
        accessorKey: "applicantDateOfBirth",
        header: "DoB",
        size: 140,
      },
      {
        accessorKey: "applicantContactNumber",
        header: "Phone",
        size: 140,
      },
      {
        accessorKey: "applicantMother.motherName",
        header: "Mother Name",
        size: 140,
      },
      {
        accessorKey: "applicantFather.fatherName",
        header: "Father Name",
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
                    handleOpenViewApplicant(row?.original?.id);
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
                    handleOpenEditApplicant(row?.original?.id);
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
        </>,
      ];
    },
    muiToolbarAlertBannerProps: () => {
      return applicantsError
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
                onClick={() => handleOpenAddApplicant()}
                endIcon={<IoMdPersonAdd />}
              >
                Add Applicant
              </Button>
            )}
            {/*End Desktop & Laptop View */}

            {/* Start Table & Mobile View */}
            {isTabletOrMobile && (
              <Tooltip arrow placement="bottom" title="Add User">
                <IconButton
                  sx={{ bgcolor: "#000", color: "#d4bf79" }}
                  onClick={() => handleOpenAddApplicant()}
                >
                  <IoMdPersonAdd />
                </IconButton>
              </Tooltip>
            )}
            {/*End Table & Mobile View */}
            <Tooltip arrow placement="bottom" title="Refresh Data">
              <IconButton onClick={() => applicantsRefetch()}>
                <LuRefreshCw color="#acb5c3" size={20} />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      );
    },
    state: {
      isLoading: applicantsLoading,
      showAlertBanner: applicantsError,
      showProgressBars: applicantsLoading
        ? applicantsLoading
        : applicantsRefetching,
    },
  });

  return (
    <React.Fragment>
      <MaterialReactTable table={table} />
    </React.Fragment>
  );
};

export default ApplicantsTable;
