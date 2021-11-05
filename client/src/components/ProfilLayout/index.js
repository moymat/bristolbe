import * as React from "react";
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
        display:{ xs : "column", md:"flex"}
      }}
    >
      <Box flexDirection="column" sx={{ marginRight: 5, display: {xs: "none", md:"flex"} }}>
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
      <Box sx={{ height:"min-content", display: {xs: "flex", md:"none"}, justifyContent:"center", width: "500px"}}>
        {dataMap.map(({ label }) => (
          <Button
            variant="outlined"
            key={label}
            component={NavLink}
            to={`/user/${label}`}
            sx={{marginBottom: 3, marginRight: 2}}
            activeStyle={{
              backgroundColor: "#03a9f4",
              color: "rgb(0 26 91)"
            }}
          >
            {label}
          </Button>
        ))}
      </Box>
        <Divider orientation="vertical" flexItem sx={{display: {xs: "none", md:"flex"}}}/>
        <Divider  flexItem sx={{display: {xs: "flex", md:"none"}}}/>
      <Box sx={{
          padding: " 30px 60px",
          flexGrow: 1,
          width: "600px",
				}}>
        {children}
      </Box>
    </Box>
  );
}
