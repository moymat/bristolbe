import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./style.scss";

export default function Error() {
  return (
    <Box className="center">
      <Typography fontSize="4rem" fontWeight="bold">
        404
      </Typography>
      <Typography>Page not found</Typography>
      <Typography alignItems="center">
        We can’t seem to find the page you are looking for.
      </Typography>
      <Typography>You can go back to the main page :</Typography>
      <Button variant="contained" component={Link} sx={{ marginTop: 2 }}>
        Home
      </Button>
    </Box>
  );
}
