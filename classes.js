const uniqid = require('uniqid');
const {
  uniqueNamesGenerator
} = require('unique-names-generator');

//User Module
const UserClassModule = (() => {
  //Private static variables
  let _userList = {};

  //Constructor
  function init() {
    //Private variables
    let _id = uniqid();
    let _isOnline = false;
    let _img = createImage();
    let _name = uniqueNamesGenerator(' ', true);
    //Public variables
    let public = {
      getId() {
        return _id
      },
      getImg() {
        return _img
      },
      getName() {
        return _name
      },
      setName(new_name) {
        _name = new_name
      },
      setImg(new_img) {
        _img = new_img
      },
      online() {
        _isOnline = true;
      },
      isOnline() {
        return _isOnline;
      },
      offline() {
        _isOnline = false;
      },
      build() {
        return {
          name: _name,
          img: _img,
        }
      },
      destroy() {
        _count--;
        delete _userList[_id];
      }
    }
    //Created.
    _userList[_id] = public;
    return public;
  }
  //Public static variables.
  init.getUsers = () => {
    return _userList;
  }



  init.getUser = (user_id) => {
    return _userList[user_id];
  }
  init.getBuiltUsers = () => {
    let tempList = {};
    for (let i in _userList)
      tempList[i] = _userList[i].build();
    return tempList;
  }
  init.getOnlineUserCount = () => {
    let count = 0;
    Object.values(_userList).forEach(user => {
      if (user.isOnline()) {
        count++;
      } else {
        user.getName();
      }
    });
    console.log(count);
    return count;
  }
  //Helper functions
  function createImage() {
    let gender = (Math.floor(Math.random() * 2) < 1) ? 'men' : 'women';
    let index = Math.floor(Math.random() * 100);
    return `https://randomuser.me/api/portraits/${gender}/${index}.jpg`
  }

  return init;
})();

//Message Module
const MessageClassModule = (() => {
  //Static private variables
  let _messageList = [];

  function init(author, content) {
    //Private variables
    let _author = author.getId();
    let _content = content;
    let _time = new Date();
    //Public variables.
    let public = {
      getAuthor() {
        return author;
      },
      getContent() {
        return _content;
      },
      getTime() {
        let hour = _time.getHours();
        let min = _time.getMinutes();
        return `${( (hour < 10  ) ? `0${hour}` : hour )} : ${( (min < 10  ) ? `0${min}` : min )}`;
      },
      build() {
        return {
          author_id: author.getId(),
          content: _content,
          time: public.getTime()
        }
      }
    }
    _messageList.push(public);
    return public
  }
  //public static variables.
  init.getMessages = () => {
    return _messageList;
  }
  return init
})()


module.exports = {
  User: UserClassModule,
  Message: MessageClassModule
}