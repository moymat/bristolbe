import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import Typography from "@mui/material/Box";
import "./style.scss";
import { UserContext } from "../../../App";
import { useContext, useState } from "react";

export default function Profil() {
	const {user} = useContext(UserContext);
	const [users, setUsers] = useState({
		firstName: user.first_name,
		lastName: user.last_name,
		userDescription: "",
	});
	
	const handleChange = (event) => {
		const { name, value } = event.target;
		console.log(name)
		setUsers({
			...users,
			[name]: value, 
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const {firstName, lastName, userDescription} = users;
	}
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 2, width: "25ch" },
        ml: 5,
      }}
	  onSubmit={handleSubmit}
    >
      <h1 className="form-title">Profil</h1>
      <Typography className="form-description">My profil :</Typography>
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Box sx={{display: "flex", alignItems: "baseline"}}>
          <Typography>First Name :</Typography>
          <TextField
            id="outlined-basic"
            name="firstName"
            placeholder="First Name"
            variant="outlined"
			value={users.firstName}
			onChange={handleChange}
          />
        </Box>
        <Box sx={{display: "flex", alignItems: "baseline"}}>
          <Typography>Last Name :</Typography>
          <TextField
            id="outlined-basic"
            name="lastName"
            placeholder="Last Name"
            variant="outlined"
			value={users.lastName}
			onChange={handleChange}
          />
        </Box>
      </Box>
      <Box
        style={{ display: "flex", alignItems: "baseline", marginTop: "10px" }}
      >
        <Typography className="form-description">Import image :</Typography>
        <Box sx={{display: "flex", alignItems: "baseline", marginLeft: 5}}>
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
        </Box>
      </Box>
      <Box
        style={{ display: "flex", alignItems: "baseline", marginTop: "30px" }}
      >
        <Typography className="form-description">Description :</Typography>
        <Box  sx={{display: "flex", alignItems: "baseline", marginLeft: 5}}>
          <TextField
            id="outlined-multiline-static"
            placeholder="Description"
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
          display: "flex",
          marginTop: "30px",
          justifyContent: "flex-end",
        }}
      >
        <Button type="submit" variant="contained" onSubmit={handleSubmit}>Apply</Button>
      </Box>
    </Box>
  );
}
