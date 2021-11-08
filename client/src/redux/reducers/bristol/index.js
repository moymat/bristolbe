const initialState = {
	//editor state
	editorIsVisible: false,
	editorIsReadOnly: true,
	//current Bristol
	bristolCurrentUserIsEditor: false,
	bristolId: null,
	bristolContent: "",
	bristolTitle: "",
	bristolParentId: null,
	bristolPositionId: null,
	bristolEditorsList: [],
	bristolReadersList: [],
	//utility
	usersSearchList: [],
	//tree
	bristols: [],
	movedBristol: {
		id: null,
		parent_id: null,
		position: null,
	},
};

const reducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case "CREATE_NEW_BRISTOL":
			return {
				...state,
				editorIsVisible: true,
				editorIsReadOnly: false,
				bristolCurrentUserIsEditor: true,
				bristolId: null,
				bristolContent: "",
				bristolTitle: "",
				bristolParentId: null,
				bristolPositionId: null,
				bristolEditorsList: [],
				bristolReadersList: [],
			};
		case "EDIT_CURRENT_BRISTOL":
			return {
				...state,
				editorIsVisible: true,
				editorIsReadOnly: false,
				bristolCurrentUserIsEditor: true,
			};
		case "UPDATE_BRISTOL_TITLE":
			return {
				...state,
				bristolTitle: action.bristolTitle,
			};
		case "UPDATE_BRISTOL_CONTENT":
			return {
				...state,
				bristolContent: action.bristolContent,
			};
		case "UPDATE_BRISTOL_EDITORS":
			return {
				...state,
				bristolEditorsList: action.bristolEditorsList,
			};
		case "UPDATE_BRISTOL_READERS":
			return {
				...state,
				bristolReadersList: action.bristolReadersList,
			};
		case "CANCEL_UPDATE_EDITOR":
			return {
				...state,
				editorIsVisible: false,
				editorIsReadOnly: true,
				bristolCurrentUserIsEditor: false,
				bristolId: null,
				bristolContent: "",
				bristolTitle: "",
				bristolParentId: null,
				bristolPositionId: null,
				bristolEditorsList: [],
				bristolReadersList: [],
			};
		case "SAVE_UPDATE_EDITOR":
			console.log(state.bristolContent);
			return {
				...state,
				editorIsVisible: true,
				editorIsReadOnly: true,
				bristolCurrentUserIsEditor: true,
			};

		//
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
