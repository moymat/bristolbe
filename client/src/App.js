import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Bristol from "./views/Bristol";
import Login from "./views/Login";
import Register from "./views/Register";
import Forgot from "./views/Forgot";
import "./App.scss";
import Reset from "./views/Reset";

function App() {
	return (
		<Router>
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
				<Navbar>
					<Route exact path="/home">
						<Home />
					</Route>
					<Route exact path="/bristol">
						<Bristol />
					</Route>
				</Navbar>
			</Switch>
		</Router>
	);
}

export default App;
