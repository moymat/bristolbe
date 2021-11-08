import { useSelector, useDispatch } from "react-redux";
<<<<<<< HEAD
import { UserContext } from "../../../App";
=======
>>>>>>> client-server-merge
import { getParentId } from "./helper.js";
import NestedBristols from "./NestedBristols.js";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import "./styles.css";

const BristolTree = () => {
	const editMode = useSelector(state => state.bristol.isEditMode);
	const dispatch = useDispatch();

	const handleBristolMove = async ({ items, dragItem, targetPath }) => {
		try {
			dispatch({
<<<<<<< HEAD
				type: "SET_BRISTOLS",
				userId: user.id,
=======
				type: "MOVE_BRISTOL",
				items,
				id: dragItem.id,
				parent_id: getParentId(items, targetPath),
				position: targetPath[targetPath.length - 1],
>>>>>>> client-server-merge
			});
		} catch (err) {
			console.error(err);
		}
<<<<<<< HEAD
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
=======
	};

	const handleSelectBristol = async e => {
		try {
			const { itemid } = e.target.dataset;
			if (itemid) {
				dispatch({
					type: "CHANGE_SELECTED_BRISTOL",
					selectedBristol: { id: itemid },
				});
			}
>>>>>>> client-server-merge
		} catch (err) {
			console.error(err);
		}
	};

<<<<<<< HEAD
	const handleConfirm = ({ dragItem, destinationParent }) => {
		return dragItem.role === "editor"
			? !destinationParent || destinationParent.role === "editor"
			: !destinationParent && !dragItem.parent_id;
=======
	const handleNewBristol = () => {
		if (!editMode) {
			dispatch({ type: "CREATE_NEW_BRISTOL" });
		}
>>>>>>> client-server-merge
	};

	const handleConfirm = ({ dragItem, destinationParent }) => {
		return dragItem.role === "editor"
			? !destinationParent || destinationParent.role === "editor"
			: !destinationParent && !dragItem.parent_id;
	};

	return (
		<Box>
			<Divider>My Bristols</Divider>
			<Box>
<<<<<<< HEAD
				<Box sx={{ mt: 1, mb: 2 }} onClick={handleItemClick}>
=======
				<Box sx={{ mt: 1, mb: 2 }} onClick={handleSelectBristol}>
>>>>>>> client-server-merge
					<NestedBristols
						handleItemMove={handleBristolMove}
						handleConfirm={handleConfirm}
						items={useSelector(state => state.bristol.bristols)}
					/>
				</Box>
				<Fab
					color="primary"
					aria-label="add"
<<<<<<< HEAD
					onClick={() => dispatch({ type: "CREATE_NEW_BRISTOL" })}
=======
					onClick={handleNewBristol}
>>>>>>> client-server-merge
					sx={{
						position: "fixed",
						bottom: 50,
						ml: "18%",
						display: { xs: "none", sm: "flex" },
					}}>
					<AddIcon />
				</Fab>
			</Box>
		</Box>
	);
};

export default BristolTree;