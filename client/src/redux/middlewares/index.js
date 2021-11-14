import { createNestedMenu } from "../../components/Bristol/BristolTree/helper";
import { deltaRoles } from "../selectors/bristols";
import axios from "../../utils/axios";

const stopEditing = (state, action = null) => {
	const { socket } = state.user.user;
	const { id: bristolId, content } = state.bristol.selectedBristol;

	const data = action
		? {
				bristolId,
				title: action.title,
				hasContentChanged: action.content !== content,
		  }
		: { bristolId };

	socket.emit("stop_editing", data);
};

const editing = state => {
	const { socket, id: userId } = state.user.user;
	const { id: bristolId } = state.bristol.selectedBristol;
	socket.emit("editing", { bristolId, userId });
};

const moving = (state, bristolId) => {
	const { socket, id: userId } = state.user.user;
	socket.emit("moving", { bristolId, userId });
};

const stopMoving = (state, bristolId) => {
	const { socket, id: userId } = state.user.user;
	socket.emit("stop_moving", { bristolId, userId });
};

const joinBristolRooms = (state, bristols) => {
	const { socket } = state.user.user;
	const bristolsId = bristols.map(({ id }) => id);
	socket.emit("join_bristol_rooms", { bristolsId });
};

const Middleware = store => next => action => {
	const state = store.getState();

	const errorHandler = err => {
		const { error } = err.response.data;
		if (error === "not logged in" || error === "jwt expired")
			store.dispatch({ type: "LOGOUT" });
		console.error(error);
	};

	switch (action.type) {
		case "SET_BRISTOLS":
			axios()
				.get(`api/v1/users/${action.userId}/bristols`)
				.then(({ data }) => {
					joinBristolRooms(state, data.data);
					action.bristols = createNestedMenu(data.data);
					next(action);
				})
				.catch(errorHandler);
			break;
		case "ADD_NEW_BRISTOL":
			axios()
				.post(`/api/v1/bristols`, {
					content: action.content,
					title: action.title,
				})
				.then(({ data }) => {
					action.id = data.data.id;
					next(action);
				})
				.catch(errorHandler);
			break;
		case "GET_CURRENT_BRISTOL_CONTENT":
			axios()
				.get(`/api/v1/bristols/${action.selectedBristol}`)
				.then(({ data }) => {
					action.data = {
						...data.data,
						editors: data.data.editors || [],
						viewers: data.data.viewers || [],
					};
					next(action);
				})
				.catch(errorHandler);
			break;
		case "EDIT_CURRENT_BRISTOL":
			editing(state);
			next(action);
			break;
		case "UPDATE_BRISTOL":
			stopEditing(state, action);
			axios()
				.patch(`/api/v1/bristols/${state.bristol.selectedBristol.id}`, {
					content: action.content,
					title: action.title,
				})
				.then(() => {
					next(action);
				})
				.catch(errorHandler);
			break;
		case "UPDATE_BRISTOL_ROLES":
			const roles = deltaRoles(
				state.bristol.selectedBristol,
				action.editors,
				action.viewers
			);
			if (Object.keys(roles).length)
				axios()
					.post(`api/v1/bristols/${state.bristol.selectedBristol.id}/roles`, {
						...roles,
					})
					.then(() => next(action))
					.catch(errorHandler);
			break;
		case "CANCEL_UPDATE_EDITOR":
			stopEditing(state);
			next(action);
			break;
		case "MOVING_BRISTOL":
			moving(state, action.id);
			break;
		case "MOVE_BRISTOL":
			stopMoving(state, action.id);
			axios()
				.post("/api/v1/bristols/move", {
					bristol_id: action.id,
					parent_id: action.parent_id,
					position: action.position,
				})
				.then(() => {
					next(action);
				})
				.catch(errorHandler);
			break;
		case "DELETE_BRISTOL":
			axios()
				.delete(`/api/v1/bristols/${action.bristolId}`)
				.then(() => next(action))
				.catch(errorHandler);
			break;
		case "LOGOUT":
			store.dispatch({ type: "BRISTOL_RESET" });
			next(action);
			break;
		default:
			next(action);
			break;
	}
};

export default Middleware;
