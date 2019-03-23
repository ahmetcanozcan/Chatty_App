var express = require("express");
var app = express();
var uniqid = require('uniqid');
var serv = require("http").Server(app);
const {
  uniqueNamesGenerator
} = require('unique-names-generator');


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');

});

app.use(express.static(__dirname + '/client'));

serv.listen(3000);
console.log('Port 3000 is listening');

var User = function (username = "") {
  var self = {
    id: uniqid('user-'),
    username: uniqueNamesGenerator(' ', true),
  }
  self.getName = function () {
    if (self.username != "")
      return self.username;
    return self.id.substring(self.id.length - 14) + "...";
  }
  User.list[self.id] = (self);
  return self;
}
User.list = {};

var Message = function (author, message = "") {
  var self = {
    author: author.id,
    message: message,
    date: new Date(),
  }
  self.getTime = function () {
    var min = self.date.getMinutes();
    if (min < 10) min = "0" + min;
    var hour = (self.date.getHours() + 3) % 24;
    if (hour < 10) hour = "0" + hour;
    return hour + " : " + min;
  }
  self.getAuthor = function () {
    return User.list[self.author].getName();
  }
  Message.list.push(self);
  return self;
}
Message.list = [];
var USER_NUMBER = [];
var SOCKET_LIST = [];
var io = require('socket.io')(serv, {});
io.sockets.on('connection', socket => {

  USER_NUMBER.push(0);
  var user = new User();
  var date = new Message(user).getTime();
  Message.list.pop()
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;
  socket.emit('userName', {
    userName: user.username
  });
  socket.emit('getMessages', sendMessages());
  for (var i in SOCKET_LIST) {
    var sck = SOCKET_LIST[i];
    sck.emit('userJoin', {
      username: user.username,
      time: date,
      userCount: USER_NUMBER.length
    });
  }
  socket.on('rename', data => {
    user.name = data.name;
  });
  socket.on('send', data => {

    if (data.message.indexOf(">") > -1 && data.message.indexOf("<") > -1)
      data.message = "zararlı girişim";
    var msg = Message(user, data.message);

    var pack = {
      author: msg.getAuthor(),
      content: msg.message,
      time: msg.getTime() || "12:12"
    }
    for (var i in SOCKET_LIST) {
      var sck = SOCKET_LIST[i];
      sck.emit('send', pack);
    }

  });
  socket.on("disconnect", () => {
    USER_NUMBER.pop();
    for (var i in SOCKET_LIST) {
      var sck = SOCKET_LIST[i];
      sck.emit('userLeft', {
        username: user.username,
        time: date,
        userCount: USER_NUMBER.length
      });
    }

  });

});



var sendMessages = function () {
  var pack = [];
  for (var i = 0; i < Message.list.length; i++) {
    var message = Message.list[i];
    pack.push({
      author: message.getAuthor(),
      time: message.getTime(),
      content: message.message
    });
  }
  return pack;
}

var allSockets = function (todo) {
  for (var i = 0; i < SOCKET_LIST.length; i++) {
    todo(SOCKET_LIST[i]);
  }
}