import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:4000/", // il faudra à terme récupérer l'url du serveur depuis les variables d'environnement, genre process.env.SERVER_URL
	withCredentials: true,
	headers: { "Content-Type": "application/json", Accept: "application/json" },
});

export default instance;
