const bcrypt = require("bcryptjs");
const auth = require("../auth");
const { validateRegister, validateLogin } = require("../validation");
const pgClient = require("../db/pg");
const redisClient = require("../db/redis")();

const register = async body => {
	try {
		// Validate the body with ajv
		const { errors } = await validateRegister(body);

		if (errors) return { validationErrors: errors };

		const { first_name, last_name, email, password } = body;

		// Hash of the password
		const hash = await bcrypt.hash(
			password,
			await bcrypt.genSalt(+process.env.PWD_SALT_ROUND)
		);

		const data = { first_name, last_name, email, hash };

		// Insertiion of the new user in the db
		const { rows } = await pgClient.query("SELECT * FROM create_user($1)", [
			JSON.stringify(data),
		]);

		// If no user, there was an error
		if (!rows.length) throw Error("failed registration");

		const { create_user: id } = rows[0];

		// Creation of the access token and refresh token
		const token = auth.signToken({ id });
		const refresh = auth.signToken({ id }, true);

		// Storage of the refresh token in the cache with the user id as its key
		await redisClient.setAsync(id, refresh, "EX", process.env.REFRESH_EXP);

		return {
			data: {
				user: { id, first_name, last_name, email, picture_url: null },
				token,
				refresh,
			},
		};
	} catch (error) {
		return { error };
	}
};

const login = async body => {
	try {
		// Validate the body with ajv
		const { errors } = await validateLogin(body);

		if (errors) return { validationErrors: errors };

		const { email, password } = body;

		// Check if a user with this email exists in the db and returning his and info and hash
		const { rows } = await pgClient.query(
			'SELECT "user".id, first_name, last_name, picture_url, hash FROM "user" JOIN password ON "user".id = user_id WHERE email=$1',
			[email]
		);

		// If no user, send error
		if (!rows.length) throw Error(`no user found with email ${email}`);

		const { id, first_name, last_name, picture_url, hash } = rows[0];

		// Comparison of the hash and the password
		const compare = await bcrypt.compare(password, hash);

		if (!compare) throw Error("wrong password");

		// Creation of the access token and refresh token
		const token = auth.signToken({ id });
		const refresh = auth.signToken({ id }, true);

		// Storage of the refresh token in the cache with the user id as its key
		await redisClient.setAsync(id, refresh, "EX", process.env.REFRESH_EXP);

		return {
			data: {
				user: { id, first_name, last_name, email, picture_url },
				token,
				refresh,
			},
		};
	} catch (error) {
		return { error };
	}
};

const logout = async refresh => {
	try {
		const { id } = auth.decodeToken(refresh);
		return await redisClient.delAsync(id);
	} catch (error) {
		return { error };
	}
};

const isAuth = async headerRefresh => {
	try {
		const { id: tokenId } = auth.decodeToken(headerRefresh);

		const { rows } = await pgClient.query(
			'SELECT "user".id, first_name, last_name, email, picture_url FROM "user" WHERE id=$1',
			[tokenId]
		);

		if (!rows.length) throw Error(`No user found`);

		const { id, first_name, email, last_name, picture_url } = rows[0];

		const token = auth.signToken({ id });
		const refresh = auth.signToken({ id }, true);

		await redisClient.setAsync(id, refresh, "EX", process.env.REFRESH_EXP);

		return {
			data: {
				user: { id, first_name, last_name, email, picture_url },
				token,
				refresh,
			},
		};
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
