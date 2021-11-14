const redisClient = require("../db/redis");

const onConnection = async (socketId, userId) => {
	await redisClient("socket_id_").setAsync(userId, socketId);
};

const onJoinBristolRooms = async (socket, bristolsId) => {
	bristolsId.forEach(id => {
		socket.join(`bristol_${id}`);
	});
};

const onEditing = async (socket, bristolId, userId) => {
	await redisClient("in_editing_").setAsync(bristolId, userId);
	socket.broadcast
		.to(`bristol_${bristolId}`)
		.emit("in_editing", { bristolId, userId });
};

const onStopEditing = async (socket, args) => {
	await redisClient("in_editing_").delAsync(args.bristolId);
	socket.broadcast.to(`bristol_${args.bristolId}`).emit("stop_editing", args);
};

const onMoving = async (socket, bristolId, userId) => {
	await redisClient("is_moving_").setAsync(bristolId, userId);
	socket.broadcast
		.to(`bristol_${bristolId}`)
		.emit("is_moving", { bristolId, userId });
};

const onStopMoving = async (socket, args) => {
	await redisClient("is_moving_").delAsync(args.bristolId);
	socket.broadcast.to(`bristol_${args.bristolId}`).emit("stop_moving", args);
};

const onDisconnect = async socket => {
	const allInEditing = await redisClient().keysAsync("in_editing_*");

	await Promise.all(
		allInEditing.map(async key => {
			const bristolId = key.replace("in_editing_", "");

			const userId = await redisClient("in_editing_").getAsync(bristolId);

			if (userId) {
				const cachedId = await redisClient("socket_id_").getAsync(userId);

				if (socket.id === cachedId) {
					await redisClient("in_editing_").delAsync(bristolId);
					socket.broadcast
						.to(`bristol_${bristolId}`)
						.emit("stop_editing", { bristolId });
				}
			}
		})
	);
};

module.exports = {
	onConnection,
	onJoinBristolRooms,
	onEditing,
	onStopEditing,
	onMoving,
	onStopMoving,
	onDisconnect,
};
