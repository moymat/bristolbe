import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { UserContext } from "../../../App";
import { useContext, useState } from "react";
import ProfilLayout from "../../../components/ProfilLayout";
import Navbar from "../../../components/Navbar";

export default function Profil() {
	const { user } = useContext(UserContext);
	const [users, setUsers] = useState({
		firstName: user.first_name,
		lastName: user.last_name,
		userDescription: "",
	});

	const handleChange = event => {
		const { name, value } = event.target;
		setUsers({
			...users,
			[name]: value,
		});
	};

	const handleSubmit = event => {
		event.preventDefault();
		const { firstName, lastName, userDescription } = users;
	};

	return (
		<Navbar>
		<ProfilLayout>
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
						value={users.firstName}
						onChange={handleChange}
					/>
				</Box>
				<Box sx={{ display: "flex", alignItems: "baseline" }}>
					<Typography>Last Name :</Typography>
					<TextField
						name="lastName"
						placeholder="Last Name"
						variant="outlined"
						value={users.lastName}
						onChange={handleChange}
					/>
				</Box>
			</Box>
			<Box
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
			</Box>
			<Box
				style={{
					marginTop: "0.5rem",
				}}>
				<Button type="submit" variant="contained" onSubmit={handleSubmit}>
					Apply
				</Button>
			</Box>
		</Box>
		</ProfilLayout>
		</Navbar>
	);
}
