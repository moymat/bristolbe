const initialState = {
  //editor state
  editorIsVisible: false,
  editorIsReadOnly: true,
  //current Bristol
  bristolCurrentUserIsEditor: "reader",
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
        bristolCurrentUserIsEditor: "editor",
        bristolId: null,
        bristolContent: "",
        bristolTitle: "",
        bristolParentId: null,
        bristolEditorsList: [],
        bristolReadersList: [],
      };
    case "GET_CURRENT_BRISTOL_CONTENT":
      return {
        ...state,
      };
    case "READ_CURRENT_BRISTOL":
		console.log(state.bristols)
      return {
        ...state,
		editorIsVisible: true,
		editorIsReadOnly: true,
		bristolId : action.bristolId, 
		bristolTitle : action.bristolTitle,
		bristolContent : action.bristolContent, 
		bristolCurrentUserIsEditor : action.bristolCurrentUserIsEditor,
		bristolPositionId : action.bristolPositionId,
		bristolParentId : action.bristolParentId,
		bristolEditorsList : action.bristolEditorsList,
		bristolReadersList : action.bristolReadersList
      };
    case "EDIT_CURRENT_BRISTOL":
      return {
        ...state,
        editorIsVisible: true,
        editorIsReadOnly: false,
        bristolCurrentUserIsEditor: "editor",
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
        bristolCurrentUserIsEditor: "reader",
        bristolId: null,
        bristolContent: "",
        bristolTitle: "",
        bristolParentId: null,
        bristolPositionId: null,
        bristolEditorsList: [],
        bristolReadersList: [],
      };
    case "SAVE_UPDATE_EDITOR":
      return {
        ...state,
        editorIsVisible: true,
        editorIsReadOnly: true,
        bristolCurrentUserIsEditor: "editor",
      };
	  case "ADD_NEW_BRISTOL":
		
		return {
			...state,
			bristols: [
				...state.bristols,
				{
					id: action.id,
					title: action.title,
					content: action.content,
					parent_id: null, 
					position: action.position,
					role: "editor", 
					editors : action.editors,
					readers: action.readers,
				},
			],
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
		bristols: action.items,
/*         movedBristol: {
          id: action.id,
          parent_id: action.parent_id,
          position: action.position,
        }, */
      };
    default:
      return state;
  }
};

export default reducer;
