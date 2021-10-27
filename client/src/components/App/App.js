import { useState, createContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "../../utils/axios";
import "./App.scss";
import Login from "../Login";
import Logo from "../Logo";
import Register from "../Register";
import Forgot from "../Forgot";
import Reset from "../Reset";
import Protected from "../Protected";
import AuthCheck from "../AuthCheck";

export const UserContext = createContext({});

export default function App() {
	const [user, setUser] = useState({});

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await axios.get("/auth/is_auth");
				console.log(response);
			} catch (err) {
				console.error(err);
			}
		};
		!user.id && checkAuth();
	}, [user]);

	return (
		<div className="app">
			<UserContext.Provider value={{ user, setUser }}>
				<Switch>
					<AuthCheck>
						<Route path="/" exact>
							<Login />
						</Route>
						<Route path="/register">
							<Register />
						</Route>
						<Route path="/forgot-password">
							<Forgot />
						</Route>
						<Route path="/reset">
							<Reset />
						</Route>
					</AuthCheck>
					<Route exact path="/protected">
						<Protected />
					</Route>
				</Switch>
			</UserContext.Provider>
		</div>
	);
}
