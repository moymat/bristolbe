import { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../App";
import { AUTH_ROUTES } from "../utils/authRoutes";

const IsAuth = ({ children }) => {
	const { user } = useContext(UserContext);
	const history = useHistory();
	const { pathname } = useLocation();

	useEffect(() => {
		if (user.id) {
			if (!user.verified && pathname !== "/validate") {
				history.push("/validate");
			} else if (
				user.verified &&
				!AUTH_ROUTES.some(route => pathname.includes(route))
			) {
				history.push("/home");
			}
		} else if (
			!user.id &&
			(AUTH_ROUTES.includes(pathname) || pathname === "/validate")
		) {
			history.push("/");
		}
	}, [history, user, pathname]);

	return <>{children}</>;
};

export default IsAuth;
