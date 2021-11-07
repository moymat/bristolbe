require("dotenv").config();
const redis = require("redis");
const { promisify } = require("util");

const redisClient = (prefix = "refresh_token_") => {
	const client = redis.createClient({ host: process.env.REDIS_HOST, prefix });

	const getAsync = promisify(client.get).bind(client);
	const setAsync = promisify(client.set).bind(client);
	const delAsync = promisify(client.del).bind(client);

	return { getAsync, setAsync, delAsync };
};

module.exports = redisClient;
