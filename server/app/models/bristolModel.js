const pgClient = require("../db/pg");
const redisClient = require("../db/redis");
const { validateBristol, validateManageRoles } = require("../validation");
const {
	connectSocketsToBristol,
	disconnectSocketsFromBristol,
} = require("../socketio");

const createBristol = async (body, userId) => {
	try {
		const { data, errors } = await validateBristol(body);

		if (errors) return { validationErrors: errors };

		const { rows } = await pgClient.query("SELECT * FROM create_bristol($1)", [
			JSON.stringify({ user_id: userId, ...data }),
		]);

		const userSocket = await redisClient("socket_id_").getAsync(userId);

		connectSocketsToBristol([userSocket], rows[0].id);

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

		const editors = rolesRows.filter(user => user.role === "editor");
		const viewers = rolesRows.filter(user => user.role === "viewer");

		return { data: { ...rows[0], editors, viewers } };
	} catch (error) {
		return { error };
	}
};

const moveBristol = async (bristolMoved, userId) => {
	try {
		const { rows } = await pgClient.query(
			"SELECT * FROM bristol_pre_move($1)",
			[JSON.stringify({ user_id: userId, bristol_id: bristolMoved.bristol_id })]
		);

		await pgClient.query("SELECT move_bristol($1)", [
			JSON.stringify({
				...bristolMoved,
				user_id: userId,
			}),
		]);

		const bristolBefore = {
			position: rows[0]?.position,
			parent_id: rows[0]?.parent_id,
			members: rows.map(({ id, role }) => ({ id, role })),
		};

		if (!bristolMoved.parent_id && bristolBefore.parent_id) {
			// If move to root, connect all editors to the bristol
			console.log("to root");
			const sockets = await Promise.all(
				bristolBefore.members
					.reduce(
						(acc, { id, role }) => (role === "editor" ? [...acc, id] : acc),
						[]
					)
					.map(async id => await redisClient("socket_id_").getAsync(id))
			);

			connectSocketsToBristol(
				sockets.filter(socket => !!socket),
				bristolMoved.bristol_id
			);
		} else if (bristolMoved.parent_id && !bristolBefore.parent_id) {
			// If move from root, connect all new members to the bristol
			console.log("from root");
			const { rows: membersRows } = await pgClient.query(
				"SELECT * FROM  get_bristols_roles($1)",
				[
					JSON.stringify({
						user_id: userId,
						bristol_id: bristolMoved.bristol_id,
					}),
				]
			);

			const sockets = await Promise.all(
				membersRows.map(
					async ({ id }) => await redisClient("socket_id_").getAsync(id)
				)
			);

			connectSocketsToBristol(
				sockets.filter(socket => !!socket),
				bristolMoved.bristol_id
			);
		} else if (bristolMoved.parent_id && bristolMoved.parent_id) {
			// If move between bristols, remove all previous members to the bristol and connect all new ones
			console.log("between");
			const oldSockets = await Promise.all(
				bristolBefore.members
					.reduce(
						(acc, { id, role }) => (role === "editor" ? [...acc, id] : acc),
						[]
					)
					.map(async id => await redisClient("socket_id_").getAsync(id))
			);

			const { rows: membersRows } = await pgClient.query(
				"SELECT * FROM  get_bristols_roles($1)",
				[
					JSON.stringify({
						user_id: userId,
						bristol_id: bristolMoved.bristol_id,
					}),
				]
			);

			const newSockets = await Promise.all(
				membersRows.map(
					async ({ id }) => await redisClient("socket_id_").getAsync(id)
				)
			);

			disconnectSocketsFromBristol(
				oldSockets.filter(socket => !!socket && !newSockets.includes(socket)),
				bristolMoved.bristol_id
			);

			connectSocketsToBristol(
				newSockets.filter(socket => !!socket && !oldSockets.includes(socket)),
				bristolMoved.bristol_id
			);
		}

		/*const roles = rows.map(({ user_id, role, first_name, last_name }) => ({
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
								deleted_id: ids,
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
