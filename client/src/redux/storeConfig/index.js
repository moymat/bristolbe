/* eslint-disable arrow-body-style */
// on importe la fonction qui permet de créer un store
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import logOutMiddleware from '../middlewares/logOutMiddleware';

import reducer from '../reducers';

// on l'appelle en lui donnant un reducer (entonnoir)
const store = createStore(
  reducer,
  // permet d'avoir les devtools (c'est aussi un middleware en fait)
  composeWithDevTools(
    // on donne nos middlewares a nous avec applyMiddleware, séparés par des ,
    applyMiddleware(
      // nos middlewares
      logOutMiddleware,
    ),
  ),
);

// on exporte notre store
export default store;