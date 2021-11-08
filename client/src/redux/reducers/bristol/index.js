const initialState = {
	isEditMode: false,
	bristols: [],
	movedBristol: {
		id: null,
		parent_id: null,
		position: null,
	},
	selectedBristol: null,
};

const reducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case "TOGGLE_EDIT_MODE":
			return {
				...state,
				isEditMode: !state.isEditMode,
			};
		case "SET_BRISTOLS":
			return {
				...state,
				bristols: action.bristols,
				selectedBristol: action.bristols[0] || null,
			};
		case "CHANGE_SELECTED_BRISTOL":
			return {
				...state,
				selectedBristol: action.selectedBristol,
			};
		case "CREATE_NEW_BRISTOL":
			return {
				...state,
				selectedBristol: {
					id: null,
					title: "",
					content: "",
					editors_id: [],
					viewers_id: [],
					role: null,
				},
				isEditMode: !state.isEditMode,
			};
		case "CREATE_BRISTOL":
			return {
				...state,
				bristols: [
					...state.bristols,
					{
						...action.newBristol,
						position: state.bristols.length,
						created_at: new Date(),
						parent_id: null,
						role: "editor",
					},
				],
			};
		case "MOVE_BRISTOL":
			return {
				...state,
				movedBristol: {
					id: action.id,
					parent_id: action.parent_id,
					position: action.position,
				},
			};
		default:
			return state;
	}
};

export default reducer;
