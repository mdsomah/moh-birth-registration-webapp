import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

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

function renderSparklineCell(params) {
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

  const data = getDaysInMonth(findMonthVal, findYearVal);
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={["hsl(210, 98%, 42%)"]}
        xAxis={{
          scaleType: "band",
          data,
        }}
      />
    </div>
  );
}

function renderStatus(status, centers) {
  const colors = {
    Online: "success",
    Offline: "default",
  };

  return <Chip label={centers} color={colors[status]} size="small" />;
}

export function renderAvatar(params) {
  if (params.value == null) {
    return "";
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: "24px",
        height: "24px",
        fontSize: "0.85rem",
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const columns = [
  {
    field: "county",
    headerName: "County",
    flex: 1.5,
    minWidth: 200,
  },
  {
    field: "status",
    headerName: "Centers",
    flex: 0.5,
    minWidth: 80,
    renderCell: (params) => renderStatus(params.row.status, params.row.centers),
  },
  {
    field: "enrollments",
    headerName: "Daily Enrollment",
    flex: 1,
    minWidth: 150,
    renderCell: renderSparklineCell,
  },
];

export const rows = [
  {
    id: 1,
    county: "Bomi",
    status: "Online",
    centers: 2,
    enrollments: [
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000,
    ],
  },
  {
    id: 0,
    county: "Bong",
    status: "Online",
    centers: 2,
    enrollments: [
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000,
    ],
  },
  {
    id: 2,
    county: "Gbarpolu",
    status: "Offline",
    centers: 2,
    enrollments: [
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000,
    ],
  },
  {
    id: 4,
    county: "Grand Bassa",
    status: "Online",
    centers: 2,
    enrollments: [
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000,
    ],
  },
  {
    id: 5,
    county: "Grand Cape Mount",
    status: "Offline",
    centers: 2,
    enrollments: [
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000,
    ],
  },
  {
    id: 6,
    county: "Grand Gedeh",
    status: "Online",
    centers: 2,
    enrollments: [
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000,
    ],
  },
  {
    id: 7,
    county: "Grand Kru",
    status: "Offline",
    centers: 2,
    enrollments: [
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000,
    ],
  },
  {
    id: 8,
    county: "Lofa",
    status: "Online",
    centers: 2,
    enrollments: [
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000,
    ],
  },
  {
    id: 9,
    county: "Margibi",
    status: "Offline",
    centers: 5,
    enrollments: [
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000,
    ],
  },
  {
    id: 10,
    county: "Maryland",
    status: "Online",
    centers: 2,
    enrollments: [
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000,
    ],
  },
  {
    id: 11,
    county: "Montserrado",
    status: "Offline",
    centers: 12,
    enrollments: [
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000,
    ],
  },
  {
    id: 12,
    county: "Nimba",
    status: "Online",
    centers: 7,
    enrollments: [
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000,
    ],
  },
  {
    id: 13,
    county: "River Gee",
    status: "Offline",
    centers: 2,
    enrollments: [
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000,
    ],
  },
  {
    id: 14,
    county: "Rivercess",
    status: "Online",
    centers: 2,
    enrollments: [
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000,
    ],
  },
  {
    id: 15,
    county: "Sinoe",
    status: "Offline",
    centers: 2,
    enrollments: [
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
      2000, 2000, 2000, 2000, 2000, 2000,
    ],
  },
];
