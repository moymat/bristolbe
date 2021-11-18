import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import IsAuth from "./components/IsAuth";
import Home from "./views/Home";
import Bristol from "./views/Bristol";
import Login from "./views/Login";
import Register from "./views/Register";
import Forgot from "./views/Forgot";
import Reset from "./views/Reset";
import Profile from "./views/Profile";
import Settings from "./views/Settings";
import Contact from "./views/Contact";
import ProfileLayout from "./components/ProfileLayout";
import axios from "./utils/axios";
import CustomTheme from "./theme";
import NotFound from "./views/NotFound";
import ValidateEmail from "./views/ValidateEmail";
import SocketIOListener from "./components/SocketIOListener";
import { AUTH_ROUTES } from "./utils/authRoutes";

function App() {
	const [isAuthChecked, setIsAuthChecked] = useState(false);
	const user = useSelector(state => state.user.user);
	const dispatch = useDispatch();

	// Check if user is already authenticate at app launch
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const { data } = await axios().get("/auth/is-auth");
				dispatch({ type: "LOGIN", ...data });
				setIsAuthChecked(true);
			} catch (err) {
				setIsAuthChecked(true);
			}
		};
		checkAuth();
	}, [dispatch]);

	useEffect(() => {
		console.log(user);
	}, [user]);

	return (
		isAuthChecked && (
			<CustomTheme>
				<Router>
					<Navbar>
						<SocketIOListener>
							<Switch>
								<Route exact path="/">
									{user.id ? <Redirect to="/home" /> : <Login />}
								</Route>
								<Route exact path="/register">
									{user.id ? <Redirect to="/home" /> : <Register />}
								</Route>
								<Route exact path="/forgot-password">
									{user.id ? <Redirect to="/home" /> : <Forgot />}
								</Route>
								<Route exact path="/reset/:code">
									{user.id ? <Redirect to="/home" /> : <Reset />}
								</Route>
								<Route exact path="/home">
									{!user.id ? <Redirect to="/" /> : <Home />}
								</Route>
								<Route exact path="/contact">
									{!user.id ? <Redirect to="/" /> : <Contact />}
								</Route>
								<Route exact path="/bristol">
									{!user.id ? <Redirect to="/" /> : <Bristol />}
								</Route>
								<Route
									path="/user/:page"
									component={({ match }) => {
										const { page } = match.params;
										const pages = ["settings", "profile"];
										return pages.includes(page) ? (
											<ProfileLayout>
												{page === "settings" && <Settings />}
												{page === "profile" && <Profile />}
											</ProfileLayout>
										) : (
											<NotFound link="/home" />
										);
									}}
								/>
								<Route exact path="/validate">
									{!user.id ? (
										<Redirect to="/" />
									) : user.verified ? (
										<Redirect to="/home" />
									) : (
										<ValidateEmail />
									)}
								</Route>
								<Route path="*">
									<NotFound
										link={user.id ? "/home" : "/"}
										buttonText={user.id ? "home" : "login"}
									/>
								</Route>
							</Switch>
						</SocketIOListener>
					</Navbar>
				</Router>
			</CustomTheme>
		)
	);
}

export default App;
