import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getParentId } from "./helper.js";
import NestedBristols from "./NestedBristols.js";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import SwipeableDrawer from "../SwipeableDrawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./styles.css";

const BristolTree = ({ intercepter }) => {
	const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));
	const user = useSelector(state => state.user.user);
	const bristols = useSelector(state => state.bristol.bristols);
	const isReadOnly = useSelector(state => state.bristol.editorIsReadOnly);
	const [openDrawer, setOpenDrawer] = useState(false);
	const dispatch = useDispatch();

	const handleBristolMove = async ({ items, dragItem, targetPath }) => {
		dispatch({
			type: "MOVE_BRISTOL",
			items,
			id: dragItem.id,
			parent_id: getParentId(items, targetPath),
			position: targetPath[targetPath.length - 1],
		});
	};

	const handleSelectBristol = async e => {
		const { itemid } = e.target.dataset;
		if (itemid) {
			handleOpenDrawer(false);
			dispatch({
				type: "GET_CURRENT_BRISTOL_CONTENT",
				selectedBristol: itemid,
			});
		}
	};

	const handleOpenDrawer = value => {
		setOpenDrawer(value);
	};

	const handleNewBristol = () => {
		isReadOnly && dispatch({ type: "CREATE_NEW_BRISTOL" });
	};

	const handleConfirm = ({ dragItem, destinationParent }) =>
		dragItem.role === "editor"
			? !destinationParent || destinationParent.role === "editor"
			: !destinationParent && !dragItem.parent_id;

	useEffect(() => {
		dispatch({ type: "SET_BRISTOLS" });
	}, [dispatch, user]);

	/* useEffect(() => {
		const interCur = intercepter.current;
		const handleClick = () => {
			handleOpenDrawer(!openDrawer);
		};
		if (intercepter.current) interCur.addEventListener("click", handleClick);
		return () => interCur.removeEventListener("click", handleClick);
	}, [intercepter, openDrawer]); */

	return (
		<Box
			className="tree-container"
			sx={{
				position: "fixed",
				overflowY: "auto",
				width: 300,
				maxHeight: "90vh",
			}}>
			{!isSmallScreen && <Divider>My Bristols</Divider>}
			<Box className="bottom">
				{isSmallScreen ? (
					<SwipeableDrawer
						newBristol={handleNewBristol}
						handleOpen={handleOpenDrawer}
						open={openDrawer}>
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
						position: "fixed",
						left: 280,
						bottom: 20,
						display: { xs: "none", sm: "flex" },
					}}>
					<AddIcon />
				</Fab>
			)}
		</Box>
	);
};

export default BristolTree;
