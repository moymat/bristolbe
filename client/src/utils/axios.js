import axios from "axios";
import { v4 as uuid } from "uuid";

const getAxiosInstance = () => {
	const instance = axios.create({
		baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:4000",
		withCredentials: true,
		headers: {
			Accept: "application/json",
		},
	});

	const refresh = localStorage.getItem("refresh_token");

	if (refresh)
		instance.defaults.headers.common["Authorization"] = `Bearer ${refresh}`;

	let browserId = localStorage.getItem("browser_id");

	if (!browserId) {
		browserId = uuid();
		localStorage.setItem("browser_id", browserId);
	}

	instance.defaults.headers.common["Browser_id"] = browserId;

	instance.post["Content-Type"] = "application/json";

	return instance;
};

export default getAxiosInstance;
