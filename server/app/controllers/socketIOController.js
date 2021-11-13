const { socketIOModel } = require("../models");

const onConnection = async socket => {
	await socketIOModel.onConnection(socket.id, socket.handshake.query.id);
};

// Function declaration to use "this" (the socket)
async function onJoinBristolRooms({ bristolsId }) {
	await socketIOModel.onJoinBristolRooms(this, bristolsId);
}

async function onEditing({ userId, bristolId }) {
	await socketIOModel.onEditing(this, bristolId, userId);
}

async function onStopEditing({ bristolId }) {
	await socketIOModel.onStopEditing(this, bristolId);
}

module.exports = {
	onConnection,
	onJoinBristolRooms,
	onEditing,
	onStopEditing,
};
