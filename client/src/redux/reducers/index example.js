import {
    CHANGE_DIRECTION,
    CHANGE_COLOR,
  } from './actions';
  
  // la valeur de départ de notre état
  // précisons que le state de redux sera toujours un objet
  const initialState = {
    firstColor: '#e367a4',
    lastColor: '#48b1f3',
    direction: '90deg',
    nbColors: 0,
  };
  
  // le reducer = un entonnoir qui prend état a l'instant T
  // et une action (intention)
  // le reducer fera sa tambouille et renverra le nouvel état
  // note : a la création du store, le reducer est appelé sans paramètre
  // ce qui aura pour effet d'utiliser la valeur par défaut : initialState
  const reducer = (state = initialState, action = {}) => {
    console.log('je tombe dans le reducer. action vaut : ', action);
    switch (action.type) {
      case CHANGE_COLOR:
        return { // on renvoie un nouvel état
          // on recopie déja l'ancien état
          ...state,
          // ha !
          // une clé dynamique !
          // ici, on va prendre la valeur de action.colorKey (c'est a dire firstColor, ou lastColor)
          // et cela deviendra une clé de l'objet renvoyé
          // (le nouveau state)
          [action.colorKey]: action.newColor,
          // le nombre de couleurs
          nbColors: state.nbColors + 1,
        };
      case CHANGE_DIRECTION:
        return {
          ...state,
          direction: action.angle,
        };
      // default = aucun des CASE n'a été trouvé
      default:
        // si je connais pas l'action (= je suis rentré dans aucun cas)
        // on touche a rien, on renvoie le state comme il est
        return state;
    }
  };
  
  export default reducer;