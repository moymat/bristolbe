// src/reducers/theme
const initialState = {
  isDark: false,
  isDrawerOpen: false,
};

const reducer = (state = initialState, action = {}) => {
  console.log("je tombe dans le reducer. action vaut : ", action);
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        isDark: !state.isDark,
      };
    case "TOGGLE_DRAWER":
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      };
    default:
      return state;
  }
};

export default reducer;
