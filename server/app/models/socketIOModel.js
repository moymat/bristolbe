const redisClient = require("../db/redis");
const {
	connectSocketsToBristols,
	disconnectSocketsFromBristols,
} = require("../socketio");

const onConnection = async (socketId, userId) => {
	await redisClient.setAsync(`socket_id_${userId}`, socketId);
};

const onCreated = async (socket, bristolId) => {
	socket.join(`bristol_${bristolId}`);
};

const onEditing = async (socket, bristolId) => {
	const userId = socket.handshake.query.id;
	await redisClient.setAsync(`in_editing_${bristolId}`, userId);

	socket.broadcast
		.to(`bristol_${bristolId}`)
		.emit("in_editing", { bristolId, userId });
};

const onStopEditing = async (socket, args) => {
	await redisClient.delAsync(`in_editing_${args.bristolId}`);

	socket.broadcast.to(`bristol_${args.bristolId}`).emit("stop_editing", args);
};

const onMoved = async (socket, bristolId) => {
	socket.broadcast.to(`bristol_${bristolId}`).emit("moved");
};

const onRolesManaged = async (socket, { bristolId, roles }) => {
	const socketsPerRoles = await Promise.all(
		Object.entries(roles).map(async ([key, ids]) => [
			key,
			await Promise.all(
				await ids.map(async id => await redisClient.getAsync(`socket_id_${id}`))
			),
		])
	);

	socketsPerRoles.forEach(async ([key, ids]) => {
		if (key === "editors_id" || key === "viewers_id") {
			connectSocketsToBristols(ids, [bristolId]);
		} else {
			disconnectSocketsFromBristols(ids, [bristolId]);
		}
	});

	socket.broadcast.to(`bristol_${bristolId}`).emit("roles_managed");
};

const onDeleted = async (socket, bristolId) => {
	socket.broadcast.to(`bristol_${bristolId}`).emit("deleted", { bristolId });
};

const onDisconnect = async socket => {
	const userId = socket.handshake.query.id;

	await redisClient.delAsync(`socket_id_${socket.handshake.query.id}`);

	const allInEditing = await redisClient.keysAsync("in_editing_*");
	await Promise.all(
		allInEditing.map(async key => {
			const bristolId = key.replace("in_editing_", "");
			const editorId = await redisClient.getAsync(`in_editing_${bristolId}`);

			if (editorId === userId) {
				await redisClient.delAsync(`in_editing_${bristolId}`);
				socket.broadcast
					.to(`bristol_${bristolId}`)
					.emit("stop_editing", { bristolId });
			}
		})
	);

	console.log(userId, "disconnected");
};

module.exports = {
	onConnection,
	onCreated,
	onEditing,
	onStopEditing,
	onMoved,
	onRolesManaged,
	onDeleted,
	onDisconnect,
};
