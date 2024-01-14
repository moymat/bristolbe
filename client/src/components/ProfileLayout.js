import { useState, cloneElement } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CustomAlert from "../components/CustomAlert";

export default function ProfileLayout({ children }) {
  const dataMap = [{ label: "profile" }, { label: "settings" }];
  const { pathname } = useLocation();
  const [alertMessage, setAlertMessage] = useState("toto");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [isSnackOpen, setIsSnackOpen] = useState(false);

  const handleSnackClose = () => {
    setIsSnackOpen(false);
  };

  const handleAlert = ({ message, severity }) => {
    setAlertSeverity(severity);
    setAlertMessage(message);
    setIsSnackOpen(true);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        display: { xs: "column", md: "flex" },
        height: "100%",
        width: "100%",
      }}
    >
      <CustomAlert
        open={isSnackOpen}
        handleClose={handleSnackClose}
        message={alertMessage}
        severity={alertSeverity}
      />
      <Box
        flexDirection="column"
        sx={{ margin: 2, display: { xs: "none", md: "flex" } }}
      >
        {dataMap.map(({ label }) => (
          <Button
            variant={pathname.includes(label) ? "contained" : "outlined"}
            key={label}
            component={NavLink}
            to={`/user/${label}`}
            sx={{ marginBottom: 3 }}
          >
            {label}
          </Button>
        ))}
      </Box>
      <Box
        sx={{
          height: "min-content",
          display: { xs: "flex", md: "none" },
          justifyContent: "center",
        }}
      >
        {dataMap.map(({ label }) => (
          <Button
            variant={pathname.includes(label) ? "contained" : "outlined"}
            key={label}
            component={NavLink}
            to={`/user/${label}`}
            sx={{
              mt: 0.5,
              mb: 1,
              mx: 0.75,
            }}
          >
            {label}
          </Button>
        ))}
      </Box>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ display: { xs: "none", md: "flex" } }}
      />
      <Divider flexItem sx={{ display: { xs: "flex", md: "none" } }} />
      <Box sx={{ mt: 2 }}>{cloneElement(children, { handleAlert })}</Box>
    </Box>
  );
}
