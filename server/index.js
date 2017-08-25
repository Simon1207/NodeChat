//Express connection
var express=require('express');
var app=express();
var server=require('http').Server(app);
//Connection socket.io
var io=require('socket.io')(server);
var puerto=6677;

//middleware
app.use(express.static('client'));

//creación de ruta con express
app.get('/hola-mundo',function(req,res){
	res.status(200).send('Hola mundo desde una ruta');
});

//objeto JSON que almacena mensajes 
var messages=[{
	id:1,
	text:'Bienvenido al chat privado de Socket.io...',
	nickname:'SimonP'
}];

//Abrir conexion a socket
//Se encarga de recibir conexiones de clientes
io.on('connection',function(socket){
	console.log("Alguien se a coenctado al socket con la IP: "+socket.handshake.address);
	socket.emit('messages',messages);

	socket.on('add-message',function(data){
		messages.push(data); //añade dato al array

		io.sockets.emit('messages',messages);
	});

}); //on permite ejecutar eentos

server.listen(puerto,function(){
	console.log('Servidor está funcionando en http://localhost:'+puerto);
});