import axios from "axios";

export default (() => {
	const refresh = localStorage.getItem("refresh_token");

	return axios.create({
		baseURL: "http://localhost:4000/", // il faudra à terme récupérer l'url du serveur depuis les variables d'environnement, genre process.env.SERVER_URL
		withCredentials: true,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${refresh}`,
		},
	});
})();
