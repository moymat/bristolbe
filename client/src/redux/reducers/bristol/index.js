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
  flatMenu: [],
  lastMovedItem: {
    id: null,
    parent: null,
    orderNo: null,
  }
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
          id: action.movedItemId,
          parent: action.movedParentId,
          orderNo: action.movedOrderNo,
        }
      };
    case "SET_READ_ONLY_ITEMS":
      return {
        ...state,
        itemsTempRead: action.items,
      };
    case "GENERATE_FLAT_MENU":
      return {
        ...state,
        flatMenu: action.flatMenu,
      };
    default:
      return state;
  }
};

export default reducer;

//onChange={() => dispatch({type: 'TOGGLE_DARK_MODE'})}
//checked={useSelector((state) => state.isDark)}
