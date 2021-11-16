import Box from "@mui/material/Box";
import CardProfile from "../components/ContactUs/CardProfile";

const Contact = () => {
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
				marginBottom: {xs: 1, lg: 0},
				height: {lg: "100%"}
			}}>
			<CardProfile />
			<CardProfile />
			<CardProfile />
		</Box>
	);
};

export default Contact;
