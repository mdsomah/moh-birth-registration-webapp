import * as React from "react";
import PropTypes from "prop-types";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

//? County Flag
import bomiFlag from "../../../../../images/Counties-Flags/Flag_of_Bomi_County.svg.png";
import bongFlag from "../../../../../images/Counties-Flags/Flag_of_Bong_County.svg.png";
import gbarpoluFlag from "../../../../../images/Counties-Flags/Flag_of_Gbarpolu_County.svg.png";
import grandBassFlag from "../../../../../images/Counties-Flags/Flag_of_Grand_Bassa_County.svg.png";
import grandCapeMountFlag from "../../../../../images/Counties-Flags/Flag_of_Grand_Cape_Mount_County.svg.png";
import grandGedehFlag from "../../../../../images/Counties-Flags/Flag_of_Grand_Gedeh_County.svg.png";
import grandKruFlag from "../../../../../images/Counties-Flags/Flag_of_Grand_Kru_County.svg.png";
import lofaFlag from "../../../../../images/Counties-Flags/Flag_of_Lofa_County.svg.png";
import margibiFlag from "../../../../../images/Counties-Flags/Flag_of_Margibi_County.svg.png";
import marylandFlag from "../../../../../images/Counties-Flags/Flag_of_Maryland_County.svg.png";
import montserradoFlag from "../../../../../images/Counties-Flags/Flag_of_Montserrado_County.svg.png";
import nimbaFlag from "../../../../../images/Counties-Flags/Flag_of_Nimba_County.svg.png";
import rivergeeFlag from "../../../../../images/Counties-Flags/Flag_of_River_Gee_County.svg.png";
import rivercessFlag from "../../../../../images/Counties-Flags/Flag_of_Rivercess_County.svg.png";
import sinoeFlag from "../../../../../images/Counties-Flags/Flag_of_Sinoe_County.svg.png";

const data = [
  {
    label: "Bomi",
    value: 1366,
  },
  {
    label: "Bong",
    value: 4056,
  },
  {
    label: "Gbarpolu",
    value: 1066,
  },
  {
    label: "Grand Bassa",
    value: 3400,
  },
  {
    label: "Grand Cape Mount",
    value: 2206,
  },
  {
    label: "Grand Gedeh",
    value: 1194,
  },
  {
    label: "Grand Kru",
    value: 955,
  },
  {
    label: "Lofa",
    value: 2765,
  },
  {
    label: "Margibi",
    value: 5683,
  },
  {
    label: "Maryland",
    value: 1698,
  },
  {
    label: "Montserrado",
    value: 70239,
  },
  {
    label: "Nimba",
    value: 4493,
  },
  {
    label: "River Gee",
    value: 1545,
  },
  {
    label: "Rivercess",
    value: 946,
  },
  {
    label: "Sinoe",
    value: 1549,
  },
];

