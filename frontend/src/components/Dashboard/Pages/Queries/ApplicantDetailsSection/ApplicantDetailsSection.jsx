import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

//? Components imports
import ProfileSection from "./ProfileSection/ProfileSection";
import AddressSection from "./AddressSection/AddressSection";
// import OtherDetailsSection from "./OtherDetailsSection/OtherDetailsSection";

const ApplicantDetailsSection = ({ formikViewApplicantDetailsForm }) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Profile" value="1" sx={{ fontSize: 16 }} />
            <Tab label="Address" value="2" sx={{ fontSize: 16 }} />
            {/* <Tab label="Other Details" value="3" sx={{ fontSize: 16 }} /> */}
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: 0 }}>
          {/* Profile Section */}
          <ProfileSection
            formikViewApplicantDetailsForm={formikViewApplicantDetailsForm}
          />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0 }}>
          <AddressSection
            formikViewApplicantDetailsForm={formikViewApplicantDetailsForm}
          />
        </TabPanel>
        {/* <TabPanel value="3" sx={{ padding: 0 }}>
          <OtherDetailsSection
            formikViewApplicantDetailsForm={formikViewApplicantDetailsForm}
          />
        </TabPanel> */}
      </TabContext>
    </Box>
  );
};

export default ApplicantDetailsSection;
