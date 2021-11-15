const redisClient = require("../db/redis");
const {
	connectSocketsToBristols,
	disconnectSocketsFromBristols,
} = require("../socketio");

const onConnection = async (socketId, userId) => {
	await redisClient("socket_id_").setAsync(userId, socketId);
};

const onCreated = async (socket, bristolId) => {
	socket.join(`bristol_${bristolId}`);
};

const onEditing = async (socket, bristolId) => {
	const userId = socket.handshake.query.id;
	await redisClient("in_editing_").setAsync(bristolId, userId);
	socket.broadcast
		.to(`bristol_${bristolId}`)
		.emit("in_editing", { bristolId, userId });
};

const onStopEditing = async (socket, args) => {
	await redisClient("in_editing_").delAsync(args.bristolId);
	socket.broadcast.to(`bristol_${args.bristolId}`).emit("stop_editing", args);
};

const onMoved = async (socket, bristolId) => {
	socket.broadcast.to(`bristol_${bristolId}`).emit("moved");
};

const onRolesManaged = async (socket, { bristolId, roles }) => {
	Object.entries(roles).forEach(([key, ids]) => {
		key === "editors_id" || key === "viewers_id"
			? connectSocketsToBristols(ids, [bristolId])
			: disconnectSocketsFromBristols(ids, [bristolId]);
	});
	socket.broadcast.to(`bristol_${bristolId}`).emit("roles_managed");
};

const onDeleted = async (socket, bristolId) => {
	socket.broadcast.to(`bristol_${bristolId}`).emit("deleted", { bristolId });
};

const onDisconnect = async socket => {
	const userId = socket.handshake.query.id;

	await redisClient("socket_id_").delAsync(socket.handshake.query.id);

	const allInEditing = await redisClient().keysAsync("in_editing_*");
	await Promise.all(
		allInEditing.map(async key => {
			const bristolId = key.replace("in_editing_", "");
			const editorId = await redisClient("in_editing_").getAsync(bristolId);

			if (editorId === userId) {
				await redisClient("in_editing_").delAsync(bristolId);
				socket.broadcast
					.to(`bristol_${bristolId}`)
					.emit("stop_editing", { bristolId });
			}
		})
	);
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
