const bcrypt = require("bcryptjs");
const pgClient = require("../db/pg");
const redisClient = require("../db/redis");
const { connectSocketsToBristols } = require("../socketio");
const {
	validateUserInfo,
	validateUserPassword,
	validateUserEmail,
} = require("../validation");

const getUsers = async (userId, query) => {
	try {
		const { rows } = await pgClient.query("SELECT * FROM get_users($1)", [
			JSON.stringify({ user_id: userId, query }),
		]);
		return { data: rows };
	} catch (error) {
		return { error };
	}
};

const getUser = async userId => {
	try {
		const { rows } = await pgClient.query("SELECT * FROM get_user($1)", [
			JSON.stringify({ id: userId }),
		]);

		if (!rows) throw Error("no user found");

		return { data: rows[0] };
	} catch (error) {
		return { error };
	}
};

const patchUserInfo = async (id, body) => {
	try {
		const { data, errors } = await validateUserInfo(body);

		if (errors) return { validationErrors: errors };

		return await pgClient.query("SELECT patch_user_info($1)", [
			JSON.stringify({ id, ...data }),
		]);
	} catch (error) {
		return { error };
	}
};

const patchUserEmail = async (id, body) => {
	try {
		const { data, errors } = await validateUserEmail(body);

		if (errors) return { validationErrors: errors };

		const { rows } = await pgClient.query("SELECT * FROM get_user_auth($1)", [
			JSON.stringify({ id }),
		]);

		if (!rows) throw Error("no user found");

		const user = rows[0];
		const compare = await bcrypt.compare(data.password, user.hash);
		if (!compare) throw Error("wrong password");

		delete data.password;
		return await pgClient.query("SELECT patch_user_email($1)", [
			JSON.stringify({ id, ...data }),
		]);
	} catch (error) {
		return { error };
	}
};

const patchUserPassword = async (id, body) => {
	try {
		const { data, errors } = await validateUserPassword(body);

		if (errors) return { validationErrors: errors };

		const { rows } = await pgClient.query("SELECT * FROM get_user_auth($1)", [
			JSON.stringify({ id }),
		]);

		if (!rows) throw Error("no user found");

		const user = rows[0];
		const compare = await bcrypt.compare(data.password, user.hash);
		if (!compare) throw Error("wrong password");

		const same = await bcrypt.compare(data.new_password, user.hash);
		if (same) throw Error("same password");

		data.hash = await bcrypt.hash(
			data.new_password,
			await bcrypt.genSalt(+process.env.PWD_SALT_ROUND)
		);

		delete data.password;
		return await pgClient.query("SELECT patch_user_password($1)", [
			JSON.stringify({ id, ...data }),
		]);
	} catch (error) {
		return { error };
	}
};

const deleteUser = async id => {
	try {
		return await pgClient.query("SELECT delete_user($1)", [id]);
	} catch (error) {
		return { error };
	}
};

const getUsersBristols = async id => {
	try {
		const { rows } = await pgClient.query(
			"SELECT * FROM get_users_bristols($1)",
			[id]
		);

		const bristols = await Promise.all(
			rows.map(async bristol => {
				const editorId = await redisClient.getAsync(`in_editing_${bristol.id}`);
				return {
					...bristol,
					inEditing: { status: !!editorId, userId: editorId },
				};
			})
		);

		let userSocket;
		do {
			userSocket = await redisClient.getAsync(`socket_id_${id}`);
		} while (!userSocket);

		connectSocketsToBristols(
			[userSocket],
			bristols.map(({ id }) => id)
		);

		return { data: bristols };
	} catch (error) {
		return { error };
	}
};

module.exports = {
	getUsers,
	getUser,
	patchUserInfo,
	patchUserEmail,
	patchUserPassword,
	deleteUser,
	getUsersBristols,
};
