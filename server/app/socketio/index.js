const { socketIOController } = require("../controllers");

module.exports = server => {
	const io = require("socket.io")(server, {
		cors: {
			origin: process.env.CLIENT_URL,
			credentials: true,
		},
	});

	io.on("connection", socket => {
		socketIOController.onConnection(socket);
		socket.on("join_bristol_rooms", socketIOController.onJoinBristolRooms);
		socket.on("editing", socketIOController.onEditing);
		socket.on("stop_editing", socketIOController.onStopEditing);
		socket.on("moving", socketIOController.onMoving);
		socket.on("stop_moving", socketIOController.onStopMoving);
		socket.on("disconnect", socketIOController.onDisconnect);
	});
};
