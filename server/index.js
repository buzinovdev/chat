const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const http = require("http");
const app = express();
const server = http.createServer(app);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
// Routers
const userRouter = require("./routers/user")
const messageRouter = require("./routers/message")
app.use("/user", userRouter)
app.use("/message", messageRouter)


const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('Подключение работает')

  socket.on('login', (username) => {
    console.log(`Пользователь ${username} подключился`);
    socket.emit('userConnected', username);
  });

  socket.on('sendMessage', (data) => {
    io.sockets.send(data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("stopTyping");
  });

  /*  socket.on('disconnect', () => {
      console.log('Пользователь отключился')
    })*/
})


const start = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/chat', {useNewUrlParser: true, useUnifiedTopology: true})
    server.listen(3000, () => {
      console.log("Socket.io server started on port 3000");
    })
  } catch (e) {
    console.log(e)
  }
}
start()

