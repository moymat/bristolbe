import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";

export default function ProfilLayout({ children }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "auto",
      }}
    >
      <Tabs orientation="vertical" value={value} onChange={handleChange}>
        <Tab label="Profil" component={NavLink} to="/user/profil" />
        <Tab label="Settings" component={NavLink} to="/user/settings" />
      </Tabs>
      <Divider orientation="vertical" flexItem />
      {children}
    </Box>
  );
}
