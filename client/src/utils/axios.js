import axios from "axios";
import { v4 as uuid } from "uuid";

const getAxiosInstance = () => {
	// Basic config for the instance
	const instance = axios.create({
		// Server URL
		baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:4000",
		// Send cookies
		withCredentials: true,
		headers: {
			Accept: "application/json",
		},
	});

	// Get the refresh token from the local storage
	const refresh = localStorage.getItem("refresh_token");

	if (refresh)
		// If there is one, add it to the request headers
		instance.defaults.headers.common["Authorization"] = `Bearer ${refresh}`;

	// Get browser id from the local storage
	let browserId = localStorage.getItem("browser_id");

	if (!browserId) {
		// If no browser id stored, create one and store it in the local storage
		browserId = uuid();
		localStorage.setItem("browser_id", browserId);
	}

	// Add the browser id to the request header
	instance.defaults.headers.common["Browser_id"] = browserId;

	// If request is POST, make the Content-Type to be JSON
	instance.post["Content-Type"] = "application/json";

	return instance;
};

export default getAxiosInstance;
