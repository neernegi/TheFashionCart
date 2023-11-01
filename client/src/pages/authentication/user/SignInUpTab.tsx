import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserRegister from "./UserRegister";
import UserLogin from "./UserLogin";
import { Divider } from "@mui/material";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [showRegisterForm, setShowRegisterForm] = React.useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setShowRegisterForm(newValue === 0); // Show Register form when the first tab is active
  };

  return (
    <Box width={"100%"}>
      <Box
        sx={{
          borderBottom: 4,
          // borderColor: "divider",
          width: "100%", // Full width
          mt: "24rem", // Responsive margin-top
          // Center horizontally
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          style={{ marginLeft: "44.5%" }}
        >
          <Tab
            style={{ fontSize: "2.3rem", fontWeight: 600 }}
            label="Sign up"
            {...a11yProps(0)}
          />
          <Tab
            style={{ fontSize: "2.3rem", fontWeight: 600 }}
            label="Login"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <Divider style={{ width: "30%", marginLeft: "35%" }} />
      <Box mt={"-18rem"}>
        {" "}
        {/* Responsive margin-top */}
        <CustomTabPanel value={value} index={0}>
          {showRegisterForm && <UserRegister />}
          {/* Conditionally render Register form */}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <UserLogin /> {/* Always render the Login form */}
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
