import React, { useMemo } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Avatar,
  IconButton,
  Tooltip,
  MenuItem,
  Chip,
} from "@mui/material";
import { LuRefreshCw } from "react-icons/lu";
import { ImEye } from "react-icons/im";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
// import { setViewApplicant } from "../../../../../app/slices/querySlice";

export let Row_Data;
export let Close_Menu;

const QueriesTable = (props) => {
  //? Destructure props
  const {
    // queriesLoading,
    // queriesError,
    // queriesRefetch,
    // queriesRefetching,
    applicantSearchResults,
  } = props;

  //? useDispatch
  const dispatch = useDispatch();

  //? useNavigate
  const navigate = useNavigate();

  //? View Applicant Details Function
  const handleOpenViewApplicantDetails = (row) => {
    if (row) {
      // dispatch(setViewApplicant(row?.original));
      navigate(
        {
          pathname: "/all-queries/view-applicant-details",
          search: createSearchParams({
            enrollmentId: `${row?.original?.EnrollmentId}`,
          }).toString(),
        },
        { replace: true }
      );
    }
  };

  //? Data Definition
  const data = useMemo(
    () =>
      applicantSearchResults?.sort((a, b) => {
        if (a.EnrollmentId > b.EnrollmentId) return -1;
        if (a.EnrollmentId < b.EnrollmentId) return 1;
        return 0;
      }) ?? [],
    [applicantSearchResults]
  );

  //? Columns Definition
  const columns = useMemo(
    () => [
      {
        accessorKey: "NINNumber",
        header: "NIN",
        size: 140,
      },
      {
        accessorFn: (row) => `${row?.FirstName}`,
        id: "FirstName",
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
            <Avatar
              alt={`${row?.original?.FirstName} Photo`}
              src={`data:image/jpeg;base64,${row?.original?.PhotoBase64}`}
              sx={{
                width: 50,
                height: 50,
              }}
              slotProps={{
                img: { loading: "lazy" },
              }}
            />
            <span>
              {row?.original?.FirstName}{" "}
              {row?.original?.MiddleName ? ` ${row?.original?.MiddleName}` : ""}{" "}
              {row?.original?.Surname}
            </span>
          </Box>
        ),
      },
      {
        accessorKey: "MobileNumber",
        header: "Mobile Number",
        size: 140,
      },
      {
        accessorFn: (row) => `${row?.DateOfBirth}`,
        id: "DateOfBirth",
        header: "DoB",
        size: 140,
        Cell: ({ renderedCellValue }) => (
          <span>{dayjs(renderedCellValue).format("MM/DD/YYYY")}</span>
        ),
      },
      {
        accessorFn: (row) => `${row?.CardType}`,
        id: "CardType",
        header: "Card Type",
        size: 140,
        Cell: ({ row }) => (
          <Chip
            label={`${row?.original?.CardType}`}
            variant="filled"
            sx={{
              p: 1.4,
              fontWeight: "bold",
              bgcolor: "#00A4EF",
              color: "#fff",
            }}
          />
        ),
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
      Row_Data = row;
      Close_Menu = closeMenu;
      return [
        <>
          <MenuItem>
            <Tooltip arrow placement="bottom" title="View Applicant Details">
              <IconButton
                color="default"
                onClick={() => {
                  handleOpenViewApplicantDetails(row);
                }}
              >
                <ImEye color="#acb5c3" size={20} />
              </IconButton>
            </Tooltip>
          </MenuItem>
        </>,
      ];
    },
    muiToolbarAlertBannerProps: () => {
      // return queriesError
      //   ? {
      //       color: "error",
      //       children: "Error Loading Data!",
      //     }
      //   : undefined;
    },
    renderTopToolbarCustomActions: () => {
      return (
        <Tooltip arrow placement="bottom" title="Refresh Data">
          {/* <IconButton onClick={() => queriesRefetch()}>
            <LuRefreshCw color="#acb5c3" size={20} />
          </IconButton> */}
        </Tooltip>
      );
    },
    // state: {
    //   isLoading: queriesLoading,
    //   showAlertBanner: queriesError,
    //   showProgressBars: queriesLoading ? queriesLoading : queriesRefetching,
    // },
  });

  return (
    <React.Fragment>
      <MaterialReactTable table={table} />
    </React.Fragment>
  );
};

export default QueriesTable;
