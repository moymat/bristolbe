import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LinkedIn from "@mui/icons-material/LinkedIn";
import GitHub from "@mui/icons-material/GitHub";
import "./style.scss";
import { Link } from "react-router-dom";

const CardProfile = ({ firstName, lastName, jobs }) => {
	return (
		<Box
			sx={{
				width: 275,
				height: 450,
				maxHeight: 450,
				mb: 1,
				boxSizing: "border-box",
			}}>
			<Card sx={{ maxHeight: "100%", height: "100%" }}>
				<CardContent sx={{ height: "100%" }}>
					<Box className="our-team">
						<Box className="picture">
							<img
								className="img-fluid"
								src="https://picsum.photos/130/130?image=856"
								alt={`${firstName} ${lastName}`}
							/>
						</Box>
						<Box className="team-content">
							<Typography
								sx={{ fontWeight: 700, mb: 1 }}
								variant="h5">{`${firstName} ${lastName}`}</Typography>
							{/* <Typography variant="h6" sx={{ marginBottom: 4 }}>
								{job}
							</Typography> */}
							{jobs.map(job => (
								<Typography sx={{ p: 0, px: 1, pb: 0.5, textAlign: "center" }}>
									{job}
								</Typography>
							))}
						</Box>
						<List className="social">
							<Box component="li">
								<Button
									sx={{
										display: "block",
										padding: "10px",
										fontSize: "17px",
										color: "white",
										transition: "all 0.3s ease 0s",
									}}
									component={Link}
									to="#">
									<GitHub />
								</Button>
							</Box>
							<Box component="li">
								<Button
									sx={{
										display: "block",
										padding: "10px",
										fontSize: "17px",
										color: "white",
										transition: "all 0.3s ease 0s",
									}}
									component={Link}
									to="#">
									<LinkedIn />
								</Button>
							</Box>
							<Box component="li">
								<Button
									sx={{
										display: "block",
										padding: "10px",
										fontSize: "17px",
										color: "white",
										transition: "all 0.3s ease 0s",
									}}
									component={Link}
									to="#">
									<EmailOutlinedIcon />
								</Button>
							</Box>
						</List>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};
export default CardProfile;
