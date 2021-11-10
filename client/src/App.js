import { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import ProfileLayout from "./components/ProfileLayout";
import axios from "./utils/axios";
import CustomTheme from "./theme";
import NotFound from "./views/NotFound";
import ValidateEmail from "./views/ValidateEmail";
export const UserContext = createContext({});

function App() {
	const [user, setUser] = useState({});
	const [isAuthChecked, setIsAuthChecked] = useState(false);

	// Check if user is already authenticate at app launch
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const { data } = await axios().get("/auth/is-auth");
				localStorage.setItem("refresh_token", data.refresh);
				setUser(data.user);
				setIsAuthChecked(true);
			} catch (err) {
				console.error("Not logged in");
				setIsAuthChecked(true);
			}
		};
		checkAuth();
	}, []);

	return (
		isAuthChecked && (
			<CustomTheme>
				<UserContext.Provider value={{ user, setUser }}>
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
									<Navbar>
										<Route exact path="/home">
											<Home />
										</Route>
										<Route exact path="/bristol">
											<Bristol />
										</Route>
										<Route
											exact
											path="/user/:page"
											render={({ match }) => (
												<ProfileLayout>
													{match.params.page === "settings" && <Settings />}
													{match.params.page === "profile" && <Profile />}
												</ProfileLayout>
											)}></Route>
									</Navbar>
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
				</UserContext.Provider>
			</CustomTheme>
		)
	);
}

export default App;
