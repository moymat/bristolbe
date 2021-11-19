import { useSelector } from "react-redux";
import { Redirect } from "react-router";

const NotAuth = ({ children }) => {
	const user = useSelector(state => state.user.user);

	return <>{user.id ? <Redirect to="/home" /> : children}</>;
};

export default NotAuth;
