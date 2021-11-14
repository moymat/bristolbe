const pgClient = require("../db/pg");
const redisClient = require("../db/redis");
const { validateBristol, validateManageRoles } = require("../validation");

const createBristol = async (body, userId) => {
	try {
		const { data, errors } = await validateBristol(body);

		if (errors) return { validationErrors: errors };

		const { rows } = await pgClient.query("SELECT * FROM create_bristol($1)", [
			JSON.stringify({ user_id: userId, ...data }),
		]);

		return { data: rows[0] };
	} catch (error) {
		return { error };
	}
};

const deleteBristols = async (bristolId, userId) => {
	try {
		await pgClient.query("SELECT delete_bristols($1)", [
			JSON.stringify({ user_id: userId, bristol_id: bristolId }),
		]);
		return { status: "bristol deleted" };
	} catch (error) {
		return { error };
	}
};

const getBristol = async (bristolId, userId) => {
	try {
		const { rows } = await pgClient.query("SELECT * FROM get_bristol($1)", [
			JSON.stringify({ user_id: userId, bristol_id: bristolId }),
		]);

		if (!rows) throw Error(`no bristol with id ${bristolId}`);

		const { rows: rolesRows } = await pgClient.query(
			"SELECT * FROM get_bristols_roles($1)",
			[JSON.stringify({ user_id: userId, bristol_id: bristolId })]
		);

		const bristol = rows[0];

		const editorCached = await redisClient("in_editing_").getAsync(bristol.id);
		bristol.inEditing = { status: !!editorCached, userId: editorCached };

		const moverCached = await redisClient("is_moving_").getAsync(bristol.id);
		bristol.isMoving = { status: !!moverCached, userId: moverCached };

		const editors = rolesRows.filter(user => user.role === "editor");
		const viewers = rolesRows.filter(user => user.role === "viewer");

		return { data: { ...rows[0], editors, viewers } };
	} catch (error) {
		return { error };
	}
};

const moveBristol = async (bristolMoved, userId) => {
	try {
		/* const { rows } = await pgClient.query(
			"SELECT * FROM bristol_pre_move($1)",
			[JSON.stringify({ user_id: userId, bristol_id: bristolMoved.bristol_id })]
		); */

		await pgClient.query("SELECT move_bristol($1)", [
			JSON.stringify({
				...bristolMoved,
				user_id: userId,
			}),
		]);

		/* const bristol_before = {
			position: rows[0].position,
			parent_id: rows[0].parent_id,
		};

		const roles = rows.map(({ user_id, role, first_name, last_name }) => ({
			user_id,
			role,
			first_name,
			last_name,
		})); */

		return {
			data: {
				status: "success",
				/* 	bristol_before,
				editors: roles.filter(({ role }) => role === "editor"),
				viewers: roles.filter(({ role }) => role === "viewer"),*/
			},
		};
	} catch (error) {
		return { error };
	}
};

const patchBristol = async (body, bristolId, userId) => {
	try {
		const { data, errors } = await validateBristol(body);

		if (errors) return { validationErrors: errors };

		return await pgClient.query("SELECT patch_bristol($1)", [
			JSON.stringify({
				user_id: userId,
				bristol_id: bristolId,
				...data,
			}),
		]);
	} catch (error) {
		return { error };
	}
};

const getBristolRoles = async (bristolId, userId) => {
	try {
		const { rows } = await pgClient.query(
			"SELECT * FROM get_bristol_roles($1)",
			[
				JSON.stringify({
					user_id: IdleDeadline,
					bristol_id: bristolId,
				}),
			]
		);

		return { data: rows };
	} catch (error) {
		return { error };
	}
};

const manageRoles = async (bristolId, userId, body) => {
	try {
		const { data, errors } = await validateManageRoles(body);

		if (errors) return { validationErrors: errors };

		return Promise.all(
			Object.entries(data).map(async ([key, ids]) => {
				return key === "editors_id"
					? await pgClient.query("SELECT add_editors($1)", [
							JSON.stringify({
								user_id: userId,
								bristol_id: bristolId,
								editors_id: ids,
							}),
					  ])
					: key === "viewers_id"
					? await pgClient.query("SELECT add_viewers($1)", [
							JSON.stringify({
								user_id: userId,
								bristol_id: bristolId,
								viewers_id: ids,
							}),
					  ])
					: await pgClient.query("SELECT delete_roles($1)", [
							JSON.stringify({
								user_id: userId,
								bristol_id: bristolId,
								delete_id: ids,
							}),
					  ]);
			})
		);
	} catch (error) {
		return { error };
	}
};

module.exports = {
	createBristol,
	deleteBristols,
	getBristol,
	moveBristol,
	patchBristol,
	getBristolRoles,
	manageRoles,
};
