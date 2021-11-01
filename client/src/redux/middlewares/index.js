//import axios from "axios";

const Middleware = store => next => action => {
	//console.log(action)

	// pour que l'action arrive au reducer, je dois utiliser next :
	next(action);
};

export default Middleware;

/* const logout = async () => {
    await axios.get("/auth/logout");
    localStorage.removeItem("refresh_token");
    setUser({});
}; */
