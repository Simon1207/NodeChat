var socket=io.connect('http://192.168.1.101:6677',{'forceNew':true}); //DIRECCION IP ES LA DEL SERVIDOR !!

socket.on('messages',function(data){
	console.log(data);
	render(data);
});

//pintar los datos en el HTMl
function render(data){
	var html=data.map(function(message,index){ //recorre el contenido del objeto data
		return(`
			<div class="message">
				<strong>${message.nickname}</strong>
				<p>${message.text}</p>
			</div>
			`);
	}).join(' ');

	var div_msgs=document.getElementById('messages');
	div_msgs.innerHTML=html;
	div_msgs.scrollTop=div_msgs.scrollHeight;



}

function addMessage(e){
	//recoje mensage recibido desde el formilario
	var message={
		nickname:document.getElementById('nickname').value,
		text:document.getElementById('text').value
	};

	document.getElementById('nickname').style.display='none';
	socket.emit('add-message',message);
	return false;
}