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
		socket.on("join_bristol_rooms", socketIOController.onJoinBristolRooms);
		socket.on("created", socketIOController.onCreated);
		socket.on("editing", socketIOController.onEditing);
		socket.on("stop_editing", socketIOController.onStopEditing);
		socket.on("moved", socketIOController.onMoved);
		socket.on("roles_managed", socketIOController.onRolesManaged);
		socket.on("deleted", socketIOController.onDeleted);
		socket.on("disconnect", socketIOController.onDisconnect);
	});
};

const connectSocketsToBristol = (ids, bristolId) => {
	const { sockets } = io.sockets;
	ids.forEach(id => {
		sockets.get(id)?.join(`bristol_${bristolId}`);
	});
};

const disconnectSocketsFromBristol = (ids, bristolId) => {
	const { sockets } = io.sockets;
	ids.forEach(id => {
		sockets.get(id)?.leave(`bristol_${bristolId}`);
		io.to(id).emit("deleted", { bristolId });
	});
};

module.exports = {
	init,
	connectSocketsToBristol,
	disconnectSocketsFromBristol,
};
