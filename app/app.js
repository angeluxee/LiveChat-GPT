const port = 3000;
var express = require("express"),
  app = express(),
  server = require("http").createServer(app),
  path = require("path");
  mongoose = require('mongoose');
  User = require("./models/user");
  sessions = require('express-session');
  const socketIO = require('socket.io');
  const io = socketIO(server);
  Chat = require('./models/chat'); 
  const gptController = require('./controllers/chatgpt'); 
  const chatController = require('./controllers/chat'); 
  const apiController = require('./controllers/api'); 
  const router = express.Router();
  
const activeUsers = {};
server.listen(port, (err, res) => {
  if (err) console.log(`ERROR: Connecting APP ${err}`);
  else console.log(`Server is running on port ${port}`);
});

mongoose.connect(
  `mongodb://root:pass12345@mongodb:27017/nodechat?authSource=admin`,
  { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true },
  (err, res) => {
    if (err) console.log(`ERROR: connecting to Database.  ${err}`);
    else console.log(`Database Online`);
  }
);

app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  resave: false,
  saveUninitialized: false,
}));


//ioioio
io.on('connection', async (socket) => {
  console.log(`Un usuario se ha conectado`);
  socket.on('message', async (clientMessage) => {
    try {
      const chatMessage = await chatController.create(clientMessage);
      io.to(socket.room).emit('message', { sender: chatMessage.sender, text: chatMessage.message, avatar: chatMessage.avatar, date: chatMessage.createdAt});
      console.log(`Usuario ${clientMessage.sender} escribió un mensaje`)
      
      //Respuesta chatGPT
      if(clientMessage.ia){
        const respuestaIa = await gptController.chatgpt(clientMessage.text);
        const gptMessage = await chatController.create({
          sender: "ChatGPT",
          text: respuestaIa,
          room: clientMessage.room,
          avatar: "chatgpt.png"
        });

        io.to(socket.room).emit('message', { sender: gptMessage.sender, text: gptMessage.message, avatar: gptMessage.avatar, date: gptMessage.createdAt});
        console.log(`ChatGPT responde al usuario`);
      }
      
    } catch (error) {
      console.error(error);
    }
  });
  
  socket.on('joinRoom', async (room, username) => {
    socket.join(room);
    socket.room = room;
    socket.username = username;

    if (!activeUsers[room]) {
      activeUsers[room] = [];
    }
    if (!activeUsers[room].includes(username)) {
      activeUsers[room].push(username);
    }
    io.to(room).emit('users', activeUsers[room]);
    try {
      const messages = await Chat.find({ room: room }).sort({ timestamp: 1 });
      messages.forEach((message) => {
        socket.emit('message', {
          sender: message.sender,
          text: message.message,
          avatar: message.avatar,
          date: message.createdAt,
        });
      });
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('disconnect', () => {
    if (activeUsers[socket.room] && activeUsers[socket.room].includes(socket.username)) {
      activeUsers[socket.room] = activeUsers[socket.room].filter(user => user !== socket.username);
      io.to(socket.room).emit('users', activeUsers[socket.room]);
      console.log(`El usuario ${socket.username} se ha desconectado`);
    }     
  });
});



// Import routes of our app
var routes = require("./routes/main");
var chatRoutes = require("./routes/chat")(io);
var apiRoutes = require("./routes/api");

// view engine setup and other configurations
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api", router.post("/msg/send", [apiController.apiCheck , chatController.sendMessage] , async (req, res, next) => {
  console.log(req.message)  
  io.to(req.message.room).emit('message', { sender: req.message.sender, text: req.message.message, avatar: req.message.avatar, date: req.message.createdAt});
  res.json({"succes": "Mensaje enviado correctamente"});
}));

// Define routes using URL path
app.use("/", routes);
app.use("/chat", chatRoutes);
app.use("/api", apiRoutes);
module.exports = app;

