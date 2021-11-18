import { useHistory, useLocation, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { AUTH_ROUTES } from "../utils/authRoutes";

const IsAuth = ({ children }) => {
	const user = useSelector(state => state.user.user);
	const history = useHistory();
	const { pathname } = useLocation();

	return (
		<>
			{!user.id && AUTH_ROUTES.includes(pathname) ? (
				<Redirect to="/" />
			) : (
				children
			)}
		</>
	);
};

/* {user.id ? (
	<SocketIOListener>
		<Navbar
			<Route exact path="/home">
				<Home />
			</Route>
			<Route exact path="/contact">
				<Contact />
			</Route>
			<Route exact path="/bristol">
				<Bristol />
			</Route>
			<Route exact path="/user/:page">
				<ProfileLayout>
					<Route
						exact
						path="/user/settings"
						component={Settings}
					/>
					<Route exact path="/user/profile" component={Profile} />
				</ProfileLayout>
			</Route>
			<Route exact path="/validate">
				<ValidateEmail />
			</Route>
			<Route path="*">
				<NotFound />
			</Route>
		</Navbar>
	</SocketIOListener>
) : (
	<Route path="*">
		<NotFound />
	</Route>
) */

export default IsAuth;
