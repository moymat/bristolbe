import Button from "@mui/material/Button";

const NestedItem = ({ collapseIcon, item }) => {
	return (
		<Button
			data-itemid={item.id}
			startIcon={collapseIcon}
			color={item.role === "editor" ? "primary" : "secondary"}
			variant={"contained"}
			sx={{
				display: "flex",
				alignItems: "center",
				color: "white",
				maxHeight: 35,
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
