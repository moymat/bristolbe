const bcrypt = require("bcryptjs");
const auth = require("../auth");
const { validateRegister, validateLogin } = require("../validation");
const pgClient = require("../db/pg");
const redisClient = require("../db/redis")();

const register = async body => {
	try {
		console.log(body);

		const { errors } = await validateRegister(body);

		if (errors) return { validationErrors: errors };

		const { first_name, last_name, email, password } = body;

		const hash = await bcrypt.hash(
			password,
			await bcrypt.genSalt(+process.env.PWD_SALT_ROUND)
		);

		const data = { first_name, last_name, email, hash };

		const { rows } = await pgClient.query("SELECT * FROM create_user($1)", [
			JSON.stringify(data),
		]);

		if (!rows.length) throw Error("failed registration");

		const { create_user: id } = rows[0];

		const token = auth.signToken({ id });
		const refresh = auth.signToken({ id }, true);

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
		const { errors } = await validateLogin(body);

		if (errors) return { validationErrors: errors };

		const { email, password } = body;

		const { rows } = await pgClient.query(
			'SELECT "user".id, first_name, last_name, picture_url, hash FROM "user" JOIN password ON "user".id = user_id WHERE email=$1',
			[email]
		);

		if (!rows.length) throw Error(`no user found with email ${email}`);

		const { id, first_name, last_name, picture_url, hash } = rows[0];

		const compare = await bcrypt.compare(password, hash);

		console.log(compare);

		if (!compare) throw Error("wrong password");

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
