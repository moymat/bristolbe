import Button from "@mui/material/Button";

const NestedItem = ({ collapseIcon, item }) => {
	return (
		<Button
			data-itemid={item.id}
			startIcon={collapseIcon}
			color={item.role === "editor" ? "primary" : "secondary"}
			variant="contained"
			size="small"
			sx={{
				display: "flex",
				/* height : "40em", */
				alignItems: "center",
				color: "white",
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
