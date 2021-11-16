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
		inEditing: {
			status: false,
			userId: null,
		},
	},
	//tree
	bristols: [],
	movedBristol: {
		id: null,
		parent_id: null,
		position: null,
	},
};

const deleteBristols = (arr, id) =>
	arr.reduce(
		(acc, bristol) =>
			bristol.id === id
				? // If bristol is the one we want to delete return the current array without the bristol and its children
				  acc
				: [
						// Else return the current arr concatenated with...
						...acc,
						bristol.children
							? // ...the children array checked for the bristol we want to delete if the bristol have children
							  { ...bristol, children: deleteBristols(bristol.children, id) }
							: // ...the bristol if it doesn't have children
							  bristol,
				  ],
		[]
	);

const updateTitle = (arr, id, newTitle) =>
	arr.map(bristol => {
		if (bristol.children)
			bristol.children = updateTitle(bristol.children, id, newTitle);
		return bristol.id === id ? { ...bristol, title: newTitle } : bristol;
	});

const updateEditingStatus = (arr, bristolId, userId = null, status = false) => {
	return arr.map(bristol => {
		if (bristol.children)
			bristol.children = updateEditingStatus(
				bristol.children,
				bristolId,
				status
			);
		return bristol.id === bristolId
			? { ...bristol, inEditing: { status, userId } }
			: bristol;
	});
};

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
				bristols: updateEditingStatus(state.bristols, state.selectedBristol.id),
			};
		case "ADD_NEW_BRISTOL":
			const newBristol = {
				id: action.id,
				title: action.title,
				parent_id: null,
				position: state.bristols.length,
				role: "editor",
				editors: [],
				viewers: [],
			};
			return {
				...state,
				bristols: [...state.bristols, newBristol],
				selectedBristol: newBristol,
				editorIsVisible: true,
				editorIsReadOnly: true,
			};
		case "SET_BRISTOLS":
			return {
				...state,
				bristols: action.bristols,
			};
		case "DELETE_BRISTOL":
			return {
				...state,
				bristols: deleteBristols(state.bristols, action.bristolId),
				editorIsVisible: true,
				editorIsReadOnly: true,
				selectedBristol: initialState.selectedBristol,
			};
		case "MOVE_BRISTOL":
			return {
				...state,
				bristols: action.items,
			};
		case "BRISTOL_RESET":
			return {
				...initialState,
			};
		// Socket.io actions
		case "SIO_SET_EDITING":
			return {
				...state,
				bristols: updateEditingStatus(
					state.bristols,
					action.data.bristolId,
					action.data.userId,
					true
				),
				selectedBristol:
					state.selectedBristol.id === action.data.bristolId
						? {
								...state.selectedBristol,
								inEditing: { status: true, userId: action.data.userId },
						  }
						: state.selectedBristol,
			};
		case "SIO_UNSET_EDITING":
			return {
				...state,
				bristols: updateEditingStatus(state.bristols, action.data.bristolId),
				selectedBristol:
					state.selectedBristol.id === action.data.bristolId
						? {
								...state.selectedBristol,
								inEditing: { status: false, userId: null },
						  }
						: state.selectedBristol,
			};
		default:
			return state;
	}
};

export default reducer;
