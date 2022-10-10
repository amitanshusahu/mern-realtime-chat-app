const PORT = 3001;
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const socket = require("socket.io")
const messageRoute = require("./routes/messageRoute");
const db = require("./db");
db();
const cors = require("cors")

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth" , userRoutes);
app.use("/api/messages", messageRoute);

//listen 
const server = app.listen(PORT,()=>{
    console.log(`server has started at port: ${PORT}`)
})

//socket integration 
const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
});
 
global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    
    socket.on("add-user", (userId) => {
            onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.messages);
      }
    });

});