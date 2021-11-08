import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import BristolTree from "../../components/Bristol/BristolTree";
import BristolEditor from "../../components/Bristol/BristolEditor";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { UserContext } from "../../App";

// import SwipeableEdgeDrawer from "../../components/Bristol/SwipeableDrawer";

const BristolView = () => {
	const { user } = useContext(UserContext);
	const selectedBristol = useSelector(state => state.bristol.selectedBristol);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: "SET_BRISTOLS",
			userId: user.id,
		});
	}, [dispatch, user]);

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
					{useSelector(state => state.bristol.editorIsVisible) && (
						<BristolEditor />
					)}
				</Grid>
			</Grid>
		</Box>
	);
};

export default BristolView;
