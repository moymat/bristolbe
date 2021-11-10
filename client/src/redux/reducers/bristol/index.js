const initialState = {
	//editor state
	editorIsVisible: false,
	editorIsReadOnly: true,
	//current Bristol
	selectedBristol: {
		id: null,
		title: "",
		content: "",
		parent_id: null,
		position: null,
		editors: [],
		viewers: [],
		role: "editor",
	},
	//tree
	bristols: [],
	movedBristol: {
		id: null,
		parent_id: null,
		position: null,
	},
};

const updateTitle = (arr, id, newTitle) =>
	arr.map(bristol => {
		if (bristol.children)
			bristol.children = updateTitle(bristol.children, id, newTitle);
		return bristol.id === id ? { ...bristol, title: newTitle } : bristol;
	});

const reducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case "CREATE_NEW_BRISTOL":
			return {
				...state,
				editorIsVisible: true,
				editorIsReadOnly: false,
				selectedBristol: initialState.selectedBristol,
			};
		case "GET_CURRENT_BRISTOL_CONTENT":
			return {
				...state,
				editorIsVisible: true,
				editorIsReadOnly: true,
				selectedBristol: action.data,
			};
		case "EDIT_CURRENT_BRISTOL":
			return {
				...state,
				editorIsVisible: true,
				editorIsReadOnly: false,
				//bristolCurrentUserIsEditor: "editor",
			};
		case "UPDATE_BRISTOL":
			return {
				...state,
				selectedBristol: {
					...state.selectedBristol,
					title: action.title,
					content: action.content,
				},
				bristols: updateTitle(state.bristols, action.title, action.content),
				editorIsVisible: true,
				editorIsReadOnly: true,
			};
		case "UPDATE_BRISTOL_ROLES":
			return {
				...state,
				selectedBristol: {
					...state.selectedBristol,
					viewers: action.viewers,
					editors: action.editors,
				},
				editorIsVisible: true,
				editorIsReadOnly: true,
			};
		case "CANCEL_UPDATE_EDITOR":
			return {
				...state,
				editorIsVisible: true,
				editorIsReadOnly: true,
			};
		case "ADD_NEW_BRISTOL":
			return {
				...state,
				bristols: [
					...state.bristols,
					{
						id: action.id,
						title: state.bristolTitle,
						parent_id: null,
						position: state.bristols.length,
						role: "editor",
						editors: [],
						readers: [],
					},
				],
				editorIsVisible: true,
				editorIsReadOnly: true,
			};
		case "SET_BRISTOLS":
			return {
				...state,
				bristols: action.bristols,
			};
		case "MOVE_BRISTOL":
			return {
				...state,
				bristols: action.items,
			};
		default:
			return state;
	}
};

export default reducer;
