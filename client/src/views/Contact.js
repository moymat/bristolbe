import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DevCard from "../components/DevCard";
import RemiPicture from "../assets/img/remi-vieille.jpg";
import MichelPicture from "../assets/img/michel-deckert.jpg";
import TonyPicture from "../assets/img/tony-dai.jpg";

const users = [
	{
		firstName: "Rémi ",
		lastName: "VIEILLE",
		jobs: ["Product Owner", "Scrum Master"],
		picture: RemiPicture,
		links: {
			linkedin: "https://www.linkedin.com/in/remi-vieille-925943223/",
			github: "https://github.com/remi-vieille",
			email: "remi.vieille@gmail.com",
		},
	},
	{
		firstName: "Michel",
		lastName: "DECKERT",
		jobs: ["Lead Dev Back", "Git Master"],
		picture: MichelPicture,
		links: {
			linkedin: "https://www.linkedin.com/in/micheldeckert/",
			github: "https://github.com/moymat",
			email: "deckertmichel@gmail.com",
		},
	},
	{
		firstName: "Tony",
		lastName: "DAI",
		jobs: ["Lead Dev Front"],
		picture: TonyPicture,
		links: {
			linkedin: "https://www.linkedin.com/in/tony-dai-a93010197/",
			github: "https://github.com/TonyDaii",
			email: "yi.tonydai@gmail.com",
		},
	},
];

const Contact = () => {
	return (
		<Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
			<Typography
				variant="h3"
				textAlign="center"
				sx={{ mt: { xs: 1, md: 5 }, mb: { xs: 5, md: 1 } }}>
				The Team
			</Typography>
			<Box
				display="flex"
				flexWrap="wrap"
				alignItems="center"
				justifyContent="center"
				sx={{
					flexDirection: { xs: "column", md: "row" },
					justifyContent: { xs: "space-evenly", md: "space-evenly" },
					alignItems: { xs: "center", md: "center" },
					marginBottom: { xs: 1, md: 0 },
					marginTop: { xs: 0, md: 10 },
					width: "100%",
					maxWidth: 1200,
					mx: "auto",
				}}>
				{users.map(user => (
					<DevCard key={user.firstName} {...user} />
				))}
			</Box>
		</Box>
	);
};

export default Contact;
