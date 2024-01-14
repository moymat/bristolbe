import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { AUTH_ROUTES, NOT_AUTH_ROUTES } from "../utils/authRoutes";

const IsAuth = ({ children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!user.id && AUTH_ROUTES.includes(location.pathname)) history.push("/");
    else if (user.id) {
      if (
        NOT_AUTH_ROUTES.includes(location.pathname) ||
        /^\/reset.*$/.test(location.pathname)
      ) {
        history.push("/home");
      } else if (!user.verified && location.pathname !== "/validate")
        history.push("/validate");
    }
    setIsChecked(true);
  }, [isChecked, location, history, user]);

  return isChecked && children;
};

export default IsAuth;
