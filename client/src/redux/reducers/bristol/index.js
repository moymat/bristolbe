const initialState = {
	EditorIsVisible: true,
	EditorIsReadOnly: true,
	EditorContent: "<h1>Principe des hook</h1><p>lorem ipsum</p>",
	EditorTitle: "React et les hooks",
	EditorBristolId: null,
	EditorBristolEditOption: true,

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
		case "CHANGE_EDITOR_CONTENT":
			return {
				...state,
				EditorContent: action.editorContent,
			};
		case "CHANGE_EDITOR_TITLE":
			return {
				...state,
				EditorTitle: action.editorTitle,
			};
		case "TOGGLE_EDITOR_EDIT_MODE":
			return {
				...state,
				EditorIsReadOnly: false,
				EditorBristolEditOption: false,
				EditorIsVisible: true,
			};
		case "SAVE_EDITOR_BRISTOL":
			return {
				...state,
			};
		case "SHOW_BRISTOL_EDITOR":
			return {
				...state,
				EditorIsReadOnly: false,
				EditorIsVisible: true,
				EditorContent: "",
				EditorTitle: "",
			};
		case "HIDE_BRISTOL_EDITOR":
			return {
				...state,
				EditorIsReadOnly: true,
				EditorContent: null,
				EditorTitle: "",
				EditorIsVisible: false,
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
