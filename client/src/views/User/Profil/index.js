import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import "./style.scss";

export default function Profil() {
	return (
		<Box
			component="form"
			sx={{
				"& .MuiTextField-root": { m: 2, width: "25ch" },
			}}>
			<h1 className="form-title">Profil</h1>
			<Box>
				<p className="form-description">My profil :</p>

				<div className="form-field">
					<p>First Name :</p>
					<TextField
						id="outlined-basic"
						name="FirstName"
						label="First Name"
						variant="outlined"
					/>
				</div>
				<div className="form-field">
					<p>Last Name :</p>
					<TextField
						id="outlined-basic"
						name="LastName"
						label="Last Name"
						variant="outlined"
					/>
				</div>
			</Box>
			<Box
				style={{ display: "flex", alignItems: "baseline", marginTop: "10px" }}>
				<p className="form-description">Import image :</p>
				<div className="form-field">
					<input
						type="file"
						name="avatar"
						accept="image/*"
						style={{ display: "none" }}
						id="raised-button-file"
					/>
					<label htmlFor="raised-button-file">
						<Button variant="contained" component="span">
							Img, jpg ....
						</Button>
					</label>
				</div>
			</Box>
			<Box
				style={{ display: "flex", alignItems: "baseline", marginTop: "30px" }}>
				<p className="form-description">Description :</p>
				<div className="form-field">
					<TextField
						id="outlined-multiline-static"
						label="Description"
						multiline
						rows={4}
						size="medium"
						sx={{ width: "400px !important" }}
					/>
				</div>
			</Box>
			<Box
				style={{
					display: "flex",
					marginTop: "30px",
					justifyContent: "flex-end",
				}}>
				<Button variant="contained">Apply</Button>
			</Box>
		</Box>
	);
}
