const {User , Message} = require('../classes');


//START OF THE TEST CODE
let user1 = User();
let user2 = User();
let user3 = User();

//User tests
console.log();
console.log("USER TESTS");
console.log("---------------------------");
console.log(User.userCount());
console.log(user1.getName());
console.log(User.getUsers()[user2.getId()]._name );
console.log(User.getUsers()[user2.getId()].getName() );
console.log("---------------------------");


//Message tests
let msg1 = Message(user1,"lorem");
let msg2 = Message(user2,"lorem world");
let msg3 = Message(user3,"lorem ipsum sit dolor amet world");

console.log();
console.log("MESSAGE TESTS");
console.log("-------------------------");
console.log(msg1.build());
console.log(msg2.getAuthor().getImg());
console.log(Message.getMessages().map( message => message.build() ));
console.log("-------------------------");

console.log();
console.log("COMPLEX TESTS");
console.log("-----------------------------");
console.log(Object.keys( User.getUsers() )
.map(  key => User.getUsers()[key].build()  ))

console.log( User.getBuiltUsers() );

console.log();

console.log("-----------------------------");
//END OF THE TEST CODE

