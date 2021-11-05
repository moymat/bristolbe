const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const auth = require("../auth");
const { v4: uuid } = require("uuid");
const { validateRegister, validateLogin } = require("../validation");
const pgClient = require("../db/pg");
const {
	sendRegisterMail,
	sendResetPasswordMail,
} = require("../auth/nodemailer");
const redisClient = require("../db/redis");

const createEmailValidator = async (id, email, resend = false) => {
	// Generate code for validation
	const code = crypto.randomBytes(2).toString("hex").toUpperCase();

	resend
		? // If resend, update current code
		  await pgClient.query(
				"UPDATE bristol.account_validation SET code = $1 WHERE user_id = $2",
				[code, id]
		  )
		: // If not, create a row for the user for email validation
		  await pgClient.query(
				"INSERT INTO bristol.account_validation (code, user_id) VALUES ($1, $2)",
				[code, id]
		  );

	// Send email for validation
	return await sendRegisterMail(email, code);
};

const resendCode = async id => {
	try {
		const { rows } = await pgClient.query(
			'SELECT email FROM bristol."user" WHERE id = $1',
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
		const { rows } = await pgClient.query(
			"SELECT * FROM bristol.account_validation WHERE user_id = $1",
			[id]
		);

		if (!rows) throw Error("no validation for this user");

		if (rows[0].code !== code) throw Error("wrong code");

		await pgClient.query(
			"DELETE FROM bristol.account_validation WHERE user_id = $1",
			[id]
		);
		return await pgClient.query(
			'UPDATE bristol."user" SET verified = TRUE WHERE id = $1',
			[id]
		);
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

		// Insertion of the new user in the db
		delete data.confirm;
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

		// Create a validation process
		await createEmailValidator(id, data.email);

		// Storage of the refresh token in the cache with the browser id as its key
		await redisClient().setAsync(
			browserId,
			refresh,
			"EX",
			process.env.REFRESH_EXP
		);

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

		await redisClient("reset_code_").setAsync(
			code,
			rows[0].id,
			"EX",
			process.env.RESET_PWD_CODE_EXP
		);

		await sendResetPasswordMail(email, code);

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

		await pgClient.query("SELECT bristol.patch_user_password($1)", [
			JSON.stringify({ hash, id: cachedId }),
		]);

		return await redisClient("reset_code_").delAsync(code);
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
