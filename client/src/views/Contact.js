import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DevCard from "../components/DevCard";

const users = [
	{
		firstName: "Rémi ",
		lastName: "VIEILLE",
		jobs: ["Product Owner", "Scrum Master"],
		links: {
			github: "https://github.com/remi-vieille",
			linkedin: "https://www.linkedin.com/in/remi-vieille-925943223/",
			email: "remi.vieille@gmail.com",
		},
	},
	{
		firstName: "Michel",
		lastName: "DECKERT",
		jobs: ["Lead Dev Back", "Git Master"],
		links: {
			github: "https://github.com/moymat",
			linkedin: "https://www.linkedin.com/in/micheldeckert/",
			email: "deckertmichel@gmail.com",
		},
	},
	{
		firstName: "Tony",
		lastName: "DAI",
		jobs: ["Lead Dev Front"],
		links: {
			github: "https://github.com/TonyDaii",
			linkedin: "https://www.linkedin.com/in/tony-dai-a93010197/",
			email: "yi.tonydai@gmail.com",
		},
	},
];

const Contact = () => {
	return (
		<Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
			<Typography variant="h3" textAlign="center" marginTop={5}>
				Contact the team
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
					marginTop: { xs: 0, md: 14 },
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