//? Counties Array
const Counties = [
  {
    countyName: "Bomi",
    value: 1366,
    countyFlag: `${bomiFlag}`,
    // color: "#A020F0",
    color: "hsl(220, 25%, 65%)",
  },
  {
    countyName: "Bong",
    value: 4056,
    countyFlag: `${bongFlag}`,
    // color: "#FFA500",
    color: "hsl(220, 25%, 45%)",
  },
  {
    countyName: "Gbarpolu",
    value: 1066,
    countyFlag: `${gbarpoluFlag}`,
    // color: "#FFFF00",
    color: "hsl(220, 25%, 30%)",
  },
  {
    countyName: "Grand Bassa",
    value: 3400,
    countyFlag: `${grandBassFlag}`,
    // color: "#00008B",
    color: "hsl(220, 25%, 20%)",
  },
  {
    countyName: "Grand Cape Mount",
    value: 2206,
    countyFlag: `${grandCapeMountFlag}`,
    // color: "#00FF00",
    color: "hsl(220, 25%, 20%)",
  },
  {
    countyName: "Grand Gedeh",
    value: 1194,
    countyFlag: `${grandGedehFlag}`,
    color: "hsl(220, 25%, 20%)",
  },
  {
    countyName: "Grand Kru",
    value: 955,
    countyFlag: `${grandKruFlag}`,
    color: "hsl(220, 25%, 20%)",
  },
  {
    countyName: "Lofa",
    value: 2765,
    countyFlag: `${lofaFlag}`,
    color: "hsl(220, 25%, 20%)",
  },
  {
    countyName: "Margibi",
    value: 5683,
    countyFlag: `${margibiFlag}`,
    color: "hsl(220, 25%, 20%)",
  },
  {
    countyName: "Maryland",
    value: 1698,
    countyFlag: `${marylandFlag}`,
    color: "hsl(220, 25%, 20%)",
  },
  {
    countyName: "Montserrado",
    value: 70239,
    countyFlag: `${montserradoFlag}`,
    color: "hsl(220, 25%, 20%)",
  },
  {
    countyName: "Nimba",
    value: 4493,
    countyFlag: `${nimbaFlag}`,
    color: "hsl(220, 25%, 20%)",
  },
  {
    countyName: "River Gee",
    value: 1545,
    countyFlag: `${rivergeeFlag}`,
    color: "hsl(220, 25%, 20%)",
  },
  {
    countyName: "Rivercess",
    value: 946,
    countyFlag: `${rivercessFlag}`,
    color: "hsl(220, 25%, 20%)",
  },
  {
    countyName: "Sinoe",
    value: 1549,
    countyFlag: `${sinoeFlag}`,
    color: "hsl(220, 25%, 20%)",
  },
];

const StyledText = styled("text", {
  shouldForwardProp: (prop) => prop !== "variant",
})(({ theme }) => ({
  textAnchor: "middle",
  dominantBaseline: "central",
  fill: (theme.vars || theme).palette.text.secondary,
  variants: [
    {
      props: {
        variant: "primary",
      },
      style: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    {
      props: ({ variant }) => variant !== "primary",
      style: {
        fontSize: theme.typography.body2.fontSize,
      },
    },
    {
      props: {
        variant: "primary",
      },
      style: {
        fontWeight: theme.typography.h5.fontWeight,
      },
    },
    {
      props: ({ variant }) => variant !== "primary",
      style: {
        fontWeight: theme.typography.body2.fontWeight,
      },
    },
  ],
}));

function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}

PieCenterLabel.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
};

const colors = [
  "hsl(220, 20%, 65%)",
  "hsl(220, 20%, 42%)",
  "hsl(220, 20%, 35%)",
  "hsl(220, 20%, 25%)",
];

const ChartUserByCountry = (props) => {
  //? Destructure props
  // const { applicantsLoading, applicantsData } = props;

  //? Total Enrollment By County
  const totalEnrollmentByCounty = 704742;
  // const totalEnrollmentByCounty = applicantsLoading
  //   ? 0
  //   : applicantsData?.length;

  return (
    <Card
      variant="outlined"
      sx={{ display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Enrollment % By County
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <PieChart
            colors={colors}
            margin={{
              left: 80,
              right: 80,
              top: 80,
              bottom: 80,
            }}
            series={[
              {
                data,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { faded: "global", highlighted: "item" },
              },
            ]}
            height={260}
            width={260}
            slotProps={{
              legend: { hidden: true },
            }}
          >
            <PieCenterLabel
              primaryText={totalEnrollmentByCounty}
              secondaryText="Total"
            />
          </PieChart>
        </Box>
        {Counties.map((county, index) => (
          <Stack
            key={index}
            direction="row"
            sx={{ alignItems: "center", gap: 2, pb: 2 }}
          >
            <img
              loading="lazy"
              width="30"
              src={county.countyFlag}
              alt={`${county.countyName} Flag`}
            />
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "500" }}>
                  {county.countyName}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {Number((county.value / 5200000) * 100).toFixed(2)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                aria-label="Enrollment by county"
                value={county.value}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: county.color,
                  },
                }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
};

export default ChartUserByCountry;
