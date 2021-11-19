import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Profile({ handleAlert }) {
	const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));
	const user = useSelector(state => state.user.user);
	const [firstName, setFirstName] = useState(user.first_name);
	const [lastName, setLastName] = useState(user.last_name);
	const [firstNameError, setFirstNameError] = useState(false);
	const [lastNameError, setLastNameError] = useState(false);
	const dispatch = useDispatch();

	const handleChange = event => {
		const { name, value } = event.target;
		if (name === "firstName") {
			setFirstNameError(!value);
			setFirstName(value);
		} else if (name === "lastName") {
			setLastNameError(!value);
			setLastName(value);
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (firstName === user.first_name && lastName === user.last_name) {
			handleAlert({
				severity: "error",
				message: "Both first and last names haven't changed",
			});
		} else if (!firstName) {
			handleAlert({ severity: "error", message: "A first name is required" });
		} else if (!lastName) {
			handleAlert({ severity: "error", message: "A first name is required" });
		} else {
			try {
				dispatch({ type: "UPDATE_USER_INFO", firstName, lastName });
				handleAlert({ severity: "success", message: "Profile updated" });
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<Box
			sx={{
				"& .MuiTextField-root": { mb: 2 },
				ml: isSmallScreen ? 0 : 5,
				flexGrow: 1,
				width: "100%",
			}}>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: isSmallScreen ? "center" : "",
					width: "100%",
				}}>
				<Typography variant="h4" gutterBottom>
					Profile
				</Typography>
				<Typography variant="h6" sx={{ marginBottom: 2 }}>
					My profile
				</Typography>
				<TextField
					sx={{ width: { xs: "75%", md: "400px" } }}
					name="firstName"
					label="First Name"
					variant="outlined"
					value={firstName}
					onChange={handleChange}
					helperText={firstNameError ? "A first name is required" : ""}
					error={firstNameError}
				/>
				<TextField
					sx={{ width: { xs: "75%", md: "400px" } }}
					name="lastName"
					label="Last Name"
					variant="outlined"
					value={lastName}
					onChange={handleChange}
					helperText={lastNameError ? "A last name is required" : ""}
					error={lastNameError}
				/>
				<Button
					type="submit"
					variant="contained"
					sx={{
						marginTop: 2,
						width: "fit-content",
					}}>
					Apply
				</Button>
			</Box>
		</Box>
	);
}
