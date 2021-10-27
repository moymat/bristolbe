import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App/App";

const AuthCheck = ({ children }) => {
	const { user } = useContext(UserContext);
	const history = useHistory();

	useEffect(() => {
		user?.id && history.push("/protected");
	}, [history, user]);

	return <div style={{ height: "100%" }}>{children}</div>;
};

export default AuthCheck;
