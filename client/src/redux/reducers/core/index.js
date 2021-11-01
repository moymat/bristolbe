const initialState = {
	isDark: false,
	isDrawerOpen: false,
};

const reducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case "TOGGLE_DARK_MODE":
			return {
				...state,
				isDark: !state.isDark,
			};
		case "TOGGLE_DRAWER":
			return {
				...state,
				isDrawerOpen: action.setOpen,
			};
		case "LOGOUT":
			return {
				...state,
				isDark: false,
				isDrawerOpen: false,
			};
		default:
			return state;
	}
};

export default reducer;

//onChange={() => dispatch({type: 'TOGGLE_DARK_MODE'})}
//checked={useSelector((state) => state.isDark)}
