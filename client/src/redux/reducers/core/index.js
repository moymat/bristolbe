const initialState = {
	isDark: false,
	isDrawerOpen: false,
	isMobileDrawerOpen: false,
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
				isMobileDrawerOpen: false,
			};
			case "TOGGLE_MOBILE_DRAWER":
				return {
					...state,
					isMobileDrawerOpen: !state.isMobileDrawerOpen,
					isDrawerOpen: false,
				};
		case "LOGOUT":
			return {
				...state,
				isDark: false,
				isDrawerOpen: false,
				isMobileDrawerOpen: false,
			};
		default:
			return state;
	}
};

export default reducer;

//onChange={() => dispatch({type: 'TOGGLE_DARK_MODE'})}
//checked={useSelector((state) => state.isDark)}
