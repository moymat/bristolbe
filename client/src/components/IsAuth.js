import { useSelector } from "react-redux";
import { Redirect } from "react-router";

const IsAuth = ({ children }) => {
	const user = useSelector(state => state.user.user);

	return (
		<>
			{!user.id ? (
				<Redirect to="/" />
			) : !user.verified ? (
				<Redirect to="/validate" />
			) : (
				children
			)}
		</>
	);
};

export default IsAuth;
