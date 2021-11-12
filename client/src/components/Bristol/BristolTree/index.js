import { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getParentId } from "./helper.js";
import NestedBristols from "./NestedBristols.js";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import "./styles.css";
import { UserContext } from "../../../App";
import SwipeableDrawer from "../SwipeableDrawer";
import useMediaQuery from "@mui/material/useMediaQuery";

const BristolTree = () => {
	const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));
	const { user } = useContext(UserContext);
	const bristols = useSelector(state => state.bristol.bristols);
	const isReadOnly = useSelector(state => state.bristol.editorIsReadOnly);
	const dispatch = useDispatch();

	//chargement initial

	useEffect(() => {
		dispatch({
			type: "SET_BRISTOLS",
			userId: user.id,
		});
	}, [dispatch, user]);

	const handleBristolMove = async ({ items, dragItem, targetPath }) => {
		try {
			dispatch({
				type: "MOVE_BRISTOL",
				items,
				id: dragItem.id,
				parent_id: getParentId(items, targetPath),
				position: targetPath[targetPath.length - 1],
			});
		} catch (err) {
			console.error(err);
		}
	};

	const handleSelectBristol = async e => {
		console.log(e.target);
		try {
			const { itemid } = e.target.dataset;
			if (itemid) {
				dispatch({
					type: "GET_CURRENT_BRISTOL_CONTENT",
					selectedBristol: itemid,
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleNewBristol = () => {
		if (isReadOnly) {
			dispatch({ type: "CREATE_NEW_BRISTOL" });
		}
	};

	const handleConfirm = ({ dragItem, destinationParent }) => {
		return dragItem.role === "editor"
			? !destinationParent || destinationParent.role === "editor"
			: !destinationParent && !dragItem.parent_id;
	};

	return (
		<Box>
			{!isSmallScreen && <Divider>My Bristols</Divider>}
			<Box>
				{isSmallScreen ? (
					<SwipeableDrawer newBristol={handleNewBristol}>
						<Box sx={{ pt: 1 }} onClick={handleSelectBristol}>
							<NestedBristols
								handleItemMove={handleBristolMove}
								handleConfirm={handleConfirm}
								items={bristols}
							/>
						</Box>
					</SwipeableDrawer>
				) : (
					<Box sx={{ mt: 1, mb: 2 }} onClick={handleSelectBristol}>
						<NestedBristols
							handleItemMove={handleBristolMove}
							handleConfirm={handleConfirm}
							items={bristols}
						/>
					</Box>
				)}
			</Box>
			{!isSmallScreen && (
				<Fab
					color="primary"
					aria-label="add"
					onClick={handleNewBristol}
					sx={{
						position: "absolute",
						right: 0,
						bottom: 30,
						display: { xs: "none", sm: "flex" },
					}}>
					<AddIcon />
				</Fab>
			)}
		</Box>
	);
};

export default BristolTree;
