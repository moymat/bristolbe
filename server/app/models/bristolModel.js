const pgClient = require("../db/pg");
const { validateBristol } = require("../validation");

const getBristol = async (bristolId, userId) => {
	try {
		const { rows } = await pgClient.query(
			"SELECT * FROM bristol.get_bristol($1)",
			[JSON.stringify({ user_id: userId, bristol_id: bristolId })]
		);

		if (!rows) throw Error(`no bristol with id ${bristolId}`);

		return { data: rows[0] };
	} catch (error) {
		return { error };
	}
};

const moveBristol = async (bristolMoved, userId) => {
	try {
		return await pgClient.query("SELECT bristol.move_bristol($1)", [
			JSON.stringify({
				...bristolMoved,
				user_id: userId,
			}),
		]);
	} catch (error) {
		return { error };
	}
};

const createBristol = async (body, userId) => {
	try {
		const { data, errors } = await validateBristol(body);

		if (errors) return { validationErrors: errors };

		const { rows } = await pgClient.query(
			"SELECT * FROM bristol.create_brisol($1)",
			[JSON.stringify({ userId, ...data })]
		);

		return { data: rows[0] };
	} catch (error) {
		return { error };
	}
};

module.exports = {
	getBristol,
	moveBristol,
	createBristol,
};
