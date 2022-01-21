require("dotenv").config();
const redis = require("redis");
const { promisify } = require("util");

const client =
	process.env.NODE_ENV === "production"
		? redis.createClient({ url: process.env.REDIS_URL })
		: redis.createClient();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);
const keysAsync = promisify(client.keys).bind(client);

module.exports = { getAsync, setAsync, delAsync, keysAsync };
