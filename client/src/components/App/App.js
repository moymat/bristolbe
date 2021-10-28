import { useState, createContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "../../utils/axios";
import "./App.scss";
import Login from "../Login";
import Register from "../Register";
import Forgot from "../Forgot";
import Reset from "../Reset";
import Protected from "../Protected";

export const UserContext = createContext({});

export default function App() {
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
		<div className="app">
			<UserContext.Provider value={{ user, setUser }}>
				<Switch>
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
					<Route exact path="/protected">
						<Protected />
					</Route>
				</Switch>
			</UserContext.Provider>
		</div>
	);
}
