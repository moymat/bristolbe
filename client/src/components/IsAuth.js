import { useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router";
import { AUTH_ROUTES } from "../utils/authRoutes";
import NotFound from "../views/NotFound";

const IsAuth = ({ children }) => {
	const user = useSelector(state => state.user.user);
	const location = useLocation();

	return !user.id ? (
		AUTH_ROUTES.includes(location.pathname) ? (
			<Redirect to="/" />
		) : (
			<NotFound link="/" buttonText="login" />
		)
	) : !user.verified ? (
		<Redirect to="/validate" />
	) : !AUTH_ROUTES.includes(location.pathname) ? (
		<NotFound link="/home" buttonText="home" />
	) : (
		children
	);
};

export default IsAuth;
