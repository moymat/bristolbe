require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./app/router");
const cookieParser = require("cookie-parser");
const errorHandler = require("./app/lib/errorHandler");
const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;

const app = express();

if (ENV === "development") {
	const morgan = require("morgan");
	app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
);

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} on ${ENV} environement`);
});
