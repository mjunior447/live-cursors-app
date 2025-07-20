const http = require("http");
const { WebSocketServer } = require("ws");
const url = require("url");
const uuidv4 = require("uuid").v4;

const server = http.createServer();
const wsServer = new WebSocketServer({
  server,
});
const port = 8000;

const connections = {};
const users = {};

const broadcast = () => {
  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid];
    const message = JSON.stringify(users);
    connection.send(message);
  });
};

const handleMessage = (bytes, uuid) => {
  const message = JSON.parse(bytes.toString());
  const user = users[uuid];

  user.state = message;

  broadcast();
  console.log(
    `User ${user.userName} updated state: x=${user.state.x}, y=${user.state.y}`
  );
};

const handleClose = (uuid) => {
  delete users[uuid];
  delete connections[uuid];

  broadcast();
  console.log(`user ${uuid} left the game`);
};

wsServer.on("connection", (connection, request) => {
  const { userName } = url.parse(request.url, true).query;
  const uuid = uuidv4();
  console.log(`${userName} connected with UUID: ${uuid}`);

  connections[uuid] = connection;
  users[uuid] = {
    userName,
    state: {
      x: 0,
      y: 0,
    },
  };

  connection.on("message", (message) => handleMessage(message, uuid));
  connection.on("close", () => handleClose(uuid));
});

server.listen(port, () => {
  console.log(`ws server is running on port ${port}`);
});
