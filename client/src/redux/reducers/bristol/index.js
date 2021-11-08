const initialState = {
	EditorIsVisible: true,
	EditorEditOption: true,

	inReading: {
		id: null,
		title: null,
		content: null,
	},
	bristols: [],
	movedBristol: {
		id: null,
		parent_id: null,
		position: null,
	},
};

const reducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case "TOGGLE_EDITOR_EDIT_MODE":
			return {
				...state,
				EditorEditOption: false,
				EditorIsVisible: true,
			};
		case "SAVE_EDITOR_BRISTOL":
			return {
				...state,
			};
		case "SHOW_BRISTOL_EDITOR":
			return {
				...state,
				EditorIsVisible: true,
			};
		case "HIDE_BRISTOL_EDITOR":
			return {
				...state,
				EditorIsVisible: false,
			};
		case "SET_BRISTOLS":
			return {
				...state,
				bristols: action.bristols,
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
