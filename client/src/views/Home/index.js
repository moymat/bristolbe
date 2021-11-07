// Material UI import
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
// open-source illustration from undraw.co
import OneBristol from "../../assets/img/createOneBristol.svg";
import myCollection from "../../assets/img/myCollection.svg";
import fileBundle from "../../assets/img/fileBundle.svg";
import TeamSpirit from "../../assets/img/teamSpirit.svg";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

const MainContents = () => (
	<Box sx={{ flexGrow: 1, mx: "10%" }}>
		<Item elevation={0}>
			<Typography variant="h2" component="div" gutterBottom>
				Bristol organise le savoir
			</Typography>
		</Item>
		<Item elevation={0} sx={{ mx: { xs: "auto", md: "25%" } }}>
			<img src={myCollection} alt="illustration of one bristol" width="100%" />
		</Item>
		<Item elevation={0}>
			<Typography variant="subtitle1" gutterBottom component="div">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
				non enim praesent elementum facilisis leo vel. Risus at ultrices mi
				tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
				tellus. Convallis convallis tellus id interdum velit laoreet id donec
				ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
				suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
				quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
				proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
				tincidunt obortis feugiat vivamus at augue. At augue eget arcu dictum
				varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
				Lorem donec massa sapien faucibus et molestie ac.
			</Typography>
		</Item>
		<Item elevation={0} sx={{ mx: { xs: "auto", md: "25%" } }}>
			<img
				src={OneBristol}
				alt="illustration of a woman on a folder files"
				width="100%"
			/>
		</Item>
		<Item elevation={0}>
			<Typography variant="subtitle1" gutterBottom component="div">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
				non enim praesent elementum facilisis leo vel. Risus at ultrices mi
				tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
				tellus. Convallis convallis tellus id interdum velit laoreet id donec
				ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
				suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
				quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
				proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
				tincidunt obortis feugiat vivamus at augue. At augue eget arcu dictum
				varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
				Lorem donec massa sapien faucibus et molestie ac.
			</Typography>
		</Item>
		<Item elevation={0} sx={{ mx: { xs: "auto", md: "25%" } }}>
			<img
				src={fileBundle}
				alt="illustration of a woman on a folder files"
				width="100%"
			/>
		</Item>
		<Item elevation={0}>
			<Typography variant="subtitle1" gutterBottom component="div">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
				non enim praesent elementum facilisis leo vel. Risus at ultrices mi
				tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
				tellus. Convallis convallis tellus id interdum velit laoreet id donec
				ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
				suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
				quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
				proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
				tincidunt obortis feugiat vivamus at augue. At augue eget arcu dictum
				varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
				Lorem donec massa sapien faucibus et molestie ac.
			</Typography>
		</Item>
		<Item elevation={0} sx={{ mx: { xs: "auto", md: "25%" } }}>
			<img
				src={TeamSpirit}
				alt="illustration of a woman on a folder files"
				width="100%"
			/>
		</Item>
		<Item elevation={0}>
			<Typography variant="subtitle1" gutterBottom component="div">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
				non enim praesent elementum facilisis leo vel. Risus at ultrices mi
				tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
				tellus. Convallis convallis tellus id interdum velit laoreet id donec
				ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
				suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
				quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
				proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
				tincidunt obortis feugiat vivamus at augue. At augue eget arcu dictum
				varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
				Lorem donec massa sapien faucibus et molestie ac.
			</Typography>
		</Item>
	</Box>
);

export default MainContents;
