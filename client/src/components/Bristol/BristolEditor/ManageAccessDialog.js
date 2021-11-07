import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UserSearch from "./ManageAccessSearch.js"

const ManageAccessDialog = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost:8000/users?last_name_like=Weich")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  /* {
    users.map((user) => <p key={user.id}>{user.first_name}</p>);
  } */

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {users.map((user) => (
          <p key={user.email}>{user.first_name}</p>
        ))}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <PersonAddIcon fontSize="large" />
        </Box>
        <DialogTitle>
          Add people to "{useSelector((state) => state.bristol.EditorTitle)}"
        </DialogTitle>
        <DialogContent sx={{overflow: "visible"}}>
          <DialogContentText>
            To add editors to this bristol, please enter a name here.
          </DialogContentText>
          <Box sx={{pt: 2}}>
          <UserSearch fullWidth />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageAccessDialog;
