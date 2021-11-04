import { useSelector } from "react-redux";
import BristolTree from "../../components/Bristol/BristolTree";
import BristolEditor from "../../components/Bristol/BristolEditor";
import BristolReader from "../../components/Bristol/BristolReader";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// import SwipeableEdgeDrawer from "../../components/Bristol/SwipeableDrawer";

const BristolView = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2}>
				<Grid item xs={3}>
					{/*<Box sx={{ display: { xs: "block", sm: "none" }}}>
        <SwipeableEdgeDrawer />
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" }}}> */}
					<BristolTree />
					{/* </Box> */}
				</Grid>
				<Grid item xs={9}>
					{useSelector(state => state.bristol.EditorIsVisible) ? (
						<BristolEditor />
					) : (
						<BristolReader />
					)}
				</Grid>
			</Grid>
		</Box>
	);
};

export default BristolView;
