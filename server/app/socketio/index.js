const redisClient = require("../db/redis");

let io;

const init = server => {
	const { socketIOController } = require("../controllers");

	io = require("socket.io")(server, {
		cors: {
			origin: process.env.CLIENT_URL,
			credentials: true,
		},
	});

	io.on("connection", socket => {
		socketIOController.onConnection(socket);
		socket.on("created", socketIOController.onCreated);
		socket.on("editing", socketIOController.onEditing);
		socket.on("stop_editing", socketIOController.onStopEditing);
		socket.on("moved", socketIOController.onMoved);
		socket.on("roles_managed", socketIOController.onRolesManaged);
		socket.on("deleted", socketIOController.onDeleted);
		socket.on("disconnect", socketIOController.onDisconnect);
	});
};

const connectSocketsToBristols = async (socketIds, bristolIds) => {
	try {
		socketIds.forEach(async socketId => {
			const socket = io.sockets.sockets.get(socketId);
			//console.log(io.sockets.sockets);
			console.log(socketId);
			bristolIds.forEach(bristolId => {
				socket && socket.join(`bristol_${bristolId}`);
			});
		});
	} catch (err) {
		console.error(err);
	}
};

const disconnectSocketsFromBristols = (socketIds, bristolIds) => {
	socketIds.forEach(socketId => {
		const socket = io.sockets.sockets.get(socketId);
		bristolIds.forEach(bristolId => {
			socket && socket.leave(`bristol_${bristolId}`);
			io.to(socketId).emit("deleted", { bristolId });
		});
	});
};

module.exports = {
	init,
	connectSocketsToBristols,
	disconnectSocketsFromBristols,
};
