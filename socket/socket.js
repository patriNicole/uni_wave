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

// Logout so that the user will not be displayed as active anymore - real time action
const userLogout = (userId) => {
  users = users.filter(user => user.userId !== userId)
}


io.on("connection", (socket) => {
  console.log("Socket is connecting...");

  /* CHAT PAGE */

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
    //console.log(data.message);
    if (user !== undefined) {
      // All these data will be passed to the second user who receives the message.
      socket.to(user.socketId).emit("patiMessage", data);
    }
  });

  /* --------------- Seen Message Real Time --------------- */
  socket.on('messageSeen', (message) => {
    const user = findFriend(message.senderId);          
    if(user !== undefined){
         socket.to(user.socketId).emit('messageSeenResponse', message);
    }          
  });

  /* --------------- Deliver Message Real Time --------------- */
  socket.on('delivaredMessage', (message) => {
      const user = findFriend(message.senderId);          
      if(user !== undefined){
          socket.to(user.socketId).emit('messageDelivaredResponse', message);
      }          
  });

  /* --------------- Seen Message after Deliver Message Real Time --------------- */
  socket.on('seenMessageAfterDeliver', (data) => {
    const user = findFriend(data.senderId);          
    if(user !== undefined){
      socket.to(user.socketId).emit('seenSuccess', data);
    } 
  })

  /* --------------- Typing Message --------------- */
  socket.on("typingMessage", (data) => {
    //console.log(data);
    const user = findFriend(data.receiverId);
    if (user !== undefined) {
      socket.to(user.socketId).emit("getTypingMessage", {
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message,
      });
    }
  });

  /* --------------- New Courses Added --------------- */
  socket.on('newCourse', (newTodo) => {
    //console.log(postData)
    io.emit('newCourseAdded', newTodo);
  });

  /* --------------- New ToDo Added --------------- */
  socket.on('newToDo', (postData) => {
    console.log(postData)
    io.emit('newToDo', postData);
  });

  /* --------------- Update ToDo --------------- */ 
  socket.on("update-todo", (updatedTodo) => {
    //console.log(updatedTodo);
    // Emit updated todo to all connected clients
    io.emit("update-todo", updatedTodo);
  });

  /* --------------- Update CALENDAR EVENT --------------- */ 
  socket.on("update-calendar", (updatedEvent) => {
    //console.log(updatedEvent);
    // Emit updated event to all connected clients
    io.emit("update-calendar", updatedEvent);
  });

  /* --------------- Update Teaching --------------- */ 
  socket.on("update-teaching", (updatedEvent) => {
    //console.log(updatedEvent);
    // Emit updated event to all connected clients
    io.emit("update-teaching", updatedEvent);
  });

  /* Real Time User Logout so it won't be Active anymore */
  socket.on('logout', userId => {
    userLogout(userId);
  });

  /* --------------- Disconnect User --------------- */
  socket.on("disconnect", () => {
    console.log("User is disconnected... ");
    userRemove(socket.id);
    io.emit("getUser", users);
  });
});
