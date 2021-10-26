require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./app/router");
const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;

const app = express();

if (ENV === "development") {
	const morgan = require("morgan");
	app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} on ${ENV} environement`);
});
