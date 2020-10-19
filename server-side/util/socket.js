let io;
// we are using socket to make a birectional or rea-time communication
module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("socket.io is not initialized!");
    }
    return io;
  },
};
