require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8800;
const dbURI = process.env.MONGO_URI;
// const { Message } = require('./models/message');
// const { Conversation } = require('./models/conversation');

//setting up middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(express.static("./public"));
app.use(express.static("./uploads"));
// app.use(require("cors")());

require("./router")(app);

const http = require("http").Server(app); 
const { Server } = require('socket.io');
const socket = new Server(http, {
  cors: {
    origins: '*',
  },
  allowEIO3: true,
});

// Everything relating to the web socket components
socket.on('connection', (sio) => {
  console.log('a user connected');

  socket.to(sio.id).emit('connected');

  sio.on('disconnect', () => {
    console.log('user disconnected');
  });

  // sio.on('get message', async ({ convId }) => {
  //   // getting the conversation from the databa
  //   var conversation = await Conversation.findById(convId);

  //   // validating that the conversation exits
  //   if (!conversation) {
  //     return;
  //   }

  //   if (conversation.lastMessage.hasRead === false) {
  //     // querying the messages relating to the conversation from the databse
  //     const message = await Message.findOne({
  //       convId: conversation._id,
  //     }).populate('convId');

  //     if (message.convId.lastMessage.hasRead === false) {
  //       socket
  //         .to(sio.id)
  //         .emit('send message', { message: message.messages[0] });
  //     }
  //   }
  // });
});

// 404 Error Handler
app.all("*", (req, res) => {
    res.status(404).json({
        status: false,
        error: "And Just Like That, You Completely Lost Your Way 😥",
    });
});

// connecting to mongodb database
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose
  .connect(dbURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
  .then(()=>{
    console.log('This app is connected to the server database');
    http.listen(PORT, () => {
      console.log(
        `Database connected successfully.

        Server is running on port ${PORT}

        http://localhost:${PORT}`

        );
    });
  })
  .catch(err => {
  console.log('could not connect to mongoDB', err)
});




module.exports = { app };

require('./router')(app);
