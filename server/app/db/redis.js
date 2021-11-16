require("dotenv").config();
const redis = require("redis");
const { promisify } = require("util");

const redisClient = (prefix = "refresh_token_") => {
	const options = { prefix };
	process.env.NODE_ENV === "production" &&
		(options.url = process.env.REDIS_URL);

	const client = redis.createClient({ ...options, connect_timeout: 15000 });

	const getAsync = promisify(client.get).bind(client);
	const setAsync = promisify(client.set).bind(client);
	const delAsync = promisify(client.del).bind(client);
	const keysAsync = promisify(client.keys).bind(client);

	return { getAsync, setAsync, delAsync, keysAsync, client };
};

module.exports = redisClient;
