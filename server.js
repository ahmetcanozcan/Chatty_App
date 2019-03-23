const express = require("express");
const app = express();
const {
  port
} = require('./server.config');
const {
  User,
  Message
} = require('./classes');
const serv = require("http").Server(app);
const io = require('socket.io')(serv, {});
const cookie = require('cookie');
const cookieParser = require('cookie-parser');


//import cookie-parser to express app for read and send cookies 
app.use(cookieParser());
//set static middleware
app.use(express.static(__dirname + '/client'));



app.get('/', (request, response) => {

  //Check if a userId cookie doesn't exist.
  let cookie = request.cookies.userId;
  if (!(cookie && (Object.keys(User.getUsers()).includes(cookie)))) {

    //Create new user for client
    let user = new User()
    //And send the userId to client through a cookie
    response.cookie('userId', user.getId(), );
    //Make user online.
    user.online();
  } else if (User.getUser(cookie).isOnline()) {
    response.sendFile(__dirname + "/views/online.html");
    console.log('hi');
    return;
  } else {
    User.getUser(cookie).online();
  }
  //Send html file to client
  response.sendFile(__dirname + '/views/index.html');


});




//Invoke the socket.io
io.on('connection', socket => {
  /*CREATIN OBJECTS */
  //Get cookie from client
  let clientCookie = cookie.parse((socket.request.headers.cookie) + "");
  console.log(clientCookie);
  //Getting user depens on client's cookie
  let user = User.getUser(clientCookie.userId);
  //Make the user online

  /* SENDIN DATA */
  //Send to all clients the updated online user count.
  io.emit('online_count', User.getOnlineUserCount());
  //Send to client anonymus user data
  socket.emit('user_info', Object.assign({
    id: user.getId()
  }, user.build()))
  //Send to client all users
  socket.emit('all_users', User.getBuiltUsers());
  //Send to client all messages for the first time
  socket.emit('all_messages', Message.getMessages().map(message => message.build()))
  //Send to new user to all other users
  io.emit('new_user', [user.getId(), user.build()]);

  /*LISTENING EVENTS */
  socket.on('typing', name => {

  });
  //when the user send a new message.
  socket.on('new_message', (messageContent) => {
    let message = Message(user, messageContent);
    io.emit('new_message', message.build());
  });
  //When the user changes data
  socket.on('user_update', (new_data) => {
    user.setName(new_data.name);
    user.setImg(new_data.img)
    io.emit('user_update', {
      id: user.getId(),
      data: new_data
    });
  });
  //User disconnected
  socket.on('disconnect', () => {
    user.offline();
    io.emit('online_count', User.getOnlineUserCount());
  });

});




//Server start  listen to server
serv.listen(port, () => console.log(`Port ${port} listening`));