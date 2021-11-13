const { onConnection } = require("../controllers/socketIOController");

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
	});
};
