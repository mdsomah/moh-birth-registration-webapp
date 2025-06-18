import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

// Components imports
import RetailCategory from "./RetailCategory/RetailCategory";
import HospitalityCategory from "./HospitalityCategory/HospitalityCategory";
import ECommerceCategory from "./ECommerceCategory/ECommerceCategory";

const LabTabs = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Retail" value="1" sx={{ fontSize: 16 }} />
            <Tab label="Hospitality" value="2" sx={{ fontSize: 16 }} />
            <Tab label="E-Commerce" value="3" sx={{ fontSize: 16 }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <RetailCategory />
        </TabPanel>
        <TabPanel value="2">
          <HospitalityCategory />
        </TabPanel>
        <TabPanel value="3">
          <ECommerceCategory />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default LabTabs;
