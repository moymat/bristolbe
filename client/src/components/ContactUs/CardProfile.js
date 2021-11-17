import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LinkedIn from "@mui/icons-material/LinkedIn";
import GitHub from "@mui/icons-material/GitHub";
import { Avatar } from "@mui/material";
import "./style.scss";
import { Link } from "react-router-dom";

const CardProfile = ({ firstName, lastName, job, secondJob, thirdJob }) => {
	return (
		<Box sx={{ minWidth: 275 }}>
			<Card sx={{ marginBottom: { xs: 2 } }}>
				<CardContent>
					<Box className="our-team">
						<Box className="picture">
							<img
								className="img-fluid"
								src="https://picsum.photos/130/130?image=856"
								alt="person"
							/>
						</Box>
						<Box className="team-content">
							<Typography variant="h5">{`${firstName} ${lastName}`}</Typography>
							<Typography variant="h6" sx={{ marginBottom: 4 }}>
								{job}
							</Typography>
							<Typography variant="h6">{`${secondJob} - ${thirdJob}`}</Typography>
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
			{/* <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            Tony DAY
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Lead dev front
          </Typography>
          <Avatar alt="Tony" src="" />
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
            }}
          >
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
            }}
          >
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
            }}
          >
            Linkedin
          </Button>
        </CardActions>
      </Card> */}
		</Box>
	);
};
export default CardProfile;
