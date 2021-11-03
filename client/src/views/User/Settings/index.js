import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import Typography from "@mui/material/Box";

export default function Settings() {
  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 2, width: "25ch" },
        ml: 5,
      }}
    >
      <h1 className="form-title">Settings</h1>
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: 5, marginLeft: 10}}>
        <Box sx={{display: "flex", alignItems: "baseline"}}>
          <Typography>Email :</Typography>
          <TextField
            type="email"
            id="outlined-basic"
            name="email"
            label="Email"
            variant="outlined"
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
          />
        </Box>
        <Button type="submit" variant="contained" className="log-submit">
            Change
        </Button>
      </Box>
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: 5}}>
        <Box sx={{display: "flex", alignItems: "baseline"}}>
          <Typography>Password :</Typography>
          <TextField
            type="password"
            id="outlined-basic"
            name="password"
            label="Password"
            variant="outlined"
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
          />
        </Box>
        <Button type="submit" variant="contained" className="log-submit">
            Change
        </Button>
      </Box>
    </Box>
  );
}
