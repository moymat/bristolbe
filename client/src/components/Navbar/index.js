import { useState, useContext } from "react";
import {
	styled,
	useTheme,
	ThemeProvider,
	createTheme,
} from "@mui/material/styles";
import {
	orange,
	lightBlue,
	deepPurple,
	deepOrange,
} from "@mui/material/colors";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import BELogo from "../../assets/img/BELogo.png";
//internal import
import DarkThemeSwitch from "./switchDarkMode";
//react-router-dom import
import { useHistory, Link } from "react-router-dom";

import axios from "../../utils/axios";
import { UserContext } from "../../App";

const drawerWidth = 240;

const openedMixin = theme => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = theme => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(9)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: prop => prop !== "open", // "open" prop should not be forwarded to the Component (not added to the dom)
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

export default function Navbar({ children }) {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [darkState, setDarkState] = useState(false);

	// For Switch Theming
	const palletType = darkState ? "dark" : "light";
	const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
	const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];

	const { setUser } = useContext(UserContext);

	const darkTheme = createTheme({
		palette: {
			mode: palletType,
			primary: {
				main: mainPrimaryColor,
			},
			secondary: {
				main: mainSecondaryColor,
			},
		},
	});

	const handleThemeChange = () => {
		setDarkState(!darkState);
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	// profil
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = event => {
		setAnchorEl(event.currentTarget);
	};

	const logout = async () => {
		await axios.get("/auth/logout");
		localStorage.removeItem("refresh_token");
		setUser({});
	};

	const handleMobileMenuClose = async () => {
		try {
			await logout();
			setAnchorEl(null);
			setMobileMoreAnchorEl(null);
		} catch (err) {
			console.error(err);
		}
	};

	const handleMenuClose = async () => {
		try {
			await logout();
			setAnchorEl(null);
			handleMobileMenuClose();
		} catch (err) {
			console.error(err);
		}
	};

	const handleMobileMenuOpen = event => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}>
			<MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
		</Menu>
	);
	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}>
			<MenuItem onClick={handleThemeChange}>
				<IconButton size="large" aria-label="change theme" color="inherit">
					{darkState ? <Brightness7Icon /> : <DarkModeIcon />}
				</IconButton>
				<p>Thème</p>
			</MenuItem>
			<MenuItem onClick={handleMobileMenuClose}>
				<IconButton size="large" aria-label="change theme" color="inherit">
					<LogoutIcon />
				</IconButton>
				<p>Sign out</p>
			</MenuItem>
		</Menu>
	);

	let history = useHistory();
	function handleBristolButtonClick() {
		history.push("/bristol");
	}

	return (
		<ThemeProvider theme={darkTheme}>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppBar position="fixed" open={open}>
					{/* add props "enableColorOnDark" to use primary color with dark mode */}
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{
								marginRight: "36px",
								...(open && { display: "none" }),
							}}>
							<MenuIcon />
						</IconButton>
						<Link to="/home">
							<img src={BELogo} alt="react logo" width="40" />
						</Link>
						<Box sx={{ flexGrow: 1 }} />
						<Box sx={{ display: { xs: "none", md: "flex" } }}>
							<IconButton
								size="large"
								edge="end"
								aria-label="dark theme"
								color="inherit">
								<DarkThemeSwitch
									checked={darkState}
									onChange={handleThemeChange}
								/>
							</IconButton>
							<IconButton
								size="large"
								edge="end"
								aria-label="account of current user"
								aria-controls={menuId}
								aria-haspopup="true"
								onClick={handleProfileMenuOpen}
								color="inherit">
								<Avatar sx={{ width: 35, height: 35 }} alt="Remy Sharp" />
							</IconButton>
						</Box>
						<Box sx={{ display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="show more"
								aria-controls={mobileMenuId}
								aria-haspopup="true"
								onClick={handleMobileMenuOpen}
								color="inherit">
								<MoreIcon />
							</IconButton>
						</Box>
					</Toolbar>
				</AppBar>
				{renderMobileMenu}
				{renderMenu}
				<Drawer variant="permanent" open={open}>
					<DrawerHeader>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === "rtl" ? (
								<ChevronRightIcon />
							) : (
								<ChevronLeftIcon />
							)}
						</IconButton>
					</DrawerHeader>
					<Divider />
					<List>
						<ListItem button key="Bristol" onClick={handleBristolButtonClick}>
							<ListItemIcon>
								<LocalLibraryIcon />
							</ListItemIcon>
							<ListItemText primary="Bristol" />
						</ListItem>
					</List>
				</Drawer>
				<Box component="main" sx={{ flexGrow: 1, p: 3, width: "100%" }}>
					<DrawerHeader />
					{children}
				</Box>
			</Box>
		</ThemeProvider>
	);
}
