import { useContext, useState } from "react";
import { UserContext } from "../../../App";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "../../../utils/axios";

export default function Profile() {
	const { user, setUser } = useContext(UserContext);
	const [firstName, setFirstName] = useState(user.first_name);
	const [lastName, setLastName] = useState(user.last_name);

	const handleChange = event => {
		const { name, value } = event.target;
		if (name === "firstName") {
			setFirstName(value);
		} else if (name === "lastName") {
			setLastName(value);
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (!firstName || !lastName) return;

		try {
			await axios().patch(`/api/v1/users/${user.id}/info`, {
				first_name: firstName,
				last_name: lastName,
			});
			setUser({ ...user, first_name: firstName, last_name: lastName });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Box
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 2, width: "25ch" },
				ml: 5,
				flexGrow: 1,
			}}
			onSubmit={handleSubmit}>
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
				<Button type="submit" variant="contained" onSubmit={handleSubmit}>
					Apply
				</Button>
			</Box>
		</Box>
	);
}
