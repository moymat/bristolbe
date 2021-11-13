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

const onStopEditing = async (socket, bristolId) => {
	await redisClient("in_editing_").delAsync(bristolId);
	socket.broadcast
		.to(`bristol_${bristolId}`)
		.emit("stop_editing", { bristolId });
};

module.exports = {
	onConnection,
	onJoinBristolRooms,
	onEditing,
	onStopEditing,
};
