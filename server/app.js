require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const router = require("./app/router");
const cookieParser = require("cookie-parser");
const errorHandler = require("./app/lib/errorHandler");
const app = express();
const server = http.createServer(app);

require("./app/socketio")(server);

const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;

if (ENV === "development") {
	const morgan = require("morgan");
	app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
	credentials: true,
	origin: process.env.CLIENT_URL,
};

app.use(cors(corsOptions));

app.use(router);
app.use(errorHandler);

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT} on ${ENV} environement`);
});
