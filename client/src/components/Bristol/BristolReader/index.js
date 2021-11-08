import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useEffect } from "react";

const BristolReader = ({ bristol }) => {
	useEffect(() => {
		console.log("bristol", bristol);
	}, [bristol]);

	return (
		<Box sx={{ textAlign: "center", my: 2 }}>
			{bristol ? (
				<>
					<Typography variant="h1">{bristol.title}</Typography>
				</>
			) : (
				<Typography>You don't have any bristol</Typography>
			)}
		</Box>
	);
};

export default BristolReader;
