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
	const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));

	return (
		<Snackbar
			sx={{ top: isSmallScreen ? 60 : 8 }}
			open={open}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			autoHideDuration={duration}
			TransitionComponent={Slide}
			onClose={handleClose}>
			<Alert variant="filled" severity={severity}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default CustomAlert;
