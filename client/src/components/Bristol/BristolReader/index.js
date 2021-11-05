import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const BristolReader = () => {
	return (
		<Box sx={{ textAlign: "center", my: 2 }}>
			<Divider sx={{ m: 1 }}>read-write or read-only</Divider>
			<Typography>
				Vous lisez actuellement le bristol à l'id{" "}
				{useSelector(state => state.bristol.inReading.id)}{" "}
			</Typography>
			<Divider sx={{ m: 1, mt: 2 }}>read-write</Divider>
			<Typography>
				Le bristol à l'id {useSelector(state => state.bristol.lastMovedItem.id)}{" "}
				a été déplacé, son parent est maintenant{" "}
				{useSelector(state => state.bristol.lastMovedItem.parent_id) || "root"}{" "}
				et sa postion est{" "}
				{useSelector(state => state.bristol.lastMovedItem.position)}{" "}
			</Typography>
			<Divider sx={{ m: 1, mt: 2 }}>read-only</Divider>
			<Typography>
				Le bristol à l'id{" "}
				{useSelector(state => state.bristol.lastMovedReadItem.id)} a été
				déplacé, son parent est maintenant{" "}
				{useSelector(state => state.bristol.lastMovedReadItem.parent_id) ||
					"root"}{" "}
				et sa postion est{" "}
				{useSelector(state => state.bristol.lastMovedReadItem.position)}{" "}
			</Typography>
		</Box>
	);
};

export default BristolReader;
