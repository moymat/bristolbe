import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LinkedIn from "@mui/icons-material/LinkedIn";
import GitHub from "@mui/icons-material/GitHub";

const CardProfile = () => {
	return (
		<Box sx={{ minWidth: 275 }}>
			<Card variant="outlined">
				<CardContent>
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						Word of the Day
					</Typography>
					<Typography variant="h5" component="div">
						Tony DAY
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						Lead dev Front
					</Typography>
					<Typography variant="body2">
						well meaning and kindly.
						<br />
						{'"a benevolent smile"'}
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						variant="contained"
						startIcon={<EmailOutlinedIcon />}
						size="small"
						sx={{
							backgroundColor: "#dd4b39",
							"&:hover": {
								backgroundColor: "#c04131",
							},
						}}>
						Email
					</Button>
					<Button
						variant="contained"
						startIcon={<GitHub />}
						size="small"
						sx={{
							backgroundColor: "#333",
							"&:hover": {
								backgroundColor: "#111",
							},
						}}>
						Github
					</Button>
					<Button
						variant="contained"
						startIcon={<LinkedIn />}
						size="small"
						sx={{
							backgroundColor: "#0077b5",
							"&:hover": {
								backgroundColor: "#03527c",
							},
						}}>
						Linkedin
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
};
export default CardProfile;
