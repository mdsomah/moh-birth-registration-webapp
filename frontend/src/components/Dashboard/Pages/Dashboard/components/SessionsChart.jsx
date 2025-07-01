import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString("en-US", {
    month: "short",
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

const SessionsChart = (props) => {
  //? Destructure props
  const { applicantsLoading, applicantsData } = props;

  //? Data Definition
  const ApplicantsData = useMemo(() => applicantsData ?? [], [applicantsData]);
  console.log(ApplicantsData);

  //? Month Name
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //? Month Value
  const Month = new Date();
  const findMonth = monthName[Month.getMonth()];
  let findMonthVal;
  switch (findMonth) {
    case "January":
      findMonthVal = 1;
      break;
    case "February":
      findMonthVal = 2;
      break;
    case "March":
      findMonthVal = 3;
      break;
    case "April":
      findMonthVal = 4;
      break;
    case "May":
      findMonthVal = 5;
      break;
    case "June":
      findMonthVal = 6;
      break;
    case "July":
      findMonthVal = 7;
      break;
    case "August":
      findMonthVal = 8;
      break;
    case "September":
      findMonthVal = 9;
      break;
    case "October":
      findMonthVal = 10;
      break;
    case "November":
      findMonthVal = 11;
      break;
    case "December":
      findMonthVal = 12;
      break;
    default:
      findMonthVal = null; //? Add a default case to handle other months
  }

  console.log(findMonthVal);

  //? Year Value
  const Year = new Date();
  const findYearVal = Year.getFullYear();
  console.log(findYearVal);

  const theme = useTheme();
  const data = getDaysInMonth(findMonthVal, findYearVal);

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  //? Daily Registration
  const dailyRegistration = applicantsLoading ? 0 : ApplicantsData?.length;

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Daily Registration
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              {dailyRegistration}
            </Typography>
            <Chip
              size="small"
              color="success"
              label={`+${Number((dailyRegistration / 5200000) * 100).toFixed(
                2
              )}%`}
            />
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Registration per day for the last 30 days
          </Typography>
        </Stack>
        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "point",
              data,
              tickInterval: (_index, i) => (i + 1) % 5 === 0,
            },
          ]}
          series={[
            {
              id: "new",
              label: "New",
              showMark: false,
              curve: "linear",
              stack: "total",
              area: true,
              stackOrder: "ascending",
              data: [
                2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
                2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
                2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
              ],
            },
            {
              id: "renewal",
              label: "Renewal",
              showMark: false,
              curve: "linear",
              stack: "total",
              area: true,
              stackOrder: "ascending",
              data: [
                2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
                2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
                2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
              ],
            },
            {
              id: "replacement",
              label: "Replacement",
              showMark: false,
              curve: "linear",
              stack: "total",
              stackOrder: "ascending",
              data: [
                2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
                2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
                2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
              ],
              area: true,
            },
          ]}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            "& .MuiAreaElement-series-organic": {
              fill: "url('#new')",
            },
            "& .MuiAreaElement-series-referral": {
              fill: "url('#renewal')",
            },
            "& .MuiAreaElement-series-direct": {
              fill: "url('#replacement')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          <AreaGradient color={theme.palette.primary.dark} id="new" />
          <AreaGradient color={theme.palette.primary.main} id="renewal" />
          <AreaGradient color={theme.palette.primary.light} id="replacement" />
        </LineChart>
      </CardContent>
    </Card>
  );
};

export default SessionsChart;
