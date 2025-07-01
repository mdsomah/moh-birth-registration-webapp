import React, { useMemo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";

const PageViewsBarChart = (props) => {
  //? Destructure props
  const { applicantsLoading, applicantsData } = props;

  //? Data Definition
  const ApplicantsData = useMemo(() => applicantsData ?? [], [applicantsData]);
  console.log(ApplicantsData);

  const theme = useTheme();
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];

  //? Monthly Registration
  const monthlyRegistration = applicantsLoading ? 0 : ApplicantsData?.length;

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Monthly Registration
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
              {monthlyRegistration}
            </Typography>
            <Chip
              size="small"
              color="error"
              label={`+${Number((monthlyRegistration / 5200000) * 100).toFixed(
                2
              )}%`}
            />
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Registration per month for the last 12 months
          </Typography>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "band",
              categoryGapRatio: 0.5,
              data: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
          ]}
          series={[
            {
              id: "new",
              label: "New",
              data: [
                2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
                2000, 2000,
              ],
              stack: "A",
            },
            {
              id: "renewal",
              label: "Renewal",
              data: [
                2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
                2000, 2000,
              ],
              stack: "A",
            },
            {
              id: "replacement",
              label: "Replacement",
              data: [
                2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
                2000, 2000,
              ],
              stack: "A",
            },
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default PageViewsBarChart;
