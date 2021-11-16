import { useSelector, useDispatch } from "react-redux";

const SocketIOListener = ({ children }) => {
	const user = useSelector(state => state.user.user);
	const selectedBristol = useSelector(state => state.bristol.selectedBristol);
	const dispatch = useDispatch();

	user.socket.on("in_editing", data => {
		dispatch({ type: "SIO_SET_EDITING", data });
	});

	user.socket.on("stop_editing", data => {
		dispatch({ type: "SIO_UNSET_EDITING", data });
		selectedBristol.id === data.bristolId &&
			data.hasContentChanged &&
			dispatch({
				type: "GET_CURRENT_BRISTOL_CONTENT",
				selectedBristol: data.bristolId,
			});
	});

	user.socket.on("is_moving", data => {
		console.log(data);
		dispatch({ type: "SIO_SET_MOVING", data });
	});

	user.socket.on("stop_moving", data => {
		dispatch({ type: "SIO_UNSET_MOVING", data });
	});

	return <>{children}</>;
};

export default SocketIOListener;
