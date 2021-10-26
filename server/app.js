require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;

const app = express();

if (process.env.NODE_ENV === "development") {
	const morgan = require("morgan");
	app.use(morgan("dev"));
}

app.listen(PORT, () => {
	console.log(`server runing on port ${PORT}`);
});
