import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

const NestedItem = ({ collapseIcon, item }) => {
	const selectedBristol = useSelector(state => state.bristol.selectedBristol);
	const user = useSelector(state => state.user.user);

	return (
		<Button
			data-itemid={item.id}
			startIcon={collapseIcon}
			variant={"contained"}
			size="small"
			sx={{
				display: "flex",
				minHeight: 40,
				alignItems: "center",
				justifyContent: "start",
				minWidth: "1px",
				backgroundColor:
					item.inEditing.status && item.inEditing.userId !== user.id
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
						item.inEditing.status && item.inEditing.userId !== user.id
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
