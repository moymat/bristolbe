import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

const NestedItem = ({ collapseIcon, item }) => {
	const selectedBristol = useSelector(state => state.bristol.selectedBristol);
	const user = useSelector(state => state.user.user);

	return (
		<Button
			data-itemid={item.id}
			startIcon={collapseIcon}
			endIcon={
				item.inEditing.status &&
				item.inEditing.userId !== user.id && <EditIcon />
			}
			variant={"contained"}
			size="small"
			sx={{
				display: "flex",
				minHeight: 40,
				alignItems: "center",
				justifyContent: "start",
				minWidth: "1px",
				backgroundColor:
					item.isMoving.status && item.isMoving.userId !== user.id
						? "red"
						: item.role === "editor"
						? selectedBristol.id === item.id
							? "primary.dark"
							: "primary.main"
						: selectedBristol.id === item.id
						? "secondary.dark"
						: "secondary.main",
				color: "white",
				"&:hover": {
					backgroundColor:
						item.isMoving.status && item.isMoving.userId !== user.id
							? "darkred"
							: item.role === "editor"
							? selectedBristol.id === item.id
								? "primary.dark"
								: "primary.light"
							: selectedBristol.id === item.id
							? "secondary.dark"
							: "secondary.light",
				},
				"& .MuiButton-startIcon": {
					"&:hover": {
						backgroundColor:
							item.role === "editor" ? "primary.main" : "secondary.main",
					},
					"& svg": {
						verticalAlign: "sub",
					},
				},
			}}>
			{item.title}
		</Button>
	);
};

export default NestedItem;
