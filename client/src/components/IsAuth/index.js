import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App/App";

const IsAuth = () => {
	const { user } = useContext(UserContext);
	const history = useHistory();

	useEffect(() => {
		user?.id && history.push("/protected");
	}, [history, user]);

	return null;
};

export default IsAuth;
