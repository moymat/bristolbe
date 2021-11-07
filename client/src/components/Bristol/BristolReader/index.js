import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const BristolReader = () => {
	return (
		<Box sx={{ textAlign: "center", my: 2 }}>
			<Divider sx={{ m: 1 }}>read-write or read-only</Divider>
			<Typography>
				Vous lisez actuellement le bristol à l'id{" "}
				{useSelector(state => state.inReading.id)}{" "}
			</Typography>
			<Divider sx={{ m: 1, mt: 2 }}>read-write</Divider>
			<Typography>
				Le bristol à l'id {useSelector(state => state.movedid)} a été déplacé,
				son parent est maintenant{" "}
				{useSelector(state => state.movedparent_id) || "root"} et sa postion est{" "}
				{useSelector(state => state.movedposition)}{" "}
			</Typography>
		</Box>
	);
};

export default BristolReader;
