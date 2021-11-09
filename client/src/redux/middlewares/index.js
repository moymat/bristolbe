import axios from "../../utils/axios";
import { createNestedMenu } from "../../components/Bristol/BristolTree/helper";
import { v4 as uuidv4 } from "uuid";
import { FlatMenu } from "../selectors/britols";

const Middleware = (store) => (next) => (action) => {
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
            parent_id: null,
            position: state.bristol.bristols.length,
            role: "editor",
            editors: state.bristol.bristolEditorsList,
            readers: state.bristol.bristolReadersList,
          })
          .then(({ data }) => {
            store.dispatch({ type: "ADD_NEW_BRISTOL" });
            next(action);
          })
          .catch((err) => console.error("middleware", err));
      } else {
        axios()
          .put(`http://localhost:8000/bristols/${state.bristol.bristolId}`, {
            content: state.bristol.bristolContent,
            title: state.bristol.bristolTitle,
            parent_id: state.bristol.bristolParentId,
            position: state.bristol.bristolPositionId,
            role: "editor",
            editors: state.bristol.bristolEditorsList,
            readers: state.bristol.bristolReadersList,
          })
          .then(({ data }) => {
            next(action);
          })
          .catch((err) => console.error("middleware", err));
      }
      break;
    case "MOVE_BRISTOL":
      /* 			axios()
				.post("/api/v1/bristols/move", {
					bristol_id: action.id,
					parent_id: action.parent_id,
					position: action.position,
				})
				.then(({ data }) => {
					next(action);
				})
				.catch(err => console.error("middleware", err)); */
				next(action);
      break;
    case "SET_BRISTOLS":
      axios()
        .get("http://localhost:8000/bristols")
        .then(({ data }) => {
          action.bristols = createNestedMenu(data);
          next(action);
        })
        .catch((err) => console.error(err));
      break;
    case "GET_CURRENT_BRISTOL_CONTENT":
      axios()
        .get(`http://localhost:8000/bristols/${action.selectedBristol}`)
        .then(({ data }) => {
          store.dispatch({
            type: "READ_CURRENT_BRISTOL",
            bristolId: action.selectedBristol,
            bristolTitle: data.title,
            bristolContent: data.content,
            bristolCurrentUserIsEditor: data.role,
            bristolParentId: data.parent_id,
            bristolPositionId: data.position,
            bristolEditorsList: data.editors,
            bristolReadersList: data.readers,
          });
          next(action);
        })
        .catch((err) => console.error(err));
      break;
    default:
      next(action);
      break;
  }
};

export default Middleware;
