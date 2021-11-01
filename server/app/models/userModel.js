const pgClient = require("../db/pg");
const { validateUser } = require("../validation");

const getAllUsers = async () => {
	try {
		const { rows } = await pgClient.query("SELECT * FROM get_all_users()");
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

const patchUser = async (id, body) => {
	try {
		const { data, errors } = await validateUser(body);

		if (errors) return { validationErrors: errors };

		return await pgClient.query("SELECT patch_user($1)", [
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

		return { data: rows };
	} catch (error) {
		return { error };
	}
};

module.exports = {
	getAllUsers,
	getUser,
	patchUser,
	deleteUser,
	getUsersBristols,
};
