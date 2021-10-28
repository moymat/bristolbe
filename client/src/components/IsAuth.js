import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

const IsAuth = ({ children }) => {
	const { user } = useContext(UserContext);
	const history = useHistory();

	useEffect(() => {
		user?.id && history.push("/home");
	}, [history, user]);

	return <>{children}</>;
};

export default IsAuth;
