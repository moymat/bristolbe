import Box from "@mui/material/Box";
import DevCard from "./DevCard";

/* const BoxCard = styled(Box)(({ theme }) => ({
	width: 275,
	height: 450,
	maxHeight: 450,
	mb: 1,
	boxSizing: "border-box",
})); */

const DevCards = ({ users }) => {
	return (
		<Box className="dev-cards">
			{users.map(user => (
				<DevCard key={user.firstName} {...user} />
			))}
		</Box>
	);
};
export default DevCards;
