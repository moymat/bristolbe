import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const CustomAlert = ({
	open,
	handleClose,
	message = "default message",
	duration = 3000,
	severity = "success",
}) => {
	return (
		<Snackbar
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
