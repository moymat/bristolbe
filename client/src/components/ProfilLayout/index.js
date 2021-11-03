import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { Button, Divider } from "@mui/material";

export default function ProfilLayout({ children }) {
  const dataMap = [{ label: "profil" }, { label: "settings" }];

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "auto",
      }}
    >
      <Box display="flex" flexDirection="column" sx={{ marginRight: 5 }}>
        {dataMap.map(({ label }) => (
          <Button
            variant="outlined"
            key={label}
            component={NavLink}
            to={`/user/${label}`}
            sx={{marginBottom: 3}}
            activeStyle={{
              backgroundColor: "#03a9f4",
              color: "rgb(0 26 91)"
            }}
          >
            {label}
          </Button>
        ))}
      </Box>
      <Divider orientation="vertical" flexItem />
      {children}
    </Box>
  );
}
