import { useEffect, useContext, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserContext } from "../../../App";
import {
	createNestedMenu,
	getParentId,
	menus,
	menusReadOnly,
} from "./helper.js";
import NestedBristols from "./NestedBristols.js";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import Divider from "@mui/material/Divider";
import axios from "../../../utils/axios";
import "./styles.css";

const BristolTree = () => {
	const dispatch = useDispatch();
	const { user } = useContext(UserContext);

	const getBristols = useCallback(async () => {
		try {
			const { data: axiosData } = await axios().get(
				`/api/v1/users/${user.id}/bristols`
			);
			const itemsWriteTemp = createNestedMenu(axiosData.data);
			dispatch({ type: "SET_READ_WRITE_ITEMS", items: itemsWriteTemp });
			const itemsReadTemp = createNestedMenu(menusReadOnly);
			dispatch({ type: "SET_READ_ONLY_ITEMS", items: itemsReadTemp });
		} catch (err) {
			console.error(err);
		}
	}, [dispatch, user]);

	const handleWriteItemsMove = async ({ items, dragItem, targetPath }) => {
		try {
			const { id: bristol_id } = dragItem;
			const parent_id = getParentId(items, targetPath);
			const position = targetPath[targetPath.length - 1];

			const { data: axiosData } = await axios().post("/api/v1/bristols/move", {
				bristol_id,
				parent_id,
				position,
			});

			console.log(axiosData);

			dispatch({
				type: "SET_READ_WRITE_ITEMS",
				items,
				id: bristol_id,
				parent_id,
				position,
			});
		} catch (err) {
			console.error(err);
		}
	};

	const handleReadItemsMove = ({ items, dragItem, targetPath }) => {
		dispatch({
			type: "SET_READ_ONLY_ITEMS",
			items,
			id: dragItem.id,
			parent_id: getParentId(items, targetPath),
			position: targetPath[targetPath.length - 1],
		});
	};

	const handleConfirm = ({ dragItem, destinationParent }) => {
		return !dragItem.parent_id && !destinationParent;
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
			<Stack
				direction="row"
				spacing={1}
				sx={{ mb: 1, display: { xs: "none", sm: "flex" } }}>
				<Button variant="outlined" disabled={true}>
					CANCEL
				</Button>
				<Button
					startIcon={<SaveIcon />}
					fullWidth
					variant="contained"
					disabled={true}>
					SAVE POSITION
				</Button>
			</Stack>
			<Box onClick={handleItemClick}>
				<Divider>read-write</Divider>
				<Box sx={{ mt: 1, mb: 2 }}>
					<NestedBristols
						handleItemMove={handleWriteItemsMove}
						items={useSelector(state => state.bristol.itemsTempWrite)}
					/>
				</Box>
				<Divider>read-only</Divider>
				<Box sx={{ mt: 1 }}>
					<NestedBristols
						handleItemClick={handleItemClick}
						handleConfirm={handleConfirm}
						handleItemMove={handleReadItemsMove}
						items={useSelector(state => state.bristol.itemsTempRead)}
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
