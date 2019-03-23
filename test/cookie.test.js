const express = require('express');
const app = express();
const serv = require('http').Server(app);
const io = require('socket.io')(serv,{});
const cookieParser = require('cookie-parser');
const {User} = require('./classes');
const cookie = require('cookie');
app.use(cookieParser());

app.get( '/', (request , response , next) => {
  let cookie = request.cookies.userId;
  if(!cookie) {
    let user = new User()
    console.log('Cookie sent: ', user.getId() );
    response.cookie('userId' ,user.getId() , );
  }
  response.sendFile( __dirname + "/cookie.test.html" );
  next();
})



io.on('connection', socket => {
    let cookie_id =  cookie.parse(socket.request.headers.cookie);
    console.log(cookie_id);
    console.log(cookie_id.userId);
    console.log( User.getUser( cookie_id.userId ) );
});


app.get('/', (request , response ) => {
    
} )

serv.listen(3000, () => console.log('app listen'));