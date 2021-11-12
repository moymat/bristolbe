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
      <>
      {!isSmallScreen && (
        <Box sx={{ display: "flex" }}>
          <Box sx={{minWidth: 250}}>
            <BristolTree />
          </Box>

          <Box>{editorIsVisible && <BristolEditor />}</Box>
          </Box>
      )}

      {isSmallScreen && (
        <>
          <BristolTree />

          {editorIsVisible && <BristolEditor />}
        </>
      )}
      </>
    
  );
};

export default BristolView;
