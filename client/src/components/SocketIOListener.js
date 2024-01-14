import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const SocketIOListener = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const selectedBristol = useSelector((state) => state.bristol.selectedBristol);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.socket) {
      user.socket.on("in_editing", (data) => {
        dispatch({ type: "SIO_SET_EDITING", data });
      });

      user.socket.on("stop_editing", (data) => {
        dispatch({ type: "SIO_UNSET_EDITING", data });
        selectedBristol.id === data.bristolId &&
          data.didContentChanged &&
          dispatch({
            type: "GET_CURRENT_BRISTOL_CONTENT",
            selectedBristol: data.bristolId,
          });
      });

      user.socket.on("moved", () => {
        dispatch({ type: "SET_BRISTOLS" });
      });

      user.socket.on("roles_managed", () => {
        dispatch({ type: "SET_BRISTOLS" });
        dispatch({
          type: "GET_CURRENT_BRISTOL_CONTENT",
          selectedBristol: selectedBristol.id,
        });
      });

      user.socket.on("deleted", (data) => {
        dispatch({ type: "SIO_DELETED", data });
      });
      return () => user.socket.removeAllListeners();
    }
  }, [user, selectedBristol, dispatch]);

  return <>{children}</>;
};

export default SocketIOListener;
