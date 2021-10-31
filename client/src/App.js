import { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Bristol from "./views/Bristol";
import Login from "./views/Login";
import Register from "./views/Register";
import Forgot from "./views/Forgot";
import Reset from "./views/Reset";
import IsAuth from "./components/IsAuth";
import "./App.scss";
import axios from "./utils/axios";
import CustomTheme from "./theme"
export const UserContext = createContext({});

function App() {
	const [user, setUser] = useState({});

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const { data } = await axios.get("http://localhost:4000/auth/is_auth");
				localStorage.setItem("refresh_token", data.refresh);
				setUser(data.user);
			} catch (err) {
				console.error("Not logged in");
			}
		};
		checkAuth();
	}, []);

	return (
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
						<Route exact path="/reset">
							<Reset />
						</Route>
						<CustomTheme>
						<Route exact path="/home">
							<Navbar>
								<Home />
							</Navbar>
						</Route>
						<Route exact path="/bristol">
							<Navbar>
								<Bristol />
							</Navbar>
						</Route>
						</CustomTheme>
					</IsAuth>
				</Switch>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
