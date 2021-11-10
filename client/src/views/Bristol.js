import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BristolTree from "../components/Bristol/BristolTree";
import BristolEditor from "../components/Bristol/BristolEditor";

// import SwipeableEdgeDrawer from "../../components/Bristol/SwipeableDrawer";

const BristolView = () => {
	const editorIsVisible = useSelector(state => state.bristol.editorIsVisible);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2}>
				<Grid item xs={3}>
					{/*<Box sx={{ display: { xs: "block", sm: "none" }}}>
        <SwipeableEdgeDrawer />
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" }}}> */}
					<BristolTree />
				</Grid>
				<Grid item xs={9}>
					{editorIsVisible && <BristolEditor />}
				</Grid>
			</Grid>
		</Box>
	);
};

export default BristolView;
