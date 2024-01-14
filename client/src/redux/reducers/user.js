import io from "socket.io-client";

const initialState = {
  user: {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    socket: null,
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "LOGIN":
      action.refresh && localStorage.setItem("refresh_token", action.refresh);
      return {
        ...state,
        user: {
          ...action.user,
          socket: io(process.env.REACT_APP_SERVER_URL, {
            query: `id=${action.user.id}`,
          }),
        },
      };
    case "UPDATE_USER_INFO":
      return {
        ...state,
        user: {
          ...state.user,
          first_name: action.firstName,
          last_name: action.lastName,
        },
      };
    case "UPDATE_USER_EMAIL":
      return {
        ...state,
        user: {
          ...state.user,
          email: action.newEmail,
        },
      };
    case "LOGOUT":
      localStorage.removeItem("refresh_token");
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
