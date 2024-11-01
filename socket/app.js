import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
    } else {
      console.log(`User with ID ${receiverId} not found`);
      socket.emit("messageError", { error: "Receiver not found" });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(`User disconnected with socket ${socket.id}`);
  });
});

const PORT = process.env.PORT || 4000;
io.listen(PORT);