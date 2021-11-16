import Box from "@mui/material/Box";
import CardProfile from "../components/ContactUs/CardProfile";

const Contact = () => {
	return (
		<Box
			display="flex"
			flexWrap="wrap"
			alignItems="center"
			height="100%"
			sx={{
				flexDirection: { xs: "column", lg: "row" },
				justifyContent: { xs: "space-evenly", lg: "space-evenly" },
				alignItems: { xs: "center", lg: "center" },
			}}>
			<CardProfile />
			<CardProfile />
			<CardProfile />
		</Box>
	);
};

export default Contact;
