const chatroomController = require('../db/chatroom/chatroomController.js');
const userController = require('../db/user/userController.js');
const messagesController = require('../db/messages/messagesController.js');
const sequelize = require('../db/config.js');

var dummyData = [{roomname: '2016-06-01_madrid_to_barcelona', username: 'admin', message: 'Welcome', createdAt:''},
                 {roomname: '2016-06-01_madrid_to_barcelona', username: 'anonymous', message: 'hello', createdAt:''},
                 {roomname: '2016-06-01_madrid_to_barcelona', username: 'ghost', message: 'boo', createdAt:''}];

module.exports = (socket, io) => {
  socket.on('send message', (message) => {
    console.log(message);
    messagesController.createMessage(message);
    io.emit('get messages for room', dummyData); // send back all messages
  });
  socket.on('send typing status', (bool) => {
    console.log('???????', bool);
    io.emit('typing status', true);
  });
  socket.on('get messages for room', (roomname) => {
    console.log(roomname);
    var testing = messagesController.grabMessages();
    console.log('testing', testing)
    io.emit('get messages for room', dummyData);
  });
  socket.on('send itinerary', (roomname) => {
    chatroomController.createChatRoom(roomname);
  });





  socket.on('updateMessagesState', (location) => {
    chatroomController.updateMessagesState(location, socket);
  });

  socket.on('createChatRoom', (location) => {
    chatroomController.createChatRoom(location, socket);
  });

  socket.on('addMessageToChatRoom', (msgObj) => {
    chatroomController.addMessageToChatRoom(msgObj.location, msgObj.message, msgObj.username, socket);
  });

  socket.on('validateUserLogin', (userCredentials) => {
    userController.validateUserLogin(userCredentials.username, userCredentials.password, socket);
  });

  socket.on('validateUserSignup', (userCredentials) => {
    userController.validateUserSignup(userCredentials.username, userCredentials.password, socket);
  });


};