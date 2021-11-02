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
	itemsTempRead: [],
	itemsTempWrite: [],
	lastMovedItem: {
		id: null,
		parent_id: null,
		position: null,
	},
	lastMovedReadItem: {
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
		case "SET_READ_WRITE_ITEMS":
			return {
				...state,
				itemsTempWrite: action.items,
				lastMovedItem: {
					id: action.id,
					parent_id: action.parent_id,
					position: action.position,
				},
			};
		case "SET_READ_ONLY_ITEMS":
			return {
				...state,
				itemsTempRead: action.items,
				lastMovedReadItem: {
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

//onChange={() => dispatch({type: 'TOGGLE_DARK_MODE'})}
//checked={useSelector((state) => state.isDark)}
