import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LinkedIn from "@mui/icons-material/LinkedIn";
import GitHub from "@mui/icons-material/GitHub";
//import "./style.scss";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

/* const BoxCard = styled(Box)(({ theme }) => ({
	width: 275,
	height: 450,
	maxHeight: 450,
	mb: 1,
	boxSizing: "border-box",
})); */

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
					<Box
						sx={{
							position: "relative",
							height: "100%",
							padding: "30px 0",
							textAlign: "center",
							overflow: "hidden",
							"&:hover": {
								"& .picture::before": {
									height: "100%",
								},
								"& .social": {
									bottom: 0,
								},
								"& img": {
									boxShadow: "0 0 0 14px whitesmoke",
									transform: "scale(0.7)",
								},
							},
						}}>
						<Box
							className="picture"
							sx={{
								display: "inline-block",
								position: "relative",
								height: "130px",
								width: "130px",
								mb: "50px",
								zIndex: 1,
								"&::before": {
									content: '""',
									position: "absolute",
									bottom: "135%",
									right: 0,
									left: 0,
									width: "100%",
									height: 0,
									borderRadius: "50%",
									backgroundColor: "primary.main",
									opacity: 0.9,
									transform: "scale(3)",
									transition: "all 0.3s linear 0s",
								},
								"&::after": {
									content: '""',
									width: "100%",
									height: "100%",
									borderRadius: "50%",
									backgroundColor: "primary.main",
									position: "absolute",
									top: 0,
									left: 0,
									zIndex: -1,
								},
								"& img": {
									width: "100%",
									height: "auto",
									borderRadius: "50%",
									transform: "scale(1)",
									transition: "all 0.9s ease 0s",
								},
							}}>
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
								<Typography
									key={job}
									sx={{ p: 0, px: 1, pb: 0.5, textAlign: "center" }}>
									{job}
								</Typography>
							))}
						</Box>
						<List
							className="social"
							sx={{
								position: "absolute",
								display: "flex",
								justifyContent: "center",
								width: "100%",
								padding: 0,
								margin: 0,
								bottom: "-100px",
								left: 0,
								backgroundColor: "primary.main",
								transition: "all 0.5s ease 0s",
								"& li": {
									display: "inline-block",
									"& a:hover": {
										color: "primary.main",
										backgroundColor: "whitesmoke",
									},
								},
							}}>
							<Box component="li">
								<Button
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										minHeight: "100%",
										color: "white",
										transition: "all 0.3s ease 0s",
										"& .MuiButton-startIcon": {
											m: 0,
											"& > :nth-of-type(1)": {
												fontSize: "xx-large",
											},
											"& svg": {
												verticalAlign: "sub",
											},
										},
									}}
									component={Link}
									to="#">
									<GitHub />
								</Button>
							</Box>
							<Box component="li">
								<Button
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										minHeight: "100%",
										color: "white",
										transition: "all 0.3s ease 0s",
										"& .MuiButton-startIcon": {
											m: 0,
											"& > :nth-of-type(1)": {
												fontSize: "xx-large",
											},
											"& svg": {
												verticalAlign: "sub",
											},
										},
									}}
									component={Link}
									to="#"
									startIcon={<LinkedIn />}
								/>
							</Box>
							<Box component="li">
								<Button
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										minHeight: "100%",
										color: "white",
										transition: "all 0.3s ease 0s",
										"& .MuiButton-startIcon": {
											m: 0,
											"& > :nth-of-type(1)": {
												fontSize: "xx-large",
											},
											"& svg": {
												verticalAlign: "sub",
											},
										},
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
