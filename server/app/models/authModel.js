const bcrypt = require("bcryptjs");
const auth = require("../auth");
const { validateRegister, validateLogin } = require("../validation");
const pgClient = require("../db/pg");
const redisClient = require("../db/redis")();

const register = async (body, browserId) => {
	try {
		// Validate the body with ajv
		const { errors, data } = await validateRegister(body);

		if (errors) return { validationErrors: errors };

		// Hash of the password
		const hash = await bcrypt.hash(
			data.password,
			await bcrypt.genSalt(+process.env.PWD_SALT_ROUND)
		);

		// Insertion of the new user in the db
		delete data.password;
		const { rows } = await pgClient.query("SELECT * FROM create_user($1)", [
			JSON.stringify({ ...data, hash }),
		]);
		const { id } = rows[0];

		// If no user, there was an error
		if (!id) throw Error("failed registration");

		// Creation of the access token and refresh token
		const token = auth.signToken({ id });
		const refresh = auth.signToken({ id }, true);

		// Storage of the refresh token in the cache with the browser id as its key
		await redisClient.setAsync(
			browserId,
			refresh,
			"EX",
			process.env.REFRESH_EXP
		);

		return {
			data: {
				user: { id, ...data },
				token,
				refresh,
			},
		};
	} catch (error) {
		return { error };
	}
};

const login = async (body, browserId) => {
	try {
		// Validate the body with ajv
		const { errors, data } = await validateLogin(body);
		if (errors) return { validationErrors: errors };

		// Check if a user with this email exists in the db and returning his and info and hash
		const { rows } = await pgClient.query("SELECT * FROM get_user_auth($1)", [
			JSON.stringify({ email: data.email }),
		]);

		const user = rows[0];
		// If no user, send error
		if (!user) throw Error(`no user found with email ${data.email}`);

		// Comparison of the hash and the password
		const compare = await bcrypt.compare(data.password, user.hash);
		if (!compare) throw Error("wrong password");

		// Creation of the access token and refresh token
		const token = auth.signToken({ id: user.id });
		const refresh = auth.signToken({ id: user.id }, true);

		// Storage of the refresh token in the cache with the browser id as its key
		await redisClient.setAsync(
			browserId,
			refresh,
			"EX",
			process.env.REFRESH_EXP
		);

		delete user.hash;
		return {
			data: {
				user,
				token,
				refresh,
			},
		};
	} catch (error) {
		return { error };
	}
};

const logout = async browserId => {
	try {
		return await redisClient.delAsync(browserId);
	} catch (error) {
		return { error };
	}
};

const isAuth = async (headerRefresh, browserId) => {
	try {
		const { id: tokenId } = auth.decodeToken(headerRefresh);

		// Query of the user with his id in the db
		const { rows } = await pgClient.query("SELECT * FROM get_user_auth($1)", [
			JSON.stringify({ id: tokenId }),
		]);
		const user = rows[0];
		// If no user found, throw error
		if (!user) throw Error(`no user found`);

		// Creation of the access token and refresh token
		const token = auth.signToken({ id: user.id });
		const refresh = auth.signToken({ id: user.id }, true);

		// Storage of the refresh token in the cache with the browser id as its key
		await redisClient.setAsync(
			browserId,
			refresh,
			"EX",
			process.env.REFRESH_EXP
		);

		delete user.hash;
		return { data: { user, token, refresh } };
	} catch (error) {
		return { error };
	}
};

module.exports = {
	register,
	login,
	logout,
	isAuth,
};
