import Box from "@mui/material/Box";
import { NavLink, useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ProfileLayout({ children }) {
	const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));
	const dataMap = [{ label: "profile" }, { label: "settings" }];
	const { pathname } = useLocation();

	return (
		<Box
			sx={{
				flexGrow: 1,
				bgcolor: "background.paper",
				display: { xs: "column", md: "flex" },
				height: '100%',
				width: '100%'
			}}>
			<Box
				flexDirection="column"
				sx={{ marginRight: 5, display: { xs: "none", md: "flex" } }}>
				{dataMap.map(({ label }) => (
					<Button
						variant={pathname.includes(label) ? "contained" : "outlined"}
						key={label}
						component={NavLink}
						to={`/user/${label}`}
						sx={{ marginBottom: 3 }}>
						{label}
					</Button>
				))}
			</Box>
			<Box
				sx={{
					height: "min-content",
					display: { xs: "flex", md: "none" },
					justifyContent: "center",
					/* width: "500px", */
				}}>
				{dataMap.map(({ label }) => (
					<Button
						variant={pathname.includes(label) ? "contained" : "outlined"}
						key={label}
						component={NavLink}
						to={`/user/${label}`}
						sx={{ marginBottom: 3, marginRight: 2 }}>
						{label}
					</Button>
				))}
			</Box>
			<Divider
				orientation="vertical"
				flexItem
				sx={{ display: { xs: "none", md: "flex" } }}
			/>
			<Divider flexItem sx={{ display: { xs: "flex", md: "none" } }} />
			<Box
				sx={{
					/* padding: " 30px 60px", */
					flexGrow: 1,
					
					/* width: isSmallScreen ? "200px" : "600px", */ 
				}}>
				{children}
			</Box>
		</Box>
	);
}
