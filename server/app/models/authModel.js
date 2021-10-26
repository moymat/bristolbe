const jwt = require("../auth");
const redisClient = require("../db/redis")();

let users = [];

const register = async body => {
	const { first_name, last_name, email, password, confirm } = body;

	if (password !== confirm)
		return { error: "password and confirm don't match" };

	if (users.some(user => user.email === email))
		return { error: "email address already in use" };

	const id = users.length;
	users.push({ id, first_name, last_name, email, password });

	const token = jwt.sign({ id });
	const refresh = jwt.sign({ id }, true);

	await redisClient.setAsync(id, refresh, "EX", process.env.REFRESH_EXP);

	return { token, refresh };
};

const login = async body => {
	const { email, password } = body;

	const user = users.find(user => user.email === email);

	if (!user) return { error: "no user with this email address" };

	if (user.password !== password) return { error: "wrong password" };

	const token = jwt.sign({ id: user.id });
	const refresh = jwt.sign({ id: user.id }, true);

	await redisClient.setAsync(user.id, refresh, "EX", process.env.REFRESH_EXP);

	return { token, refresh };
};

module.exports = {
	login,
	register,
};
