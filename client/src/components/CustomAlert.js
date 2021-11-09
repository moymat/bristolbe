import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const CustomAlert = ({
	open,
	handleClose,
	options = { message: "default message", duration: 3000, severity: "success" },
}) => {
	return (
		<Snackbar
			open={open}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			autoHideDuration={options.duration}
			TransitionComponent={Slide}
			onClose={handleClose}>
			<Alert variant="filled" severity={options.severity}>
				{options.message}
			</Alert>
		</Snackbar>
	);
};

export default CustomAlert;
