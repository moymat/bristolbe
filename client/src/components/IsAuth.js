import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AUTH_ROUTES } from "../utils/authRoutes";

const IsAuth = ({ children }) => {
	const user = useSelector(state => state.user.user);
	const history = useHistory();
	const { pathname } = useLocation();

	useEffect(() => {
		if (user.id) {
			if (!user.verified && pathname !== "/validate") {
				history.push("/validate");
			} else if (
				user.verified &&
				!AUTH_ROUTES.some(
					route => pathname === route && pathname !== "/validate"
				)
			) {
				history.push("/home");
			}
		} else if (!user.id && AUTH_ROUTES.includes(pathname)) {
			history.push("/");
		}
	}, [history, user, pathname]);

	return <>{children}</>;
};

export default IsAuth;
