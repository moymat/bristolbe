import axios from "axios";

const refresh = localStorage.getItem("refresh_token");

const instance = axios.create({
	baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:4000",
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Origin' : '*',
		"Content-Type": "application/json",
		Accept: "application/json",
		Authorization: `Bearer ${refresh}`,
	},
});

export default instance;
