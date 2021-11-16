const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const auth = require("../auth");
const { v4: uuid } = require("uuid");
const pgClient = require("../db/pg");
const redisClient = require("../db/redis");
const { validateRegister, validateLogin } = require("../validation");
const {
	sendRegisterMail,
	sendResetPasswordMail,
} = require("../auth/nodemailer");

const createEmailValidator = async (id, email) => {
	// Generate code for validation
	const code = crypto.randomBytes(2).toString("hex").toUpperCase();

	return await Promise.all([
		// Create a entry in the cache for the code with the user id as key
		redisClient("email_code_").setAsync(id, code),
		// Send email for validation
		sendRegisterMail(email, code),
	]);
};

const resendCode = async id => {
	try {
		const { rows } = await pgClient.query(
			'SELECT email FROM "user" WHERE id = $1',
			[id]
		);

		if (!rows) throw Error("no user found");

		await createEmailValidator(id, rows[0].email, true);

		return { status: "code resent" };
	} catch (error) {
		return { error };
	}
};

const verifyCode = async (id, code) => {
	try {
		const cachedCode = await redisClient("email_code_").getAsync(id);

		if (!cachedCode) throw Error("no validation pending for this user");
		if (cachedCode !== code) throw Error("wrong code");

		return await Promise.all([
			// Delete code in cache
			redisClient("email_code_").delAsync(id),
			// Update user
			pgClient.query('UPDATE "user" SET verified = TRUE WHERE id = $1', [id]),
		]);
	} catch (error) {
		return { error };
	}
};

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

		// Clear sensible data
		delete data.confirm;
		delete data.password;
		// Insertion of the new user in the db
		const { rows } = await pgClient.query("SELECT * FROM create_user($1)", [
			JSON.stringify({ ...data, hash }),
		]);
		const { id } = rows[0];

		// If no user, there was an error
		if (!id) throw Error("failed registration");

		// Creation of the access token and refresh token
		const token = auth.signToken({ id });
		const refresh = auth.signToken({ id }, true);

		await Promise.all([
			// Create a validation process
			createEmailValidator(id, data.email),
			// Storing the refresh token in the cache with the browser id as its key
			redisClient().setAsync(browserId, refresh, "EX", process.env.REFRESH_EXP),
		]);

		return {
			data: {
				user: { id, ...data, verified: false },
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
		await redisClient().setAsync(
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

const postResetPassword = async email => {
	try {
		const { rows } = await pgClient.query("SELECT * FROM get_user_auth($1)", [
			JSON.stringify({ email }),
		]);

		if (!rows) throw Error("no user found");

		const code = uuid();

		await Promise.all([
			redisClient("reset_code_").setAsync(
				code,
				rows[0].id,
				"EX",
				process.env.RESET_PWD_CODE_EXP
			),
			sendResetPasswordMail(email, code),
		]);

		return { status: "reset password email sent" };
	} catch (error) {
		return { error };
	}
};

const checkResetCode = async code => {
	try {
		const cachedId = await redisClient("reset_code_").getAsync(code);
		console.log(cachedId);
		return { status: "code verified" };
	} catch (error) {
		return { error };
	}
};

const patchResetPassword = async body => {
	try {
		const { password, confirm, code } = body;

		const cachedId = await redisClient("reset_code_").getAsync(code);

		const hash = await bcrypt.hash(
			password,
			await bcrypt.genSalt(+process.env.PWD_SALT_ROUND)
		);

		return await Promise.all([
			pgClient.query("SELECT patch_user_password($1)", [
				JSON.stringify({ hash, id: cachedId }),
			]),
			redisClient("reset_code_").delAsync(code),
		]);
	} catch (error) {
		return { error };
	}
};

const logout = async browserId => {
	try {
		return await redisClient().delAsync(browserId);
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
		await redisClient().setAsync(
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
	verifyCode,
	resendCode,
	postResetPassword,
	checkResetCode,
	patchResetPassword,
};
