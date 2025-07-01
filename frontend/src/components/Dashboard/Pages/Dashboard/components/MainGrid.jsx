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

const MainGrid = () => {
  //? Tablet or Mobile Responsive Media Queries
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  //? Destructure useQuery
  const { isLoading: applicantsLoading, data: applicantsData } = useQuery({
    queryKey: ["applicantsData"],
    queryFn: () => GetAllData(`${getAllApplicantsURL}`),
  });

  //? Data Definition
  const ResponseData = useMemo(() => applicantsData ?? [], [applicantsData]);
  console.log(ResponseData);

  //? Total Registered Applicants
  const totalRegisteredApplicants = 770687;
  // decryptedData && decryptedData?.length !== 0 ? cipherText?.totalRecords : 0;

  //? Total Registered Citizens
  const totalRegisteredCitizens = 769589;
  // decryptedData && decryptedData?.length !== 0 ? cipherText?.totalRecords : 0;

  //? Total Registered Residents
  const totalRegisteredResidents = 1098;
  // decryptedData && decryptedData?.length !== 0 ? cipherText?.totalRecords : 0;

  //? Total Registered Males
  const totalRegisteredMales = 437608;
  // decryptedData && decryptedData?.length !== 0
  //   ? decryptedData?.filter((applicant) => applicant?.Gender === "Male")
  //       .length
  //   : 0;

  //? Total Registered Females
  const totalRegisteredFemales = 333079;
  // decryptedData && decryptedData?.length !== 0
  //   ? decryptedData?.filter((applicant) => applicant?.Gender === "Female")
  //       .length
  //   : 0;

  //? Total NIN Generated
  const totalNINGenerated = 704742;
  // decryptedData && decryptedData?.length !== 0
  //   ? decryptedData?.filter((applicant) => applicant?.NIN !== "").length
  //   : 0;

  //? Total Duplicates
  const totalDuplicates = 2810;
  // decryptedData && decryptedData?.length !== 0
  //   ? decryptedData?.filter((applicant) => applicant?.EnrollmentId === "")
  //       .length
  //   : 0;

  //? Total Printed Cards
  const totalPrintedCards = 704742;
  // decryptedData && decryptedData?.length !== 0
  //   ? decryptedData?.filter((applicant) => applicant?.NIN === "").length
  //   : 0;

  //? Dashboard Data
  const data = [
    {
      title: "Total Registered Applicants",
      value: `${totalRegisteredApplicants}`,
      interval: "Last 30 days",
      trend: "totalApplicants",
      data: [
        2000, 200, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 2000, 2000,
      ],
    },
    {
      title: "Total Registered Citizens",
      value: `${totalRegisteredCitizens}`,
      interval: "Last 30 days",
      trend: "totalCitizens",
      data: [
        2000, 200, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 2000, 2000,
      ],
    },
    {
      title: "Total Registered Residents",
      value: `${totalRegisteredResidents}`,
      interval: "Last 30 days",
      trend: "totalResidents",
      data: [
        2000, 200, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 2000, 2000,
      ],
    },
    {
      title: "Total Registered Males",
      value: `${totalRegisteredMales}`,
      interval: "Last 30 days",
      trend: "totalMales",
      data: [
        2000, 200, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 2000, 2000,
      ],
    },
    {
      title: "Total Registered Females",
      value: `${totalRegisteredFemales}`,
      interval: "Last 30 days",
      trend: "totalFemales",
      data: [
        2000, 200, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 2000, 2000,
      ],
    },
    {
      title: "Total NIN Generated",
      value: `${totalNINGenerated}`,
      interval: "Last 30 days",
      trend: "totalNIN",
      data: [
        2000, 200, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 2000, 2000,
      ],
    },
    {
      title: "Total Duplicates",
      value: `${totalDuplicates}`,
      interval: "Last 30 days",
      trend: "totalDuplicates",
      data: [
        2000, 200, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 2000, 2000,
      ],
    },
    {
      title: "Total Printed Cards",
      value: `${totalPrintedCards}`,
      interval: "Last 30 days",
      trend: "totalPrintedCards",
      data: [
        2000, 200, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 2000, 2000,
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
