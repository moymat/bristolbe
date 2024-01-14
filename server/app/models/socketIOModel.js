const cache = require("../db/cache");
const {
  connectSocketsToBristols,
  disconnectSocketsFromBristols,
} = require("../socketio");

const onConnection = (socketId, userId) => {
  cache.set(`socket_id_${userId}`, socketId);
};

const onCreated = async (socket, bristolId) => {
  socket.join(`bristol_${bristolId}`);
};

const onEditing = async (socket, bristolId) => {
  const userId = socket.handshake.query.id;
  cache.set(`in_editing_${bristolId}`, userId);

  socket.broadcast
    .to(`bristol_${bristolId}`)
    .emit("in_editing", { bristolId, userId });
};

const onStopEditing = async (socket, args) => {
  cache.del(`in_editing_${args.bristolId}`);

  socket.broadcast.to(`bristol_${args.bristolId}`).emit("stop_editing", args);
};

const onMoved = async (socket, bristolId) => {
  socket.broadcast.to(`bristol_${bristolId}`).emit("moved");
};

const onRolesManaged = async (socket, { bristolId, roles }) => {
  const socketsPerRoles = await Promise.all(
    Object.entries(roles).map(async ([key, ids]) => [
      key,
      await Promise.all(
        await ids.map(async (id) => cache.get(`socket_id_${id}`)),
      ),
    ]),
  );

  socketsPerRoles.forEach(async ([key, ids]) => {
    if (key === "editors_id" || key === "viewers_id") {
      connectSocketsToBristols(ids, [bristolId]);
    } else {
      disconnectSocketsFromBristols(ids, [bristolId]);
    }
  });

  socket.broadcast
    .to(`bristol_${bristolId}`)
    .emit("roles_managed", { bristolId });
};

const onDeleted = async (socket, bristolId) => {
  socket.broadcast.to(`bristol_${bristolId}`).emit("deleted", { bristolId });
};

const onDisconnect = async (socket) => {
  const userId = socket.handshake.query.id;

  cache.del(`socket_id_${socket.handshake.query.id}`);

  const allInEditing = cache.keys("in_editing_*");
  await Promise.all(
    allInEditing.map(async (key) => {
      const bristolId = key.replace("in_editing_", "");
      const editorId = cache.get(`in_editing_${bristolId}`);

      if (editorId === userId) {
        cache.del(`in_editing_${bristolId}`);
        socket.broadcast
          .to(`bristol_${bristolId}`)
          .emit("stop_editing", { bristolId });
      }
    }),
  );
};

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
