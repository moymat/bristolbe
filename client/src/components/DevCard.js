import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import LinkedIn from "@mui/icons-material/LinkedIn";
import GitHub from "@mui/icons-material/GitHub";
import Divider from "@mui/material/Divider";
import styled from "@mui/system/styled";

const SOCIALS = {
	GITHUB: {
		color: "rgb(51, 51, 51)",
		icon: <GitHub />,
	},
	LINKEDIN: {
		color: "rgb(0, 119, 181)",
		icon: <LinkedIn />,
	},
	EMAIL: {
		color: "rgb(221, 75, 57)",
		icon: <EmailIcon />,
	},
};

const DevCard = ({ firstName, lastName, jobs, links, picture }) => {
	return (
		<DevCardWrapper className="card" sx={{ mb: { xs: 8, md: 0 } }}>
			<Card sx={{ maxHeight: "100%", height: "100%" }}>
				<DevCardContent className="card-content">
					<ImageWrapper className="picture">
						<DevImage src={picture} alt={`${firstName} ${lastName}`} />
					</ImageWrapper>
					<Typography
						sx={{ fontWeight: 700, mb: 1, color: "primary.main" }}
						variant="h5">
						{`${firstName} ${lastName}`}
					</Typography>
					<Divider sx={{ mb: 2 }} />
					{jobs.map(job => (
						<Typography
							key={job}
							sx={{
								p: 0,
								px: 1,
								pb: 0.5,
								textAlign: "center",
								fontWeight: 500,
							}}>
							{job}
						</Typography>
					))}
					<ButtonsWrapper className="social">
						{Object.entries(links).map(([key, value], i) => {
							const { icon, color } = SOCIALS[key.toUpperCase()];
							return (
								<SocialButton
									key={i}
									target="_blank"
									href={key === "email" ? `mailto:${value}` : value}
									startIcon={icon}
									className={`btn ${key}`}
									buttonColor={color}
								/>
							);
						})}
					</ButtonsWrapper>
				</DevCardContent>
			</Card>
		</DevCardWrapper>
	);
};

export default DevCard;

const DevCardWrapper = styled(Box)(() => ({
	width: 265,
	height: 450,
	maxHeight: 450,
	marginBottom: 1,
	boxSizing: "border-box",
	transition: "all 0.3s ease 0s",
	"&:hover *": {
		filter: "grayscale(0)",
		opacity: 1,
		"& .card-content": {
			backgroundColor: "white",
		},
		"& .picture::before": {
			opacity: 0.9,
			height: "100%",
		},
	},
	"& *": {
		transition: "all 0.15s ease 0s",
	},
}));

const DevCardContent = styled(CardContent)(() => ({
	position: "relative",
	height: "100%",
	padding: "30px 0",
	textAlign: "center",
	overflow: "hidden",
	backgroundColor: "rgba(0,0,0,0.025)",
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
	display: "inline-block",
	position: "relative",
	height: "130px",
	width: "130px",
	zIndex: 0,
	"&::before": {
		content: '""',
		position: "absolute",
		bottom: "135%",
		right: 0,
		left: 0,
		width: "100%",
		height: 0,
		borderRadius: "50%",
		backgroundColor: theme.palette.primary.main,
		opacity: 0.9,
		transform: "scale(3)",
		transition: "all 0.3s ease 0s",
	},
}));

const DevImage = styled("img")(() => ({
	width: "100%",
	height: "auto",
	borderRadius: "50%",
	marginBottom: "32px",
	filter: "grayscale(1)",
	transform: "scale(1)",
	transition: "all 0.9s ease 0s",
}));

const ButtonsWrapper = styled(Box)(() => ({
	position: "absolute",
	display: "flex",
	justifyContent: "space-evenly",
	width: "100%",
	padding: 0,
	margin: 0,
	bottom: 0,
	left: 0,
	backgroundColor: "transparent",
}));

const SocialButton = styled(Button, {
	shouldForwardProp: prop => prop !== "buttonColor",
})(({ buttonColor, theme }) => ({
	filter: "grayscale(1)",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	minHeight: "100%",
	backgroundColor: buttonColor,
	transition: "all 0.15s ease",
	border: "2px solid transparent",
	marginBottom: "16px",
	opacity: 0.75,
	"& svg": {
		fill: "whitesmoke",
	},
	"& .MuiButton-startIcon": {
		margin: 0,
		"& > :nth-of-type(1)": {
			fontSize: "xx-large",
		},
	},
	color: buttonColor,
	"&:hover": {
		backgroundColor: theme.palette.mode === "dark" ? "transparent" : "white",
		border: `2px solid ${buttonColor}`,
		boxShadow: `${
			theme.palette.mode === "dark" && "0px 0px 8px 1px"
		} ${buttonColor}`,
		"& svg": {
			fill: theme.palette.mode === "dark" ? "white" : buttonColor,
		},
	},
}));
