/* eslint-disable arrow-body-style */
// on importe la fonction qui permet de créer un store
import { createStore } from 'redux';

import reducer from '../reducers';

// on l'appelle en lui donnant un reducer (entonnoir)
const store = createStore(
  reducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// on exporte notre store
export default store;