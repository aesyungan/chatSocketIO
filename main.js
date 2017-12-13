var express = require('express');//requiere express
var app = express();
var server = require('http').Server(app);//http
var io = require('socket.io')(server);//crea sokect

var messages = [{
        id: 1,
        text: "Biemvenidos Chat",
        author: "Admin"
    }];
//carpeta publica accesible desde navegadores
app.use(express.static('public'));
//ejemplo de que esta funcionando
app.get('/hello', function (req, res) {
    res.status(200).send("Hello World!");
});

io.on('connection', function (socket) {
    console.log('Alguien se ha conectado con Sockets');
    //mada  todos los datos a alguien 
    socket.emit('messages', messages);
//cuando envian  datos a algien
    socket.on('new-message', function (data) {
        messages.push(data);//guardamos todos los memsajes
        console.log("mensajes ahora", messages);
        //para q no envie todos los mensajes
        io.sockets.emit('messages', [data]);//mandamos el mensaje solo el  mensaje que nos envio a otros usuarios
    });
});

server.listen(80, function () {
    console.log("Servidor corriendo en http://localhost:80");
});


