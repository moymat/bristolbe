import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const BristolReader = () => {
	const selectedBristol = useSelector(state => state.bristol.selectedBristol);

	return (
		<Box sx={{ textAlign: "center", my: 2 }}>
			<Typography variant="h1">{selectedBristol.title}</Typography>
			{selectedBristol.content}
		</Box>
	);
};

export default BristolReader;
