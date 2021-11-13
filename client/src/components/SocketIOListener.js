import { useSelector, useDispatch } from "react-redux";

const SocketIOListener = ({ children }) => {
	const user = useSelector(state => state.user.user);
	const dispatch = useDispatch();

	user.socket.on("in_editing", data => {
		dispatch({ type: "SIO_SET_EDITING", data });
	});

	user.socket.on("stop_editing", data => {
		console.log(data);
		dispatch({ type: "SIO_UNSET_EDITING", data });
		data.hasContentChanged &&
			dispatch({
				type: "GET_CURRENT_BRISTOL_CONTENT",
				selectedBristol: data.bristolId,
			});
	});

	return <>{children}</>;
};

export default SocketIOListener;
