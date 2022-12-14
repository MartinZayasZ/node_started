
var express = require('express'),//necesario para la api rest
app = express(),
server = require('http').createServer(app),//necesario para la api rest
io = require('socket.io').listen(server);// para implementar los sockets

var mysql = require('mysql'); 
var config = require('./config.js');

var con = mysql.createConnection({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

require('socketio-auth')(io, {
authenticate: function (socket, data, callback) {
    //get credentials sent by the client
    var username = data.username;
    var password = data.password;
    
    if (username == 'admin' && password == 'admin'){
        return callback(null, true);
    }
    return callback(new Error("User not found"));
},
// postAuthenticate: postAuthenticate,
disconnect: function (socket) {
    console.log(socket.id + ' disconnected');
},
timeout: 1000
});

server.listen(8080);//dejamos nuestro servidor escuchando el puerto 8080

//API REST, Comunicación con el editor
app.get('/',function(req,res){
res.status(200).sendFile(__dirname + '/index.html');
});

//Sockets, comunicación con el AS3
io.sockets.on('connection', function(socket){//evento para saber cuando un evento se conecta y activa los demás eventos 
console.log("new connection");

//evento para cuando un cliente se desconecta
//socket.on("disconnect", () => console.log("closed connection"));

socket.on('sendMessage',function(data){
    io.sockets.emit('newMessage',{msg: data});
});
});
