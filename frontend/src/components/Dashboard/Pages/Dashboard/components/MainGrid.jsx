import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import ChartUserByCountry from "./ChartUserByCountry";
import CustomizedDataGrid from "./CustomizedDataGrid";
// import HighlightedCard from "./HighlightedCard";
import PageViewsBarChart from "./PageViewsBarChart";
import SessionsChart from "./SessionsChart";
import StatCard from "./StatCard";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";

//? React Responsive Media Queries
import { useMediaQuery } from "react-responsive";

//? Get All Data
import GetAllData from "../../../../../apis/GetAllData";

//? Endpoints
const getAllApplicantsURL = "/applicants";
const getAllUsersURL = "/users";

const MainGrid = () => {
  //? Tablet or Mobile Responsive Media Queries
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  //? Destructure useQuery
  const { isLoading: applicantsLoading, data: applicantsData } = useQuery({
    queryKey: ["applicantsData"],
    queryFn: () => GetAllData(`${getAllApplicantsURL}`),
  });

  const { isLoading: usersLoading, data: usersData } = useQuery({
    queryKey: ["usersData"],
    queryFn: () => GetAllData(`${getAllUsersURL}`),
  });

  //? Data Definition
  const ApplicantsData = useMemo(() => applicantsData ?? [], [applicantsData]);
  console.log(ApplicantsData);

  const UsersData = useMemo(() => usersData ?? [], [usersData]);
  console.log(UsersData);

  //? Total Registered Applicants
  const totalRegisteredApplicants = applicantsLoading
    ? 0
    : ApplicantsData?.length;

  //? Total Registered Males
  const totalRegisteredMales = applicantsLoading
    ? 0
    : ApplicantsData?.filter((applicant) => applicant?.applicantSex === "Male")
        .length;

  //? Total Registered Females
  const totalRegisteredFemales = applicantsLoading
    ? 0
    : ApplicantsData?.filter(
        (applicant) => applicant?.applicantSex === "Female"
      ).length;

  //? Total Accepted Applicants
  const totalAcceptedApplicants = 0;
  // decryptedData && decryptedData?.length !== 0 ? cipherText?.totalRecords : 0;

  //? Total Rejected Applicants
  const totalRejectedApplicants = 0;
  // decryptedData && decryptedData?.length !== 0 ? cipherText?.totalRecords : 0;

  //? Total Appointments
  const totalAppointments = 0;
  // decryptedData && decryptedData?.length !== 0
  //   ? decryptedData?.filter((applicant) => applicant?.NIN !== "").length
  //   : 0;

  //? Total Payments
  const totalPayments = 0;
  // decryptedData && decryptedData?.length !== 0
  //   ? decryptedData?.filter((applicant) => applicant?.EnrollmentId === "")
  //       .length
  //   : 0;

  //? Total Users
  const totalUsers = usersLoading ? 0 : UsersData?.length;

  //? Dashboard Data
  const data = [
    {
      title: "Total Registered Applicants",
      value: `${totalRegisteredApplicants}`,
      interval: "Last 30 days",
      trend: "totalApplicants",
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ],
    },
    {
      title: "Total Registered Males",
      value: `${totalRegisteredMales}`,
      interval: "Last 30 days",
      trend: "totalMales",
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ],
    },
    {
      title: "Total Registered Females",
      value: `${totalRegisteredFemales}`,
      interval: "Last 30 days",
      trend: "totalFemales",
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ],
    },
    {
      title: "Total Accepted Applicants",
      value: `${totalAcceptedApplicants}`,
      interval: "Last 30 days",
      trend: "totalAccepted",
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ],
    },
    {
      title: "Total Rejected Applicants",
      value: `${totalRejectedApplicants}`,
      interval: "Last 30 days",
      trend: "totalRejected",
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ],
    },
    {
      title: "Total Appointments",
      value: `${totalAppointments}`,
      interval: "Last 30 days",
      trend: "totalAppointments",
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ],
    },
    {
      title: "Total Payments",
      value: `${totalPayments}`,
      interval: "Last 30 days",
      trend: "totalPayments",
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ],
    },
    {
      title: "Total Users",
      value: `${totalUsers}`,
      interval: "Last 30 days",
      trend: "totalUsers",
      data: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ],
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      {isTabletOrMobile && <NavbarBreadcrumbs />}
      <Typography
        component="h2"
        variant="h6"
        sx={{ mt: { xs: 3, md: 0 }, mb: 2 }}
      >
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        {/* <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid> */}
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart
            applicantsLoading={applicantsLoading}
            applicantsData={applicantsData}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart
            applicantsLoading={applicantsLoading}
            applicantsData={applicantsData}
          />
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <ChartUserByCountry
            applicantsLoading={applicantsLoading}
            applicantsData={applicantsData}
          />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
};

export default MainGrid;
