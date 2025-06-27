import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { areaElementClasses } from "@mui/x-charts/LineChart";

const getDaysInMonth = (month, year) => {
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
};

const AreaGradient = ({ color, id }) => {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.3} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
};

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

const StatCard = ({ title, value, interval, trend, data }) => {
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
  const daysInWeek = getDaysInMonth(findMonthVal, findYearVal);

  const trendColors = {
    totalApplicants:
      theme.palette.mode === "light"
        ? theme.palette.success.main
        : theme.palette.success.dark,
    totalCitizens:
      theme.palette.mode === "light"
        ? theme.palette.error.main
        : theme.palette.error.dark,
    totalResidents:
      theme.palette.mode === "light"
        ? theme.palette.grey[400]
        : theme.palette.grey[700],
    totalMales:
      theme.palette.mode === "light"
        ? theme.palette.info.main
        : theme.palette.info.dark,
    totalFemales:
      theme.palette.mode === "light"
        ? theme.palette.secondary.main
        : theme.palette.secondary.dark,
    totalNIN:
      theme.palette.mode === "light"
        ? theme.palette.warning.main
        : theme.palette.warning.dark,
    totalDuplicates:
      theme.palette.mode === "light"
        ? theme.palette.grey[400]
        : theme.palette.grey[700],
    totalPrintedCards:
      theme.palette.mode === "light"
        ? theme.palette.grey[400]
        : theme.palette.grey[700],
  };

  const labelColors = {
    totalApplicants: "success",
    totalCitizens: "error",
    totalResidents: "default",
    totalMales: "info",
    totalFemales: "secondary",
    totalNIN: "warning",
    totalDuplicates: "grey",
    totalPrintedCards: "grey",
  };

  const color = labelColors[trend];
  const chartColor = trendColors[trend];
  const trendValues = {
    totalApplicants: "+14.82%",
    totalCitizens: "+14.8%",
    totalResidents: "+0.0211%",
    totalMales: "+8.416%",
    totalFemales: "+6.4%",
    totalNIN: "+13.55%",
    totalDuplicates: "+0.054%",
    totalPrintedCards: "+13.55%",
  };

  return (
    <Card variant="outlined" sx={{ height: "100%", flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          {title}
        </Typography>
        <Stack
          direction="column"
          sx={{ justifyContent: "space-between", flexGrow: "1", gap: 1 }}
        >
          <Stack sx={{ justifyContent: "space-between" }}>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography variant="h4" component="p">
                {value}
              </Typography>
              <Chip size="small" color={color} label={trendValues[trend]} />
            </Stack>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {interval}
            </Typography>
          </Stack>
          <Box sx={{ width: "100%", height: 50 }}>
            <SparkLineChart
              colors={[chartColor]}
              data={data}
              area
              showHighlight
              showTooltip
              xAxis={{
                scaleType: "band",
                data: daysInWeek, // Use the correct property 'data' for xAxis
              }}
              sx={{
                [`& .${areaElementClasses.root}`]: {
                  fill: `url(#area-gradient-${value})`,
                },
              }}
            >
              <AreaGradient color={chartColor} id={`area-gradient-${value}`} />
            </SparkLineChart>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

StatCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  interval: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  trend: PropTypes.oneOf([
    "totalApplicants",
    "totalCitizens",
    "totalResidents",
    "totalMales",
    "totalFemales",
    "totalNIN",
    "totalDuplicates",
    "totalPrintedCards",
  ]).isRequired,
  value: PropTypes.string.isRequired,
};

export default StatCard;
