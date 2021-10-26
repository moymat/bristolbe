const redis = require("redis");
const { promisify } = require("util");

const redisClient = (prefix = "refresh_token_") => {
	const client = redis.createClient({ prefix });

	const getAsync = promisify(client.get).bind(client);
	const setAsync = promisify(client.set).bind(client);

	return { getAsync, setAsync };
};

module.exports = redisClient;
