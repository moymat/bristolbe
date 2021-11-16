import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
					<Switch>
						<IsAuth>
							<Route exact path="/">
								<Login />
							</Route>
							<Route exact path="/register">
								<Register />
							</Route>
							<Route exact path="/forgot-password">
								<Forgot />
							</Route>
							<Route path="/reset/:code">
								<Reset />
							</Route>
							{user.id && (
								<SocketIOListener>
									<Navbar>
										<Route exact path="/home">
											<Home />
										</Route>
										<Route exact path="/contact">
											<Contact />
										</Route>
										<Route exact path="/bristol">
											<Bristol />
										</Route>
										<Route exact path="/user/:page">
											<ProfileLayout>
												<Route
													exact
													path="/user/settings"
													component={Settings}
												/>
												<Route exact path="/user/profile" component={Profile} />
											</ProfileLayout>
										</Route>
									</Navbar>
								</SocketIOListener>
							)}
							<Route exact path="/validate">
								<ValidateEmail />
							</Route>
						</IsAuth>
						{/* <Route path="*">
							<NotFound />
						</Route> */}
					</Switch>
				</Router>
			</CustomTheme>
		)
	);
}

export default App;
