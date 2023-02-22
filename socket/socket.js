const io = require("socket.io")(8080, {
  cors: {
    origin: "*",
    //credentials: true,
    methods: ["GET", "POST"],
  },
});

// Store the users
let users = [];
// Each time a client connects to a Socket.IO server, 
// a unique socket ID is generated for that client.
const addUser = (userId, socketId, userInfo) => {
  // The 'some' method to check if there is at least one element in the users 
  // array that satisfies the condition specified in the callback function.
  const checkUser = users.some((userData) => userData.userId === userId);

  if (!checkUser) {
    users.push({ userId, socketId, userInfo });
  }
};

io.on("connection", (socket) => {
  console.log("Socket is connecting...");
  // Get from front-end get all user data
  socket.on("addUser", (userId, userInfo) => {
    //console.log(socket)
    // Call function addUser
    addUser(userId, socket.id, userInfo);
    // Pass to front-end users conected list
    io.emit("getUser", users);
  });
});
