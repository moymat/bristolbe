import EmptyHolder from "../assets/img/emptyHolder.svg";
import AppIcon from "../assets/img/appIcon.svg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function NotFound({ buttonText, link }) {
	const user = useSelector(state => state.user.user);
	const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));
	const isMediumScreen = useMediaQuery(theme => theme.breakpoints.down("md"));

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				minHeight: user.id ? "100%" : "100vh",
				margin: "auto",
				boxSizing: "border-box",
			}}>
			{!user.id && (
				<img
					style={{
						position: "absolute",
						top: 20,
						left: 20,
						width: "100px",
						opacity: 0.5,
					}}
					alt="brisol"
					src={AppIcon}
				/>
			)}
			<Box
				sx={{
					position: "relative",
					width: isSmallScreen ? 300 : isMediumScreen ? 500 : 600,
					mb: 8,
				}}>
				<Typography
					variant="h1"
					fontSize={isSmallScreen ? 150 : isMediumScreen ? 180 : 220}
					fontWeight="bold"
					color="primary"
					sx={{
						position: "absolute",
						bottom: -80,
						left: "50%",
						textShadow: "2px 2px white, -2px -2px white",
						transform: "translateX(-50%)",
					}}>
					404
				</Typography>
				<img
					src={EmptyHolder}
					style={{ objectFit: "cover", width: "100%" }}
					alt="not found"></img>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					textAlign: "center",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Typography
					variant={isSmallScreen ? "h6" : "h5"}
					fontWeight="bold"
					mb={4}
					alignItems="center">
					Sorry, but the page you are looking for
					<br />
					has not been found
				</Typography>
				<Button
					startIcon={<ArrowBackIcon />}
					variant="contained"
					component={Link}
					size="large"
					to={link}
					sx={{ px: 2, py: 1 }}>
					{buttonText}
				</Button>
			</Box>
		</Box>
	);
}
