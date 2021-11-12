import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BristolTree from "../components/Bristol/BristolTree";
import BristolEditor from "../components/Bristol/BristolEditor";
import useMediaQuery from "@mui/material/useMediaQuery";
// import SwipeableEdgeDrawer from "../../components/Bristol/SwipeableDrawer";

const BristolView = () => {
  const editorIsVisible = useSelector((state) => state.bristol.editorIsVisible);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Box sx={{ flexGrow: 1 }}>

        <Grid container spacing={isSmallScreen ? 0 : 2}>
        {!isSmallScreen && <Grid item xs={3}>
            <BristolTree />
          </Grid>
}
          <Grid item xs={isSmallScreen ? 12 : 9}>
          {isSmallScreen && <BristolTree />}
            {editorIsVisible && <BristolEditor />}
          </Grid>
        </Grid>


    </Box>
  );
};

export default BristolView;
