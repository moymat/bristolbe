import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CustomAlert from "../components/CustomAlert";
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { UserContext } from "../App";
import axios from "../utils/axios";

const passwordValidator = new RegExp(
	/^(?=.*[A-Za-zÀ-ÖØ-öø-ÿ])(?=.*\d).{8,30}$/
);

const emailValidator = new RegExp(
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export default function Settings() {
	const [userInformation, setUserInformation] = useState({
		passwordEmail: "",
		newEmail: "",
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [validLength, hasNumber, upperCase, lowerCase, match] =
		usePasswordValidation({
			firstPassword: userInformation.newPassword,
			secondPassword: userInformation.confirmPassword,
		});
	const [newEmailError, setNewEmailError] = useState(false);
	const [emailPasswordError, setEmailPasswordError] = useState(false);
	const [currentPasswordError, setCurrentPasswordError] = useState(false);
	const [newPasswordError, setNewPasswordError] = useState(false);
	const [samePasswordError, setSamePasswordError] = useState(false);
	const [confirmPasswordError, setConfirmPasswordError] = useState(false);
	const [touch, setTouch] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [isSnackOpen, setIsSnackOpen] = useState(false);
	const { user, setUser } = useContext(UserContext);

	const handleTouch = () => {
		!touch && setTouch(true);
	};

	const handleChange = e => {
		const { name, value } = e.target;
		const { currentPassword, newPassword } = userInformation;

		switch (name) {
			case "currentPassword":
				currentPasswordError && setCurrentPasswordError(false);
				break;
			case "newPassword":
				setNewPasswordError(!passwordValidator.test(value));
				setSamePasswordError(currentPassword === value);
				break;
			case "confirmPassword":
				setConfirmPasswordError(value !== newPassword);
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
			setUser({ ...user, email: newEmail });
		} catch (err) {
			const { error } = err.response.data;
			if (error === "wrong password") {
				setEmailPasswordError(true);
			}
		}
	};

	const handleSubmitPassword = async e => {
		e.preventDefault();
		const { currentPassword, newPassword, confirmPassword } = userInformation;

		if (
			!currentPassword ||
			!newPassword ||
			!confirmPassword ||
			confirmPasswordError ||
			newPasswordError
		) {
			!currentPassword && setCurrentPasswordError(true);
			!newPassword && setNewPasswordError(true);
			!confirmPassword && setConfirmPasswordError(true);
			return;
		}

		try {
			await axios().patch(`/api/v1/users/${user.id}/password`, {
				password: currentPassword,
				new_password: newPassword,
				confirm: confirmPassword,
			});
			setAlertMessage("Password updated");
			setIsSnackOpen(true);
			setUserInformation({
				...userInformation,
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			});
		} catch (err) {
			const { error } = err.response.data;
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
				"& .MuiTextField-root": { m: 1.5 },
				ml: 5,
				flexGrow: 1,
			}}>
			<CustomAlert
				open={isSnackOpen}
				handleClose={handleSnackClose}
				message={alertMessage}
			/>
			<Typography variant="h4" gutterBottom>
				Settings
			</Typography>
			<Box
				sx={{
					marginTop: 4,
					display: "flex",
					flexDirection: "column",
					width: 300,
				}}
				component="form"
				onSubmit={handleSubmitEmail}>
				<Typography variant="h6" sx={{ marginBottom: 2 }}>
					Change your Email
				</Typography>
				<TextField
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
						left: "50%",
						transform: "translateX(-50%)",
					}}>
					Change
				</Button>
			</Box>
			<Box
				sx={{
					marginTop: 4,
					display: "flex",
					flexDirection: "column",
					width: 300,
				}}
				component="form"
				onSubmit={handleSubmitPassword}>
				<Typography variant="h6" sx={{ marginBottom: 2 }}>
					Change your password
				</Typography>
				<TextField
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
					type="password"
					name="newPassword"
					label="New Password"
					variant="outlined"
					onChange={handleChange}
					value={userInformation.newPassword}
					onFocus={handleTouch}
					helperText={
						newPasswordError
							? "Your new password is invalid"
							: samePasswordError
							? "Your new password has to be different than your current one"
							: ""
					}
					error={newPasswordError}
				/>
				{touch && (
					<ul className="reg-list">
						<li className={`${validLength ? "reg--one-li" : ""}`}>
							8 characters (max.30)
						</li>
						<li className={`${upperCase ? "reg--one-li" : ""}`}>
							1 capital letter
						</li>
						<li className={`${lowerCase ? "reg--one-li" : ""}`}>
							1 lower letter
						</li>
						<li className={`${hasNumber ? "reg--one-li" : ""}`}>1 digit</li>
						<li className={`${match ? "reg--one-li" : ""}`}>Match</li>
					</ul>
				)}
				<TextField
					type="password"
					name="confirmPassword"
					label="Confirm Password"
					variant="outlined"
					onChange={handleChange}
					value={userInformation.confirmPassword}
					helperText={
						confirmPasswordError ? "Your confirm password is invalid" : ""
					}
					error={confirmPasswordError}
				/>
				<Button
					type="submit"
					variant="contained"
					className="log-submit"
					sx={{
						marginTop: 2,
						width: "fit-content",
						left: "50%",
						transform: "translateX(-50%)",
					}}>
					Change
				</Button>
			</Box>
		</Box>
	);
}
