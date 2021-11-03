import { useEffect, useContext, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserContext } from "../../../App";
import { getParentId } from "./helper.js";
import NestedBristols from "./NestedBristols.js";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import "./styles.css";

const BristolTree = () => {
	const dispatch = useDispatch();
	const { user } = useContext(UserContext);

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

	const handleConfirm = ({ dragItem, destinationParent }) => {
		return dragItem.role === "editor"
			? !destinationParent || destinationParent.role === "editor"
			: !destinationParent && !dragItem.parent_id;
	};

	const handleItemClick = e => {
		const { itemid } = e.target.dataset;
		itemid && console.log(itemid);
	};

	useEffect(() => {
		getBristols();
	}, [getBristols]);

	return (
		<Box>
			<Divider>My Bristols</Divider>
			<Box>
				<Box sx={{ mt: 1, mb: 2 }} onClick={handleItemClick}>
					<NestedBristols
						handleItemMove={handleBristolMove}
						handleConfirm={handleConfirm}
						items={useSelector(state => state.bristol.bristols)}
					/>
				</Box>
				<Fab
					color="primary"
					aria-label="add"
					onClick={() => dispatch({ type: "SHOW_BRISTOL_EDITOR" })}
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
