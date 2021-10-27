const auth = require("../auth");
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

	const token = auth.signToken({ id });
	const refresh = auth.signToken({ id }, true);

	await redisClient.setAsync(id, refresh, "EX", process.env.REFRESH_EXP);

	return { token, refresh };
};

const login = async body => {
	const { email, password } = body;

	const user = users.find(user => user.email === email);

	if (!user) return { error: "no user with this email address" };

	if (user.password !== password) return { error: "wrong password" };

	const token = auth.signToken({ id: user.id });
	const refresh = auth.signToken({ id: user.id }, true);

	await redisClient.setAsync(user.id, refresh, "EX", process.env.REFRESH_EXP);

	return { token, refresh };
};

const logout = async ({ access_token }) => {
	try {
		const { id } = auth.decodeToken(access_token);
		return await redisClient.delAsync(id);
	} catch (error) {
		return { error };
	}
};

module.exports = {
	register,
	login,
	logout,
};
