import Box from "@mui/material/Box";
import AuthLeftPanel from "./AuthLeftPanel";
import AppIcon from "../assets/img/appIcon.svg";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function InputLayout({ children }) {
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100vw" }}>
      <img
        alt="brisol"
        src={AppIcon}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          width: isMediumScreen ? "66px" : "100px",
          opacity: isMediumScreen ? 1 : 0.5,
        }}
      />
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flex: 1,
        }}
      >
        <AuthLeftPanel />
      </Box>
      <Box
        sx={{
          width: 600,
          margin: "auto",
          padding: " 30px 60px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
