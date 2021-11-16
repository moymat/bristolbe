const { socketIOModel } = require("../models");

const onConnection = async socket => {
	await socketIOModel.onConnection(socket.id, socket.handshake.query.id);
};

// Function declaration to use "this" (the socket)

async function onCreated({ bristolId }) {
	await socketIOModel.onCreated(this, bristolId);
}

async function onEditing({ bristolId }) {
	await socketIOModel.onEditing(this, bristolId);
}

async function onStopEditing(args) {
	await socketIOModel.onStopEditing(this, args);
}

async function onMoved({ bristolId }) {
	await socketIOModel.onMoved(this, bristolId);
}

async function onRolesManaged(args) {
	await socketIOModel.onRolesManaged(this, args);
}

async function onDeleted({ bristolId }) {
	await socketIOModel.onDeleted(this, bristolId);
}

async function onDisconnect() {
	await socketIOModel.onDisconnect(this);
}

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
