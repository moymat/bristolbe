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

const updateTitle = (arr, id, newTitle) => {
  return arr.map(bristol => {
    if (bristol.children) {bristol.children = updateTitle(bristol.children, id, newTitle)}
    return bristol.id === id ? {...bristol, title: newTitle} : bristol
  })
}

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
        editorIsVisible: true,
        editorIsReadOnly: true,
        bristolId: action.data.id,
        bristolTitle: action.data.title,
        bristolContent: action.data.content,
        bristolCurrentUserIsEditor: action.data.role,
        bristolPositionId: action.data.position,
        bristolParentId: action.data.parent_id,
        bristolEditorsList: [],
        bristolReadersList: [],
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
      console.log(state.bristols)
      return {
        ...state,
        bristols: updateTitle(state.bristols, state.bristolId, state.bristolTitle),
        editorIsVisible: true,
        editorIsReadOnly: true,
        bristolCurrentUserIsEditor: "editor",
      };
    case "ADD_NEW_BRISTOL":
      console.log(state.bristols)
      return {
        ...state,
        bristols: state.bristols.push({
          id: action.id,
          title: state.bristolTitle,
          parent_id: null,
          position: state.bristols.length,
          role: "editor",
          editors: [],
          readers: [],
        })
      };
    case "SET_BRISTOLS":
      return {
        ...state,
        bristols: action.bristols,
      };
    case "MOVE_BRISTOL":
      console.log(action.items)
      return {
        ...state,
        bristols: action.items,
      };
    default:
      return state;
  }
};

export default reducer;
