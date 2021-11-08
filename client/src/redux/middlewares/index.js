import axios from "../../utils/axios";
import { createNestedMenu } from "../../components/Bristol/BristolTree/helper";

const Middleware = store => next => action => {
	switch (action.type) {
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
				.get(`/api/v1/users/${action.userId}/bristols`)
				.then(({ data }) => {
					console.log(data);
					action.bristols = createNestedMenu(data.data);
					next(action);
				})
				.catch(err => console.error(err));
			break;
		case "CREATE_BRISTOL":
			axios()
				.post("api/v1/bristols", {
					title: action.newBristol.title,
					content: action.newBristol.content,
				})
				.then(({ data: axiosData }) => {
					console.log(axiosData);
					action.newBristol = {
						...action.newBristol,
						id: axiosData.data.id,
					};
				})
				.then(() => next(action))
				.catch(err => console.error(err));
			break;
		default:
			next(action);
			break;
	}
};

export default Middleware;
