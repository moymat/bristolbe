import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomAlert = ({
  open,
  handleClose,
  message = "default message",
  duration = 3000,
  severity = "success",
}) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Snackbar
      sx={{ "&.MuiSnackbar-root": { top: isSmallScreen ? "60px" : "68px" } }}
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      color={severity}
      autoHideDuration={duration}
      TransitionComponent={Slide}
      onClose={handleClose}
    >
      <Alert variant="filled" severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
