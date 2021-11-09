import axios from "../../utils/axios";
import { createNestedMenu } from "../../components/Bristol/BristolTree/helper";

const Middleware = store => next => action => {
	const state = store.getState();
	switch (action.type) {
		case "UPDATE_BRISTOL":
			axios()
				.patch(`/api/v1/bristols/${state.bristol.bristolId}`, {
					content: state.bristol.bristolContent,
					title: state.bristol.bristolTitle,
				})
				.then(() => {
					next(action);
				})
				.catch(err => console.error("middleware", err.response.data));
			break;
		case "ADD_NEW_BRISTOL":
			axios()
				.post(`/api/v1/bristols`, {
					content: state.bristol.bristolContent,
					title: state.bristol.bristolTitle,
				})
				.then(({ data }) => {
					action.id = data.data.id;
					next(action);
				})
				.catch(err => console.error("middleware", err));
			break;
		case "MOVE_BRISTOL":
			axios()
				.post("/api/v1/bristols/move", {
					bristol_id: action.id,
					parent_id: action.parent_id,
					position: action.position,
				})
				.then(({ data }) => {
					next(action);
				})
				.catch(err => console.error("middleware", err));
			break;
		case "SET_BRISTOLS":
			axios()
				.get(`api/v1/users/${action.userId}/bristols`)
				.then(({ data }) => {
					action.bristols = createNestedMenu(data.data);
					next(action);
				})
				.catch(err => console.error(err));
			break;
		case "GET_CURRENT_BRISTOL_CONTENT":
			axios()
				.get(`/api/v1/bristols/${action.selectedBristol}`)
				.then(({ data }) => {
					action.data = data.data;
					next(action);
				})
				.catch(err => console.error(err));
			break;
		default:
			next(action);
			break;
	}
};

export default Middleware;
