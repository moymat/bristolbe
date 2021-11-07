const initialState = {
	EditorIsVisible: true,
	EditorIsReadOnly: true,
	EditorEditOption: true,
	EditorContent: "<h1>Principe des hook</h1><p>lorem ipsum</p>",
	EditorTitle: "React et les hooks",
	EditorBristolId: null,
	EditorBristolParentId: null,
	EditorBristolEditorsList: ["Marcel Patulacci", "Agnes Walker", "Trevor Henderson"],
	EditorBristolReadersList: ["Robert Robichet", "Cindy Baker", "Travis Howard", "Remy Sharp", "Marcel Patulacci", "Agnes Walker", "Trevor Henderson", "Searlas Carignan", "Didier Lemieux", "Annot Leroy", "Marguerite Savard", "Leone Guay", "Javier St-Pierre", "Avent Morel", "Fayme Bélanger"],
	EditorManageAccessDialog: true,
	EditorUserSearch: [],

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
				EditorIsReadOnly: false,
				EditorIsVisible: true,
				EditorContent: "",
				EditorTitle: "",
				EditorBristolEditorsList: [],
				EditorBristolReadersList: [],
			};
		case "HIDE_BRISTOL_EDITOR":
			return {
				...state,
				EditorIsReadOnly: true,
				EditorContent: null,
				EditorTitle: "",
				EditorIsVisible: false,
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
