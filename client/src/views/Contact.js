import Box from "@mui/material/Box";
import CardProfile from "../components/ContactUs/CardProfile";

const Contact = () => {
	const jsxUser = [
		{
			firstName: "Rémi ",
			lastName: "VIEILLE",
			jobs: ["Product owner", "Scrum master"],
		},
		{
			firstName: "Michel",
			lastName: "DECKERT",
			jobs: ["Lead dev back", "Git master"],
		},
		{
			firstName: "Tony",
			lastName: "DAI",
			jobs: ["Lead dev front"],
		},
	];

	const mapCardProfile = jsxUser.map(user => {
		return <CardProfile key={user.firstName} {...user}></CardProfile>;
	});
	return (
		<Box
			display="flex"
			flexWrap="wrap"
			alignItems="center"
			justifyContent="center"
			sx={{
				flexDirection: { xs: "column", lg: "row" },
				justifyContent: { xs: "space-evenly", lg: "space-evenly" },
				alignItems: { xs: "center", lg: "center" },
				marginBottom: { xs: 1, lg: 0 },
				height: { lg: "100%" },
			}}>
			{mapCardProfile}
		</Box>
	);
};

export default Contact;
