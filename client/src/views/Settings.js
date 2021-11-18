import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CustomAlert from "../components/CustomAlert";
import axios from "../utils/axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import PasswordVerification from "../components/PasswordVerification";

const passwordValidator = new RegExp(
	/^(?=.*[A-Za-zÀ-ÖØ-öø-ÿ])(?=.*\d).{8,30}$/
);

const emailValidator = new RegExp(
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export default function Settings() {
	const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));
	const isMediumScreen = useMediaQuery(theme => theme.breakpoints.down("md"));
	const [userInformation, setUserInformation] = useState({
		passwordEmail: "",
		newEmail: "",
		currentPassword: "",
		password: "",
		confirm: "",
	});
	const [newEmailError, setNewEmailError] = useState(false);
	const [emailPasswordError, setEmailPasswordError] = useState(false);
	const [currentPasswordError, setCurrentPasswordError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [samePasswordError, setSamePasswordError] = useState(false);
	const [confirmError, setConfirmError] = useState(false);
	const [touch, setTouch] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [isSnackOpen, setIsSnackOpen] = useState(false);
	const user = useSelector(state => state.user.user);
	const dispatch = useDispatch();

	const handleTouch = () => {
		!touch && setTouch(true);
	};

	const handleChange = e => {
		const { name, value } = e.target;
		const { currentPassword, password } = userInformation;

		switch (name) {
			case "currentPassword":
				currentPasswordError && setCurrentPasswordError(false);
				break;
			case "password":
				setPasswordError(!passwordValidator.test(value));
				setSamePasswordError(currentPassword === value);
				break;
			case "confirm":
				setConfirmError(value !== password);
				break;
			case "passwordEmail":
				emailPasswordError && setEmailPasswordError(false);
				break;
			case "newEmail":
				setNewEmailError(!emailValidator.test(value));
				break;
			default:
				return;
		}
		setUserInformation({
			...userInformation,
			[name]: value,
		});
	};
	const handleSubmitEmail = async e => {
		e.preventDefault();
		const { newEmail, passwordEmail } = userInformation;

		if (!newEmail || !passwordEmail || emailPasswordError || newEmailError) {
			!newEmail && setNewEmailError(true);
			!passwordEmail && setEmailPasswordError(true);
			return;
		}

		try {
			await axios().patch(`/api/v1/users/${user.id}/email`, {
				email: newEmail,
				password: passwordEmail,
			});
			setAlertMessage("Email updated");
			setIsSnackOpen(true);
			setUserInformation({
				...userInformation,
				newEmail: "",
				passwordEmail: "",
			});
			dispatch({ type: "UPDATE_USER_EMAIL", email: newEmail });
		} catch (err) {
			const { error } = err.response.data;
			if (error === "wrong password") {
				setEmailPasswordError(true);
			}
		}
	};

	const handleSubmitPassword = async e => {
		e.preventDefault();
		const { currentPassword, password, confirm } = userInformation;

		if (
			!currentPassword ||
			!password ||
			!confirm ||
			confirmError ||
			passwordError
		) {
			!currentPassword && setCurrentPasswordError(true);
			!password && setPasswordError(true);
			!confirm && setConfirmError(true);
			return;
		}

		try {
			await axios().patch(`/api/v1/users/${user.id}/password`, {
				password: currentPassword,
				new_password: password,
				confirm,
			});
			setAlertMessage("Password updated");
			setIsSnackOpen(true);
			setUserInformation({
				...userInformation,
				currentPassword: "",
				password: "",
				confirm: "",
			});
		} catch (err) {
			const { error } = err.response.data;
			console.log(error);
			if (error.includes("wrong password")) {
				setCurrentPasswordError(true);
			} else if (error.includes("same password")) {
				setSamePasswordError(true);
			}
		}
	};

	const handleSnackClose = () => {
		setAlertMessage("");
		setIsSnackOpen(false);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				mb: 4,
				"& .MuiTextField-root": { mb: 2 },
				ml: isMediumScreen ? 0 : 5,
			}}>
			<CustomAlert
				open={isSnackOpen}
				handleClose={handleSnackClose}
				message={alertMessage}
			/>
			<Typography
				variant="h4"
				gutterBottom
				sx={{ alignSelf: { sx: "center", md: "flex-start" } }}>
				Settings
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
					maxWidth: { xs: "70%", md: "400px" },
					alignItems: isSmallScreen ? "center" : "",
				}}
				component="form"
				onSubmit={handleSubmitEmail}>
				<Typography variant="h6" sx={{ marginBottom: 2 }}>
					Change your Email
				</Typography>
				<TextField
					sx={{ width: "100%" }}
					type="password"
					name="passwordEmail"
					label="Password"
					variant="outlined"
					inputProps={{ autoComplete: "new-password" }}
					onChange={handleChange}
					value={userInformation.passwordEmail}
					helperText={emailPasswordError ? "Wrong password" : ""}
					error={emailPasswordError}
				/>
				<TextField
					sx={{ width: "100%" }}
					type="email"
					name="newEmail"
					label="New email"
					variant="outlined"
					onChange={handleChange}
					value={userInformation.newEmail}
					helperText={newEmailError ? "Your Email is invalid" : ""}
					error={newEmailError}
				/>
				<Button
					type="submit"
					variant="contained"
					sx={{
						marginTop: 2,
						width: "fit-content",
					}}>
					Change
				</Button>
			</Box>
			<Box
				sx={{
					marginTop: 4,
					display: "flex",
					flexDirection: "column",
					width: "100%",
					maxWidth: { xs: "70%", md: "400px" },
					alignItems: isSmallScreen ? "center" : "",
				}}
				component="form"
				onSubmit={handleSubmitPassword}>
				<Typography variant="h6" sx={{ marginBottom: 2 }}>
					Change your password
				</Typography>
				<TextField
					sx={{ width: "100%" }}
					type="password"
					name="currentPassword"
					label="Password"
					variant="outlined"
					inputProps={{ autoComplete: "new-password" }}
					onChange={handleChange}
					value={userInformation.currentPassword}
					helperText={currentPasswordError ? "Wrong password" : ""}
					error={currentPasswordError}
				/>
				<TextField
					sx={{ width: "100%" }}
					type="password"
					name="password"
					label="New Password"
					variant="outlined"
					onChange={handleChange}
					value={userInformation.password}
					onFocus={handleTouch}
					helperText={
						passwordError
							? "Your new password is invalid"
							: samePasswordError
							? "Your new password has to be different than your current one"
							: ""
					}
					error={passwordError || samePasswordError}
				/>
				<PasswordVerification
					input={{
						password: userInformation.password,
						confirm: userInformation.confirm,
					}}
				/>
				<TextField
					sx={{ width: "100%" }}
					type="password"
					name="confirm"
					label="Confirm Password"
					variant="outlined"
					onChange={handleChange}
					value={userInformation.confirm}
					helperText={confirmError ? "Your confirm password is invalid" : ""}
					error={confirmError}
				/>
				<Button
					type="submit"
					variant="contained"
					className="log-submit"
					sx={{
						marginTop: 2,
						width: "fit-content",
					}}>
					Change
				</Button>
			</Box>
		</Box>
	);
}
