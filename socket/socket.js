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

// Remove users disconnected from the Active array
const userRemove = (socketId) => {
  users = users.filter((userData) => userData.socketId !== socketId);
};

// Friend friend who is active and return all his/her data
const findFriend = (id) => {
  return users.find((userData) => userData.userId === id);
};

io.on("connection", (socket) => {
  console.log("Socket is connecting...");

  /* --------------- Get from front-end get all user data --------------- */
  socket.on("addUser", (userId, userInfo) => {
    //console.log(socket)
    // Call function addUser
    addUser(userId, socket.id, userInfo);
    // Pass to front-end users conected list
    io.emit("getUser", users);
  });

  /* --------------- Send Message Real Time --------------- */
  socket.on("sendMessage", (data) => {
    const user = findFriend(data.receiverId);
    //console.log(user);
    if (user !== undefined) {
      // All these data will be passed to the second user who receives the message.
      socket.to(user.socketId).emit("getMessage", {
        senderId: data.senderId,
        senderName: data.senderName,
        receiverId: data.receiverId,
        createAt: data.time,
        message: {
          text: data.message.text,
          image: data.message.image,
        },
      });
    }
  });

  /* --------------- Disconnect User --------------- */
  socket.on("disconnect", () => {
    console.log("User is disconnected... ");
    userRemove(socket.id);
    io.emit("getUser", users);
  });
});
