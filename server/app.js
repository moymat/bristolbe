require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./app/router");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./app/lib/errorMiddleware");
const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;

const app = express();

if (ENV === "development") {
	const morgan = require("morgan");
	app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(router);
app.use(errorMiddleware);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} on ${ENV} environement`);
});
