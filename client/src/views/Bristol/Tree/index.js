import { useEffect, useContext, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nestable from "react-nestable";
import "./styles.css";
import {
	createNestedMenu,
	generateFlatMenu,
	menus,
	menusReadOnly,
} from "./helper.js";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SaveIcon from "@mui/icons-material/Save";
import Divider from "@mui/material/Divider";
import { UserContext } from "../../../App";
import axios from "../../../utils/axios";

const BristolView = () => {
	const dispatch = useDispatch();
	const { user } = useContext(UserContext);

	const getBristols = useCallback(async () => {
		try {
			const { data } = await axios().get(`/api/v1/users/${user.id}/bristols`);
			console.log(data);

			const ItemsWriteTemp = createNestedMenu(menus);
			dispatch({ type: "SET_READ_WRITE_ITEMS", items: ItemsWriteTemp });
			const ItemsReadTemp = createNestedMenu(menusReadOnly);
			dispatch({ type: "SET_READ_ONLY_ITEMS", items: ItemsReadTemp });
		} catch (err) {
			console.error(err);
		}
	}, [dispatch, user]);

	//chargement initial
	useEffect(() => {
		getBristols();
	}, [getBristols]);

	//we update the state on change sort
	const handleOnChangeSort = (items, dragItem) => {
		console.log(items, dragItem);
		const flatMenu = generateFlatMenu(items);
		const movedItemId = dragItem.id;
		const movedItem = flatMenu.find(item => item.id === movedItemId);
		const movedParentId = movedItem.parent;
		const movedOrderNo = movedItem.orderNo;

		dispatch({
			type: "SET_READ_WRITE_ITEMS",
			items,
			movedItemId,
			movedParentId,
			movedOrderNo,
		});

		dispatch({ type: "GENERATE_FLAT_MENU", flatMenu });

		console.log(flatMenu);
	};

	/*   const handleGenerate = () => {
    const { itemsTemp } = this.state;
    const flatMenu = generateFlatMenu(itemsTemp);
    console.log(flatMenu);
  }; */

	const handleOnClick = event => {
		const targetedEl = event.target.parentNode.parentNode;
		const targetedElClassList = targetedEl.classList;
		let targetId;

		if (
			targetedElClassList.contains("nestable-item") &&
			!targetedElClassList.contains("listMenu")
		) {
			targetedElClassList.forEach(value => {
				if (value !== "nestable-item") {
					targetId = value.substring(14);
				}
			});
			//action
			dispatch({
				type: "SHOW_BRISTOL_READER",
				id: +targetId,
			});
		}
	};

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
			<Box onClick={handleOnClick}>
				{/* read-write tree */}
				<Divider>read-write</Divider>
				<Box sx={{ mt: 1, mb: 2 }}>
					<Nestable
						groupe={1}
						collapsed={true}
						maxDepth={15}
						items={useSelector(state => state.bristol.itemsTempWrite)}
						renderItem={({ item, collapseIcon }) => (
							<div className="listMenu">
								{collapseIcon}
								{item.label}
							</div>
						)}
						onChange={handleOnChangeSort}
						renderCollapseIcon={({ isCollapsed }) =>
							isCollapsed ? (
								<span className="iconCollapse">+</span>
							) : (
								<span className="iconCollapse">-</span>
							)
						}
					/>
				</Box>

				{/* read-only tree */}
				<Divider>read-only</Divider>
				<Box sx={{ mt: 1 }}>
					<Nestable
						groupe={2}
						collapsed={true}
						maxDepth={15}
						items={useSelector(state => state.bristol.itemsTempRead)}
						renderItem={({ item, collapseIcon }) => (
							<div className="listMenuRead">
								{collapseIcon}
								{item.label}
							</div>
						)}
						renderCollapseIcon={({ isCollapsed }) =>
							isCollapsed ? (
								<span className="iconCollapse">+</span>
							) : (
								<span className="iconCollapse">-</span>
							)
						}
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

export default BristolView;
