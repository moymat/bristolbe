import { useState, useEffect, useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import BristolTree from "../../components/Bristol/BristolTree";
import BristolEditor from "../../components/Bristol/BristolEditor";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "../../utils/axios";
import { UserContext } from "../../App";
import { Typography } from "@mui/material";

// import SwipeableEdgeDrawer from "../../components/Bristol/SwipeableDrawer";

const bristolInitState = {
	id: null,
	title: "",
	content: "",
	editors_id: [],
	viewers_id: [],
	isEditor: true,
};

const BristolView = () => {
	const bristols = useSelector(state => state.bristol.bristols);
	const [selectedBristol, setSelectedBristol] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const { user } = useContext(UserContext);
	const dispatch = useDispatch();

	const toggleEditMode = () => {
		setEditMode(!editMode);
	};

	const resetSelectedBristol = () => {
		setSelectedBristol(null);
	};

	const handleSelectBristol = async e => {
		try {
			const { itemid } = e.target.dataset;
			if (itemid) {
				const { data: axiosData } = await axios().get(
					`/api/v1/bristols/${itemid}`
				);
				console.log(axiosData);
				setSelectedBristol(axiosData.data);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleNewBristol = () => {
		if (!editMode) {
			setSelectedBristol({ ...bristolInitState });
			toggleEditMode();
		}
	};

	const getBristols = useCallback(async () => {
		try {
			dispatch({
				type: "SET_BRISTOLS",
				userId: user.id,
			});
		} catch (err) {
			console.error(err);
		}
	}, [dispatch, user]);

	useEffect(() => {
		getBristols();
	}, [getBristols]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2}>
				<Grid item xs={3}>
					{/*<Box sx={{ display: { xs: "block", sm: "none" }}}>
        <SwipeableEdgeDrawer />
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" }}}> */}
					<BristolTree
						handleSelectBristol={handleSelectBristol}
						handleNewBristol={handleNewBristol}
					/>
				</Grid>
				<Grid item xs={9}>
					{selectedBristol ? (
						<BristolEditor
							selectedBristol={selectedBristol}
							toggleEditMode={toggleEditMode}
							resetSelectedBristol={resetSelectedBristol}
							editMode={editMode}
						/>
					) : (
						<Typography variant="h5" align="center">
							You don't have any bristol to read
						</Typography>
					)}
				</Grid>
			</Grid>
		</Box>
	);
};

export default BristolView;
