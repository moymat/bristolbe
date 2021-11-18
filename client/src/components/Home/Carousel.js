import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
//import Stepper from "@mui/material/Stepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
// import { autoPlay } from "react-swipeable-views-utils";
// open-source illustration from undraw.co
import OneBristol from "../../assets/img/createOneBristol.svg";
import myCollection from "../../assets/img/myCollection.svg";
import fileBundle from "../../assets/img/fileBundle.svg";
import TeamSpirit from "../../assets/img/teamSpirit.svg";
import useMediaQuery from "@mui/material/useMediaQuery";

/* const AutoPlaySwipeableViews = autoPlay(SwipeableViews); */

const images = [
	{
		title: "Organisez le savoir !",
		label:
			"Bristol est un site web collaboratif où des membres peuvent rédiger et partager des fiches méthodologiques. Bristol peut être utilisé comme simple carnet de note personnelle autant que pour la réalisation de base documentaire collaborative complexe.",
		imgPath: myCollection,
	},
	{
		title: "Rédigez !",
		label:
			"Bristol inclut un éditeur de texte ayant une interface intuitive qui permet à l'utilisateur de voir son document tel qu'il sera publié. Ajouter de la couleur, des liens, des images... Bristol permet une mise en forme sans limite de vos documents ! Et tout ça sans avoir à utiliser des commandes complexes.",
		imgPath: OneBristol,
	},
	{
		title: "Hiérarchisez !",
		label:
			"De la même manière qu'un château LEGO est composée de nombreuses briques, notre connaissance est la synthèse de nombreuse brique de savoir. Ce principe est le fondement de notre application. Chaque Bristol peut être imbriqué dans d'autres bristols.",
		imgPath: fileBundle,
	},
	{
		title: "Partagez !",
		label:
			"Parce que la connaissance est le fruit d'un partage, Bristol est une application qui connecte les personnes. Vous pouvez partager en lecture ou en édition vos collections de Bristol.",
		imgPath: TeamSpirit,
	},
];

function Carousel() {
	const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = images.length;

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const handleStepChange = step => {
		setActiveStep(step);
	};

	return (
		<Box
			sx={{
				flexGrow: 1,
				width: "100%",
				display: "flex",
				height: "100%",
				maxHeight: "100%",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				alignContent: "center",
				margin: "auto",
				boxSizing: "border-box",
				pb: 4,
			}}>
			<Paper
				square
				elevation={0}
				sx={{
					display: "flex",
					alignItems: "center",
					bgcolor: "background.default",
					mb: isSmallScreen ? 0 : 2,
				}}>
				<Typography
					variant={isSmallScreen ? "h5" : "h3"}
					sx={{ color: theme.palette.text.secondary, mb: 2 }}>
					{images[activeStep].title}
				</Typography>
			</Paper>
			<SwipeableViews
				style={{ overflow: "hidden" }}
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={activeStep}
				onChangeIndex={handleStepChange}
				enableMouseEvents>
				{images.map((step, index) => (
					<Box key={step.label} sx={{ height: "100%" }}>
						{Math.abs(activeStep - index) <= 2 ? (
							<Box
								component="img"
								className="image-wrapper"
								sx={{
									height: isSmallScreen ? "100%" : 450,
									display: "block",
									maxWidth: isSmallScreen ? 400 : 720,
									margin: "auto",
									overflow: "hidden",
									width: "100%",
								}}
								src={step.imgPath}
								alt={step.label}
							/>
						) : null}
					</Box>
				))}
			</SwipeableViews>
			<Paper
				square
				elevation={0}
				sx={{
					display: "flex",
					alignItems: "center",
					height: 200,
					p: 2,
					mt: 2,
					bgcolor: "background.default",
					overflow: "auto",
				}}>
				<Typography
					variant={isSmallScreen ? "body2" : "body1"}
					sx={{ color: theme.palette.text.secondary }}>
					{images[activeStep].label}
				</Typography>
			</Paper>
			<MobileStepper
				steps={maxSteps}
				position="static"
				activeStep={activeStep}
				nextButton={
					<Button
						size="small"
						onClick={handleNext}
						disabled={activeStep === maxSteps - 1}>
						Next
						{theme.direction === "rtl" ? (
							<KeyboardArrowLeft />
						) : (
							<KeyboardArrowRight />
						)}
					</Button>
				}
				backButton={
					<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
						{theme.direction === "rtl" ? (
							<KeyboardArrowRight />
						) : (
							<KeyboardArrowLeft />
						)}
						Back
					</Button>
				}
			/>
		</Box>
	);
}

export default Carousel;
