var express = require('express');//imports express module as function
var app = express(); //stores function results
var server = app.listen(3000);//listen on port 3000
app.use(express.static('public'));//show public files on screen
console.log ("my socket server is running ")

var socket = require('socket.io'); //import statement
var io = socket(server);//keeps track of messages in and out 

io.sockets.on('connection', newConnection); //connection event 

//function triggered when there is a new socket connection
function newConnection(socket){
console.log('new connection: '+socket.id);

//if there is a message called mouse, trigger this function mouseMsg
socket.on('mouse', mouseMsg)

function mouseMsg(data){
    //send message back out 
    socket.broadcast.emit('mouse',data);
    console.log(data)

    //sends message to everyone including the client who sent it out 
    io.sockets.emit('mouse',data);
}
}