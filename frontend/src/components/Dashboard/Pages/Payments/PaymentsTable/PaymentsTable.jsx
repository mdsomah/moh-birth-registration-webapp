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
const getAllPaymentsURL = "/payments";
const deletePaymentURL = "/payments";

export let Row_Data;
export let Close_Menu;

const PaymentsTable = () => {
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
    isLoading: paymentsLoading,
    data: paymentsData,
    error: paymentsError,
    refetch: paymentsRefetch,
    isRefetching: paymentsRefetching,
  } = useQuery({
    queryKey: ["paymentsData"],
    queryFn: () => GetAllData(`${getAllPaymentsURL}`),
  });

  //? Add Payment Function
  const handleOpenAddPayment = () => {
    navigate("/all-payments/add", { replace: true });
  };

  //? View Payment Function
  const handleOpenViewPayment = (paymentId) => {
    if (paymentId) {
      navigate(
        {
          pathname: "/all-payments/view",
          search: createSearchParams({ id: `${paymentId}` }).toString(),
        },
        { replace: true }
      );
    }
  };

  //? Edit Payment Function
  const handleOpenEditPayment = (paymentId) => {
    if (paymentId) {
      navigate(
        {
          pathname: "/all-payments/edit",
          search: createSearchParams({ id: `${paymentId}` }).toString(),
        },
        { replace: true }
      );
    }
  };

  //? Data Definition
  const data = useMemo(
    () =>
      paymentsData?.sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        return 0;
      }) ?? [],
    [paymentsData]
  );

  //? Delete Payment
  const deletePayment = async (id) => {
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
        return DeleteSingleData(`${deletePaymentURL}/${id}`);
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
    mutationFn: (id) => deletePayment(id),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["paymentsData"],
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
        accessorKey: "paymentType",
        header: "Payment Type",
        size: 140,
      },
      {
        accessorKey: "currency",
        header: "Currency",
        size: 140,
      },
      {
        accessorKey: "amountPay",
        header: "Amount Pay",
        size: 140,
      },
      {
        accessorKey: "paymentDate",
        header: "Payment Date",
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
                    handleOpenViewPayment(row?.original?.id);
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
                    handleOpenEditPayment(row?.original?.id);
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
      return paymentsError
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
            {/* {isDesktopOrLaptop && (
              <Button
                variant="contained"
                size="large"
                sx={{ color: "#d4bf79" }}
                onClick={() => handleOpenAddPayment()}
                endIcon={<IoMdPersonAdd />}
              >
                Add Payment
              </Button>
            )} */}
            {/*End Desktop & Laptop View */}

            {/* Start Table & Mobile View */}
            {/* {isTabletOrMobile && (
              <Tooltip arrow placement="bottom" title="Add Payment">
                <IconButton
                  sx={{ bgcolor: "#000", color: "#d4bf79" }}
                  onClick={() => handleOpenAddPayment()}
                >
                  <IoMdPersonAdd />
                </IconButton>
              </Tooltip>
            )} */}
            {/*End Table & Mobile View */}
            <Tooltip arrow placement="bottom" title="Refresh Data">
              <IconButton onClick={() => paymentsRefetch()}>
                <LuRefreshCw color="#acb5c3" size={20} />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      );
    },
    state: {
      isLoading: paymentsLoading,
      showAlertBanner: paymentsError,
      showProgressBars: paymentsLoading ? paymentsLoading : paymentsRefetching,
    },
  });

  return (
    <React.Fragment>
      <MaterialReactTable table={table} />
    </React.Fragment>
  );
};

export default PaymentsTable;
