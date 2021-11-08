import axios from "../../utils/axios";
import { createNestedMenu } from "../../components/Bristol/BristolTree/helper";
import { v4 as uuidv4 } from "uuid";

const Middleware = store => next => action => {
	switch (action.type) {
		case "SAVE_UPDATE_EDITOR":
			const state = store.getState();
			if (!state.bristol.bristolId) {
				state.bristol.bristolId = uuidv4();
				axios()
					.post("http://localhost:8000/bristols", {
						id: state.bristol.bristolId,
						content: state.bristol.bristolContent,
						title: state.bristol.bristolTitle,
						parent_id: state.bristol.bristolParentId,
						position: state.bristol.bristolPositionId,
						editors: state.bristol.bristolEditorsList,
						readers: state.bristol.bristolReadersList,
					})
					.then(({ data }) => {
						console.log(data);
						next(action);
					})
					.catch(err => console.error("middleware", err));
			} else {
				axios()
					.put(`http://localhost:8000/bristols/${state.bristol.bristolId}`, {
						content: state.bristol.bristolContent,
						title: state.bristol.bristolTitle,
						parent_id: state.bristol.bristolParentId,
						position: state.bristol.bristolPositionId,
						editors: state.bristol.bristolEditorsList,
						readers: state.bristol.bristolReadersList,
					})
					.then(({ data }) => {
						console.log(data);
						next(action);
					})
					.catch(err => console.error("middleware", err));
			}
			break;
		case "MOVE_BRISTOL":
			axios()
				.post("/api/v1/bristols/move", {
					bristol_id: action.id,
					parent_id: action.parent_id,
					position: action.position,
				})
				.then(({ data }) => {
					console.log(data);
					next(action);
				})
				.catch(err => console.error("middleware", err));
			break;
		case "SET_BRISTOLS":
			axios()
				.get(`/api/v1/users/${action.userId}/bristols`)
				.then(({ data }) => {
					console.log(data.data);
					action.bristols = createNestedMenu(data.data);
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
