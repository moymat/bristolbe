import { useSelector, useDispatch } from "react-redux";
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
		try {
			const { itemid } = e.target.dataset;
			if (itemid) {
				dispatch({
					type: "CHANGE_SELECTED_BRISTOL",
					selectedBristol: { id: itemid },
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleNewBristol = () => {
		if (!editMode) {
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
			<Divider>My Bristols</Divider>
			<Box>
				<Box sx={{ mt: 1, mb: 2 }} onClick={handleSelectBristol}>
					<NestedBristols
						handleItemMove={handleBristolMove}
						handleConfirm={handleConfirm}
						items={useSelector(state => state.bristol.bristols)}
					/>
				</Box>
				<Fab
					color="primary"
					aria-label="add"
					onClick={handleNewBristol}
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
