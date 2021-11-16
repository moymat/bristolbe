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
import { Avatar } from "@mui/material";
import "./style.scss";

const CardProfile = () => {
  return (
    <Box sx={{ minWidth: 275 }}>
	<Card>
		<CardContent>
			<div class="container">
	<div class="row">
		<div>
		<div class="our-team">
			<div class="picture">
			<img class="img-fluid" src="https://picsum.photos/130/130?image=856" />
			</div>
			<div class="team-content">
			<Typography >Justin Ramos</Typography>
			<Typography>Web Developer</Typography>
			</div>
			<ul class="social">
			<li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-facebook" aria-hidden="true"></a></li>
			<li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-twitter" aria-hidden="true"></a></li>
			<li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-google-plus" aria-hidden="true"></a></li>
			<li><a href="https://codepen.io/collection/XdWJOQ/" class="fa fa-linkedin" aria-hidden="true"></a></li>
			</ul>
		</div>
		</div>
	</div>
	</div>
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
