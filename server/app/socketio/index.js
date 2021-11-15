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

const connectSocketsToBristols = (socketIds, bristolIds) => {
	const { sockets } = io.sockets;
	bristolIds.forEach(bristolId => {
		socketIds.forEach(socketId => {
			sockets.get(socketId)?.join(`bristol_${bristolId}`);
		});
	});
};

const disconnectSocketsFromBristols = (socketIds, bristolIds) => {
	const { sockets } = io.sockets;
	bristolIds.forEach(bristolId => {
		socketIds.forEach(socketId => {
			sockets.get(socketId)?.leave(`bristol_${bristolId}`);
			io.to(socketId).emit("deleted", { bristolId });
		});
	});
};

module.exports = {
	init,
	connectSocketsToBristols,
	disconnectSocketsFromBristols,
};
