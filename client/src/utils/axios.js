import axios from "axios";

const refresh = localStorage.getItem("refresh_token");

const instance = axios.create({
	baseURL: "http://localhost:4000/", // Il faudra à terme récupérer l'url du serveur depuis les variables d'environnement (ex: process.env.SERVER_URL)
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		Authorization: `Bearer ${refresh}`,
	},
});

export default instance;
