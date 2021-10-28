import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { AUTH_ROUTES } from "../utils/authRoutes";

const IsAuth = ({ children }) => {
	const { user } = useContext(UserContext);
	const history = useHistory();

	useEffect(() => {
		if (user.id && !AUTH_ROUTES.includes(history.location.pathname)) {
			history.push("/home");
		} else if (!user.id && AUTH_ROUTES.includes(history.location.pathname)) {
			history.push("/");
		}
	}, [history, user]);

	return <>{children}</>;
};

export default IsAuth;
