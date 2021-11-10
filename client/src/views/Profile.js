import { useContext, useState } from "react";
import { UserContext } from "../App";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CustomAlert from "../components/CustomAlert";
import axios from "../utils/axios";

export default function Profile() {
	const { user, setUser } = useContext(UserContext);
	const [firstName, setFirstName] = useState(user.first_name);
	const [firstNameError, setFirstNameError] = useState(false);
	const [lastName, setLastName] = useState(user.last_name);
	const [lastNameError, setLastNameError] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState("success");
	const [isSnackOpen, setIsSnackOpen] = useState(false);

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
			setAlertSeverity("error");
			setAlertMessage("Both first and last names haven't changed");
			return setIsSnackOpen(true);
		} else if (!firstName) {
			setAlertSeverity("error");
			setAlertMessage("A first name is required");
			return setIsSnackOpen(true);
		} else if (!lastName) {
			setAlertSeverity("error");
			setAlertMessage("A last name is required");
			return setIsSnackOpen(true);
		}

		try {
			await axios().patch(`/api/v1/users/${user.id}/info`, {
				first_name: firstName,
				last_name: lastName,
			});
			setUser({ ...user, first_name: firstName, last_name: lastName });
			setAlertMessage("Profile updated");
			setAlertSeverity("success");
			setIsSnackOpen(true);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSnackClose = () => {
		setIsSnackOpen(false);
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				"& .MuiTextField-root": { m: 2, width: "25ch" },
				ml: 5,
				flexGrow: 1,
			}}>
			<CustomAlert
				open={isSnackOpen}
				handleClose={handleSnackClose}
				message={alertMessage}
				severity={alertSeverity}
			/>
			<Typography variant="h4" gutterBottom>
				Profile
			</Typography>
			<Typography variant="label">My profile :</Typography>
			<Box>
				<Box sx={{ display: "flex", alignItems: "baseline" }}>
					<Typography>First Name :</Typography>
					<TextField
						name="firstName"
						placeholder="First Name"
						variant="outlined"
						value={firstName}
						onChange={handleChange}
						helperText={firstNameError ? "A first name is required" : ""}
						error={firstNameError}
					/>
				</Box>
				<Box sx={{ display: "flex", alignItems: "baseline" }}>
					<Typography>Last Name :</Typography>
					<TextField
						name="lastName"
						placeholder="Last Name"
						variant="outlined"
						value={lastName}
						onChange={handleChange}
						helperText={lastNameError ? "A last name is required" : ""}
						error={lastNameError}
					/>
				</Box>
			</Box>
			{/* <Box
				style={{ display: "flex", alignItems: "baseline", marginTop: "1em" }}>
				<Typography>Import image :</Typography>
				<Box sx={{ marginLeft: 5 }}>
					<input
						type="file"
						name="avatar"
						accept="image/*"
						style={{ display: "none" }}
						id="button-file"
					/>
					<label htmlFor="button-file">
						<Button variant="contained" component="span">
							Img, jpg ....
						</Button>
					</label>
				</Box>
			</Box>
			<Box style={{ marginTop: "1em" }}>
				<Box sx={{ display: "flex", alignItems: "baseline" }}>
					<TextField
						id="outlined-multiline-static"
						label="Description"
						name="userDescription"
						multiline
						rows={4}
						size="medium"
						sx={{ width: "400px !important" }}
						onChange={handleChange}
						value={users.userDescription}
					/>
				</Box>
			</Box> */}
			<Box
				style={{
					marginTop: "0.5rem",
				}}>
				<Button type="submit" variant="contained">
					Apply
				</Button>
			</Box>
		</Box>
	);
}
