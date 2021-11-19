import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
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
import IsAuth from "./components/IsAuth";

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
								<IsAuth>
									<Route exact path="/home">
										<Home />
									</Route>
									<Route exact path="/contact">
										<Contact />
									</Route>
									<Route exact path="/bristol">
										<Bristol />
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
												<NotFound link="/home" buttonText="home" />
											);
										}}
									/>
									<Route exact path="/validate">
										<ValidateEmail />
									</Route>
									<Route path="*">
										<NotFound
											link={user.id ? "/home" : "/"}
											buttonText={user.id ? "home" : "login"}
										/>
									</Route>
								</IsAuth>
							</Switch>
						</SocketIOListener>
					</Navbar>
				</Router>
			</CustomTheme>
		)
	);
}

export default App;
