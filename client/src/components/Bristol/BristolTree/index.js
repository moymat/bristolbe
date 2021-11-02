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
			const ItemsWriteTemp = createNestedMenu(menus);
			dispatch({ type: "SET_READ_WRITE_ITEMS", items: ItemsWriteTemp });
			const ItemsReadTemp = createNestedMenu(menusReadOnly);
			dispatch({ type: "SET_READ_ONLY_ITEMS", items: ItemsReadTemp });
		} catch (err) {
			console.error(err);
		}
	}, [dispatch, user]);

	const handleItemMove = ({ items, dragItem, targetPath }) => {
		dispatch({
			type: "SET_READ_WRITE_ITEMS",
			items,
			movedItemId: dragItem.id,
			movedParentId: getParentId(items, targetPath),
			movedOrderNo: targetPath[targetPath.length - 1],
		});
	};

	const handleConfirm = ({ dragItem, destinationParent }) => {
		if (dragItem.parent || destinationParent) {
			return false;
		}
		return true;
	};

	const handleItemClick = e => {
		e.target.dataset.itemid && console.log(e.target.dataset.itemid);
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
						handleItemMove={handleItemMove}
						items={useSelector(state => state.bristol.itemsTempWrite)}
						itemsClass={"listMenu"}
					/>
				</Box>
				<Divider>read-only</Divider>
				<Box sx={{ mt: 1 }}>
					<NestedBristols
						handleItemClick={handleItemClick}
						handleConfirm={handleConfirm}
						items={useSelector(state => state.bristol.itemsTempRead)}
						itemsClass={"listMenuRead"}
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
