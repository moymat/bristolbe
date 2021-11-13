import axios from "../../utils/axios";
import { createNestedMenu } from "../../components/Bristol/BristolTree/helper";
import { deltaRoles } from "../selectors/bristols";

const Middleware = store => next => action => {
	const state = store.getState();

	const errorHandler = err => {
		const { error } = err.response.data;
		if (error === "not logged in" || error === "jwt expired")
			store.dispatch({ type: "LOGOUT" });
		console.error(error);
	};

	switch (action.type) {
		case "UPDATE_BRISTOL":
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
		case "MOVE_BRISTOL":
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
		case "SET_BRISTOLS":
			axios()
				.get(`api/v1/users/${action.userId}/bristols`)
				.then(({ data }) => {
					action.bristols = createNestedMenu(data.data);
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
