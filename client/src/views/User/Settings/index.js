import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import Typography from "@mui/material/Box";
import { useState } from "react";

export default function Settings() {
    const [userInformation, setUserInformation] = useState({
        oldEmail: "",
        newEmail: "",
        oldPassword: "",
        newPassword: "",
    })
    const handleChange = (event) => {
		const { name, value } = event.target;
		setUserInformation({
			...userInformation,
			[name]: value, 
		});
	};
    const handleSubmitEmail = (event) => {
        event.preventDefault();
        console.log('je suis submit, password')
    };

    const handleSubmitPassword = (event) => {
        event.preventDefault();
        console.log('je suis submit')
    };

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 2, width: "25ch" },
        ml: 5,
      }}
    >
      <h1 className="form-title">Settings</h1>
      <Box component="form" onSubmit={handleSubmitEmail} sx={{display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: 5, marginLeft: 10}}>
        <Box sx={{display: "flex", alignItems: "baseline"}}>
          <Typography>Email :</Typography>
          <TextField
            type="email"
            id="outlined-basic"
            name="oldEmail"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            value={userInformation.oldEmail}
          />
        </Box>
        <Box sx={{display: "flex", alignItems: "baseline"}}>
          <Typography>New email :</Typography>
          <TextField
            type="email"
            id="outlined-basic"
            name="newEmail"
            label="New email"
            variant="outlined"
            onChange={handleChange}
            value={userInformation.newEmail}
          />
        </Box>
        <Button type="submit" onSubmit={handleSubmitEmail} variant="contained" className="log-submit">
            Change
        </Button>
      </Box>
      <Box component="form" onSubmit={handleSubmitPassword} sx={{display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: 5}}>
        <Box sx={{display: "flex", alignItems: "baseline"}}>
          <Typography>Password :</Typography>
          <TextField
            type="password"
            id="outlined-basic"
            name="oldPassword"
            label="Password"
            variant="outlined"
            onChange={handleChange}
            value={userInformation.oldPassword}
          />
        </Box>
        <Box sx={{display: "flex", alignItems: "baseline"}}>
          <Typography>New Password :</Typography>
          <TextField
            type="password"
            id="outlined-basic"
            name="newPassword"
            label="New Password"
            variant="outlined"
            onChange={handleChange}
            value={userInformation.newPassword}
          />
        </Box>
        <Button type="submit" onSubmit={handleSubmitPassword} variant="contained" className="log-submit">
            Change
        </Button>
      </Box>
    </Box>
  );
}
