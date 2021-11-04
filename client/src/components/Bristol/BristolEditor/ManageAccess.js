import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Typography from "@mui/material/Box";
import AddIcon from '@mui/icons-material/Add';
import stringAvatar from "../../../utils/avatarsColors";


const ManageAccess = () => (
    <Box sx={{ display: useSelector((state) => state.bristol.EditorIsReadOnly) ? "none" : "flex", alignItems: 'center' }}>
    <Typography>Editor(s) : </Typography>
      <AvatarGroup max={6} sx={{ mx: 1 }}>
        <Avatar alt="Remy Sharp" {...stringAvatar(`Remy Sharp`)} />
        <Avatar alt="Travis Howard" {...stringAvatar(`Travis Howard`)} />
        <Avatar alt="Cindy Baker" {...stringAvatar(`Cindy Baker`)} />
        <Avatar alt="Robert Robichet" {...stringAvatar(`Robert Robichet`)} />
        <Avatar alt="Marcel Patulacci" {...stringAvatar(`Marcel Patulacci`)} />
        <Avatar alt="Agnes Walker" {...stringAvatar(`Agnes Walker`)} />
        <Avatar
          alt="Trevor Henderson"
          {...stringAvatar(`Trevor Henderson`)}
        />
      </AvatarGroup>
      <IconButton
        aria-label="add editor"
      >
        <AddIcon fontSize="large" color="primary" />
      </IconButton>
    </Box>
    
)

export default ManageAccess;