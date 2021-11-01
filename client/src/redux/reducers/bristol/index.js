const initialState = {
  editionMode: true,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SHOW_BRISTOL_EDITOR":
      return {
        ...state,
        editionMode: true,
      };
    case "HIDE_BRISTOL_EDITOR":
      return {
        ...state,
        editionMode: false,
      };
    default:
      return state;
  }
};

export default reducer;

//onChange={() => dispatch({type: 'TOGGLE_DARK_MODE'})}
//checked={useSelector((state) => state.isDark)}
