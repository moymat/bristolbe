import { useState, createContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "../../utils/axios";
import "./App.scss";
import Login from "../Login";
import Register from "../Register";
import Forgot from "../Forgot";
import Reset from "../Reset";
import Protected from "../Protected";
import InputLayout from "../InputLayout";

export const UserContext = createContext({});

export default function App() {
	const [user, setUser] = useState({});

	/* 	useEffect(() => {
		const checkAuth = async () => {
			try {
				const result = await (
					await fetch("http://localhost:4000/auth/is_auth", {
						headers: {
							Accept: "application/json",
							Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
						},
						credentials: "include",
					})
				).json();
				console.log(result);
			} catch (err) {
				console.error(err);
			}
		};
		checkAuth();
	}, []); */

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
