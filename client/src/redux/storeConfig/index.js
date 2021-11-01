/* eslint-disable arrow-body-style */
// on importe la fonction qui permet de créer un store
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import middleware from "../middlewares";

import rootReducer from "../reducers";

// on l'appelle en lui donnant un reducer (entonnoir)
const store = createStore(
	rootReducer,
	// permet d'avoir les devtools (c'est aussi un middleware en fait)
	composeWithDevTools(
		// on donne nos middlewares a nous avec applyMiddleware, séparés par des ,
		applyMiddleware(
			// nos middlewares
			middleware
		)
	)
);

// on exporte notre store
export default store;
