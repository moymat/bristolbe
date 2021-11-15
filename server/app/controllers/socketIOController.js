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

async function onStopEditing(args) {
	await socketIOModel.onStopEditing(this, args);
}

async function onMoved(args) {
	await socketIOModel.onMoved(this, args);
}

async function onDeleted(args) {
	await socketIOModel.onDeleted(this, args);
}

async function onDisconnect() {
	await socketIOModel.onDisconnect(this);
}

module.exports = {
	onConnection,
	onJoinBristolRooms,
	onEditing,
	onStopEditing,
	onMoved,
	onDeleted,
	onDisconnect,
};
