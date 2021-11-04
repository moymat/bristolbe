const initialState = {
	editionMode: false,
	inModification: {
		id: null,
		title: null,
		content: null,
	},
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
		case "SHOW_BRISTOL_EDITOR":
			return {
				...state,
				editionMode: true,
			};
		case "HIDE_BRISTOL_EDITOR":
			return {
				...state,
				editionMode: false,
				inModification: {
					id: null,
					title: null,
					content: null,
				},
			};
		case "SHOW_BRISTOL_READER":
			return {
				...state,
				editionMode: false,
				inReading: {
					id: action.id,
					title: null,
					content: null,
				},
			};
		case "SET_BRISTOLS":
			return {
				...state,
				bristols: action.bristols,
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
